# 4.5.3 混凝土和其他脆性材料的裂缝模型

### 4.5.3 混凝土和其他脆性材料的裂缝模型

**产品：** Abaqus/Explicit

本节描述Abaqus/Explicit中为混凝土和其他脆性材料提供的裂缝本构模型。Abaqus的材料库还包括用于混凝土的本构模型，基于标量塑性损伤理论，如"混凝土和其他准脆性材料的损伤塑性模型，"第4.5.2节所述，该模型在Abaqus/Standard和Abaqus/Explicit中都可用。在Abaqus/Standard中，素混凝土也可以用"混凝土的非弹性本构模型，"第4.5.1节中描述的 smeared crack 混凝土模型进行分析。虽然这个脆性裂缝模型对其他材料（如陶瓷和脆性岩石）也可能有用，但它主要用于建模素混凝土。因此，在本节余下部分，使用混凝土的物理行为来说明本构模型的不同方面。

Abaqus中的钢筋混凝土建模通过结合使用此素混凝土裂缝模型的标准单元与"钢筋单元"——钢筋，单独定义或嵌入定向表面，使用一维应变理论，可用于模拟钢筋本身。钢筋单元叠加在素混凝土单元的网格上，与描述钢筋材料行为的标准金属塑性模型一起使用。这种建模方法允许混凝土行为独立于钢筋考虑，因此本节仅讨论素混凝土裂缝模型。钢筋/混凝土界面相关的影响，如粘结滑移和销钉作用，在此方法中不能考虑，除非修改素混凝土行为的某些方面来模拟它们（如使用"拉伸刚化"来模拟通过钢筋的裂缝间载荷传递）。

普遍认为混凝土表现出两种主要行为模式：一种是脆性模式，其中微裂缝聚合形成代表高度局部化变形区域的离散宏裂缝；另一种是延性模式，其中微裂缝或多或少均匀地遍布材料发展，导致非局部化变形。脆性行为与在拉伸和拉-压应力状态下观察到的解理、剪切和混合模式断裂机制相关。它几乎总是涉及材料的软化。延性行为与主要在压缩应力状态下观察到的分布式微裂缝机制相关。它几乎总是涉及材料的硬化，尽管在低约束压力下后续可能软化。这里描述的裂缝模型仅建模混凝土行为的脆性方面。虽然这是一个重大简化，但有许多应用中只有混凝土的脆性行为是重要的；因此，在这些情况下，假定材料在压缩中是线弹性是合理的。
### Smeared裂缝假设

选择 smeared 模型来表示不连续的宏裂缝脆性行为。在这种方法是，我们不追踪单个"宏"裂缝：相反，裂缝的存在通过裂缝影响与每个材料计算点相关的应力和材料刚度的方式进入计算。

为简化起见，这里使用术语"裂缝"表示在所考虑的材料计算点检测到裂缝的方向。最接近的物理概念是在该点存在连续体微裂缝，方向由模型确定。裂缝引入的各向异性包括在模型中，因为假定它在模型适用的模拟中是重要的。

人们对 smeared crack 模型提出了一些反对意见。主要关注点是这种建模方法固有地在解中引入网格敏感性，从有限元结果不会收敛到唯一结果的意义上来说。例如，由于裂缝与应变软化相关，网格细化将导致更窄的裂缝带。许多研究人员已经解决了这个关注点，普遍共识是[Hillerborg（1976）](07s01a01-References.md)的方法——基于脆性断裂概念——对于实际目的是足够的。引入了一个长度尺度，通常以"特征"长度的形式，来"调节" smeared 连续体模型并衰减结果对网格密度的敏感性。该模型的这个方面在下面详细讨论。
### 裂缝方向假设

 various researchers已经提出了三种基本的裂缝方向模型（[Rots和Blaauwendraad，1989](07s01a01-References.md)）：固定正交裂缝；旋转裂缝模型；和固定多方向（非正交）裂缝。在固定正交裂缝模型中，第一个裂缝的法线方向与裂缝萌发时最大拉伸主应力的方向对齐。该模型记住这个裂缝方向，后续在所考虑的点形成的裂缝只能在与第一个裂缝正交的方向上形成。在旋转裂缝概念中，任何点只能形成一个裂缝（与最大拉伸主应力方向对齐）。因此，单个裂缝方向随主应力轴的方向旋转。该模型没有裂缝方向记忆。最后，多方向裂缝模型允许在主应力轴方向随加载变化时在一点形成任意数量的裂缝。在实践中，对允许在一点形成的裂缝数量有一些限制。该模型记住所有裂缝方向。

