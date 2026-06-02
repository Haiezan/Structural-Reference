# 4.2.1 塑性模型：一般讨论

### 4.2.1 塑性模型：一般讨论

**产品：** Abaqus/Standard  Abaqus/Explicit

增量塑性理论基于几个基本假设，这意味着Abaqus中提供的所有弹塑性响应模型（Abaqus/Standard中的变形理论模型除外，它主要用于断裂力学应用）具有相同的一般形式。模型的基本方程在本节中以其一般形式定义。

塑性模型编写为与率无关模型或与率相关模型。与率无关模型是本构响应不依赖于变形率的模型——许多金属在低温（相对于其熔点）和低应变率下的响应实际上与率无关。在与率相关模型中，响应确实依赖于材料被应变的速率。这类模型的例子包括Abaqus/Standard中提供的简单金属"蠕变"模型以及用于描述金属在较高应变率下行为的率相关塑性模型。因为这些模型具有相似的形式，它们的数值处理基于相同的技术。

弹塑性模型的一个基本假设是变形可以分成弹性部分和非弹性（塑性）部分。在其最一般形式中，这个声明写成

![](../graphics/stm_eqn05537.gif)其中![](../graphics/stm_eqn00319.gif)是总变形梯度，![](../graphics/stm_eqn00469.gif)是该点处完全可恢复的变形部分（![](../graphics/stm_eqn05538.gif)是如果变形![](../graphics/stm_eqn00319.gif)发生后，非弹性响应以某种方式被阻止，同时该点处的应力同时降至零，将发生的变形），![](../graphics/stm_eqn00456.gif)由![](../graphics/stm_eqn05539.gif)定义。该点处的刚性体旋转可以包含在![](../graphics/stm_eqn00469.gif)或![](../graphics/stm_eqn00456.gif)的定义中，或者可以在这两个部分分解之前或之后单独考虑：这除了在写变形部分的基础的便利性方面有差异外，没有区别。

这个分解可以直接用于制定塑性模型。从历史上看，加法应变率分解，

![](../graphics/stm_eqn05540.gif)已被用来代替。这里![](../graphics/stm_eqn00118.gif)总（机械）应变率，![](../graphics/stm_eqn05527.gif)弹性应变率，![](../graphics/stm_eqn05528.gif)塑性应变率。

在"应变率的加法分解，"第1.4.4节中显示，当弹性应变无穷小（与单位相比可忽略）时，并且当[公式4.2.1-2](04s02a101.md)中使用的应变率度量是变形率时，[公式4.2.1-2](04s02a101.md)是[公式4.2.1-1](04s02a101.md)的一致近似。

![](../graphics/stm_eqn05541.gif)[公式4.2.1-2](04s02a101.md)，使用变形率作为总应变率的定义，用于Abaqus中实现的所有塑性模型。Rice的论证意味着在这些问题中使用这些模型时，弹性响应必须始终很小。在实践中是这样的：塑性模型为金属、土壤、聚合物、可压碎泡沫和混凝土提供；并且在每种这些材料中，弹性应变很可能永远不会大于几个百分点（即使这在金属中也是相当不寻常的）。因此，使用[公式4.2.1-2](04s02a101.md)对于所讨论的模型似乎从正式角度来说不是不可接受的。然而，需要为其弹性应变和非弹性应变都可能很大的不同材料模型开发用户子程序UMAT或VUMAT的用户应考虑直接使用[公式4.2.1-1](04s02a101.md)。

响应的弹性部分假定可以从弹性应变能密度势推导，因此应力定义为

![](../graphics/stm_eqn05542.gif)其中*U*是应变能密度势。因为我们假设，在没有塑性应变的情况下，弹性应变的变化与变形率的变化相同，共轭论证将应力度量![](../graphics/stm_eqn00033.gif)定义为"真实"（Cauchy）应力。Abaqus中的所有应力输出都以这种形式给出。

在一些材料中，弹性响应本质上是不可压缩的。但对于Abaqus中考虑其非弹性变形的材料来说通常不是这种情况，因此[公式4.2.1-3](04s02a101.md)可以被认为完全定义应力。然而，非弹性响应通常假定为近似不可压缩（例如，在金属中，或者在发生大塑性流动的土壤中），因此用户必须注意确保所选单元能够在模型为三维、平面应变或轴对称时不表现出"锁定"问题地容纳不可压缩响应。这需要使用杂交或完全或选择性减缩积分单元。

