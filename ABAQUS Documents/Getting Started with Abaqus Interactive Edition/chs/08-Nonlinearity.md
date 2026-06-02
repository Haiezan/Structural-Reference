**第8章 非线性**

**目录**

- [8.1 非线性的来源](#81-非线性的来源)
  - [8.1.1 材料非线性](#811-材料非线性)
  - [8.1.2 边界非线性](#812-边界非线性)
  - [8.1.3 几何非线性](#813-几何非线性)
- [8.2 非线性问题的求解](#82-非线性问题的求解)
  - [8.2.1 步骤、增量和迭代](#821-步骤增量和迭代)
  - [8.2.2 在Abaqus/Standard中的平衡迭代和收敛](#822-在abaqusstandard中的平衡迭代和收敛)
  - [8.2.3 Abaqus/Standard中的自动增量控制](#823-abaqusstandard中的自动增量控制)
- [8.3 在Abaqus分析中包含非线性](#83-在abaqus分析中包含非线性)
  - [8.3.1 几何非线性](#831-几何非线性)
  - [8.3.2 材料非线性](#832-材料非线性)
  - [8.3.3 边界非线性](#833-边界非线性)
- [8.4 示例：非线性斜板](#84-示例非线性斜板)
  - [8.4.1 模型修改](#841-模型修改)
  - [8.4.2 作业诊断](#842-作业诊断)
  - [8.4.3 后处理](#843-后处理)
  - [8.4.4 在Abaqus/Explicit中运行分析](#844-在abaqusexplicit中运行分析)
- [8.5 相关Abaqus示例](#85-相关abaqus示例)
- [8.6 推荐阅读](#86-推荐阅读)
- [8.7 小结](#87-小结)

---

**8.1 非线性的来源**

结构力学模拟中存在三类非线性来源：

- 材料非线性。
- 边界非线性。
- 几何非线性。

**8.1.1 材料非线性**

这种非线性可能是您最熟悉的，在第10章"材料"中有更深入的讨论。大多数金属在低应变值下具有相当线性的应力/应变关系；但在较高应变下，材料发生屈服，此时响应变为非线性和不可逆的（见图8-2）。

**图8-2** 单向拉伸弹塑性材料的应力-应变曲线。



从这些曲线可以清楚地看到此模拟的非线性特性：随着分析的进行，板变得刚硬。在此模拟中，板刚度随变形的增加是由于膜效应。因此，峰值位移小于线性分析的预测值，后者未包含此效应。

**表格数据**

创建中跨位移的表格数据报告。将这些与第5章"使用壳单元"中线性分析的位移进行比较。在此模拟中，中跨处的最大位移比从线性分析预测的值小约9%。在模拟中包含非线性几何效应可减少板中跨的垂直挠度（U3）。

**8.4.4 在Abaqus/Explicit中运行分析**

作为可选练习，您可以修改模型并在Abaqus/Explicit中运行斜板的动态分析。为此，您必须在材料定义中添加7800 kg/m³的密度，将现有步骤替换为显式动态步骤，并将单元库更改为 **Explicit**。

---

**8.5 相关Abaqus示例**

- "在平面内弯曲和内压下薄壁弯头的弹塑性崩溃"，Abaqus示例问题指南第1.1.2节
- "层合复合壳：带圆孔圆柱面板的屈曲"，Abaqus示例问题指南第1.2.2节
- "不稳定静态问题：压缩载荷下的加强板"，Abaqus示例问题指南第1.2.5节
- "单自由度系统的大旋转"，Abaqus基准指南第1.3.5节
- "张力下缆索的振动"，Abaqus基准指南第1.4.3节

---

**8.6 推荐阅读**

以下参考资料提供了非线性有限元方法的更多信息：

**非线性有限元分析的一般文本**

- Belytschko, T., W. K. Liu, and B. Moran, *Nonlinear Finite Elements for Continua and Structures*, Wiley & Sons, 2000.
- Bonet, J., and R. D. Wood, *Nonlinear Continuum Mechanics for Finite Element Analysis*, Cambridge, 1997.
- Cook, R. D., D. S. Malkus, and M. E. Plesha, *Concepts and Applications of Finite Element Analysis*, Wiley & Sons, 1989.
- Crisfield, M. A., *Non-linear Finite Element Analysis of Solids and Structures, Volume I: Essentials*, Wiley & Sons, 1991.
- Crisfield, M. A., *Non-linear Finite Element Analysis of Solids and Structures, Volume II: Advanced Topics*, Wiley & Sons, 1997.
- E. Hinton (editor), *NAFEMS Introduction to Nonlinear Finite Element Analysis*, NAFEMS Ltd., 1992.
- Oden, J. T., *Finite Elements of Nonlinear Continua*, McGraw-Hill, 1972.

---

**8.7 小结**

- 结构问题中存在三类非线性：材料、几何和边界（接触）。Abaqus分析中可能存在这些的任何组合。
- 每当位移的大小影响结构的响应时，就会发生几何非线性。它包括大位移和旋转、突跳和载荷刚化效应。
- 在Abaqus/Standard中，非线性问题是使用Newton-Raphson方法迭代求解的。非线性问题将需要比线性问题多很多的计算机资源。
- Abaqus/Explicit不需要迭代来获得解；但是，由于几何大变化导致的稳定时间增量减少可能会影响计算成本。
- 非线性分析步骤被分成若干增量。
  - Abaqus/Standard迭代以找到每个新载荷增量结束时获得的近似静力平衡。Abaqus/Standard通过在整个模拟中使用收敛控制来控制载荷增量。
  - Abaqus/Explicit通过使用比隐式分析中更小的时间增量将运动状态从一个增量推进到下一个来确定解。增量大小受稳定时间增量的限制。默认情况下，Abaqus/Explicit中时间增量完全是自动的。
- **Job Monitor** 对话框允许在分析运行时监控其进度。**Job Diagnostics** 对话框包含载荷增量和迭代的详细信息。
- 可以在每个收敛增量结束时保存结果，以便在 **Visualization** 模块中查看结构响应的演变。还可以将结果绘制为 *X–Y* 图形。