多方向裂缝模型最不受欢迎，主要是因为用于决定后续裂缝何时形成的标准（限制一点裂缝数量）是有些任意的：引入了"阈值角"的概念以防止新裂缝以小于此阈值角的角度向现有裂缝形成。固定正交和旋转裂缝模型都被广泛使用，尽管可以对两者提出反对意见。在旋转裂缝模型中，裂缝闭合和重新打开的概念没有很好地定义，因为裂缝的方向可以连续变化。固定正交裂缝模型主要受到批评，因为模型中使用的传统"剪切保留"处理往往使模型响应过于刚性。可以通过以一种确保随着裂缝界面上的变形发生剪应力趋于零的方式来制定剪切保留来解决这个 问题（Abaqus模型中这样做，如后面所述）。最后，虽然固定正交裂缝模型有正交性限制，但在多裂缝效应重要的情况下（旋转裂缝模型限制在任何点只有一个裂缝），它被认为优于旋转裂缝模型。

Abaqus使用固定正交裂缝模型，因此材料点最大裂缝数量受该有限元模型材料点存在的直接应力分量数量的限制（例如，三维、轴对称和平面应变问题中最多三个裂缝，平面应力问题中最多两个裂缝）。一旦裂缝存在于某点，所有向量和张量值量的分量形式被旋转，使其位于由裂缝方向向量（裂缝面法线）定义的局部坐标系中。模型确保这些裂缝面法线向量是正交的，因此该局部坐标系是矩形笛卡尔坐标系。裂缝闭合和重新打开可以沿着裂缝面法线的方向进行。模型忽略与裂缝相关的任何永久应变；即，我们假定当跨裂缝的应力变为压缩时，裂缝可以完全闭合。
### 混凝土的弹性-裂缝模型

该模型的主要成分是应变率分解为弹性（混凝土）和裂缝应变率、弹性、一组裂缝条件和一个裂缝关系（裂缝行为的演化律）。应变分解的主要优点是它允许以一致的方式最终添加其他效应，如塑性和蠕变。弹性-裂缝应变分解还允许表示裂缝状态的裂缝应变被单独识别；这与经典 smeared crack 模型形成对比，后者使用单个应变数量以均质化形式表示裂缝固体状态，导致修改的（损伤）弹性公式。
### 应变率分解

我们从应变率分解开始：

![](../graphics/stm_eqn06604.gif)中![](../graphics/stm_eqn00034.gif)总机械应变率，![](../graphics/stm_eqn05909.gif)表示未裂混凝土（裂缝之间的连续体）的弹性应变率，![](../graphics/stm_eqn06605.gif)与任何现有裂缝相关的裂缝应变率。
### 裂缝方向变换

[公式4.5.3-1](04s05a121.md)中的应变参照全局笛卡尔坐标系，可以写成向量形式（在三维设置中）

![](../graphics/stm_eqn06606.gif)![](../graphics/stm_eqn06607.gif)![](../graphics/stm_eqn06608.gif)

图4.5.3-1 全局和局部裂缝坐标系。

![](../graphics/stmcracking-coords.png)全局和局部应变之间的变换以矩阵形式写为

![](../graphics/stm_eqn06609.gif)![](../graphics/stm_eqn06610.gif)![](../graphics/stm_eqn06610.gif)![](../graphics/stm_eqn06611.gif)局部裂缝系统中为

![](../graphics/stm_eqn06612.gif)![](../graphics/stm_eqn06613.gif)
### 弹性

裂缝之间完整的连续体用各向同性线性弹性建模。裂缝材料的正交各向异性性质在模型的裂缝分量中引入。如前所述，将应变分解为弹性、完整混凝土应变和裂缝应变的方法具有的优点是，这个 smeared 模型可以推广以包括其他效应，如塑性和蠕变（尽管此类推广尚未在Abaqus/Explicit中包含）。
### 裂缝检测

使用简单的Rankine准则来检测裂缝萌发。它指出当最大主拉应力超过脆性材料的抗拉强度时形成裂缝。Rankine裂缝检测面在偏量平面中如图[图4.5.3-2](04s05a121.md)所示，在子午面中如图[图4.5.3-3](04s05a121.md)所示，在平面应力中如图[图4.5.3-4](04s05a121.md)所示。虽然裂缝检测纯粹基于I型断裂考虑，但随后裂缝行为包括I型（拉伸软化）和II型（剪切软化/保留）行为，如后面所述。

图4.5.3-2 偏量平面中的Rankine准则。

![](../graphics/stmrankine-crit-dev-nls.png)

图4.5.3-3 子午面中的Rankine准则。

![](../graphics/stmrankine-crit-merid-nls.png)

图4.5.3-4 平面应力中的Rankine准则。

![](../graphics/stmrankine-crit-planestr.png)

