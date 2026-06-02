# 8.1 非线性的来源

在结构力学模拟中有三种非线性的来源：

- 材料非线性
- 边界非线性
- 几何非线性

## 8.1.1 材料非线性

这种类型的非线性可能是你最熟悉的，在《第10章，材料》中会更深入地介绍。大多数金属在低应变值时具有相当线性的应力/应变关系；但在较高应变时，材料发生屈服，此时响应变为非线性且不可逆（见图8-2）。

**图8-2** 单向拉伸下弹塑性材料的应力-应变曲线。

![](../graphics/gss-elastplast-nls.png)![](../graphics/gss-rubbertype-nls.png)![](../graphics/gss-cantilever.png)![](../graphics/gss-deflection.png)![](../graphics/gss-snap-through-nls.png)

在这个例子中，面板在变形过程中刚度发生了显著变化。当面板"突跳"时，刚度变为负值。因此，尽管位移相对于面板尺寸的大小很小，但在模拟中存在显著的几何非线性，必须加以考虑。

这里应该注意分析产品之间一个重要区别：默认情况下，Abaqus/Standard假定小变形，而Abaqus/Explicit假定大变形。
## 8.1.2 Boundary nonlinearity
## 8.1.3 Geometric nonlinearity
