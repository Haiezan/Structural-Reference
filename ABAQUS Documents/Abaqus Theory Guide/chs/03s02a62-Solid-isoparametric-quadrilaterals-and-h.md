# 3.2.4 实体等参数四边形和六面体

### 3.2.4 实体等参数四边形和六面体

**产品：** Abaqus/Standard  Abaqus/Explicit

Abaqus 中的实体单元库包含一阶和二阶等参数单元。一阶单元包括用于平面和轴对称分析的4节点四边形单元和用于三维情况的8节点六面体（砖）单元。二阶等参数单元库包括"Serendipity"单元：8节点四边形和20节点六面体，以及一种"完全Lagrange"单元，即27节点（节点数可变）六面体。"Serendipity"一词指的是插值方法，它仅基于角节点和边中节点进行插值。相比之下，完全Lagrange插值使用一维Lagrange多项式的乘积形式来提供二维或三维插值函数。

所有这些等参数单元均提供完全积分或减缩积分版本。高斯积分几乎总是与二阶等参数单元一起使用，因为它效率很高，且减缩积分对应的高斯点正是Barlow点（[Barlow, 1976](07s01a01-References.md)），在这些点上应变（如果单元形状良好）可以得到最精确的预测。

三维六面体单元也可用于层合复合固体的分析。可以在每个实体单元中指定不同材料层和不同取向的几层材料。材料层或层片可以沿三个等参数坐标中的任意一个堆叠，平行于主单元的相对面（参见[图 3.2.4-1](03s02a62-Solid-isoparametric-quadrilaterals-and-hexahedra.md)）。这些单元使用与均质单元相同的插值函数，但积分会考虑堆叠方向上材料属性的变化。

这些单元还提供了混合压力-位移版本，用于不可压缩和近似不可压缩本构模型（参见"混合不可压缩实体单元公式"，第3.2.3节，以及"超弹性材料行为"，第4.6.1节，了解所用公式的详细讨论）。

### 插值

等参数插值由[图 3.2.4-1](03s02a62-Solid-isoparametric-quadrilaterals-and-hexahedra.md)所示的等参数单元坐标 *g*、*h*、*r* 定义。由于 Abaqus 是拉格朗日代码，这些也是材料坐标。它们在单元中各自的范围是从 ![](../graphics/stm_eqn02916.gif) 到 ![](../graphics/stm_eqn02917.gif)。Abaqus 中等参数单元的节点编号约定也示于[图 3.2.4-1](03s02a62-Solid-isoparametric-quadrilaterals-and-hexahedra.md)。角节点编号在前，二阶单元的边中节点编号在后。插值函数如下。

一阶四边形：
![](../graphics/stm_eqn02918.gif)


图 3.2.4-1 等参数主单元。

![](../graphics/stmquadhex-iso-master.png)

二阶四边形：
![](../graphics/stm_eqn02919.gif)

![](../graphics/stm_eqn02920.gif)

20节点六面体：
![](../graphics/stm_eqn02921.gif)
对于8节点六面体单元，上述插值函数可以重写为

![](../graphics/stm_eqn02922.gif)等参数形函数 ![](../graphics/stm_eqn00952.gif) 可以写成

![](../graphics/stm_eqn02923.gif)其中

![](../graphics/stm_eqn02924.gif)

![](../graphics/stm_eqn02925.gif)

![](../graphics/stm_eqn02926.gif)

![](../graphics/stm_eqn02927.gif)

![](../graphics/stm_eqn02928.gif)

![](../graphics/stm_eqn02929.gif)

![](../graphics/stm_eqn02930.gif)

![](../graphics/stm_eqn02931.gif)上标 *I* 表示单元的节点。最后四个向量，![](../graphics/stm_eqn02932.gif)（![](../graphics/stm_eqn00904.gif) 的范围为4），是沙漏基向量，它们是在1点积分单元中没有能量但导致单元中非恒定应变场的变形模式。