一旦满足裂缝形成的Rankine准则，我们假定第一个裂缝已经形成。裂缝面被取为与最大拉伸主应力方向垂直。后续裂缝可以形成，其裂缝面法线方向为与同一点任何现有裂缝面法线正交的最大拉伸主应力方向。

裂缝方向被存储以供后续计算使用，这些计算方便地在裂缝方向定向的局部坐标系中进行。裂缝是不可恢复的，因为一旦某点发生裂缝，它在计算的剩余过程中保持存在。然而，裂缝随后可以闭合和重新打开。
### 裂缝条件

我们引入裂缝一致性条件（类似于经典塑性中的屈服条件），以裂缝方向坐标系以张量形式写出

![](../graphics/stm_eqn06614.gif)![](../graphics/stm_eqn06615.gif)![](../graphics/stm_eqn06616.gif)直接应力分量情况下表示拉伸软化模型（I型断裂），在剪切应力分量情况下表示剪切软化/保留模型（II型断裂）。矩阵![](../graphics/stm_eqn06617.gif)![](../graphics/stm_eqn06618.gif)定为对角的，意味着通常的假设：裂缝条件之间没有耦合。

每个裂缝条件比经典屈服条件更复杂，因为存在两种可能的裂缝状态（活跃张开裂缝状态和闭合/重新打开裂缝状态），与经典塑性中的单个塑性状态对比。这可以通过显式写出特定裂缝法线方向*n*的裂缝条件来说明：

![](../graphics/stm_eqn06619.gif)![](../graphics/stm_eqn06620.gif)![](../graphics/stm_eqn06621.gif)于闭合/重新打开裂缝，其中![](../graphics/stm_eqn06622.gif)依赖于最大裂缝张开应变定义的裂缝闭合/重新打开演化

![](../graphics/stm_eqn06623.gif)![](../graphics/stm_eqn06624.gif)现有裂缝的部分。

图4.5.3-5 I型裂缝的裂缝条件。

![](../graphics/stmmode1-cracking.png)

![](../graphics/stm_eqn06625.gif)裂缝坐标系中剪切分量的裂缝条件在与相关法线方向开裂时被激活。我们现在通过显式写出剪切分量![](../graphics/stm_eqn06626.gif)于裂缝的剪切加载或卸载，其中![](../graphics/stm_eqn06627.gif)依赖于剪切应变且也依赖于裂缝张开应变的剪切演化（由用户定义）。[图4.5.3-6](04s05a121.md)说明了这个模型。虽然这个模型灵感来自传统剪切保留模型，但在一个重要方面与那些模型不同：随着裂缝的发展，剪应力趋于零。这将在后面更详细地讨论。

图4.5.3-6 II型裂缝的裂缝条件（依赖于裂缝张开的模型）。

![](../graphics/stmmode2-cracking.png)
### 裂缝关系

局部应力和裂缝界面处裂缝应变之间的关系以率形式写为

![](../graphics/stm_eqn06628.gif)![](../graphics/stm_eqn06629.gif)![](../graphics/stm_eqn06630.gif)![](../graphics/stm_eqn06631.gif)中![](../graphics/stm_eqn05533.gif)各向同性线性弹性矩阵。

![](../graphics/stm_eqn06632.gif)将[公式4.5.3-9](04s05a121.md)左乘![](../graphics/stm_eqn06633.gif)

最后，将[公式4.5.3-10](04s05a121.md)代入[公式4.5.3-9](04s05a121.md)得到应力-应变率方程：

![](../graphics/stm_eqn06634.gif)[Hilleborg（1976）](07s01a01-References.md)的脆性断裂概念构成了裂缝面法线方向（通常称为拉伸软化）后裂行为的基础。我们假定形成I型中单位面积裂缝表面所需的断裂能![](../graphics/stm_eqn06635.gif)一个材料特性。这个值可以从测量裂缝张开位移作为应力的函数计算（[图4.5.3-7](04s05a121.md)），为

![](../graphics/stm_eqn06636.gif)

图4.5.3-7 基于I型断裂能的裂缝行为。

![](../graphics/stmmode1-fracen-nls.png)

![](../graphics/stm_eqn06635.gif)典型值对于典型建筑混凝土（约20 MPa抗压强度）从40 N/m（0.22 lb/in）到高强度混凝土（约40 MPa抗压强度）的120 N/m（0.67 lb/in）。

![](../graphics/stm_eqn06635.gif)![](../graphics/stm_eqn06637.gif)![](../graphics/stm_eqn06638.gif)![](../graphics/stm_eqn06639.gif)假定在这个模型的有限元实现中，我们必须因此计算材料点的相对位移以提供![](../graphics/stm_eqn06639.gif)我们在Abaqus中通过将应变乘以与材料点相关的特征长度来实现（使用局部裂缝方向*n*中的裂缝应变作为示例）：

