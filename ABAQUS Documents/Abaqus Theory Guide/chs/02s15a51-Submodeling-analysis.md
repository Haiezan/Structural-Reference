# 2.15.1 子模型分析

### 2.15.1 子模型分析

**产品：** Abaqus/Standard  Abaqus/Explicit

子模型是在精细网格上研究模型局部部分的技术，基于从初始全局模型求解结果到子模型边界适当部分的插值。当需要在线性区域获得准确、详细的求解，而该线性区域的详细建模对整体求解影响可以忽略时，该方法最有用。局部区域边界上的响应由全局模型的求解定义，它与施加到局部区域的任何荷载一起决定了子模型中的求解。该技术依赖于全局模型足够准确地定义此子模型边界响应。

子模型在Abaqus中可以相当普遍地应用。只要有一些限制，子模型中使用的单元类型可以与用于在全局模型中建模相应区域的单元类型不同。全局模型和子模型都可以使用实体单元，或者都可以使用壳单元。有一个特殊选项可用于子模型使用实体单元而全局模型使用壳单元。为子模型定义的材料响应也可以与为全局模型定义的材料响应不同。全局模型和子模型都可以有非线性响应，并且可以对任何分析过程序列进行分析。两个模型的求解过程不必相同。

子模型作为单独的分析运行。子模型和全局模型之间的唯一链接是将变量随时间变化的值传输到子模型的相应驱动变量。全局模型中可用于子模型分析的唯一信息是全局模型分析期间写入的文件输出数据。这些数据默认包含所有全局模型节点的未变形坐标和全局模型中所有单元的单元信息（见"Abaqus Analysis User's Guide"第5.1.2节"结果文件输出格式"）。用户必须在子模型边界所在的区域请求适当的响应。

Abaqus中实现了两种形式的子模型技术。更通用的基于节点的子模型技术将节点定位的求解变量（最常见的是位移）从全局模型节点传输到子模型节点。还提供了一种基于表面的子模型技术，将材料点应力结果从全局模型传输到子模型中的表面荷载积分点。
**基于节点的子模型**

基于节点的子模型是最常用的技术。通过这种技术，全局模型响应用于规定子模型中驱动节点上的边界条件。
**插值程序和容差检查**

在实体对实体情况下，确定子模型边界节点（驱动节点）相对于全局模型的位置，并使用适当的单元插值函数来获取驱动节点上自由度的值。用户可以指定的"外部容差"用于检查从全局模型外推值是否有效。在子模型边界节点落在全局模型外部的情况下，如果驱动节点与全局模型自由表面之间的距离在指定容差范围内，外推是有效的。

对于壳对壳子模型情况，类似的检查沿全局模型边界进行。我们还检查子模型的驱动节点是否充分接近全局模型中壳单元的中面。为简化计算，通过沿全局模型中每个壳单元的平面近似法线方向测量距离来近似全局模型中的最近点，如图2.15.1-1所示。

图2.15.1-1 壳对壳子模型中的平面近似。

![](../graphics/stmflat-surf-approx-nls.png)对于壳对实体情况，Abaqus使用两种容差来确定子模型与全局模型之间的关系。首先，确定全局模型壳中面上的最近点。这个点随后将被称为驱动节点的"图像节点"。外部容差参数用于检查图像节点是否位于全局模型的域内。然后检查驱动节点与其图像之间的距离相对于用户指定的最大壳厚度的一半（见图2.15.1-2）。

图2.15.1-2 壳对实体子模型中的中心区域。

![](../graphics/stmcenter-zone-nls.png)

如果节点在厚度的一半加上外部容差范围内，则接受它。如果全局模型具有变化的壳厚度，此检查仅为近似值，在这种情况下，当全局模型的部分厚度相对于用户指定的最大厚度较小时，它不会保护用户。

