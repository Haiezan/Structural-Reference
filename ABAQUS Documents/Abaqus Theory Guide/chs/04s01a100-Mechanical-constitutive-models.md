# 4.1.1 机械本构模型

### 4.1.1 机械本构模型

**产品：** Abaqus/Standard  Abaqus/Explicit

在应力分析问题中会遇到各种各样的材料，对于任何一种材料，都有多种本构模型可用于描述材料的行为。例如，标准结构钢制成的部件可以建模为各向同性、线性弹性材料，没有温度依赖性。这个简单的模型可能足以用于常规设计，只要部件不在任何关键情况下。然而，如果部件可能受到严重过载，确定它如何在该载荷下变形以及它是否有足够的延展性在不发生灾难性故障的情况下承受过载是很重要的。第一个问题可以通过将材料建模为与率无关的弹性、完全塑性材料来回答，或者——如果材料试件拉伸试验中的极限应力远高于初始屈服应力——可以在塑性模型中包含各向同性加工硬化。然后进行非线性分析（是否考虑几何非线性，取决于分析者判断结构是否可能在事件期间屈曲或发生大的几何变化）以确定响应。但是，严重过载可能突然施加，从而导致材料的快速应变。在这种情况下，金属的非弹性响应通常表现出率相关性：流动应力随应变率增加而增加。因此，可能需要"粘塑性"（率相关）材料模型。（论证忽略这种效应是保守的，因为它是强化效应，这不一定是可以接受的——结构某部分的强化可能导致载荷转移到另一部分，事实证明在事件中该部分较弱。）到目前为止，分析者可以使用相对简单（但非线性）的本构模型。但如果失效与局部化相关——材料片的撕裂或塑性屈曲——则可能需要更复杂的材料模型，因为这种局部化依赖于通常因其复杂性而被忽略的本构行为的细节（见，例如，[Needleman，1977](07s01a01-References.md)）。或者，如果关注的不是整体过载，而是由于高温蠕变或低周疲劳导致的部件逐渐失效，或者可能是这些效应的组合，那么必须预测在每循环中可能发生少量非弹性变形的多次加载循环中材料的响应：这种情况下我们需要建模材料响应更多的细节。

到目前为止，讨论考虑了传统结构材料。我们可以将感兴趣的材料大致分类为：表现出几乎纯弹性响应的材料，可能在快速加载期间通过粘弹性响应有一些能量耗散（ elastomers，如橡胶或固体推进剂）；屈服并在屈服后表现出相当大延展性的材料（如软钢和其他常用金属、低应变率下的冰、粘土）；通过颗粒重排流动的材料，这些颗粒通常通过某种主要摩擦机制相互作用（如沙子）；脆性材料（岩石、混凝土、陶瓷）。Abaqus中提供的本构库包含所有这些材料类别的线性和非线性材料模型。一般来说，该库的开发目的是提供实际应用中最常需要的那些模型。库中有几种不同的模型；对于更常遇到的材料（特别是金属），提供了几种建模材料的方法，每种适用于特定类型的分析应用。但该库远非全面的：物理材料行为的范围太广，无法做到这一点。分析者必须在每个特定应用的背景下审查Abaqus中提供的材料定义。如果库中没有对特定情况有用的模型，Abaqus/Standard包含一个用户子程序——UMAT——类似地，Abaqus/Explicit包含一个用户子程序——VUMAT。在这些程序中，用户可以编码材料模型（或调用执行该任务的其他程序）。对于能够应对编程复杂材料模型要求的成熟分析者来说，这个"用户子程序"能力是一个强大的资源。

Abaqus中提供的材料模型的 Theoretical aspects在本章中描述，旨在作为所提供材料模型细节的定义：它还为可能需要在UMAT或VUMAT中编码自己模型的分析者提供了有用的指导。

从数值角度来看，本构模型的实现涉及在非线性分析期间在积分点上对材料状态进行时间增量的积分。（Abaqus中本构模型的实现假设材料行为完全由局部效应定义，因此每个空间积分点可以独立处理。）由于Abaqus/Standard最常用于隐式时间积分，实现还必须提供一个准确的"材料刚度矩阵"用于形成非线性平衡方程的Jacobian矩阵；对于Abaqus/Explicit则不需要。

Abaqus中提供的机械本构模型通常考虑弹性和非弹性响应。非弹性响应最常用塑性模型建模。本章描述了几种塑性模型。Abaqus中的一些本构模型也使用损伤力学概念，区别在于：在塑性理论中，弹性不受非弹性变形的影响（金属试件的杨氏模量在加载超过屈服时不会改变，直到试件非常接近失效），而损伤模型包括由严重加载引起的弹性退化（如混凝土试件在大单轴压缩加载后遭受的弹性刚度损失）。