对于Abaqus中提供的几种塑性模型，弹性是线性的，因此应变能密度势具有非常简单的形式。对于土壤模型，体积弹性应变与等效压力应力的对数成正比。对于混凝土模型，使用受损弹性来解释混凝土开裂后的裂缝张开：在那种情况下，弹性模型更复杂。

Abaqus中的与率无关塑性模型和一个与率相关模型都具有纯弹性响应的区域。屈服函数*f*定义纯弹性响应区域的极限，写成

![](../graphics/stm_eqn05543.gif)对于纯弹性响应。这里![](../graphics/stm_eqn01111.gif)温度，![](../graphics/stm_eqn01522.gif)![](../graphics/stm_eqn00904.gif)简单地引入以表示可能有几个硬化参数，![](../graphics/stm_eqn01522.gif)![](../graphics/stm_eqn00904.gif)范围在定义特定塑性模型之前不指定。硬化参数是状态变量，引入它们是为了使模型能够描述真实材料非弹性响应的一些复杂性。在最简单的塑性模型（完美塑性）中，屈服面作为极限面，根本没有硬化参数：模型的任何部分在变形过程中都不演化。复杂塑性模型通常包含大量硬化参数。Abaqus中提供的模型通常不是最复杂的模型，只使用少数此类参数（各向同性硬化金属模型和Cam-clay模型中只使用一个；简单运动硬化模型中使用六个）。

在Abaqus的混凝土和关节材料塑性模型中，屈服行为用几个独立的非弹性流动系统建模。对于这种情况，[公式4.2.1-4](04s02a101.md)推广为

![](../graphics/stm_eqn05544.gif)对于系统*i*中的纯弹性响应，其中![](../graphics/stm_eqn05545.gif)屈服函数之一，![](../graphics/stm_eqn05546.gif)第*i*个系统的硬化参数。为了一般性，在讨论中我们假设模型使用这种独立屈服函数系统。在具有单个屈服函数的较简单系统中，*i*只能取值1。

在率无关塑性模型中，导致屈服函数具有正值的应力状态不可能发生，尽管在率相关模型中这是可能的。因此，在率无关模型中，我们有屈服约束

![](../graphics/stm_eqn05547.gif)在非弹性流动期间。

当材料非弹性流动时，变形的非弹性部分由流动规则定义，我们可以写成

![](../graphics/stm_eqn05548.gif)其中![](../graphics/stm_eqn05549.gif)第*i*个系统的流动势，![](../graphics/stm_eqn05550.gif)时间变化率![](../graphics/stm_eqn05551.gif)变化率——对于率相关模型，或者是标量测量第*i*个系统上塑性流动率的量，其值由要求满足一致性条件![](../graphics/stm_eqn05552.gif)定——对于率无关模型的塑性流动。求和仅针对主动屈服的系统：![](../graphics/stm_eqn05553.gif)于那些有![](../graphics/stm_eqn05554.gif)系统。

![](../graphics/stm_eqn05555.gif)上面写的流动规则形式假设在第*i*个系统中有单个流动势，更一般的塑性模型在一个点处可能有几个主动流动势。例如，这就是Abaqus中内置的混凝土和关节材料模型的情况。

对于一些率无关塑性模型，流动方向与屈服面外法线方向相同：

![](../graphics/stm_eqn05556.gif)其中![](../graphics/stm_eqn05557.gif)![](../graphics/stm_eqn05558.gif)其中![](../graphics/stm_eqn05559.gif)![](../graphics/stm_eqn05546.gif)（率形式）硬化律。在复杂塑性模型中——例如，用于高温应用金属的循环行为描述的模型——这些演化律具有复杂形式，因为需要匹配实验观察到的行为。Abaqus中提供的塑性模型使用简单的演化方程：各向同性硬化、Prager-Ziegler运动硬化以及Cam-clay模型中等效压力应力轴上屈服面中心的位置。[公式4.2.1-6](04s02a101.md)中假设隐含了由下标*i*表示的屈服系统的独立性，即![](../graphics/stm_eqn05546.gif)演化仅依赖于同一（*i*个）系统中的其他硬化参数，![](../graphics/stm_eqn05560.gif)

[公式4.2.1-1](04s02a101.md)到[公式4.2.1-6](04s02a101.md)定义了Abaqus中所有塑性模型的一般结构。由于流动规则和硬化演化规则以率形式编写，它们必须被积分。积分的一般技术在"塑性模型的积分，"第4.2.2节中讨论。紧随该讨论之后的章节描述了Abaqus中提供的特定塑性模型的细节。
### 参考

