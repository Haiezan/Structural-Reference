# 3.1.1 单元库：概述

### 3.1.1 单元库：概述

Abaqus单元库提供了完整的几何建模能力。因此，任何单元组合都可用于组成模型。有时需要多点约束来应用必要的运动学关系以形成模型（例如，用实体单元建模部分壳表面，部分用壳单元建模，或用梁和壳单元的混合建模管道弯头）。

所有单元使用数值积分以允许材料行为的完全通用性。壳和梁单元特性可以定义为一般截面行为，或者可以数值积分单元的每个横截面，从而在需要时准确跟踪非线性响应。可以指定具有不同高度处不同材料的复合分层截面。一些特殊单元（如线弹簧）使用近似的分析解来建模非线性行为。

![](../graphics/stm_eqn00428.gif)![](../graphics/stm_eqn00152.gif)Abaqus中的所有单元都在全局笛卡尔坐标系中公式化，除了用*r*–*z*坐标表示的轴对称单元。在几乎所有单元中，主向量量（如位移![](../graphics/stm_eqn02851.gif)![](../graphics/stm_eqn02852.gif)![](../graphics/stm_eqn00117.gif)中插值函数![](../graphics/stm_eqn02853.gif)![](../graphics/stm_eqn02854.gif)中*n*是单元中积分点的数量，![](../graphics/stm_eqn02855.gif)与会积分点*i*相关的体积。Abaqus将使用"完全"或"缩减"积分。对于完全积分，积分点的数量足以精确积分虚功表达式，至少对于线性材料行为如此。Abaqus中的所有三角和四面体单元使用完全积分。缩减积分可用于四边形和六面体单元；在该过程中，积分点的数量足以精确积分比插值阶数低一阶的应变场的贡献。这些单元中存在的应变场的高阶（不完整）贡献将不被积分。

缩减积分单元的优点是应变和应力在提供最佳精度的位置计算，即所谓的Barlow点（[Barlow, 1976](07s01a01-References.md)）。第二个优点是减少的积分点数量降低了CPU时间和存储需求。缺点是缩减积分过程可能允许在积分点不引起应变的变形模式。这些零能模式使单元秩亏，并导致称为"沙漏"的现象，其中零能模式开始在网格中传播，导致不准确的求解。这个问题在一阶四边形和六面体中特别严重。为了防止这些过度变形，向单元添加了额外的 artificial 刚度。在这种所谓的沙漏控制过程中，小的人工刚度与零能变形模式相关联。该过程用于Abaqus中的许多实体和壳单元。

大多数完全积分实体单元不适合（近似）不可压缩材料行为的分析。原因在于材料行为迫使材料（近似）无体积变化地变形。完全积分实体单元网格，特别是低阶单元网格，不允许这种变形（除了纯均匀变形）。因此，Abaqus在这些单元中使用"选择性缩减"积分：体积应变使用缩减积分，偏应变使用完全积分。因此，低阶单元在近似不可压缩行为中表现可接受。对于完全不可压缩材料行为，发生了另一个复杂情况：体积模量因此变得无限大。对于这种情况，需要混合（混合）公式，其中位移场增加了静水压力场。在这个公式中，只有体积模量的逆出现，因此对算子矩阵的贡献消失。静水压力场起着强制执行不可压缩约束的Lagrange乘子场的作用。

Abaqus/Standard还为多场问题提供单元。例子是用于流体扩散多孔固体分析的孔隙压力单元，耦合热传递与应力分析的热-位移耦合单元，以及耦合电传导与应力分析的压电单元。在这些多场单元中，标量变量（如温度）通常用与位移场不同的标量函数插值；即，

![](../graphics/stm_eqn02856.gif)![](../graphics/stm_eqn02857.gif)![](../graphics/stm_eqn02852.gif)![](../graphics/stm_eqn02857.gif)进行插值。
### 参考

### 参考

"Abaqus Analysis User's Guide"第27.1.1节"单元库：概述"


**校审补全说明：** 以下保留英文源文的非图片文本，用于补足本页此前过短或参考文献页中文字符过少的问题；公式和图片引用不在此重复，以上文校准后的中文正文为准。

**?????3.1.1 Element library: overview**

**?????3.1.1 Element library: overview**

The Abaqus element library provides a complete geometric modeling capability. For this reason any combination of elements can be used to make up the model. Sometimes multi-point constraints are required for application of the necessary kinematic relations to form the model (for example, to model part of a shell surface with solid elements and part with shell elements or to model a pipe elbow with a mixture of beam and shell elements).