在Abaqus提供的非弹性响应模型中，弹性和非弹性响应通过将变形分离为可恢复（弹性）和不可恢复（非弹性）部分来区分。这种分离基于应变率之间存在加法关系的假设：

![](../graphics/stm_eqn05526.gif)其中![](../graphics/stm_eqn00118.gif)是总应变率，![](../graphics/stm_eqn05527.gif)是弹性应变率的变化率，![](../graphics/stm_eqn05528.gif)非弹性应变率的变化率。

更一般的假设是总变形![](../graphics/stm_eqn00319.gif)由非弹性变形然后是纯弹性变形组成（刚性体旋转在任何阶段加入）：

![](../graphics/stm_eqn05529.gif)

在"应变率的加法分解，"第1.4.4节中，讨论了[公式4.1.1-1](04s01a100.md)是[公式4.1.1-2](04s01a100.md)的合法近似的条件。我们得出结论，如果

[公式4.1.1-1](04s01a100.md)中使用的总应变率度量是变形率：

![](../graphics/stm_eqn05530.gif)其中![](../graphics/stm_eqn00427.gif)是速度，![](../graphics/stm_eqn00117.gif)材料点当前的空间位置；和

弹性应变很小，则近似是一致的。Abaqus因此在有限应变问题中使用变形率作为应变率度量。（不同应变度量之间的区别仅在应变与单位相比不可忽略时才有意义；即，在有限应变问题中。）对于许多实际感兴趣的材料，弹性应变始终很小；例如，金属的屈服应力通常比其弹性模量小三个数量级，意味着弹性应变约为![](../graphics/stm_eqn05531.gif)。然而，一些材料（如聚合物）可以发生大的弹性应变并也能非弹性流动，在这种情况下，应变率的加法分解不再是的一致近似。

Abaqus提供了各种弹性响应模型。最简单的是线性弹性：

![](../graphics/stm_eqn05532.gif)其中![](../graphics/stm_eqn05533.gif)是一个可能依赖于温度但不依赖于变形的矩阵（除非在损伤模型中引入这种依赖性）。这个弹性模型旨在用于小应变问题或用于弹性应变始终很小的弹塑性模型中建模弹性。

弹性行为类型的扩展是 hypoelastic 模型：

![](../graphics/stm_eqn05534.gif)其中现在![](../graphics/stm_eqn05533.gif)可能依赖于变形。在这种情况下，弹性可以是非线性的，但Abaqus中的实现仍然假设弹性应变始终很小。在多孔和粒状介质中，弹性性质强烈依赖于体积应变；多孔弹性行为在"多孔弹性，"第4.4.1节中描述。

最一般的非线性弹性行为类型是超弹性模型，其中我们假设存在应变能密度势——*U*——从该势定义应力（如果材料是完全不可压的，则在一个静水应力值内）通过

![](../graphics/stm_eqn05535.gif)其中![](../graphics/stm_eqn00033.gif)和![](../graphics/stm_eqn00399.gif)是任意功共轭应力和应变度量。这种弹性模型形式通常用于建模 elastomers：材料对大变形的长期响应是完全可恢复的（弹性）。Abaqus中提供的超弹性建模在"大应变弹性，"第4.6节中描述。超弹性模型不能与程序中的塑性变形模型一起使用，但可以与粘弹性行为结合，如"有限应变粘弹性，"第4.8.2节所述。

Abaqus中提供的塑性模型在"塑性概述，"第4.2节中以一般术语讨论。提供了与率无关和率相关模型，有或没有屈服面。程序中包含的模型旨在用于金属应用（"金属塑性，"第4.3节）以及一些非金属材料如土壤、聚合物和可压碎泡沫（"非金属塑性，"第4.4节）。关节材料模型（"关节材料本构模型，"第4.5.4节）和混凝土模型（"混凝土的非弹性本构模型，"第4.5.1节）也包括塑性建模。

Abaqus中的本构程序存在于一个库中，可以被任何实体或结构单元访问。这种访问在每个"本构计算点"独立进行。这些点是单元中的数值积分点。因此，本构程序仅涉及单个计算点的计算。单元提供该点处问题运动学解的估计。这些运动学数据作为变形梯度——![](../graphics/stm_eqn00319.gif)——传递给本构程序，或者更典型地，作为应变和旋转增量——![](../graphics/stm_eqn00432.gif)和![](../graphics/stm_eqn00433.gif)——传递。本构程序从"材料点数据库"获取增量开始时考虑点的状态。状态变量包括应力和本构模型使用的任何状态变量——例如，塑性应变。本构程序还查找本构定义。然后它们的功能是更新状态到增量结束，如果过程使用隐式时间积分并且如果使用Newton方法求解方程，则定义Jacobian矩阵的材料贡献，![](../graphics/stm_eqn05536.gif)。对于以率形式定义因此需要积分的材料模型（如增量塑性模型），这个Jacobian贡献取决于模型以及用于模型的积分方法。因此，其推导在定义此类模型的章节中详细讨论。
### 参考