### 参考

"Inelastic behavior," Section 23.1.1 of the Abaqus Analysis User's Guide


**校审补全说明：** 以下保留英文源文的非图片文本，用于补足本页此前过短或参考文献页中文字符过少的问题；公式和图片引用不在此重复，以上文校准后的中文正文为准。

**?????4.2.1 Plasticity models: general discussion**

**?????4.2.1 Plasticity models: general discussion**

**Products: **Abaqus/Standard  Abaqus/Explicit

Incremental plasticity theory is based on a few fundamental postulates, which means that all of the elastic-plastic response models provided in Abaqus (except the deformation theory model in Abaqus/Standard, which is primarily provided for fracture mechanics applications) have the same general form. The basic equations of the models are defined in their general form in this section.

Plasticity models are written as rate-independent models or as rate-dependent models. A rate-independent model is one in which the constitutive response does not depend on the rate of deformation---the response of many metals at low temperatures relative to their melting temperature and at low strain rates is effectively rate independent. In a rate-dependent model the response does depend on the rate at which the material is strained. Examples of such models are the simple metal "creep" models provided in Abaqus/Standard and the rate-dependent plasticity model that is used to describe the behavior of metals at higher strain rates. Because these models have similar forms, their numerical treatment is based on the same technique.

A basic assumption of elastic-plastic models is that the deformation can be divided into an elastic part and an inelastic (plastic) part. In its most general form this statement is written as

where  is the total deformation gradient,  is the fully recoverable part of the deformation at the point under consideration ( is the deformation that would occur if, after the deformation , inelastic response were somehow prevented but at the same time the stress at the point reduced to zero), and  is defined by . The rigid body rotation at the point can be included in the definition of either  or  or can be considered separately before or after either part of the decomposition: this makes no difference except in the convenience of the basis for writing the parts of the deformation.

This decomposition can be used directly to formulate the plasticity model. Historically, an additive strain rate decomposition,

has been used in its place. Here  is the total (mechanical) strain rate,  is the elastic strain rate, and  is the plastic strain rate.