![](../graphics/stm_eqn06640.gif)对于钢筋混凝土，由于Abaqus没有直接建模钢筋和混凝土之间的粘结，混凝土裂缝上这种粘结的影响必须被纳入模型的素混凝土部分。这种效应通常通过基于与钢筋材料实验的比较增加![](../graphics/stm_eqn06635.gif)值来实现。这种增加的延展性通常被称为"拉伸刚化"效应。

![](../graphics/stm_eqn06641.gif)![](../graphics/stm_eqn06642.gif)在钢筋混凝土应用中，混凝土的软化行为由于钢筋的稳定存在往往对结构整体响应影响较小。因此，通常直接定义拉伸刚化为II型模型基于共同的观察：剪切行为依赖于裂缝张开的程度。因此，Abaqus提供了一个剪切保留模型，其中后裂剪切刚度依赖于裂缝张开。这个模型将总剪应力定义为总剪切应变（剪切方向![](../graphics/stm_eqn06625.gif)为示例）的函数：

![](../graphics/stm_eqn06643.gif)![](../graphics/stm_eqn06644.gif)![](../graphics/stm_eqn06645.gif)![](../graphics/stm_eqn06646.gif)中*G*是未裂混凝土的剪切模量，![](../graphics/stm_eqn06647.gif)[图4.5.3-8](04s05a121.md)中所示形式用户定义的依赖关系。

图4.5.3-8 剪切保留因子对裂缝张开的依赖性。

![](../graphics/stmshearret-factor-nls.png)

当只有一个裂缝时，对于只有一个与方向*n*相关联的裂缝，这个依赖性的常用数学形式是[Rots和Blaauwendraad（1989）](07s01a01-References.md)提出的幂律：

![](../graphics/stm_eqn06648.gif)![](../graphics/stm_eqn06649.gif)![](../graphics/stm_eqn06650.gif)![](../graphics/stm_eqn06651.gif)![](../graphics/stm_eqn06652.gif)![](../graphics/stm_eqn06653.gif)![](../graphics/stm_eqn00904.gif)![](../graphics/stm_eqn06654.gif)![](../graphics/stm_eqn00593.gif)![](../graphics/stm_eqn06655.gif)[公式4.5.3-13](04s05a121.md)中给出的剪切保留幂律形式可以然后以![](../graphics/stm_eqn00593.gif)出为

![](../graphics/stm_eqn06656.gif)![](../graphics/stm_eqn00593.gif)![](../graphics/stm_eqn06642.gif)![](../graphics/stm_eqn00904.gif)![](../graphics/stm_eqn06642.gif)![](../graphics/stm_eqn06657.gif)中

![](../graphics/stm_eqn06658.gif)![](../graphics/stm_eqn06659.gif)

![](../graphics/stm_eqn06625.gif)这个总应力-应变剪切保留模型与传统剪切保留模型不同，传统模型中应力-应变关系以增量形式写出（再次以剪切方向![](../graphics/stm_eqn06660.gif)中![](../graphics/stm_eqn06644.gif)一个依赖于裂缝张开的增量刚度。Abaqus使用的总模型（[公式4.5.3-12](04s05a121.md)）与传统增量模型（[公式4.5.3-15](04s05a121.md)）之间的差异最好通过考虑在裂缝同时张开和剪切时两个模型的剪切响应来说明。这在总模型的[图4.5.3-9](04s05a121.md)和增量模型的[图4.5.3-10](04s05a121.md)中显示。显然，在总模型中，剪应力随裂缝张开和剪切趋于零；而在增量模型中，剪应力趋于有限值。这可以解释为什么传统剪切保留模型通常获得过于刚性的响应。

图4.5.3-9 Abaqus依赖于裂缝张开的剪切保留（总）模型。

![](../graphics/stmtotal-model-nls.png)

图4.5.3-10 传统的依赖于裂缝张开的剪切保留（增量）模型。

![](../graphics/stmincremental-model-nls.png)
### Cracked shear models
### 参考
### 参考

### 参考

### 参考

"Cracking model for concrete,"  Section 23.6.2 of the Abaqus Analysis User's Guide


**校审补全说明：** 以下保留英文源文的非图片文本，用于补足本页此前过短或参考文献页中文字符过少的问题；公式和图片引用不在此重复，以上文校准后的中文正文为准。

**?????4.5.3 A cracking model for concrete and other brittle materials**

**?????4.5.3 A cracking model for concrete and other brittle materials**

**Product: **Abaqus/Explicit