在均匀应变公式中，梯度矩阵 ![](../graphics/stm_eqn02933.gif) 通过对单元积分定义为

![](../graphics/stm_eqn02934.gif)

![](../graphics/stm_eqn02935.gif)其中 ![](../graphics/stm_eqn02936.gif) 是单元体积，*i* 的范围为3。

在重心应变公式中，梯度矩阵 ![](../graphics/stm_eqn02933.gif) 直接给出为

![](../graphics/stm_eqn02937.gif)它具有以下反对称性质：

![](../graphics/stm_eqn02938.gif)

![](../graphics/stm_eqn02939.gif)

![](../graphics/stm_eqn02940.gif)

![](../graphics/stm_eqn02941.gif)从以上可以看出，重心应变公式降低计算梯度矩阵所需的工作量。由于梯度矩阵的反对称性质，这种成本节省也延伸到应变和单元节点力的计算。然而，当单元歪斜时，重心应变公式的精度较低。对于二维平面单元和平行六面体配置中的六面体单元，均匀应变方法与重心应变方法相同。

完全积分意味着，如果从等参数坐标到物理坐标的映射的Jacobian在整个单元中为常数，则所选的高斯格式将精确地积分具有均匀材料行为的单元的刚度矩阵；这意味着三维单元中相对的元素边或面必须平行，对于二阶单元，边中节点必须在单元边的中点。如果单元不满足这些条件，则完全积分是不精确的，因为刚度中的一些项是高阶的，超出了所选高斯格式精确积分的范围。这种积分不精确似乎不会对单元性能造成不利影响。如下所述，Abaqus 中一阶单元的完全积分包含一个额外的近似，更准确地称为"选择性减缩积分"。

减缩积分通常意味着使用比完全格式低一阶的积分格式来积分单元的内力和刚度。表面上这看起来是一个较差的近似，但事实证明它具有显著的优势。对于在物理空间中等参数坐标线保持正交的二阶单元，减缩积分点具有Barlow点性质（[Barlow, 1976](07s01a01-References.md)）：应变在这些点从插值函数计算时，比在单元中任何其他地方具有更高的精度。对于一阶单元，均匀应变方法在单元体积上产生精确的平均应变。这不仅对输出的值很重要，当本构模型是非线性的时也是重要的，因为传递给本构程序的应变更能代表实际应变。

减缩积分减少了单元在连续体理论中存在内部约束（如不可压缩性）或Kirchhoff横向剪切约束（如使用实体单元分析弯曲问题）时引入的约束数量。在此类应用中，完全积分的单元将"锁定"——它们将表现出过于刚硬的响应，其结果完全不可用。相同单元的减缩积分版本在这种情况下通常可以很好地工作。

![](../graphics/stm_eqn02942.gif)最后，减缩积分降低了形成单元的成本；例如，完全积分的二阶20节点三维单元需要在27个点进行积分，而相同单元的减缩积分版本只使用8个点，因此成本不到完全积分版本的30%。这种成本节省在单元形成成本占主导地位的情况下尤为重要，例如波前相对较小的问题，以及本构模型需要大量计算的问题。减缩积分的缺陷是，除了一维和用高于一阶单元建模的轴对称几何外，单元刚度矩阵将是秩不足的。这最常见的表现是在响应中出现奇异模式（"沙漏模式"）。这些是非物理响应模式，除非受到控制，否则可能无限增长。二维中减缩积分的二阶Serendipity插值单元——8节点四边形——具有一种这样的模式，但由于它在具有多个单元的网格中不能传播，因此是良性的。具有减缩积分的二阶三维单元具有可以在单排单元中传播的模式。因为这些模式在二阶单元中很少引起麻烦，Abaqus中没有使用特殊技术来控制它们。

