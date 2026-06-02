# 2.11.3 对流/扩散

这些方程通过使用一次等参单元相对于位置离散化。流体速度![](../graphics/stm_eqn00427.gif)设为已知的。（Abaqus实际上要求定义流体每单位面积的质量流率，因为这通常对用户更方便。速度由质量流率和流体密度计算。）
![](../graphics/stm_eqn02309.gif)![](../graphics/stm_eqn02310.gif)![](../graphics/stm_eqn02311.gif)![](../graphics/stm_eqn02312.gif)![](../graphics/stm_eqn02264.gif)![](../graphics/stm_eqn02313.gif)![](../graphics/stm_eqn02314.gif)![](../graphics/stm_eqn02315.gif)![](../graphics/stm_eqn00483.gif)![](../graphics/stm_eqn00117.gif)![](../graphics/stm_eqn02316.gif)![](../graphics/stm_eqn02317.gif)![](../graphics/stm_eqn00064.gif)
![](../graphics/stm_eqn02318.gif)![](../graphics/stm_eqn02319.gif)![](../graphics/stm_eqn02320.gif)![](../graphics/stm_eqn02321.gif)![](../graphics/stm_eqn02314.gif)![](../graphics/stm_eqn02314.gif)![](../graphics/stm_eqn02314.gif)![](../graphics/stm_eqn02322.gif)![](../graphics/stm_eqn02314.gif)![](../graphics/stm_eqn00427.gif)![](../graphics/stm_eqn00438.gif)时间离散化从时间*t*的已知解生成时间温度的插值![](../graphics/stm_eqn01111.gif)单元和时间里增量上定义为

![](../graphics/stm_eqn02323.gif)其中![](../graphics/stm_eqn02249.gif)标准等参函数，时间插值![](../graphics/stm_eqn02324.gif)线性的：

![](../graphics/stm_eqn02325.gif)其中![](../graphics/stm_eqn00883.gif)时间增量，![](../graphics/stm_eqn00454.gif)

Yu和Heinrich提出的Petrov-Galerkin离散化将这种线性插值与加权函数耦合

![](../graphics/stm_eqn02326.gif)其中

![](../graphics/stm_eqn02327.gif)![](../graphics/stm_eqn02328.gif)单元上的平均流体速度；![](../graphics/stm_eqn02329.gif)其大小；*h*是下面定义的特征单元长度度量。![](../graphics/stm_eqn00904.gif)![](../graphics/stm_eqn01219.gif)控制参数。加权中的![](../graphics/stm_eqn00904.gif)用于消除解的人工扩散，而![](../graphics/stm_eqn01219.gif)用于避免数值色散。Yu和Heinrich表明最佳选择为

![](../graphics/stm_eqn02330.gif)其中![](../graphics/stm_eqn01256.gif)单元中的局部Peclet数，*C*是局部Courant数，定义为

![](../graphics/stm_eqn02331.gif)上述![](../graphics/stm_eqn01219.gif)表达式在非常低的流体速度下产生负值，这可能使解不稳定；因此，对于低速，色散控制被关闭。

特征单元长度度量*h*由Yu和Heinrich定义如下。

设![](../graphics/stm_eqn02332.gif)穿过单元中心点的![](../graphics/stm_eqn00904.gif)参线。单元中心点处流体速度向量方向上![](../graphics/stm_eqn02332.gif)投影为

![](../graphics/stm_eqn02333.gif)然后我们定义*h*为

![](../graphics/stm_eqn02334.gif)当![](../graphics/stm_eqn01219.gif)零时，这些单元要求![](../graphics/stm_eqn02335.gif)保证数值稳定性。

由于加权函数是有偏的（"上风"），它们从一个单元到下一个单元是不连续的。因此，在处理热平衡方程的弱形式时需要一些小心（见[Hughes和Brooks，1982](07s01a01-References.md)）。特别是，传导项的通常分部积分

![](../graphics/stm_eqn02336.gif)![](../graphics/stm_eqn02337.gif)加权函数的连续部分执行：否则，不能保证单元之间热通量的连续性。为方便起见，我们将加权的连续部分写为

![](../graphics/stm_eqn02338.gif)

热平衡的弱形式为

![](../graphics/stm_eqn02339.gif)这可以重写为

![](../graphics/stm_eqn02340.gif)

![](../graphics/stm_eqn02341.gif)

![](../graphics/stm_eqn00438.gif)我们现在从时间*t*到这个方程进行积分，以提供增量的平均平衡陈述。我们使用结果

![](../graphics/stm_eqn02342.gif)

![](../graphics/stm_eqn02343.gif)和

![](../graphics/stm_eqn02344.gif)给出

![](../graphics/stm_eqn02345.gif)

对于稳态情况，忽略此方程中的第三项。在瞬态和稳态形式中，这种对流单元对热传递模型方程组的贡献不是对称的，需要使用非对称矩阵存储和求解方案。
### 参考
### 参考

### 参考

### 参考

"Abaqus Analysis User's Guide"第6.5.2节"非耦合热传递分析"
