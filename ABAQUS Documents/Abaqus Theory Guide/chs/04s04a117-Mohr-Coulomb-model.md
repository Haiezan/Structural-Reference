# 4.4.5 Mohr-Coulomb模型

### 4.4.5 Mohr-Coulomb模型

**产品：** Abaqus/Standard  Abaqus/Explicit

Mohr-Coulomb破坏或强度准则已广泛应用于岩土工程。事实上，岩土领域的许多常规设计计算仍然使用Mohr-Coulomb准则。

Mohr-Coulomb准则假定破坏受最大剪应力控制，并且该破坏剪应力依赖于正应力。这可以通过绘制失效时应力状态的Mohr圆来表示，以最大和最小主应力表示。Mohr-Coulomb破坏线是触及这些Mohr圆的最佳直线（[图4.4.5-1](04s04a117.md)）。因此，Mohr-Coulomb准则可以写为

![](../graphics/stm_eqn06275.gif)中![](../graphics/stm_eqn01399.gif)剪应力，![](../graphics/stm_eqn01110.gif)正应力（压缩时为负），*c*是材料的内聚力，且![](../graphics/stm_eqn00155.gif)材料摩擦角。

图4.4.5-1 Mohr-Coulomb破坏准则。

![](../graphics/cmohrcoulomb-yield-merid.png)从Mohr圆，

![](../graphics/stm_eqn06276.gif)![](../graphics/stm_eqn01399.gif)![](../graphics/stm_eqn01110.gif)![](../graphics/stm_eqn06277.gif)中

![](../graphics/stm_eqn06278.gif)![](../graphics/stm_eqn06279.gif)最大和最小主应力的平均值（正应力）。因此，与Drucker-Prager准则不同，Mohr-Coulomb准则假定破坏与中间主应力的值无关。典型岩土材料的破坏通常包括对中间主应力的一些小依赖，但Mohr-Coulomb模型通常被认为对大多数应用足够准确。该破坏模型在偏量应力平面上有顶点（见[图4.4.5-2](04s04a117.md)）。

图4.4.5-2 偏量平面中的Mohr-Coulomb模型。

![](../graphics/cmohrcoulomb-yield-devia-nls.png)

这里描述的本构模型是经典Mohr-Coulomb破坏准则的扩展。它是一个使用Mohr-Coulomb形式屈服函数的弹塑性模型；该屈服函数包含各向同性内聚硬化/软化。然而，该模型使用的流动势在子午应力平面上具有双曲形状，在偏量应力空间中无角落。该流动势然后完全平滑，因此提供塑性流动方向的唯一定义。
### 应变率分解

假定加性应变率分解：

![](../graphics/stm_eqn06280.gif)![](../graphics/stm_eqn06115.gif)![](../graphics/stm_eqn06116.gif)![](../graphics/stm_eqn06117.gif)![](../graphics/stm_eqn06281.gif)ises等效应力

![](../graphics/stm_eqn06282.gif)![](../graphics/stm_eqn05748.gif)![](../graphics/stm_eqn06283.gif)偏应力的第三不变量

![](../graphics/stm_eqn06284.gif)![](../graphics/stm_eqn06285.gif)中![](../graphics/stm_eqn06286.gif)子午应力平面中材料的摩擦角，其中![](../graphics/stm_eqn01111.gif)温度，![](../graphics/stm_eqn02414.gif)其他预定义场变量；![](../graphics/stm_eqn06287.gif)各向同性硬化（或软化）的形式表示材料内聚力的演化；![](../graphics/stm_eqn06101.gif)等效塑性应变，其率由塑性功表达式定义为

![](../graphics/stm_eqn06288.gif)![](../graphics/stm_eqn06289.gif)![](../graphics/stm_eqn06290.gif)中![](../graphics/stm_eqn03471.gif)偏量极角（[Chen和Han，1988](07s01a01-References.md)），定义为

