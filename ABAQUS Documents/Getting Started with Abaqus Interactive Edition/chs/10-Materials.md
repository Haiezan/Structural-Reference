# 第10章 材料

## 目录

- [10.1 在Abaqus中定义材料](#101-在abaqus中定义材料)
- [10.2 延性金属中的塑性](#102-延性金属中的塑性)
- [10.3 弹塑性问题单元选择](#103-弹塑性问题单元选择)
- [10.4 示例：带塑性的连接吊环](#104-示例带塑性的连接吊环)
- [10.5 示例：加筋板上的爆炸载荷](#105-示例加筋板上的爆炸载荷)
- [10.6 超弹性](#106-超弹性)
- [10.7 示例：轴对称支架](#107-示例轴对称支架)
- [10.8 大变形网格设计](#108-大变形网格设计)
- [10.9 减少体积锁定的技术](#109-减少体积锁定的技术)
- [10.10 相关Abaqus示例](#1010-相关abaqus示例)
- [10.11 推荐阅读](#1011-推荐阅读)
- [10.12 小结](#1012-小结)

---

## 10.1 在Abaqus中定义材料

在仿真中可以使用任意数量的不同材料。每个材料定义都有一个名称。模型中的不同区域通过引用材料名称的截面属性与不同的材料定义相关联。

---

## 10.2 延性金属中的塑性

许多金属在低应变幅值下具有近似线弹性行为（见图10-1），材料的刚度（即杨氏模量或弹性模量）是恒定的。



从此图可以明显看出，橡胶模型关键区域的网格畸变已显著减少。检查压力应力的等值线图（不跨元素平均）显示压力应力在元素之间平滑变化。因此，体积锁定已被消除。

---

## 10.10 相关Abaqus示例

- "Pressurized rubber disc," Abaqus Benchmarks Guide第1.1.7节
- "Necking of a round tensile bar," Abaqus Benchmarks Guide第1.1.9节
- "Fitting of rubber test data," Abaqus Benchmarks Guide第3.1.4节
- "Uniformly loaded, elastic-plastic plate," Abaqus Benchmarks Guide第3.2.1节

---

## 10.11 推荐阅读

以下为感兴趣的用户提供材料建模方面的额外参考资料。

**材料通用文本**
- Ashby, M. F., and D. R. H. Jones, *Engineering Materials*, Pergamon Press, 1980.
- Callister, W. D., *Materials Science & Engineering—An Introduction*, John Wiley, 1994.
- Pascoe, K. J., *An Introduction to the Properties of Engineering Materials*, Van Nostrand, 1978.

**塑性**
- SIMULIA, *Metal Inelasticity in Abaqus*.
- Lubliner, J., *Plasticity Theory*, Macmillan Publishing Co., 1990.
- Calladine, C. R., *Engineering Plasticity*, Pergamon Press, 1969.

**橡胶弹性**
- SIMULIA, *Modeling Rubber and Viscoelasticity with Abaqus*.
- Gent, A., *Engineering with Rubber (How to Design Rubber Components)*, Hanser Publishers, 1992.

---

## 10.12 小结

- Abaqus包含丰富的材料行为建模库。它包括金属塑性和橡胶弹性模型。
- 金属塑性模型的应力-应变数据必须以真应力和真塑性应变的形式定义。标称应力-应变数据可以很容易地转换为真应力-应变数据。
- Abaqus中的金属塑性模型假定不可压缩的塑性行为。
- 为效率，Abaqus/Explicit通过用等间距点组成的曲线拟合来**规则化**用户定义的材料曲线。
- Abaqus/Standard中的超弹性材料模型允许完全不可压缩。Abaqus/Explicit中的超弹性材料模型不允许：默认泊松比为0.475。一些分析可能需要增加泊松比以更准确地模拟不可压缩性。
- 多项式、Ogden、Arruda-Boyce、Marlow、van der Waals、Mooney-Rivlin、neo-Hookean、减缩多项式和Yeoh应变能函数可用于橡胶弹性（超弹性）。所有模型都允许直接从实验测试数据确定材料系数。测试数据必须指定为标称应力和标称应变值。
- Abaqus/CAE中的材料评估功能可用于验证超弹性材料模型预测的行为与实验测试数据之间的相关性。
- 稳定性警告可能表明超弹性材料模型不适合您希望分析应变范围。
- 对称的存在可用于减少仿真的规模，因为只需要对组件的一部分进行建模。组件的其余部分的影响通过施加适当的边界条件来表示。
- 大变形问题的网格设计比小位移问题更困难。网格中的元素在分析的任何阶段都不应变得过度畸变。
- 体积锁定可以通过允许少量可压缩性来缓解。必须注意确保引入问题的可压缩性程度不会严重影响整体结果。
- Abaqus/CAE中的X-Y绘图功能允许操作曲线中的数据以创建新曲线。可以添加、减去、乘或除两个曲线或一个曲线和一个常数。曲线也可以被微分、积分和组合。

---

*上一页：[第9章 非线性显式动力学](./09-Nonlinear-Explicit-Dynamics.md) | 下一页：[第11章 多步骤分析](./11-Multiple-Step-Analysis.md)*
### 10.5&nbsp;Example: blast loading on a stiffened plate
### 10.5.3&nbsp;Reviewing the analysis
### 10.6&nbsp;Hyperelasticity
### 10.7&nbsp;Example: axisymmetric mount
### 10.8&nbsp;Mesh design for large distortions
### 10.9&nbsp;Techniques for reducing volumetric locking
### 10.10&nbsp;Related Abaqus examples
### 10.11&nbsp;Suggested reading
### 10.12&nbsp;Summary
