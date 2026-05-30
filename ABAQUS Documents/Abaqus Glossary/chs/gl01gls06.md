# E







### eddy currents

在置于时变磁场中的导体中产生的电流。Abaqus/Standard 提供了电磁功能，可以求解时谐和瞬态涡流问题。
更多信息：- [「涡流分析，」Abaqus Analysis User's Guide 第 6.7.5 节](../usb/usb-link.md#usb-anl-aeddycurrent)

### edge parameter

沿边的位置，表示为长度的一部分。 edge parameter 用于分割边和沿边定位基准。Abaqus/CAE 沿边显示一个箭头，指示从起点顶点（对应于零的边参数值）到终点顶点（对应于值一）的参数增加方向。
更多信息：- [「通过输入边参数创建基准点，」Abaqus/CAE User's Guide 第 62.6.5 节](../usi/usi-link.md#usi-dtm-point-edgeparam)

- [「使用输入参数方法分割边，」Abaqus/CAE User's Guide 第 70.5.2 节](../usi/usi-link.md#usi-par-sptedgeparameterbtn)

### element set

元素的命名集合。
更多信息：- [「元素定义，」Abaqus Analysis User's Guide 第 2.2.1 节](../usb/usb-link.md#usb-int-ielement)

- [第 73 章，「The Set and Surface toolsets，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-set)

### Elysium Neutral file

用于使用适当的 Elysium 翻译器插件从以下 CAD 应用程序导入几何的文件格式：
- NX 使用 Abaqus/CAE NX 关联接口。
- Pro/ENGINEER 使用 Pro/ENGINEER 关联接口。

您可以导入 Elysium 中性文件格式的零件；但是，不能以 Elysium 中性文件格式导出零件。
更多信息：- [「可以从 Abaqus/CAE 导入和导出哪些类型的文件？，」Abaqus/CAE User's Guide 第 10.1.1 节](../usi/usi-link.md#usi-imp-concepts-whatkind)

- [「导入零件，」Abaqus/CAE User's Guide 第 10.7.2 节](../usi/usi-link.md#usi-dbs-import-part)

### encastre

固定位移和旋转边界条件。

### encrypt

将 Abaqus 数据文件转换为编码的密码保护格式，只有授权方才能访问。 **abaqus encrypt** 实用程序旨在加密您在输入（`.inp`）文件或其他数据文件中通过引用包含的数据。
更多信息：- [「加密和解密 Abaqus 输入数据，」Abaqus Analysis User's Guide 第 3.2.38 节](../usb/usb-link.md#usb-int-dencryptproc)

### EPS（Encapsulated PostScript）

一种 PostScript 变体，描述设计包含在较大文档中而不进行修改的单个图形。Abaqus/CAE 允许您将选定 viewport 的图像保存为 EPS 格式文件。
更多信息：- [「打印图像格式，」Abaqus/CAE User's Guide 第 8.1.1 节](../usi/usi-link.md#uss-pri-conc-gif)

### equation solver

Abaqus/Standard 中线性方程组求解的求解过程。可用的线性方程组求解技术包括直接线性方程求解器、迭代线性方程求解器、子空间迭代特征值求解器、Lanczos 特征值求解器和 AMS 特征值求解器。
更多信息：- [「直接线性方程求解器，」Abaqus Analysis User's Guide 第 6.1.5 节](../usb/usb-link.md#usb-anl-asolveroverview)

- [「迭代线性方程求解器，」Abaqus Analysis User's Guide 第 6.1.6 节](../usb/usb-link.md#usb-anl-aitrsolveroverview)

- [「选择特征值提取方法」中的「特征值屈曲预测，」Abaqus Analysis User's Guide 第 6.2.3 节](../usb/usb-link.md#usb-anl-aeigenbuckling-eigensolver)

- [「动态分析程序：概述，」Abaqus Analysis User's Guide 第 6.3.1 节](../usb/usb-link.md#usb-anl-adynamicproc)

- [「自然频率提取，」Abaqus Analysis User's Guide 第 6.3.5 节](../usb/usb-link.md#usb-anl-afreqextraction)

### error indicator

在自适应网格划分期间用于测量基求解误差的指标。误差指示器确定网格需要在哪里细化以达到误差目标。
更多信息：- [「影响自适应重划分的误差指示器选择，」Abaqus Analysis User's Guide 第 12.3.2 节](../usb/usb-link.md#usb-anl-aadperrorindicators)

### error indicator output variable

选择用于计算误差指示器的输出变量。误差指示器输出变量带有「ERI」后缀；例如 MISESERI。
更多信息：- [「影响自适应重划分的误差指示器选择，」Abaqus Analysis User's Guide 第 12.3.2 节](../usb/usb-link.md#usb-anl-aadperrorindicators)

### error target

用户定义的重划分目标，描述为误差指示器输出变量归一化形式的百分比目标。特定变量的误差指示器归一化形式是误差指示器值与基求解值的比率。
更多信息：- [「影响自适应重划分的误差指示器选择，」Abaqus Analysis User's Guide 第 12.3.2 节](../usb/usb-link.md#usb-anl-aadperrorindicators)

### Eulerian analysis

一种有限元技术，其中材料可以流过模型网格中的元素。Abaqus 提供了两种 Eulerian 技术实现：纯 Eulerian 分析和任意 Lagrangian-Eulerian（ALE）自适应网格。在纯 Eulerian 分析中，网格是刚性的，模型行为由材料通过网格的流动定义。ALE 自适应网格是一种在同一个网格中结合 Lagrangian 分析和 Eulerian 分析特征的技术，以在涉及大变形的分析期间保持高质量网格。
更多信息：- [「ALE 自适应网格：概述，」Abaqus Analysis User's Guide 第 12.2.1 节](../usb/usb-link.md#usb-anl-aaleover)

- [「Eulerian 分析，」Abaqus Analysis User's Guide 第 14.1.1 节](../usb/usb-link.md#usb-anl-aeuleriananalysis)

- [第 28 章，「Eulerian 分析，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-adv-eulerian)

### Eulerian-Lagrangian analysis

在同一模型中纯 Eulerian 零件实例和纯 Lagrangian 零件实例之间相互作用的有限元技术。可以在 Lagrangian 部分中的元素和 Eulerian 部分中的材料边界之间定义接触。
更多信息：- [「Eulerian 分析，」Abaqus Analysis User's Guide 第 14.1.1 节](../usb/usb-link.md#usb-anl-aeuleriananalysis)

- [第 28 章，「Eulerian 分析，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-adv-eulerian)

### Eulerian part

在 Eulerian 分析中充当材料可以流入的域的零件。您可以在 Abaqus/CAE 中创建或导入的任意形状的三维零件都可以指定为 Eulerian part。
更多信息：- [「零件类型，」Abaqus/CAE User's Guide 第 11.4.2 节](../usi/usi-link.md#usi-prt-conc-type)

### extended functionality release

提供对为下一个通用发布开发的子集功能的早期访问的 Abaqus 发布。扩展功能发布由产品名称和版本号后跟 EF 和一位数字指定，例如 Abaqus 6.14-EF1（扩展功能通用发布）和 Abaqus 6.14-EF2（扩展功能维护交付）。另请参阅 [general release](gl01gls08.md#gls-generalrelease) 和 [maintenance delivery](gl01gls14.md#gls-maintdelivery)。