This section describes the cracking constitutive model provided in Abaqus/Explicit for concrete and other brittle materials. The material library in Abaqus also includes a constitutive model for concrete based on theories of scalar plastic damage, described in "Damaged plasticity model for concrete and other quasi-brittle materials,"  Section 4.5.2, which is available in Abaqus/Standard and Abaqus/Explicit. In Abaqus/Standard plain concrete can also be analyzed with the smeared crack concrete model described in "An inelastic constitutive model for concrete,"  Section 4.5.1. Although this brittle cracking model can also be useful for other materials, such as ceramics and brittle rocks, it is primarily intended to model plain concrete. Therefore, in the remainder of this section, the physical behavior of concrete is used to motivate the different aspects of the constitutive model.

Reinforced concrete modeling in Abaqus is accomplished by combining standard elements, using this plain concrete cracking model, with "rebar elements"---rods, defined singly or embedded in oriented surfaces, that use a one-dimensional strain theory and that can be used to model the reinforcing itself. The rebar elements are superposed on the mesh of plain concrete elements and are used with standard metal plasticity models that describe the behavior of the rebar material. This modeling approach allows the concrete behavior to be considered independently of the rebar, so this section discusses the plain concrete cracking model only. Effects associated with the rebar/concrete interface, such as bond slip and dowel action, cannot be considered in this approach except by modifying some aspects of the plain concrete behavior to mimic them (such as the use of "tension stiffening" to simulate load transfer across cracks through the rebar).

It is generally accepted that concrete exhibits two primary modes of behavior: a brittle mode in which microcracks coalesce to form discrete macrocracks representing regions of highly localized deformation, and a ductile mode where microcracks develop more or less uniformly throughout the material, leading to nonlocalized deformation. The brittle behavior is associated with cleavage, shear and mixed mode fracture mechanisms that are observed under tension and tension-compression states of stress. It almost always involves softening of the material. The ductile behavior is associated with distributed microcracking mechanisms that are primarily observed under compression states of stress. It almost always involves hardening of the material, although subsequent softening is possible at low confining pressures. The cracking model described here models only the brittle aspects of concrete behavior. Although this is a major simplification, there are many applications where only the brittle behavior of the concrete is significant; and, therefore, the assumption that the material is linear elastic in compression is justified in those cases.
**?????Smeared cracking assumption**

A smeared model is chosen to represent the discontinuous macrocrack brittle behavior. In this approach we do not track individual "macro" cracks: rather, the presence of cracks enters into the calculations by the way the cracks affect the stress and material stiffness associated with each material calculation point.

Here, for simplicity, the term "crack" is used to mean a direction in which cracking has been detected at the material calculation point in question. The closest physical concept is that there exists a continuum of microcracks at the point, oriented as determined by the model. The anisotropy introduced by cracking is included in the model since it is assumed to be important in the simulations for which the model is intended.