在确定驱动节点（或壳对实体情况的图像节点）的位置之后，驱动变量的规定值从为全局模型写入的文件输出中插值。这些必须以足够高的频率写入，以便在驱动节点处获得准确的值。对于所有全局模型节点，必须写入位移、温度、电荷的所有分量，以及——对于复稳态动力学分析——相位角以及振幅，以便为驱动节点将从中插值的全局模型节点写入值。对于小型全局模型，响应通常为所有节点写入。对于大型全局模型，可以创建包含子模型边界区域周围节点的节点集。

对于实体对实体和壳对壳子模型，位移、旋转、温度等的插值值直接应用到驱动节点。对于这些节点，用户可以指定被驱动的各个自由度。
**壳对实体子模型的驱动变量**

在壳对实体情况下，驱动自由度的选择取决于驱动节点与壳中面之间的距离。如果节点位于中心区域内（由用户指定；见图2.15.1-2），则所有位移分量都被驱动。如果节点位于中心区域外，则仅平行于壳中面的位移分量被驱动。默认情况下，中心区域的大小取为最大壳厚度的10%。该过程在下面详细描述。中心区域应该足够大，以包含至少一层节点。如果子模型边界处的横向剪切应力很高，并且子模型在厚度方向上高度细化，则可能导致局部应力很高，因为子模型边界处的剪切力仅在中心区域内的驱动节点处传递。横向剪切应力仅在弯矩快速变化的区域很高，因此最好不要将子模型边界放置在此类区域。最好将子模型边界放置在全局模型中横向剪切应力低的区域。

![](../graphics/stm_eqn02562.gif)![](../graphics/stm_eqn02563.gif)![](../graphics/stm_eqn02564.gif)![](../graphics/stm_eqn02565.gif)![](../graphics/stm_eqn00424.gif)当驱动节点位于中心区域内时，所有位移自由度都被驱动。对于几何线性分析，这些规定位移从图像节点的位移和旋转获得为

![](../graphics/stm_eqn02566.gif)连接图像节点到驱动节点的向量：

![](../graphics/stm_eqn02567.gif)![](../graphics/stm_eqn00162.gif)![](../graphics/stm_eqn00064.gif)![](../graphics/stm_eqn02568.gif)对于大位移分析，必须考虑有限旋转。[方程2.15.1-1](02s15a51-Submodeling-analysis.md)的有限旋转等效为

![](../graphics/stm_eqn02569.gif)![](../graphics/stm_eqn02570.gif)中![](../graphics/stm_eqn02571.gif)![](../graphics/stm_eqn02572.gif)垂直于![](../graphics/stm_eqn00424.gif)两个（单位）向量。几何非线性情况的等效表达式为

![](../graphics/stm_eqn02573.gif)中![](../graphics/stm_eqn02574.gif)![](../graphics/stm_eqn02575.gif)垂直于![](../graphics/stm_eqn02568.gif)两个（单位）向量。

由于Abaqus中的子模型能力相当通用，允许在两个分析中使用不同的过程类型，因此对于驱动节点值的评估有几种可能性，如下。在所有情况下，Abaqus假设全局模型和子模型都使用小或大位移理论。

在下面列出的方案中，第一过程类型适用于全局分析，第二适用于子模型分析。

小位移理论的一般过程到一般过程：中心区域内使用[方程2.15.1-1](02s15a51-Submodeling-analysis.md)，中心区域外使用[方程2.15.1-3](02s15a51-Submodeling-analysis.md)。

大位移理论的一般过程到一般过程：中心区域内使用[方程2.15.1-2](02s15a51-Submodeling-analysis.md)，中心区域外使用[方程2.15.1-4](02s15a51-Submodeling-analysis.md)。

![](../graphics/stm_eqn02576.gif)小位移理论的一般过程到线性摄动过程：中心区域内

![](../graphics/stm_eqn02577.gif)![](../graphics/stm_eqn02578.gif)![](../graphics/stm_eqn02579.gif)心区域外

![](../graphics/stm_eqn02580.gif)其中![](../graphics/stm_eqn01706.gif)示切向量。精确公式需要使用基态法向量![](../graphics/stm_eqn02581.gif)基态切向量![](../graphics/stm_eqn02582.gif)由于它们不可用，Abaqus用当前法向量*d*和当前切向量![](../graphics/stm_eqn01706.gif)似。

