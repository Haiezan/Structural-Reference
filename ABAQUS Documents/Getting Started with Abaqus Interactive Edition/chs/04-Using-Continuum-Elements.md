# 第4章 使用连续体单元

## 目录

- [4.1 单元公式与积分](#41-单元公式与积分)
- [4.2 选择连续体单元](#42-选择连续体单元)
- [4.3 示例：连接吊环](#43-示例连接吊环)
- [4.4 网格收敛性](#44-网格收敛性)
- [4.5 相关Abaqus示例](#45-相关abaqus示例)
- [4.6 推荐阅读](#46-推荐阅读)
- [4.7 小结](#47-小结)

---

## 4.1 单元公式与积分

通过考虑悬臂梁的静力分析（如图4-1所示），来演示单元阶次（线性或二次）、单元公式和积分阶次对结构仿真精度的影响。



**图4-28　孔周围细化的网格**

仅在高应力梯度区域使用细网格，其他地方使用粗网格。使用此局部细化网格的Abaqus/Standard模拟结果如表4-4所示。该表显示结果与非常细的网格相当，但局部细化网格的模拟比使用非常细网格的分析需要少得多的CPU时间。

**表4-4　非常细网格和局部细化网格的比较**

| 网格 | 孔底部位移 | 孔底部应力 | 相对CPU时间 |
|------|-----------|-----------|------------|
| 非常细 | 3.15E-4   | 345.E6    | 22.5       |
| 局部细化 | 3.14E-4  | 346.E6    | 3.44       |

您通常可以预测模型高应力区域的位置——因此也是需要细网格的区域——使用相似组件的知识或手工计算。也可以首先使用粗网格来识别高应力区域，然后在这些区域细化网格来获得此信息。后一种程序很容易使用Abaqus/CAE等预处理器完成。

Abaqus提供了一种称为子模型的高级功能，允许您在结构中感兴趣的区域获得更详细（和准确）的结果。来自整个结构粗网格的解用于"驱动"在该感兴趣区域使用细网格的详细局部分析。（此主题超出本指南的范围。有关详细信息，请参阅Abaqus分析用户指南第10.2.1节"子模型：概述"。）

---

## 4.5 相关Abaqus示例

如果您有兴趣了解更多关于在Abaqus中使用连续体单元的信息，应该检查以下问题：

- "悬臂梁的几何非线性分析"，Abaqus基准指南第2.1.2节
- "无限介质中的球形空腔"，Abaqus基准指南第2.2.4节
- "弯曲问题线性分析的连续体和壳单元性能"，Abaqus基准指南第2.3.5节

---

## 4.6 推荐阅读

关于有限元方法及其应用的文献量非常庞大。在本指南的其余章节中，提供了一些建议的书籍和文章列表，以便您可以更深入地探索这些主题。

**有限元方法通用文本**

- NAFEMS Ltd., *A Finite Element Primer*, 1986.
- Becker, E. B., G. F. Carey, and J. T. Oden, *Finite Elements: An Introduction*, Prentice-Hall, 1981.
- Carey, G. F., and J. T. Oden, *Finite Elements: A Second Course*, Prentice-Hall, 1983.
- Cook, R. D., D. S. Malkus, and M. E. Plesha, *Concepts and Applications of Finite Element Analysis*, John Wiley & Sons, 1989.
- Hughes, T. J. R., *The Finite Element Method*, Prentice-Hall, Inc., 1987.
- Zienkiewicz, O. C., and R. L. Taylor, *The Finite Element Method: Volumes I, II, and III*, Butterworth-Heinemann, 2000.

**线性实体单元性能**

- Prathap, G., "The Poor Bending Response of the Four-Node Plane Stress Quadrilaterals," *International Journal for Numerical Methods in Engineering*, vol. 21, 825–835, 1985.

**实体单元中的沙漏控制**

- Belytschko, T., W. K. Liu, and J. M. Kennedy, "Hourglass Control in Linear and Nonlinear Problems," *Computer Methods in Applied Mechanics and Engineering*, vol. 43, 251–276, 1984.
- Flanagan, D. P., and T. Belytschko, "A Uniform Strain Hexahedron and Quadrilateral with Hourglass Control," *International Journal for Numerical Methods in Engineering*, vol. 17, 679–706, 1981.
- Puso, M. A., "A Highly Efficient Enhanced Assumed Strain Physically Stabilized Hexahedral Element," *International Journal for Numerical Methods in Engineering*, vol. 49, 1029–1064, 2000.

**不兼容模式单元**

- Simo, J. C. and M. S. Rifai, "A Class of Assumed Strain Methods and the Method of Incompatible Modes," *International Journal for Numerical Methods in Engineering*, vol. 29, 1595–1638, 1990.

---

## 4.7 小结

- 连续体单元中使用的公式和积分阶次会对分析的准确性和成本产生重大影响。
- 使用完全积分的一阶（线性）单元容易出现剪切锁定，通常不应使用。
- 一阶减缩积分单元容易出现沙漏；足够的网格细化可以最小化此问题。
- 在使用一阶减缩积分单元进行将发生弯曲变形的模拟时，至少在厚度方向使用四个单元。
- 在Abaqus/Standard的二次减缩积分单元中，沙漏很少是问题。当没有接触时，应该考虑将这些单元用于大多数一般应用。
- Abaqus/Standard中可用的不兼容模式单元的数值准确性受单元变形量的强烈影响。
- 结果的数值准确性取决于所使用的网格。理想情况下，应该进行网格细化研究以确保网格为问题提供唯一解。但是，请记住，使用收敛网格并不能确保有限元模拟的结果将与物理问题的实际行为相匹配：这还取决于模型中的其他近似和理想化。
- 一般来说，主要在您想要准确结果的区域细化网格；预测准确应力需要比计算准确位移更细的网格。
- Abaqus提供子模型等高级功能来帮助您获得复杂模拟的有用结果。
## 4.6&nbsp;Suggested reading
## 4.7&nbsp;Summary