Some objections have been raised against smeared crack models. The principal concern is that this modeling approach inherently introduces mesh sensitivity in the solutions, in the sense that the finite element results do not converge to a unique result. For example, since cracking is associated with strain softening, mesh refinement will lead to narrower crack bands. Many researchers have addressed this concern, and the general consensus is that [Hillerborg's (1976)](07s01a01-References.md) approach---based on brittle fracture concepts---is adequate to deal with this issue for practical purposes. A length scale, typically in the form of a "characteristic" length, is introduced to "regularize" the smeared continuum models and attenuate the sensitivity of the results to mesh density. This aspect of the model is discussed in detail later.
**?????Crack direction assumptions**

Various researchers have proposed three basic crack direction models ([Rots and Blaauwendraad, 1989](07s01a01-References.md)): fixed, orthogonal cracks; the rotating crack model; and fixed, multidirectional (nonorthogonal) cracks. In the fixed, orthogonal crack model the direction normal to the first crack is aligned with the direction of maximum tensile principal stress at the time of crack initiation. The model has memory of this crack direction, and subsequent cracks at the point under consideration can only form in directions orthogonal to the first crack. In the rotating crack concept only a single crack can form at any point (aligned with the direction of maximum tensile principal stress). Thus, the single crack direction rotates with the direction of the principal stress axes. This model has no memory of crack direction. Finally, the multidirectional crack model allows the formation of any number of cracks at a point as the direction of the principal stress axes changes with loading. In practice, some limitation is imposed on the number of cracks allowed to form at a point. The model has memory of all crack directions.

The multidirectional crack model is the least popular, mainly because the criterion used to decide when subsequent cracks form (to limit the number of cracks at a point) is somewhat arbitrary: the concept of a "threshold angle" is introduced to prevent new cracks from forming at angles less than this threshold value to existing cracks. The fixed orthogonal and rotating crack models have both been used extensively, even though objections can be raised against both. In the rotating crack model the concept of crack closing and reopening is not well-defined because the orientation of the crack can vary continuously. The fixed orthogonal crack model has been criticized mainly because the traditional treatment of "shear retention" employed in the model tends to make the response of the model too stiff. This problem can be resolved by formulating the shear retention in a way that ensures that the shear stresses tend to zero as deformation on the crack interfaces takes place (this is done in the Abaqus model, as described later). Finally, although the fixed orthogonal crack model has the orthogonality limitation, it is considered superior to the rotating crack model in cases where the effect of multiple cracks is important (the rotating crack model is restricted to a single crack at any point).

The fixed orthogonal cracks model is used in Abaqus so that the maximum number of cracks at a material point is limited by the number of direct stress components present at that material point of the finite element model (for example, a maximum of three cracks in three-dimensional, axisymmetric, and plane strain problems or a maximum of two cracks in plane stress problems). Once cracks exist at a point, the component forms of all vector and tensor valued quantities are rotated so that they lie in the local system defined by the crack orientation vectors (the normals to the crack faces). The model ensures that these crack face normal vectors are orthogonal so that this local system is rectangular Cartesian. Crack closing and reopening can take place along the directions of the crack surface normals. The model neglects any permanent strain associated with cracking; that is, we assume that the cracks can close completely when the stress across them becomes compressive.
**?????Elastic-cracking model for concrete**

The main ingredients of the model are a strain rate decomposition into elastic (concrete) and cracking strain rates, elasticity, a set of cracking conditions, and a cracking relation (the evolution law for the cracking behavior). The main advantage of the strain decomposition is that it allows the eventual addition of other effects, such as plasticity and creep, in a consistent manner. The elastic-cracking strain decomposition also allows the separate identification of a cracking strain that represents the state of a crack; this contrasts with the classical smeared cracking models where a single strain quantity is used to represent the state of a cracked solid in a homogenized form leading to a modified (damaged) elasticity formulation.
**?????Strain rate decomposition**

We begin with a strain rate decomposition,

where  is the total mechanical strain rate,  is the elastic strain rate representing the uncracked concrete (the continuum between the cracks), and  is the cracking strain rate associated with any existing cracks.
**?????Crack direction transformations**

The strains in [Equation 4.5.3&#8211;1](04s05a121.md) are referred to the global Cartesian coordinate system and can be written in vector form (in a three-dimensional setting) as

For incorporating the cracking relations it is convenient to define a local Cartesian coordinate system  that is aligned with the crack directions. In the local system, shown in [Figure 4.5.3&#8211;1](04s05a121.md), the strains are



Figure 4.5.3&#8211;1 Global and local cracking coordinate systems.

The transformation between global and local strains is written in matrix form as

where  is a transformation matrix constructed from the direction cosines of the local cracking coordinate system.  is constant in our fixed crack model.

The conjugate stress quantities can be written in the global coordinate system as

and in the local cracking system as

The transformation between local and global stresses is then


**?????Elasticity**

The intact continuum between the cracks is modeled with isotropic, linear elasticity. The orthotropic nature of the cracked material is introduced in the cracking component of the model. As stated earlier, the approach of decomposing the strains into elastic, intact concrete, strains, and cracking strains has the advantage that this smeared model can be generalized to include other effects such as plasticity and creep (although such generalizations are not yet included in Abaqus/Explicit).
**?????Crack detection**

A simple Rankine criterion is used to detect crack initiation. This states that a crack forms when the maximum principal tensile stress exceeds the tensile strength of the brittle material. The Rankine crack detection surface is shown in [Figure 4.5.3&#8211;2](04s05a121.md) in the deviatoric plane, in [Figure 4.5.3&#8211;3](04s05a121.md) in the meridional plane, and in [Figure 4.5.3&#8211;4](04s05a121.md) in plane stress. Although crack detection is based purely on Mode I fracture considerations, ensuing cracked behavior includes both Mode I (tension softening) and Mode II (shear softening/retention) behavior, as described later.

Figure 4.5.3&#8211;2 Rankine criterion in the deviatoric plane.



Figure 4.5.3&#8211;3 Rankine criterion in the meridional plane.



Figure 4.5.3&#8211;4 Rankine criterion in plane stress.



As soon as the Rankine criterion for crack formation has been met, we assume that a first crack has formed. The crack surface is taken to be normal to the direction of the maximum tensile principal stress. Subsequent cracks can form with crack surface normals in the direction of maximum principal tensile stress that is orthogonal to the directions of any existing crack surface normals at the same point.

The crack orientations are stored for subsequent calculations, which are done for convenience in a local coordinate system oriented in the crack directions. Cracking is irrecoverable in the sense that, once a crack has occurred at a point, it remains throughout the rest of the calculation. However, a crack may subsequently close and reopen.
**?????Cracking conditions**

We introduce a consistency condition for cracking (analogous to the yield condition in classical plasticity) written in the crack direction coordinate system in the form of the tensor

where

and  represents a tension softening model (Mode I fracture) in the case of the direct components of stress and a shear softening/retention model (Mode II fracture) in the case of the shear components of stress. The matrices  and  are assumed to be diagonal, implying the usual assumption that there is no coupling between cracks in the cracking conditions.

Each cracking condition is more complex than a classical yield condition in the sense that two cracking states are possible (an actively opening crack state and a closing/reopening crack state), contrasting with a single plastic state in classical plasticity. This can be illustrated by writing the cracking conditions for a particular crack normal direction *n* explicitly:

for an actively opening crack, where  is the tension softening evolution (defined by the user), and

for a closing/reopening crack, where  is the crack closing/reopening evolution that depends on the maximum crack opening strain defined as

These conditions are illustrated in [Figure 4.5.3&#8211;5](04s05a121.md) and represent the tension softening model adopted for the cracking behavior normal to crack surfaces. Similar conditions can be written for the other two possible crack normal directions, *s* and *t*. It must be emphasized that, although the cracking condition of [Equation 4.5.3&#8211;4](04s05a121.md) has been written for the most general case of all possible cracks existing, only the components of  that refer to existing cracks are considered in the computations with this model.

Figure 4.5.3&#8211;5 Cracking conditions for Mode I cracking.



The cracking conditions for the shear components in the crack coordinate system are activated when the associated normal directions are cracked. We now present the shear cracking conditions by writing the conditions for shear component  explicitly.

The crack opening dependent shear model (shear retention model) is written as

for shear loading or unloading of the crack, where  is the shear evolution that depends linearly on the shear strain and also depends on the crack opening strain (this dependency being defined by the user). [Figure 4.5.3&#8211;6](04s05a121.md) illustrates the model. Although this model is inspired by the traditional shear retention models, it differs from those models in one important aspect: the shear stress tends to zero as the crack develops. This is discussed in more detail later.

Figure 4.5.3&#8211;6 Cracking conditions for Mode II cracking (crack opening dependent model).


**?????Cracking relation**

The relation between the local stresses and the cracking strains at the crack interfaces is written in rate form as

where  is a diagonal cracking matrix that depends on the state of the existing cracks. The definition of these diagonal components () is given in [Figure 4.5.3&#8211;5](04s05a121.md) and [Figure 4.5.3&#8211;6](04s05a121.md).
**?????Rate constitutive equations**

Using the strain rate decomposition ([Equation 4.5.3&#8211;3](04s05a121.md)) and the elasticity relations, we can write the rate of stress as

where  is the isotropic linear elasticity matrix.

Premultiplying [Equation 4.5.3&#8211;9](04s05a121.md) by  and substituting [Equation 4.5.3&#8211;5](04s05a121.md) and [Equation 4.5.3&#8211;8](04s05a121.md) into the resulting left-hand side yields



Finally, substituting [Equation 4.5.3&#8211;10](04s05a121.md) into [Equation 4.5.3&#8211;9](04s05a121.md) results in the stress-strain rate equations:


**?????Tension softening models**

The brittle fracture concept of [Hilleborg (1976)](07s01a01-References.md) forms the basis of the postcracked behavior in the direction normal to the crack surface (commonly referred to as tension softening). We assume that the fracture energy required to form a unit area of crack surface in Mode I, , is a material property. This value can be calculated from measuring the tensile stress as a function of the crack opening displacement ([Figure 4.5.3&#8211;7](04s05a121.md)), as



Figure 4.5.3&#8211;7 Mode I fracture energy based cracking behavior.



Typical values of  range from 40 N/m (0.22 lb/in) for a typical construction concrete (with a compressive strength of approximately 20 MPa, 2850 lb/in2) to 120 N/m (0.67 lb/in) for a high strength concrete (with a compressive strength of approximately 40 MPa, 5700 lb/in2).

The implication of assuming that  is a material property is that, when the elastic part of the displacement, , is eliminated, the relationship between the stress and the remaining part of the displacement, , is fixed, regardless of the specimen size. For example, consider a specimen developing a single crack across its section as tensile displacement is applied to it:  is the displacement across the crack and is not changed by using a longer or shorter specimen in the test (so long as the specimen is significantly longer than the width of the crack band, which will typically be of the order of the aggregate size). Thus, this important part of the cracked concrete's tensile behavior is defined in terms of a stress/displacement relationship.

In the finite element implementation of this model we must, therefore, compute the relative displacement at a material point to provide . We do this in Abaqus by multiplying the strain by a characteristic length associated with the material point (the cracking strain in local crack direction *n* is used as an example):

where *h* is the characteristic length. This characteristic crack length is based on the element geometry and formulation: it is a typical length of a line across an element for a first-order element; it is half of the same typical length for a second-order element. For beams and trusses it is a characteristic length along the element axis. For membranes and shells it is a characteristic length in the reference surface. For axisymmetric elements it is a characteristic length in the *r*&#8211;*z* plane only. For cohesive elements it is equal to the constitutive thickness. This definition of the characteristic length is used because we do not necessarily know in which direction the concrete will crack; and, hence, we cannot choose the length measure *a priori* in any particular direction. These characteristic length estimates are appropriate only for well-shaped elements (elements that do not have large aspect ratios), which should be considered by the user in defining values for the material properties. Alternatively, this mesh dependency could be reduced by directly specifying the characteristic length as a function of element topology and material orientation in user subroutine VUCHARLENGTH, as described in "VUCHARLENGTH,"  Section 1.2.11 of the Abaqus User Subroutines Reference Guide.

For reinforced concrete, since Abaqus provides no direct modeling of the bond between rebar and concrete, the effect of this bond on the concrete cracks must be smeared into the plain concrete part of the model. This effect is generally accomplished by increasing the value of  based on comparisons with experiments on reinforced material. This increased ductility is commonly refered to as the "tension stiffening" effect.

In reinforced concrete applications the softening behavior of the concrete tends to have less influence on the overall response of the structure because of the stabilizing presence of the rebar. Therefore, it is often appropriate to define tension stiffening as a &#8211; relationship directly. This option is also offered in Abaqus.
**?????Cracked shear models**

An important feature of the cracking model is that, whereas crack initiation is based on Mode I fracture only, postcracked behavior includes Mode II as well as Mode I. The Mode II shear behavior is described next.

The Mode II model is based on the common observation that the shear behavior is dependent on the amount of crack opening. Therefore, Abaqus offers a shear retention model in which the postcracked shear stiffness is dependent on crack opening. This model defines the total shear stress as a function of the total shear strain (shear direction  is used as an example):

where  is a stiffness that depends on crack opening.  can be expressed as

where *G* is the shear modulus of the uncracked concrete and  is a user-defined dependence of the form shown in [Figure 4.5.3&#8211;8](04s05a121.md).

Figure 4.5.3&#8211;8 Shear retention factor dependence on crack opening.



A commonly used mathematical form for this dependence when there is only one crack, associated with direction *n*, is the power law proposed by [Rots and Blaauwendraad (1989)](07s01a01-References.md):

where *p* and  are material parameters. This form satisfies the requirements that  as  (corresponding to the state before crack initiation) and  as  (corresponding to complete loss of aggregate interlock). Note that the bounds of , as defined in our model using the elastic-cracking strain decomposition, are  and zero. This contrasts with some of the traditional shear retention models where the intact concrete and cracking strains are not separated; the shear retention in these models is defined using a shear retention factor, , which can have values between one and zero. The relationship between these two shear retention parameters is

The shear retention power law form given in [Equation 4.5.3&#8211;13](04s05a121.md) can then be written in terms of  as

Since users are more accustomed to specifying shear retention factors in the traditional way (with values between one and zero), the Abaqus input requests &#8211; data. Using [Equation 4.5.3&#8211;14](04s05a121.md), these data are then converted to &#8211; data for computation purposes.

When the shear component under consideration is associated with only one open crack direction (*n* or *t*), the crack opening dependence is obtained directly from [Figure 4.5.3&#8211;8](04s05a121.md). However, when the shear direction is associated with two open crack directions (*n* and *t*), then

with

and, therefore,



This total stress-strain shear retention model differs from the traditional shear retention models in which the stress-strain relations are written in incremental form (again, shear direction  is used as an example):

where  is an incremental stiffness that depends on crack opening. The difference between the total model used in Abaqus ([Equation 4.5.3&#8211;12](04s05a121.md)) and the traditional incremental model ([Equation 4.5.3&#8211;15](04s05a121.md)) is best illustrated by considering the shear response of the two models in the case when a crack is simultaneously opening and shearing. This is shown in [Figure 4.5.3&#8211;9](04s05a121.md) for the total model and in [Figure 4.5.3&#8211;10](04s05a121.md) for the incremental model. It is apparent that, in the total model, the shear stress tends to zero as the crack opens and shears; whereas, in the incremental model the shear stress tends to a finite value. This may explain why overly stiff responses are usually obtained with the traditional shear retention models.

Figure 4.5.3&#8211;9 Abaqus crack opening&#8211;dependent shear retention (total) model.



Figure 4.5.3&#8211;10 Traditional crack opening&#8211;dependent shear retention (incremental) model.


**?????Reference**

**?????Reference**

"Cracking model for concrete,"  Section 23.6.2 of the Abaqus Analysis User's Guide