### 参考

"Material library: overview," Section 21.1.1 of the Abaqus Analysis User's Guide


**校审补全说明：** 以下保留英文源文的非图片文本，用于补足本页此前过短或参考文献页中文字符过少的问题；公式和图片引用不在此重复，以上文校准后的中文正文为准。

**?????4.1.1 Mechanical constitutive models**

**?????4.1.1 Mechanical constitutive models**

**Products: **Abaqus/Standard  Abaqus/Explicit

A wide variety of materials is encountered in stress analysis problems, and for any one of these materials a range of constitutive models is available to describe the material's behavior. For example, a component made from a standard structural steel can be modeled as an isotropic, linear elastic, material with no temperature dependence. This simple model would probably suffice for routine design, so long as the component is not in any critical situation. However, if the component might be subjected to a severe overload, it is important to determine how it might deform under that load and if it has sufficient ductility to withstand the overload without catastrophic failure. The first of these questions might be answered by modeling the material as a rate-independent elastic, perfectly plastic material, or---if the ultimate stress in a tension test of a specimen of the material is very much above the initial yield stress---isotropic work hardening might be included in the plasticity model. A nonlinear analysis (with or without consideration of geometric nonlinearity, depending on whether the analyst judges that the structure might buckle or undergo large geometry changes during the event) is then done to determine the response. But the severe overload might be applied suddenly, thus causing rapid straining of the material. In such circumstances the inelastic response of metals usually exhibits rate dependence: the flow stress increases as the strain rate increases. A "viscoplastic" (rate-dependent) material model might, therefore, be required. (Arguing that it is conservative to ignore this effect because it is a strengthening effect is not necessarily acceptable---the strengthening of one part of a structure might cause load to be shed to another part, which proves to be weaker in the event.) So far the analyst can manage with relatively simple (but nonlinear) constitutive models. But if the failure is associated with localization---tearing of a sheet of material or plastic buckling---a more sophisticated material model might be required because such localizations depend on details of the constitutive behavior that are usually ignored because of their complexity (see, for example, [Needleman, 1977](07s01a01-References.md)). Or if the concern is not gross overload, but gradual failure of the component because of creep at high temperature or because of low-cycle fatigue, or perhaps a combination of these effects, then the response of the material during several cycles of loading, in each of which a small amount of inelastic deformation might occur, must be predicted: a circumstance in which we need to model much more of the detail of the material's response.

So far the discussion has considered a conventional structural material. We can broadly classify the materials of interest as those that exhibit almost purely elastic response, possibly with some energy dissipation during rapid loading by viscoelastic response (the elastomers, such as rubber or solid propellant); materials that yield and exhibit considerable ductility beyond yield (such as mild steel and other commonly used metals, ice at low strain rates, and clay); materials that flow by rearrangement of particles that interact generally through some dominantly frictional mechanism (such as sand); and brittle materials (rocks, concrete, ceramics). The constitutive library provided in Abaqus contains a range of linear and nonlinear material models for all of these categories of materials. In general the library has been developed to provide those models that are most usually required for practical applications. There are several distinct models in the library; and for the more commonly encountered materials (metals, in particular), several ways of modeling the material are provided, each suitable to a particular type of analysis application. But the library is far from comprehensive: the range of physical material behavior is far too broad for this ever to be possible. The analyst must review the material definitions provided in Abaqus in the context of each particular application. If there is no model in the library that is useful for a particular case, Abaqus/Standard contains a user subroutine---UMAT---and, similarly, Abaqus/Explicit contains a user subroutine---VUMAT. In these routines the user can code a material model (or call other routines that perform that task). This "user subroutine" capability is a powerful resource for the sophisticated analyst who is able to cope with the demands of programming a complex material model.

Theoretical aspects of the material models that are provided in Abaqus are described in this chapter, which is intended as a definition of the details of the material models that are provided: it also provides useful guidance to analysts who might have to code their own models in UMAT or VUMAT.

From a numerical viewpoint the implementation of a constitutive model involves the integration of the state of the material at an integration point over a time increment during a nonlinear analysis. (The implementation of constitutive models in Abaqus assumes that the material behavior is entirely defined by local effects, so each spatial integration point can be treated independently.) Since Abaqus/Standard is most commonly used with implicit time integration, the implementation must also provide an accurate "material stiffness matrix" for use in forming the Jacobian of the nonlinear equilibrium equations; this is not necessary for Abaqus/Explicit.