All elements use numerical integration to allow complete generality in material behavior. Shell and beam element properties can be defined as general section behaviors, or each cross-section of the element can be integrated numerically, so that nonlinear response can be tracked accurately when needed. A composite layered section can be specified, with different materials at different heights through the section. Some special elements (such as line springs) use an approximate analytical solution to model nonlinear behavior.

All of the elements in Abaqus are formulated in a global Cartesian coordinate system except the axisymmetric elements, which are formulated in terms of *r*&#8211;*z* coordinates. In almost all elements, primary vector quantities (such as displacements  and rotations ) are defined in terms of nodal values with scalar interpolation functions. For example, in elements with a two-dimensional topology the interpolation can be written as

where the interpolation functions  are written in terms of the parametric coordinates *g* and *h*. In most element types the same parametric interpolation is used for the coordinate vector :

Such *isoparametric* elements are guaranteed to be able to represent all rigid body modes and homogeneous deformation modes exactly, a necessary condition for convergence to the exact solution as the mesh is refined.

All elements in Abaqus are integrated numerically. Hence, the virtual work integral as described in "Nonlinear solution methods in Abaqus/Standard,"  Section 2.2.1, will be replaced by a summation:

where *n* is the number of integration points in the element and  is the volume associated with integration point *i*. Abaqus will use either "full" or "reduced" integration. For full integration the number of integration points is sufficient to integrate the virtual work expression exactly, at least for linear material behavior. All triangular and tetrahedral elements in Abaqus use full integration. Reduced integration can be used for quadrilateral and hexahedral elements; in this procedure the number of integration points is sufficient to integrate exactly the contributions of the strain field that are one order less than the order of interpolation. The (incomplete) higher-order contributions to the strain field present in these elements will not be integrated.

The advantage of the reduced integration elements is that the strains and stresses are calculated at the locations that provide optimal accuracy, the so-called Barlow points ([Barlow, 1976](07s01a01-References.md)). A second advantage is that the reduced number of integration points decreases CPU time and storage requirements. The disadvantage is that the reduced integration procedure can admit deformation modes that cause no straining at the integration points. These zero-energy modes make the element rank-deficient and cause a phenomenon called "hourglassing," where the zero energy mode starts propagating through the mesh, leading to inaccurate solutions. This problem is particularly severe in first-order quadrilaterals and hexahedra. To prevent these excessive deformations, an additional artificial stiffness is added to the element. In this so-called hourglass control procedure, a small artificial stiffness is associated with the zero-energy deformation modes. This procedure is used in many of the solid and shell elements in Abaqus.

Most fully integrated solid elements are unsuitable for the analysis of (approximately) incompressible material behavior. The reason for this is that the material behavior forces the material to deform (approximately) without volume changes. Fully integrated solid element meshes, and in particular lower-order element meshes, do not allow such deformations (other than purely homogeneous deformation). For that reason Abaqus uses "selectively reduced" integration in these elements: reduced integration is used for the volume strain and full integration for the deviatoric strains. As a consequence the lower-order elements give an acceptable performance for approximately incompressible behavior. For fully incompressible material behavior, another complication occurs: the bulk modulus and, hence, the stiffness matrix becomes infinitely large. For this case a mixed (hybrid) formulation is required, where the displacement field is augmented with a hydrostatic pressure field. In this formulation only the inverse of the bulk modulus appears, and, consequently, the contribution to the operator matrix vanishes. The hydrostatic pressure field plays the role of a Lagrange multiplier field enforcing the incompressibility constraints.

Abaqus/Standard also provides elements for multifield problems. Examples are the pore pressure elements used for the analysis of porous solids with fluid diffusion, coupled temperature-displacement elements that couple heat transfer with stress analysis, and piezoelectric elements that couple electrical conduction with stress analysis. In these multifield elements the scalar variable (such as the temperature) is usually interpolated with different scalar functions as the displacement field; i.e.,

where  may differ from . The coupling of the fields will generally occur at the integration points; for example, in coupled temperature-displacement elements the coupling is due to temperature-dependent mechanical properties and heat generation is due to inelastic work. Finally, Abaqus offers a complete set of diffusion elements to analyze conductive and convective heat transfer. In these elements only temperatures appear as nodal degrees of freedom. The temperatures are interpolated with essentially the same interpolation function, , as used in the coupled temperature-displacement elements.
**?????Reference**

**?????Reference**

"Element library: overview,"  Section 27.1.1 of the Abaqus Analysis User's Guide