![](../graphics/stm_eqn02583.gif)小位移理论的线性摄动过程到一般过程：中心区域内

![](../graphics/stm_eqn02584.gif)![](../graphics/stm_eqn02578.gif)![](../graphics/stm_eqn02585.gif)心区域外

![](../graphics/stm_eqn02586.gif)由于基态不可用，使用近似形式，其中![](../graphics/stm_eqn00424.gif)替![](../graphics/stm_eqn02581.gif)![](../graphics/stm_eqn02587.gif)替![](../graphics/stm_eqn02582.gif)使用上述假设，情况5和6由相同的方程控制。近似将给全局分析中基态旋转场较小的情况带来良好结果。

![](../graphics/stm_eqn02588.gif)小位移理论的线性摄动过程到线性摄动过程：中心区域内

![](../graphics/stm_eqn02589.gif)![](../graphics/stm_eqn02590.gif)心区域外

![](../graphics/stm_eqn02591.gif)由于基态不可用，*D*代替![](../graphics/stm_eqn02581.gif)![](../graphics/stm_eqn02587.gif)替![](../graphics/stm_eqn02582.gif)使用上述假设，情况7和8由相同的方程控制。近似将给全局分析中基态旋转场较小的情况带来良好结果。
**基于表面的子模型**

使用基于表面的子模型技术，全局模型响应用于规定子模型中驱动表面上的通量。目前此技术仅限于应力，通量是表面施加的牵引力。
### 插值程序和容差检查

插值程序类似于实体中基于节点的子模型。然而，在基于表面的情况下，确定子模型边界表面积分点（驱动积分点）相对于全局模型的位置，并使用适当的单元插值函数来获取给定积分点处应力张量的值。用户可以指定的"外部容差"用于检查从全局模型外推值是否有效。在子模型落在全局模型外部的情况下，如果驱动积分点与全局模型自由表面之间的距离在指定容差范围内，外推是有效的。
### 应力求解平滑

在确定全局网格中驱动积分点的位置后，积分点处的规定应力从全局模型的节点定位应力值插值。这些驱动节点定位应力由全局模型材料点应力值通过补丁恢复技术确定。在该技术中，驱动节点应力由相邻单元中应力结果的多项式曲线拟合确定。这种恢复技术的效果是应力求解的平滑，如图2.15.1-3所示。

图2.15.1-3 全局模型单元应力结果与用于基于节点插值的补丁恢复计算应力场之间的关系。

![](../graphics/stmsmoothstress-nls.png)

因为驱动节点应力结果是相邻单元应力结果的函数，所以对特定积分点处驱动应力的全局模型单元的贡献延伸到了包含驱动积分点的全局单元之外。考虑图2.15.1-4中所示的子模型驱动表面。

![](../graphics/stmsmoothingpatch-nls.png)![](../graphics/stm_eqn02592.gif)![](../graphics/stm_eqn02593.gif)![](../graphics/stm_eqn02594.gif)图2.15.1-4 对位于单个全局模型单元内的驱动积分点的驱动应力有贡献的全局单元范围。

![](../graphics/stm_eqn02595.gif)子模型中使用惯性缓解的情况下（当子模型完全由全局模型应力结果驱动时是常见情况），子模型表面法线的时间演变通常将通过刚体旋转与全局模型不同。当这种旋转差异较大时，此牵引力计算可能在子模型求解中引入显著误差。有关识别和解决可能导致求解误差的情况的更多信息，请参见"Abaqus Analysis User's Guide"第10.2.3节"基于表面的子模型"。
### 参考文献

### 参考文献

"Abaqus Analysis User's Guide"第10.2.1节"子模型：概述"

"Abaqus Analysis User's Guide"第10.2.2节"基于节点的子模型"

"Abaqus Analysis User's Guide"第10.2.3节"基于表面的子模型"