The mechanical constitutive models that are provided in Abaqus often consider elastic and inelastic response. The inelastic response is most commonly modeled with plasticity models. Several plasticity models are described in this chapter. Some of the constitutive models in Abaqus also use damage mechanics concepts, the distinction being that in plasticity theory the elasticity is not affected by the inelastic deformation (the Young's modulus of a metal specimen is not changed by loading it beyond yield, until the specimen is very close to failure), while damage models include the degradation of the elasticity caused by severe loading (such as the loss of elastic stiffness suffered by a concrete specimen after it has been subjected to large uniaxial compressive loading).

In the inelastic response models that are provided in Abaqus, the elastic and inelastic responses are distinguished by separating the deformation into recoverable (elastic) and nonrecoverable (inelastic) parts. This separation is based on the assumption that there is an additive relationship between strain rates:

where  is the total strain rate,  is the rate of change of the elastic strain, and  is the rate of change of inelastic strain.

A more general assumption is that the total deformation, , is made up of inelastic deformation followed by purely elastic deformation (with the rigid body rotation added in at any stage in the process):



In "The additive strain rate decomposition,"  Section 1.4.4, the circumstances are discussed under which [Equation 4.1.1&#8211;1](04s01a100.md) is a legitimate approximation to [Equation 4.1.1&#8211;2](04s01a100.md). We conclude that, if

the total strain rate measure used in [Equation 4.1.1&#8211;1](04s01a100.md) is the rate of deformation:

where  is the velocity and  is the current spatial position of a material point; and

the elastic strains are small, then the approximation is consistent. Abaqus uses the rate of deformation as the strain rate measure in finite-strain problems for this reason. (The distinction between different strain measures matters only when the strains are not negligible compared to unity; that is, in finite-strain problems.) The elastic strains always remain small for many materials of practical interest; for example, the yield stress of a metal is typically three orders of magnitude smaller than its elastic modulus, implying elastic strains of order . However, some materials (polymers, for example) can undergo large elastic straining and also flow inelastically, in which case the additive strain rate decomposition is no longer a consistent approximation.

Various elastic response models are provided in Abaqus. The simplest of these is linear elasticity:

where  is a matrix that may depend on temperature but does not depend on the deformation (except when such dependency is introduced in damage models). This elasticity model is intended to be used for small-strain problems or to model the elasticity in an elastic-plastic model in which the elastic strains are always small.

An extension of the elastic type of behavior is the hypoelastic model:

where now  may depend on the deformation. In this case the elasticity may be nonlinear, but the implementation in Abaqus still assumes that the elastic strains will always be small. In porous and granular media, the elastic properties are strongly dependent on the volume strain; porous elastic behavior is described in "Porous elasticity,"  Section 4.4.1.

The most general type of nonlinear elastic behavior is the hyperelastic model, in which we assume that there is a strain energy density potential---*U*---from which the stresses are defined (to within a hydrostatic stress value if the material is fully incompressible) by

where  and  are any work conjugate stress and strain measures. This form of elasticity model is generally used to model elastomers: materials whose long-term response to large deformations is fully recoverable (elastic). The hyperelasticity modeling provided in Abaqus is described in "Large-strain elasticity,"  Section 4.6. The hyperelasticity models cannot be used with the plastic deformation models in the program, but can be combined with viscoelastic behavior, as described in "Finite-strain viscoelasticity,"  Section 4.8.2.

The plasticity models offered in Abaqus are discussed in general terms in "Plasticity overview,"  Section 4.2. Both rate-independent and rate-dependent models, with and without yield surfaces, are offered. Models are included in the program that are intended for applications to metals ("Metal plasticity,"  Section 4.3) as well as some nonmetallic materials such as soils, polymers, and crushable foams ("Plasticity for non-metals,"  Section 4.4). The jointed material model ("Constitutive model for jointed materials,"  Section 4.5.4) and the concrete model ("An inelastic constitutive model for concrete,"  Section 4.5.1) also include plasticity modeling.

The constitutive routines in Abaqus exist in a library that can be accessed by any of the solid or structural elements. This access is made independently at each "constitutive calculation point." These points are the numerical integration points in the elements. Thus, the constitutive routines are concerned only with a single calculation point. The element provides an estimate of the kinematic solution to the problem at the point under consideration. These kinematic data are passed to the constitutive routines as the deformation gradient------or, more typically, as the strain and rotation increments--- and . The constitutive routines obtain the state at the point under consideration at the start of the increment from the "material point data base." The state variables include the stress and any state variables used in the constitutive models---plastic strains, for example. The constitutive routines also look up the constitutive definition. Their function then is to update the state to the end of the increment and, if the procedure uses implicit time integration and if Newton's method is being used to solve the equations, to define the material contribution to the Jacobian matrix, . For material models that are defined in rate form and, therefore, require integration (such as incremental plasticity models), this Jacobian contribution depends on the model and also on the integration method used for the model. Its derivation is, therefore, discussed in some detail in the sections that define such models.
**?????Reference**

**?????Reference**

"Material library: overview,"  Section 21.1.1 of the Abaqus Analysis User's Guide