相比之下，当在一阶单元（4节点四边形和8节点六面体）中使用减缩积分时，沙漏效应通常会使单元无法使用，除非加以控制。在 Abaqus 中，使用[Flanagan 和 Belytschko（1981）](07s01a01-References.md)中给出的人工 stiffness方法和人工阻尼方法来控制这些单元中的沙漏模式。人工阻尼方法仅适用于 Abaqus/Explicit 中的实体和膜单元。为了控制沙漏模式，定义了沙漏形状向量 ：

![](../graphics/stm_eqn02943.gif)它不同于沙漏基向量 ![](../graphics/stm_eqn02944.gif)。必须使用沙漏形状向量而不是沙漏基向量来计算抗沙漏力，以确保这些力与线性位移场和刚体场正交（详见[Flanagan 和 Belytschko（1981）](07s01a01-References.md)）。但是，使用沙漏基向量计算抗沙漏力可能具有计算速度优势。因此，对于8节点六面体单元，Abaus/Explicit 提供了在计算抗沙漏力时使用沙漏基向量的选项。对于平行六面体配置中的六面体单元，沙漏形状向量与沙漏基向量相同。

[Flanagan 和 Belytschko（1981）](07s01a01-References.md)的沙漏控制方法在线性和轻度非线性问题中通常是成功的，但在强非线性问题中可能会失效，因此可能无法产生合理的结果。控制沙漏的成功也取决于施加在结构上的载荷。例如，点载荷比分布载荷更容易引发沙漏。沙漏在特征值提取问题中可能特别麻烦：沙漏模式的低刚度可能产生许多具有低特征频率的不真实模式。

Abaqus/Explicit 中提供了一种改进的[Flanagan 和 Belytschko（1981）](07s01a01-References.md)沙漏控制方法，它用三场变分原理得出的人工刚度系数替代了原有系数。该方法基于[Engelmann 和 Whirley（1990）](07s01a01-References.md)、[Belytschko 和 Bindeman（1992）](07s01a01-References.md)以及[Puso（2000）](07s01a01-References.md)提出的增强假设应变和物理沙漏控制方法。它可以在较小的额外计算成本下，为非线性问题提供更强的抗沙漏能力和为线性弹性问题提供更精确的粗网格位移解。

经验表明，减缩积分的二阶等参数单元是 Abaqus 中对于可以预期解平滑的问题最具成本效益的单元。请注意，对于不可压缩材料行为（如有限应变下的超弹性），应使用减缩积分的混合公式单元（参见"混合不可压缩实体单元公式"，第3.2.3节，以及"超弹性材料行为"，第4.6.1节）。当解中预期会出现大应变梯度或应变不连续时——如大应变下的塑性分析、极限载荷分析或严重加载的橡胶部件分析——通常推荐使用一阶单元。减缩积分可与此类单元一起使用，但由于沙漏控制并不总是在严重非线性问题中有效，因此应谨慎使用。

在可能发生"剪切锁定"的情况下，不应使用完全积分的一阶单元，例如当单元必须表现出弯曲行为时。不兼容模式单元（"带不兼容模式的连续体单元"，第3.2.5节）应用于此类应用。

### 完全积分的一阶等参数单元

对于完全积分的一阶等参数单元（二维中为4节点单元，三维中为8节点单元），高斯点处的实际体积变化被替换为单元的平均体积变化。这也称为选择性减缩积分技术，因为积分阶数在选定的项中被降低，也称为 ![](../graphics/stm_eqn02945.gif) 技术，因为应变-位移关系（![](../graphics/stm_eqn01219.gif)-矩阵）被修改了。该技术有助于防止网格锁定，从而在不可压缩或近似不可压缩情况下提供精确解：参见[Nagtegaal 等人（1974）](07s01a01-References.md)。此外，Abaqus 对轴对称和广义平面应变问题使用第三个（面外）方向上的平均应变。因此，在二维单元中只需要修改面内项。在三维单元中，完整的体积项被修改。这可能导致平面应变单元和通过边界条件强制平面应变条件的三维单元之间存在略微不同的行为。
![](../graphics/stm_eqn02946.gif)![](../graphics/stm_eqn02947.gif)![](../graphics/stm_eqn02948.gif)![](../graphics/stm_eqn02949.gif)
在有限应变公式中，选择性减缩积分过程的工作方式如下。定义修正的变形梯度
![](../graphics/stm_eqn02950.gif)![](../graphics/stm_eqn02951.gif)![](../graphics/stm_eqn02949.gif)![](../graphics/stm_eqn02952.gif)![](../graphics/stm_eqn02949.gif)![](../graphics/stm_eqn02949.gif)
 是单元上的平均Jacobian，