It is shown in "The additive strain rate decomposition,"  Section 1.4.4, that [Equation 4.2.1&#8211;2](04s02a101.md) is a consistent approximation to [Equation 4.2.1&#8211;1](04s02a101.md) when the elastic strains are infinitesimal (negligible compared to unity) and when the strain rate measure used in [Equation 4.2.1&#8211;2](04s02a101.md) is the rate of deformation:

[Equation 4.2.1&#8211;2](04s02a101.md), with the rate of deformation used as the definition of total strain rate, is used in all of the plasticity models that are implemented in Abaqus. Rice's argument implies that the elastic response must always be small in problems in which these models are used. In practice this is the case: plasticity models are provided for metals, soils, polymers, crushable foams, and concrete; and in each of these materials it is very unlikely that the elastic strain would ever be larger than a few percent (and even this would be quite unusual in a metal). Thus, the use of [Equation 4.2.1&#8211;2](04s02a101.md) does not appear to be objectionable for the models in question, at least from a formal point of view. However, the user who needs to develop user subroutine UMAT or VUMAT for a different material model in which the elastic strains and the inelastic strains may both be large should consider using [Equation 4.2.1&#8211;1](04s02a101.md) directly.

The elastic part of the response is assumed to be derivable from an elastic strain energy density potential, so the stress is defined by

where *U* is the strain energy density potential. Since we assume that, in the absence of plastic straining, the variation of elastic strain is the same as the variation in the rate of deformation, conjugacy arguments define the stress measure  as the "true" (Cauchy) stress. All stress output in Abaqus is given in this form.

In some materials the elastic response is essentially incompressible. But this is not usually the case for the materials whose inelastic deformation is considered with the models provided in Abaqus, so [Equation 4.2.1&#8211;3](04s02a101.md) can be taken to define the stress completely. However, the inelastic response is often assumed to be approximately incompressible (in metals, for example, or in soils undergoing large plastic flows), so the user must be careful to ensure that the elements chosen can accommodate incompressible response without exhibiting "locking" problems when the model is three-dimensional, plane strain, or axisymmetric. This requires the use of hybrid or fully or selectively reduced-integration elements.

For several of the plasticity models provided in Abaqus the elasticity is linear, so the strain energy density potential has a very simple form. For the soils model the volumetric elastic strain is proportional to the logarithm of the equivalent pressure stress. For the concrete model damaged elasticity is used to account for the crack opening after the concrete has cracked: in that case the elasticity model is more complex.

The rate-independent plasticity models in Abaqus and one of the rate-dependent models all have a region of purely elastic response. The yield function, *f*, defines the limit to this region of purely elastic response and is written so that

for purely elastic response. Here  is the temperature, and  are a set of hardening parameters. The subscript  is introduced simply to indicate that there may be several hardening parameters, : the range of  is not specified until we define a particular plasticity model. The hardening parameters are state variables that are introduced to allow the models to describe some of the complexity of the inelastic response of real materials. In the simplest plasticity model ("perfect plasticity") the yield surface acts as a limit surface and there are no hardening parameters at all: no part of the model evolves during the deformation. Complex plasticity models usually include a large number of hardening parameters. The models provided in Abaqus are generally not the most complex models and use only a few such parameters (only one is used in the isotropic hardening metal model and in the Cam-clay model; six are used in the simple kinematic hardening model).

In the concrete and the jointed material plasticity models in Abaqus the yield behavior is modeled with several independent inelastic flow systems. For this case [Equation 4.2.1&#8211;4](04s02a101.md) is generalized to

for purely elastic response in system *i*, where  is one of the yield functions and  are the hardening parameters for the *i*th system. For generality in this discussion we assume the model uses such a system of independent yield functions. In the simpler systems with a single yield function *i* can only take the value 1.

Stress states that cause the yield function to have a positive value cannot occur in rate-independent plasticity models, although this is possible in a rate-dependent model. Thus, in the rate-independent models we have the yield constraints

during inelastic flow.

When the material is flowing inelastically the inelastic part of the deformation is defined by the flow rule, which we can write as

where  is the flow potential for the *i*th system and  is the rate of change of time, , for a rate-dependent model or is a scalar measuring the amount of the plastic flow rate on the *i*th system, whose value is determined by the requirement to satisfy the consistency condition , for plastic flow of a rate-independent model. The summation is over only the actively yielding systems:  for those systems for which .

The form in which the flow rule is written above assumes that there is a single flow potential, , in the *i*th system. More general plasticity models might have several active flow potentials at a point. This is, for instance, the case in the concrete and jointed material models built into Abaqus.

For some rate-independent plasticity models the direction of flow is the same as the direction of the outward normal to the yield surface:

where  is a scalar. Such models are called "associated flow" plasticity models. Associated flow models are useful for materials in which dislocation motion provides the fundamental mechanisms of plastic flow when there are no sudden changes in the direction of the plastic strain rate at a point. They are generally not accurate for materials in which the inelastic deformation is primarily caused by frictional mechanisms. The metal plasticity models in Abaqus (except cast iron) and the Cam-clay soil model use associated flow. The cast iron, granular/polymer, crushable foam, Mohr-Coulomb, Drucker-Prager/Cap, and jointed material models provide nonassociated flow with respect to volumetric straining and equivalent pressure stress. The concrete model uses associated flow.

The rate form of the flow rule is essential to incremental plasticity theory, because it allows the history dependence of the response to be modeled.

The final ingredient in plasticity models is the set of evolution equations for the hardening parameters. We write these equations as

where  is the (rate form) hardening law for . In complex plasticity models---for example, models used to describe the cyclic behavior of metals used for high temperature applications---these evolution laws have complicated forms, since such complexity is required to match the experimentally observed behavior. The plasticity models offered in Abaqus use simple evolution equations: isotropic hardening, Prager-Ziegler kinematic hardening, and the location of the center of the yield surface along the equivalent pressure stress axis in the Cam-clay model. The independence of the yield systems designated by the subscript *i* is implicit in the assumption in [Equation 4.2.1&#8211;6](04s02a101.md) above that the evolution of the  depends only on other hardening parameters, , in the same (*i*th) system.

[Equation 4.2.1&#8211;1](04s02a101.md) to [Equation 4.2.1&#8211;6](04s02a101.md) define the general structure of all of the plasticity models in Abaqus. Since the flow rule and the hardening evolution rules are written in rate form, they must be integrated. The general technique of integration is discussed in "Integration of plasticity models,"  Section 4.2.2. The sections immediately following that discussion describe the details of the specific plasticity models that are provided in Abaqus.
**?????Reference**

**?????Reference**

"Inelastic behavior,"  Section 23.1.1 of the Abaqus Analysis User's Guide