![](../graphics/stm_eqn06291.gif)![](../graphics/stm_eqn00155.gif)![](../graphics/stm_eqn06292.gif)![](../graphics/stm_eqn06293.gif)![](../graphics/stm_eqn06293.gif)![](../graphics/stm_eqn06294.gif)此极限情况在本文描述的Mohr-Coulomb模型中不允许）。

图4.4.5-3 子午面和偏量平面中的Mohr-Coulomb屈服面。

![](../graphics/cmohrcoulomb-yield-nls.png)
### 流动规则

假定势流动，因此

![](../graphics/stm_eqn06295.gif)中*G*可以写为

![](../graphics/stm_eqn06296.gif)![](../graphics/stm_eqn06297.gif)中![](../graphics/stm_eqn06137.gif)在高约束压力下在*p*-![](../graphics/stm_eqn06298.gif)面中测得的膨胀角；![](../graphics/stm_eqn06299.gif)初始内聚屈服应力；且![](../graphics/stm_eqn02163.gif)一个参数，称为偏心率，定义函数接近渐近线的速率（当偏心率趋于零时，流动势趋于直线）。此流动势在子午应力平面中连续且平滑，确保流动方向在该平面中被唯一确定。该函数在高约束压力应力下渐近接近线性流动势，并以90度角与静水压力轴相交。子午应力平面中的一族双曲势如图[图4.4.5-4](04s04a117.md)所示。

图4.4.5-4 子午面中的双曲流动势族。

![](../graphics/cmohrcoulomb-flow-merid.png)

![](../graphics/stm_eqn06097.gif)流动势在偏量应力平面（![](../graphics/stm_eqn06300.gif)中![](../graphics/stm_eqn03471.gif)先前定义的偏量极角，![](../graphics/stm_eqn06301.gif)且*e*是一个参数，描述偏量截面的"偏离圆度"，以延伸子午线（![](../graphics/stm_eqn06302.gif)上剪应力与压缩子午线（![](../graphics/stm_eqn06303.gif)上剪应力之比表示。椭圆函数在延伸子午线上值为![](../graphics/stm_eqn06304.gif)在压缩子午线上值为![](../graphics/stm_eqn06305.gif)这确保如果*e*被适当定义，则流动势在偏量平面中的三轴拉伸和三轴压缩处与屈服面匹配（见进一步讨论）。虽然椭圆函数仅在扇区![](../graphics/stm_eqn06306.gif)定义，但极半径![](../graphics/stm_eqn06307.gif)用[图4.4.5-5](04s04a117.md)中所示的三重对称扩展到所有极方向![](../graphics/stm_eqn06308.gif)

图4.4.5-5 偏量平面中的Mentrey-Willam流动势。

![](../graphics/cmohrcoulomb-flow-devia-nls.png)

![](../graphics/stm_eqn00155.gif)默认情况下，"偏离圆度"参数*e*依赖于摩擦角![](../graphics/stm_eqn06309.gif)者，*e*也可以被视为一个独立的材料参数；在这种情况下，用户可以直接提供其值。椭圆函数的凸性和平滑性要求![](../graphics/stm_eqn06310.gif)上限![](../graphics/stm_eqn06311.gif)或![](../graphics/stm_eqn06293.gif)0）导致![](../graphics/stm_eqn06312.gif)这描述了偏量平面中的Mises圆。下限![](../graphics/stm_eqn06313.gif)或![](../graphics/stm_eqn06293.gif)90）导致![](../graphics/stm_eqn06314.gif)将描述偏量平面中的Rankine三角形（此极限情况在本文描述的Mohr-Coulomb模型中不允许）。

![](../graphics/stm_eqn00155.gif)![](../graphics/stm_eqn02064.gif)![](../graphics/stm_eqn02163.gif)在子午应力平面中的流动当摩擦角常小时可能接近相关；然而，该平面中的流动通常是非相关的。偏量应力平面中的流动始终是非相关的。因此，使用此Mohr-Coulomb模型通常需要求解非对称方程。
### 参考
### 参考

### 参考

### 参考

"Mohr-Coulomb plasticity,"  Section 23.3.3 of the Abaqus Analysis User's Guide