**校审补全说明：** 以下保留英文源文的非图片文本，用于补足本页此前过短或参考文献页中文字符过少的问题；公式和图片引用不在此重复，以上文校准后的中文正文为准。

**?????2.15.1 Submodeling analysis**

**?????2.15.1 Submodeling analysis**

**Products: **Abaqus/Standard  Abaqus/Explicit

Submodeling is the technique of studying a local part of a model with a refined mesh, based on interpolation of the solution from an initial, global model onto appropriate parts of the boundary of the submodel. The method is most useful when it is necessary to obtain an accurate, detailed solution in the local region and the detailed modeling of that local region has negligible effect on the overall solution. The response at the boundary of the local region is defined by the solution for the global model and it, together with any loads applied to the local region, determines the solution in the submodel. The technique relies on the global model defining this submodel boundary response with sufficient accuracy.

Submodeling can be applied quite generally in Abaqus. With a few restrictions different element types can be used in the submodel compared to those used to model the corresponding region in the global model. Both the global model and the submodel can use solid elements, or they can both use shell elements. A special option is available to use a submodel consisting of solid elements with a global model consisting of shell elements. The material response defined for the submodel may also be different from that defined for the global model. Both the global model and the submodel can have nonlinear response and can be analyzed for any sequence of analysis procedures. The procedures do not have to be the same for both models.