![](../graphics/stm_eqn01825.gif)![](../graphics/stm_eqn02953.gif)
 是对单元"体积"平均的面积变化，这与具有可变厚度的畸变单元的实际单元面积不同。
![](../graphics/stm_eqn02954.gif)![](../graphics/stm_eqn02955.gif)![](../graphics/stm_eqn02956.gif)![](../graphics/stm_eqn00064.gif)
修正的变形率张量  得到为
![](../graphics/stm_eqn02957.gif)

![](../graphics/stm_eqn02958.gif)此表达式用于虚功方程中，用于从单元应力获得节点力。在 Abaqus 中，使用中心差分算子从变形率张量定义应变增量，因此我们可以写出

![](../graphics/stm_eqn02959.gif)其中 ![](../graphics/stm_eqn02960.gif) 是增量中间点的位置。
![](../graphics/stm_eqn02961.gif)
对于轴对称和广义平面应变单元，变形梯度的面外分量通过对原始单元体积平均获得，
![](../graphics/stm_eqn02962.gif)
这两个平均值都是解析计算的。

### 复合固体的积分

复合固体单元也采用数值积分来获得单元矩阵。在层平面中使用高斯积分，在堆叠方向中使用Simpson积分。这些积分位置分别称为"积分点"和"截面点"，用于输出目的。用户指定每个层的厚度方向所需的截面点数。

### 参考

### 参考

### 参考

"实体（连续体）单元"，Abaqus Analysis User's Guide 第28.1.1节


**校审补全说明：** 以下保留英文源文的非图片文本，用于补足本页此前过短或参考文献页中文字符过少的问题；公式和图片引用不在此重复，以上文校准后的中文正文为准。

**?????3.2.4 Solid isoparametric quadrilaterals and hexahedra**

**?????3.2.4 Solid isoparametric quadrilaterals and hexahedra**

**Products: **Abaqus/Standard  Abaqus/Explicit

The library of solid elements in Abaqus contains first- and second-order isoparametric elements. The first-order elements are the 4-node quadrilateral for plane and axisymmetric analysis and the 8-node brick for three-dimensional cases. The library of second-order isoparametric elements includes "serendipity" elements: the 8-node quadrilateral and the 20-node brick, and a "full Lagrange" element, the 27-node (variable number of nodes) brick. The term "serendipity" refers to the interpolation, which is based on corner and midside nodes only. In contrast, the full Lagrange interpolation uses product forms of the one-dimensional Lagrange polynomials to provide the two- or three-dimensional interpolation functions.

All these isoparametric elements are available with full or reduced integration. Gauss integration is almost always used with second-order isoparametric elements because it is efficient and the Gauss points corresponding to reduced integration are the Barlow points ([Barlow, 1976](07s01a01-References.md)) at which the strains are most accurately predicted if the elements are well-shaped.

The three-dimensional brick elements can also be used for the analysis of laminated composite solids. Several layers of different material, in different orientations, can be specified in each solid element. The material layers or lamina can be stacked in any of the three isoparametric coordinates, parallel to opposite faces of the master element ([Figure 3.2.4&#8211;1](03s02a62-Solid-isoparametric-quadrilaterals-and-h.md)). These elements use the same interpolation functions as the homogeneous elements, but the integration takes the variation of material properties in the stacking direction into account.

Hybrid pressure-displacement versions of these elements are provided for use with incompressible and nearly incompressible constitutive models (see "Hybrid incompressible solid element formulation,"  Section 3.2.3, and "Hyperelastic material behavior,"  Section 4.6.1, for a detailed discussion of the formulations used).
**?????Interpolation**

Isoparametric interpolation is defined in terms of the isoparametric element coordinates *g*, *h*, *r* shown in [Figure 3.2.4&#8211;1](03s02a62-Solid-isoparametric-quadrilaterals-and-h.md). These are material coordinates, since Abaqus is a Lagrangian code. They each span the range  to  in an element. The node numbering convention used in Abaqus for isoparametric elements is also shown in [Figure 3.2.4&#8211;1](03s02a62-Solid-isoparametric-quadrilaterals-and-h.md). Corner nodes are numbered first, followed by the midside nodes for second-order elements. The interpolation functions are as follows.

First-order quadrilateral:



Figure 3.2.4&#8211;1 Isoparametric master elements.



Second-order quadrilateral:



First-order brick:



20-node brick:


**?????Integration of homogeneous solids**

All the isoparametric solid elements are integrated numerically. Two schemes are offered: "full" integration and "reduced" integration. For the second-order elements Gauss integration is always used because it is efficient and it is especially suited to the polynomial product interpolations used in these elements. For the first-order elements the single-point reduced-integration scheme is based on the "uniform strain formulation": the strains are not obtained at the first-order Gauss point but are obtained as the (analytically calculated) average strain over the element volume. The uniform strain method, first published by [Flanagan and Belytschko (1981)](07s01a01-References.md), ensures that the first-order reduced-integration elements pass the patch test and attain the accuracy when elements are skewed. Alternatively, the "centroidal strain formulation," which uses 1-point Gauss integration to obtain the strains at the element center, is also available for the 8-node brick elements in Abaqus/Explicit for improved computational efficiency. The differences between the uniform strain formulation and the centroidal strain formulation can be shown as follows:

For the 8-node brick elements the interpolation function given above can be rewritten as

The isoparametric shape functions  can be written as

where















and the superscript *I* denotes the node of the element. The last four vectors,  ( has a range of four), are the hourglass base vectors, which are the deformation modes associated with no energy in the 1-point integration element but resulting in a nonconstant strain field in the element.

In the uniform strain formulation the gradient matrix  is defined by integrating over the element as



where  is the element volume and *i* has a range of three.

In the centroidal strain formulation the gradient matrix  is simply given as

which has the following antisymmetric property:







It can be seen from the above that the centroidal strain formulation reduces the amount of effort required to compute the gradient matrix. This cost savings also extends to strain and element nodal force calculations because of the antisymmetric property of the gradient matrix. However, the centroidal strain formulation is less accurate when the elements are skewed. For two-dimensional plane elements and hexahedron elements in a parallelepiped configuration the uniform strain approach is identical to the centroidal strain approach.

Full integration means that the Gauss scheme chosen will integrate the stiffness matrix of an element with uniform material behavior exactly if the Jacobian of the mapping from the isoparametric coordinates to the physical coordinates is constant throughout the element; this means that opposing element sides or faces in three-dimensional elements must be parallel and, in the case of the second-order elements, that the midside nodes must be at the middle of the element sides. If the element does not satisfy these conditions, full integration is not exact because some of the terms in the stiffness are of higher order than those that are integrated exactly by the Gauss scheme chosen. Such inaccuracy in the integration does not appear to be detrimental to the element's performance. As will be discussed below, full integration in Abaqus in first-order elements includes a further approximation and is more accurately called "selectively reduced integration."

Reduced integration usually means that an integration scheme one order less than the full scheme is used to integrate the element's internal forces and stiffness. Superficially this appears to be a poor approximation, but it has proved to offer significant advantages. For second-order elements in which the isoparametric coordinate lines remain orthogonal in the physical space, the reduced-integration points have the Barlow point property ([Barlow, 1976](07s01a01-References.md)): the strains are calculated from the interpolation functions with higher accuracy at these points than anywhere else in the element. For first-order elements the uniform strain method yields the exact average strain over the element volume. Not only is this important with respect to the values available for output, it is also significant when the constitutive model is nonlinear, since the strains passed into the constitutive routines are a better representation of the actual strains.

Reduced integration decreases the number of constraints introduced by an element when there are internal constraints in the continuum theory being modeled, such as incompressibility, or the Kirchhoff transverse shear constraints if solid elements are used to analyze bending problems. In such applications fully integrated elements will "lock"---they will exhibit response that is orders of magnitude too stiff, so the results they provide are quite unusable. The reduced-integration version of the same element will often work well in such cases.

Finally, reduced integration lowers the cost of forming an element; for example, a fully integrated, second-order, 20-node three-dimensional element requires integration at 27 points, while the reduced-integration version of the same element only uses 8 points and, therefore, costs less than 30% of the fully integrated version. This cost savings is especially significant in cases where the element formation costs dominate the overall costs, such as problems with a relatively small wavefront and problems in which the constitutive models require lengthy calculations. The deficiency of reduced integration is that, except in one dimension and in axisymmetric geometries modeled with higher than first-order elements, the element stiffness matrix will be rank deficient. This most commonly exhibits itself in the appearance of singular modes ("hourglass modes") in the response. These are nonphysical response modes that can grow in an unbounded way unless they are controlled. The reduced-integration second-order serendipity interpolation elements in two dimensions---the 8-node quadrilaterals---have one such mode, but it is benign because it cannot propagate in a mesh with more than one element. The second-order three-dimensional elements with reduced integration have modes that can propagate in a single stack of elements. Because these modes rarely cause trouble in the second-order elements, no special techniques are used in Abaqus to control them.

In contrast, when reduced integration is used in the first-order elements (the 4-node quadrilateral and the 8-node brick), hourglassing can often make the elements unusable unless it is controlled. In Abaqus the artificial stiffness method and the artificial damping method given in [Flanagan and Belytschko (1981)](07s01a01-References.md) are used to control the hourglass modes in these elements. The artificial damping method is available only for the solid and membrane elements in Abaqus/Explicit. To control the hourglass modes, the hourglass shape vectors, , are defined:

which are different from the hourglass base vectors, . It is essential to use the hourglass shape vectors rather than the hourglass base vectors to calculate the hourglass-resisting forces to ensure that these forces are orthogonal to the linear displacement field and the rigid body field (see [Flanagan and Belytschko (1981)](07s01a01-References.md) for details). However, using the hourglass base vectors to calculate the hourglass-resisting forces may provide computational speed advantages. Therefore, for the 8-node brick elements Abaqus/Explicit provides the option to use the hourglass base vectors in calculating the hourglass-resisting forces. For hexahedron elements in a parallelepiped configuration the hourglass shape vectors are identical to the hourglass base vectors.

The hourglass control methods of [Flanagan and Belytschko (1981)](07s01a01-References.md) are generally successful for linear and mildly nonlinear problems but may break down in strongly nonlinear problems and, therefore, may not yield reasonable results. Success in controlling hourglassing also depends on the loads applied to the structure. For example, a point load is much more likely to trigger hourglassing than a distributed load. Hourglassing can be particularly troublesome in eigenvalue extraction problems: the low stiffness of the hourglass modes may create many unrealistic modes with low eigenfrequencies.

A refinement of the [Flanagan and Belytschko (1981)](07s01a01-References.md) hourglass control method that replaces the artificial stiffness coefficients with those derived from a three-field variational principle is available in Abaqus/Explicit. The approach is based on the enhanced assumed strain and physical hourglass control methods proposed in [Engelmann and Whirley (1990)](07s01a01-References.md), [Belytschko and Bindeman (1992)](07s01a01-References.md), and [Puso (2000)](07s01a01-References.md). It can provide increased resistance to hourglassing for nonlinear problems and coarse mesh displacement solution accuracy for linear elastic problems at a small additional computational cost.

Experience suggests that the reduced-integration, second-order isoparametric elements are the most cost-effective elements in Abaqus for problems in which the solution can be expected to be smooth. Note that in the case of incompressible material behavior, such as hyperelasticity at finite strain, the mixed formulation elements with reduced integration should be used (see "Hybrid incompressible solid element formulation,"  Section 3.2.3, and "Hyperelastic material behavior,"  Section 4.6.1). When large strain gradients or strain discontinuities are expected in the solution---such as in plasticity analysis at large strains, limit load analysis, or analysis of severely loaded rubber components---the first-order elements are usually recommended. Reduced integration can be used with such elements, but because the hourglass controls are not always effective in severely nonlinear problems, caution should be exercised.

Fully integrated first-order elements should not be used in cases where "shear locking" can occur, such as when the elements must exhibit bending behavior. The incompatible mode elements ("Continuum elements with incompatible modes,"  Section 3.2.5) should be used for such applications.
**?????Fully integrated first-order isoparametric elements**

For fully integrated first-order isoparametric elements (4-node elements in two dimensions and 8-node elements in three dimensions) the actual volume changes at the Gauss points are replaced by the average volume change of the element. This is also known as the selectively reduced-integration technique, because the order of integration is reduced in selected terms, or as the  technique, since the strain-displacement relation (-matrix) is modified. This technique helps to prevent mesh locking and, thus, provides accurate solutions in incompressible or nearly incompressible cases: see [Nagtegaal et al. (1974)](07s01a01-References.md). In addition, Abaqus uses the average strain in the third (out-of-plane) direction for axisymmetric and generalized plane strain problems. Hence, in the two-dimensional elements only the in-plane terms need to be modified. In the three-dimensional elements the complete volumetric terms are modified. This may cause slightly different behavior between plane strain elements and three-dimensional elements for which a plane strain condition is enforced by boundary conditions.

In a finite-strain formulation the selectively reduced-integration procedure works as follows. Define the modified deformation gradient

where  is the deformation gradient; *n* is the dimension of the element;  is the Jacobian at the Gauss point; and  is the average Jacobian over the element,

For three-dimensional elements  and *J* () are the volume change; for two-dimensional elements  and *J* () are the change in area. Note that in the last case  is the change in area averaged over the element *volume*, which is different from the actual element area for distorted elements with variable thickness.

The modified rate of deformation tensor, , is obtained from the modified deformation gradient  as

where  for two-dimensional elements,  for three-dimensional elements, and  is the identity matrix in two or three dimensions. This expression can also be written directly in terms of the velocities:

where

This expression is used in the virtual work equation, where it is used to obtain the nodal forces from the element stresses. In Abaqus the central difference operator is used to define an increment of strain from the rate of deformation tensor, so we can write

In the above  is the position of the point at the middle of the increment.

For axisymmetric and generalized plane strain elements, the out-of-plane component of the deformation gradient is obtained by averaging over the original element volume,

and the out-of-plane strain increment is calculated by averaging over the current element volume,

Both of these averages are calculated analytically.
**?????Integration of composite solids**

The composite solid elements are also integrated numerically to obtain the element matrices. Gauss quadrature is used in the layer plane, and Simpson's rule is used in the stacking direction. These integration positions are referred to as "integration points" and "section points," respectively, for output purposes. The number of section points required for the integration through the thickness of each layer is specified by the user.
**?????Reference**

**?????Reference**

"Solid (continuum) elements,"  Section 28.1.1 of the Abaqus Analysis User's Guide