The submodel is run as a separate analysis. The only link between the submodel and the global model is the transfer of the time-dependent values of variables to the relevant driven variables of the submodel. The only information in the global model available to the submodel analysis is the file output data written during the global model analysis. These data contain, by default, the undeformed coordinates of all global model nodes and element information for all elements in the global model (see "Results file output format,"  Section 5.1.2 of the Abaqus Analysis User's Guide). The user must have requested appropriate responses in the area where the submodel boundary is located.

Two forms of the submodeling technique are implemented in Abaqus. The more general node-based submodeling technique transfers node-located solution variables, most commonly displacements, from global model nodes to submodel nodes. A surface-based submodeling technique, which transfers material point stress results from the global model to surface load integration points in the submodel, is also available.
**?????Node-based submodeling**

Node-based submodeling is the most commonly used technique. With this technique global model responses are used to prescribe boundary conditions at the driven nodes in the submodel.Interpolation procedure and tolerance checking

In the solid-to-solid case the positions of the submodel boundary nodes (the driven nodes) are determined with respect to the global model, and the appropriate element interpolation functions are used to obtain the values of the degrees of freedom at the driven nodes. An "exterior tolerance," which the user can specify, is used to check whether it is valid to extrapolate values from the global model. In cases where the submodel boundary nodes fall outside the global model, the extrapolation is valid if the distance between the driven nodes and the free surface of the global model falls within the specified tolerance.

A similar check is done along the global model boundaries for the shell-to-shell submodeling case. We also check whether the driven nodes of the submodel lie sufficiently close to the midsurface of the shell elements in the global model. To simplify the calculations, the closest point in the global model is approximated by measuring the distance in the direction normal to a flat approximation to each shell element in the global model, as shown in [Figure 2.15.1&#8211;1](02s15a51-Submodeling-analysis.md).

Figure 2.15.1&#8211;1 Flat surface approximation in shell-to-shell submodeling.

For the shell-to-solid case Abaqus uses two kinds of tolerances to determine the relation between the submodel and the global model. First, the closest point on the shell midsurface of the global model is determined. This point will subsequently be referred to as the "image node" of the driven node. The exterior tolerance parameter is used to check if the image node lies within the domain of the global model. Then the distance between the driven node and its image is checked against half of the maximum shell thickness specified by the user (see [Figure 2.15.1&#8211;2](02s15a51-Submodeling-analysis.md)).

Figure 2.15.1&#8211;2 Center zone in shell-to-solid submodeling.



If the node is within the half thickness plus the exterior tolerance, it is accepted. This check is only approximate if the global model has varying shell thickness, and in that case it will not protect the user in parts of the global model that have a small thickness compared to the maximum thickness specified by the user.

After the locations of the driven nodes (or image nodes for the shell-to-solid case) are determined, the prescribed values of the driven variables are interpolated from the values written to the file output for the global model. These must have been written with a sufficiently high frequency to obtain accurate values at the driven nodes. All components of displacements, temperatures, charges, and---for complex steady-state dynamic analysis---the phase angles as well as the amplitudes have to be written for the global model nodes from which the values for the driven nodes will be interpolated. For small global models responses will typically be written for all nodes. For large global models node sets can be created that contain the nodes in the regions around the submodel boundary.

For solid-to-solid and shell-to-shell submodeling, the interpolated values of displacements, rotations, temperatures, etc. are applied directly to the driven nodes. For these nodes the user can specify the individual degrees of freedom that are driven.Driven variables for shell-to-solid submodeling

In the shell-to-solid case the driven degrees of freedom are chosen automatically, depending on the distance between the driven node and the midsurface of the shell. If the node lies within the center zone (specified by the user; see [Figure 2.15.1&#8211;2](02s15a51-Submodeling-analysis.md)), all displacement components are driven. If the node lies outside the center zone, only the displacement components parallel to the shell midsurface are driven. By default, the size of the center zone is taken as 10% of the maximum shell thickness. The procedure is described in detail below. The center zone should be large enough so that it contains at least one layer of nodes. If the transverse shear stresses at the submodel boundary are high and the submodel is highly refined in the thickness direction, this can result in high local stresses, since the shear force at the submodel boundary is only transferred at the driven nodes within the center zone. High transverse shear stresses occur only in regions where bending moments vary rapidly, and it is better not to locate the submodel boundary in such regions. It is best to locate the submodel boundary in areas of low transverse shear stress in the global model.

All displacement degrees of freedom are driven when the driven node lies within the center zone. For geometrically linear analysis these prescribed displacements are obtained from the displacements and rotations of the image node as

where  is the prescribed displacement of driven node *A*,  and  are the interpolated displacement and rotation of the image node, and  is the vector connecting the image node to the driven node:



For large-displacement analysis finite rotations must be taken into account. The finite rotation equivalent of [Equation 2.15.1&#8211;1](02s15a51-Submodeling-analysis.md) is

where  is the rotation matrix as defined in "Rotation variables,"  Section 1.3.1;  is the identity tensor; and  is the rotated vector connecting the image node to the driven node in the current configuration:



For driven nodes outside the center zone only the displacement components parallel to the shell midsurface are driven. For the geometrically linear case this leads to the constraints

where  and  are two (unit) vectors orthogonal to . The equivalent expressions for the geometrically nonlinear case are

where  and  are two (unit) vectors orthogonal to .

Since the submodeling capability in Abaqus is quite general and allows the use of different procedure types in both analyses, there are several possibilities for the evaluation of the values at driven nodes as follows. In all cases Abaqus assumes that the global model and the submodel both use small- or large-displacement theory.

In the schemes listed below the first procedure type applies to the global analysis and the second to the submodel analysis.

General procedure to general procedure for small-displacement theory: [Equation 2.15.1&#8211;1](02s15a51-Submodeling-analysis.md) is used inside the center zone, and [Equation 2.15.1&#8211;3](02s15a51-Submodeling-analysis.md) is used outside the center zone.

General procedure to general procedure for large-displacement theory: [Equation 2.15.1&#8211;2](02s15a51-Submodeling-analysis.md) is used inside the center zone, and [Equation 2.15.1&#8211;4](02s15a51-Submodeling-analysis.md) outside the center zone.

General procedure to linear perturbation procedure for small-displacement theory:

 inside the center zone, and

outside the center zone;  denotes the base state in the submodel.

General procedure to linear perturbation procedure for large-displacement theory:

 inside the center zone, and

outside the center zone, where  denotes the tangent vector. The exact formulation would require the use of the base state normal vector  and the base state tangent vector . Since they are not available, Abaqus approximates them with the current normal vector *d* and current tangent vector .

Linear perturbation procedure to general procedure for small-displacement theory:

inside the center zone, and

outside the center zone;  denotes the base state in the submodel.

Linear perturbation procedure to general procedure for large-displacement theory:

inside the center zone, and

outside the center zone. Since the base state is not available, an approximate form is used, where  is used in place of  and  is used for . With the above assumptions cases 5 and 6 are governed by the same equations. The approximation will give good results for cases with a small base state rotation field in the global analysis.

Linear perturbation procedure to linear perturbation procedure for small-displacement theory:

inside the center zone, and

outside the center zone.

Linear perturbation procedure to linear perturbation procedure for large-displacement theory:

inside the center zone, and

outside the center zone. Since the base state is not available, *D* is used in place of  and  in place of . With the above assumptions cases 7 and 8 are governed by the same equations. The approximation will give good results for cases with a small base state rotation field in the global analysis.
**?????Surface-based submodeling**

With the surface-based submodeling technique global model responses are used to prescribe fluxes on driven surfaces in the submodel. Currently this technique is limited to use with stresses, and the flux is a surface-applied traction.Interpolation procedure and tolerance checking

The interpolation procedure resembles that for node-based submodeling in solids. In the surface-based case, though, the positions of the submodel boundary surface integration points (the driven integration points) are determined with respect to the global model, and the appropriate element interpolation functions are used to obtain the values of the stress tensor at the given integration point. An "exterior tolerance," which the user can specify, is used to check whether it is valid to extrapolate values from the global model. In cases where the submodel falls outside the global model, the extrapolation is valid if the distance between the driven integration points and the free surface of the global model falls within the specified tolerance.Stress solution smoothing

After the locations of the driven integration points in the global mesh are determined, a prescribed stress at the integration point is interpolated from node-located stress values from the global model. These driving-node-located stresses are determined from the global model material point stress values through a patch recovery technique. In this technique the driving node stress is determined from a polynomial curve fit of stress results in adjacent elements. The effect of this recovery technique is a smoothing of the stress solution, as shown in [Figure 2.15.1&#8211;3](02s15a51-Submodeling-analysis.md).

Figure 2.15.1&#8211;3 Relation between global model element stress results and the patch recovery calculated stress field used for node-based interpolation.



Because the driving node stress result is a function of the neighboring element stress results, the elements in the global model that contribute to the driving stress at a particular integration point extend beyond the global element encompassing the driven integration point. Consider the submodel driven surface shown in [Figure 2.15.1&#8211;4](02s15a51-Submodeling-analysis.md).

Figure 2.15.1&#8211;4 The extent of global elements contributing to a driving stress for integration points lying within a single global model element.

Stresses at driven integration points in the center of the figure, those inside the darkly shaded element number 5, are interpolated from global model nodes A, B, C, and D. The figure illustrates, through the lighter shading of elements 1, 4, 5, and 8, the global element contribution to the stress calculated at node A. Considering the additional contributions of nodes B, C, and D, the complete set of elements contributing to the driven integration points found inside global element 5 is, therefore, all the elements shown in the figure.Surface traction determination

The submodel interpolation procedure locates global model stress results, , at the driven surface integration points. These stress results then define submodel tractions, , based on the current submodel surface normal, :

In cases where inertia relief is employed in the submodel, a common case when the submodel is driven exclusively by global model stress results, the time evolution of the submodel surface normal will generally differ from the global model by a rigid body rotation. When this rotation discrepancy is large, this traction calculation can introduce significant errors in the submodel solution. See "Surface-based submodeling,"  Section 10.2.3 of the Abaqus Analysis User's Guide, for more information on identifying and addressing these cases where solution error may result.
**?????References**

**?????References**

"Submodeling: overview,"  Section 10.2.1 of the Abaqus Analysis User's Guide

"Node-based submodeling,"  Section 10.2.2 of the Abaqus Analysis User's Guide

"Surface-based submodeling,"  Section 10.2.3 of the Abaqus Analysis User's Guide
