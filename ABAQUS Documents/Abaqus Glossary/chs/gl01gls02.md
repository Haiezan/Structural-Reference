# A







### Abaqus/AMS

Abaqus/Standard 的附加分析功能，允许您在执行自然频率提取时选择自动多级子结构（AMS）特征值求解器。
更多信息：- [「自动多级子结构（AMS）特征值求解器」中的「自然频率提取，」Abaqus Analysis User's Guide 第 6.3.5 节](../usb/usb-link.md#usb-anl-afreqextraction-ams)

### Abaqus/Aqua

Abaqus/Standard 和 Abaqus/Explicit 的附加分析功能，用于基于稳态流、波浪和风效应计算拖曳力和浮力载荷，以模拟海上管道和浮动平台结构。Abaqus/Aqua 适用于可以简化为线元素（包括梁、管道和桁架元素）的结构。
更多信息：- [「Abaqus/Aqua 分析，」Abaqus Analysis User's Guide 第 6.11.1 节](../usb/usb-link.md#usb-anl-aaqua)

### Abaqus/CAE

完整 Abaqus 环境：一个提供简单一致的交互式图形界面的程序，用于创建、提交、监控和评估 Abaqus 模拟结果。Abaqus/CAE 分为多个模块，每个模块定义建模过程的一个逻辑方面；例如，定义几何、定义材料属性、生成网格、提交分析作业和解释结果。
更多信息：- [第一部分，「与 Abaqus/CAE 交互，」Abaqus/CAE User's Guide](../usi/usi-link.md#uss-inter-abq)

### Abaqus/CFD

一个计算流体动力学程序，在 Abaqus/CAE 中提供广泛的预处理、模拟和后处理支持。Abaqus/CFD 提供可扩展的并行 CFD 模拟能力，以解决广泛的非线性耦合流体-热和流体-结构问题。
更多信息：- [「介绍：概述，」Abaqus Analysis User's Guide 第 1.1.1 节](../usb/usb-link.md#usb-int-igeneral)

- [「流体动力学分析程序：概述，」Abaqus Analysis User's Guide 第 6.6.1 节](../usb/usb-link.md#usb-anl-afluidproc)

### Abaqus/Design

Abaqus/Standard 和 Abaqus/Explicit 的附加功能，允许使用参数变量定义 Abaqus 模型。可以使用脚本对此类模型进行参数研究，脚本生成具有参数变量不同值的模型，运行分析并收集结果。这些脚本使用 Python（一种解释型语言）开发。
更多信息：- [「参数输入，」Abaqus Analysis User's Guide 第 1.4.1 节](../usb/usb-link.md#usb-int-iparinput)

### Abaqus/Explicit

显式动力学有限元程序，使用显式时间积分提供线性和非线性、瞬态、动态分析。其强大的接触能力、可靠性和在大模型上的计算效率也使其非常适用于涉及不连续非线性行为的准静态应用。
更多信息：- [「介绍：概述，」Abaqus Analysis User's Guide 第 1.1.1 节](../usb/usb-link.md#usb-int-igeneral)

### Abaqus/Foundation

Abaqus/Standard 的可选子集，提供更经济地访问 Abaqus/Standard 中的线性静态和动态分析功能。

### Abaqus PDE（Abaqus Python Development Environment）

一个允许您创建、编辑、测试和调试 Python 脚本的应用程序。它可用于包含通用 Python 命令、Abaqus Scripting Interface 命令或 Abaqus/CAE graphical user interface（GUI）命令的脚本。
更多信息：- [第三部分，「Abaqus Python 开发环境，」Abaqus Scripting User's Guide](../cmd/cmd-link.md#cmd-pde)

### Abaqus/Standard

通用有限元程序，可用于静态、动态、热传递以及各种耦合问题的分析。Abaqus/Standard 提供自动和直接用户控制时间步长，并有效地分析线性和非线性模型的静态、动态、热和电气响应。
更多信息：- [「介绍：概述，」Abaqus Analysis User's Guide 第 1.1.1 节](../usb/usb-link.md#usb-int-igeneral)

### Abaqus/Viewer

Abaqus/CAE 的一个子集，仅包含 Visualization 模块，用于有限元模型和结果的可视化显示。它从输出数据库（ODB）获取模型和结果信息。Abaqus/Viewer 的主要功能包括未变形和变形形状绘制、结果、云图和符号绘制、*X–Y* 绘制和报告、现场输出报告、绘图自定义和动画。
更多信息：- [第五部分，「查看结果，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-vismod)

### ACIS

读取和写入 ACIS 格式文件（`*file_name*.sat`）的行业标准几何建模函数库。ACIS 文件为您提供了一种在 Abaqus/CAE 和第三方建模产品之间移动几何的方法。您可以从 ACIS 文件导入零件的基础特征；此外，您可以将零件或装配中的零件实例导出为 ACIS 文件。
更多信息：- [「使用 File 菜单，」Abaqus/CAE User's Guide 第 9.6 节](../usi/usi-link.md#usi-dbs-filepopmenu)

### active representation

将被网格化并用于分析的几何，包括模型中除参考表示和被抑制特征之外的所有几何。
更多信息：- [「理解中面建模，」Abaqus/CAE User's Guide 第 35.1 节](../usi/usi-link.md#usi-adv-midsurface-understand)

### adaptive remeshing

基于求解结果中选定误差指示器的自动网格细化过程。
更多信息：- [「自适应网格重划分：概述，」Abaqus Analysis User's Guide 第 12.3.1 节](../usb/usb-link.md#usb-anl-aadpover)

### adaptivity process

Abaqus/CAE 在自适应网格重划分期间创建的分析作业序列。每个作业使用由 Abaqus/CAE 基于输出数据库中误差指示器输出变量的值和您的重划分规则中的设置生成的网格。
更多信息：- [「理解适应过程，」Abaqus/CAE User's Guide 第 19.3 节](../usi/usi-link.md#usi-ana-adaptivityconcepts)

### ALE（Arbitrary Lagrangian-Eulerian）adaptive meshing

一种结合纯 Lagrangian 分析和纯 Eulerian 分析特征的技术，用于控制发生大变形或材料损失时的元素畸变。ALE 允许网格独立于材料移动，但不会改变网格的拓扑结构（元素和连接性）。
更多信息：- [「ALE 自适应网格：概述，」Abaqus Analysis User's Guide 第 12.2.1 节](../usb/usb-link.md#usb-anl-aaleover)

### analysis input file

请参阅 [input file](gl01gls10.md#gls-inputfile)。

### analysis input file processor

Abaqus 的一个组件，用于处理输入文件并将生成的数据提交给相应的分析程序（Abaqus/Standard、Abaqus/Explicit 或 Abaqus/CFD）。输入文件处理器解释 Abaqus 选项，执行必要的一致性检查，并为分析程序准备数据。
更多信息：- [「在 Abaqus 中定义模型，」Abaqus Analysis User's Guide 第 1.3.1 节](../usb/usb-link.md#usb-int-imodel)

### analysis procedure

请参阅 [procedure](gl01gls17.md#gls-procedure)。

### Analytical Field toolset

Abaqus/CAE 工具集，允许您在 Interaction 模块或 Load 模块中为选定的相互作用和预设条件定义空间变化参数。
更多信息：- [第 58 章，「The Analytical Field toolset，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-fld)

### analytical rigid part

请参阅 [analytical rigid surface](gl01gls02.md#gls-analyticalrigidsurface)。

### analytical rigid surface

具有可用直线和曲线段描述的轮廓的不可变形几何表面。这些轮廓可以沿生成矢量扫过或绕轴旋转形成三维表面。解析刚体表面不是基于元素的，因此可以精确建模许多表面几何形状，并可能降低分析的计算成本。
更多信息：- [「解析刚体表面定义，」Abaqus Analysis User's Guide 第 2.3.4 节](../usb/usb-link.md#usb-int-arigidsurf)

- [「刚体零件，」Abaqus/CAE User's Guide 第 11.7.1 节](../usi/usi-link.md#usi-prt-conc-rigid)

### anchor points

在 Abaqus/CAE 中，控制文本和箭头注释运动的 viewport 点。
更多信息：- [「什么是箭头和文本注释？，」Abaqus/CAE User's Guide 第 4.1.2 节](../usi/usi-link.md#uss-cnv-whatis-anno)

在 Abaqus/Standard 接触相互作用中，由小幅滑动跟踪方法在表面上创建的点，用于定义平面接触约束的位置和方向。
更多信息：- [「Abaqus/Standard 中的接触公式，」Abaqus Analysis User's Guide 第 38.1.1 节](../usb/usb-link.md#usb-cni-acontactpairform)

### angle method

Abaqus/CAE 中允许您根据项目之间的空间角度选择多个面、边、元素、元素面或节点的过程。
更多信息：- [「使用角度和特征边方法选择多个对象，」Abaqus/CAE User's Guide 第 6.2.3 节](../usi/usi-link.md#uss-pic-byangle)

### annotation

使用 Abaqus/CAE 时创建的说明性注释或符号。Abaqus/CAE 自动生成多种类型的注释。Abaqus/CAE 生成的 viewport 注释包括 triad 以及 Visualization 模块绘图的图例、标题块和状态块。
更多信息：- [「什么是箭头和文本注释？，」Abaqus/CAE User's Guide 第 4.1.2 节](../usi/usi-link.md#uss-cnv-whatis-anno)

- [第 56 章，「自定义 viewport 注释，」Abaqus/CAE User's Guide](../usi/usi-link.md#usv-general)

### assembly

定位的零件实例的集合。一个模型只包含一个装配。
更多信息：- [「定义装配，」Abaqus Analysis User's Guide 第 2.10.1 节](../usb/usb-link.md#usb-int-ipartassy)

- [第 13 章，「The Assembly module，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-asm)

### Assembly module

Abaqus/CAE 模块，用于创建零件实例并通过在全局坐标系中相对于彼此定位这些实例来构建装配。
更多信息：- [第 13 章，「The Assembly module，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-asm)

### assembly-related modules

在 viewport 中显示装配的 Abaqus/CAE 模块。Assembly、Step、Interaction、Load 和 Mesh 模块被视为与装配相关的模块。
更多信息：- [「什么是模块？，」Abaqus/CAE User's Guide 第 2.3 节](../usi/usi-link.md#uss-top-whatis-module)

### assembly set

点、边、曲面或体的命名分组，用于标识 Abaqus/CAE 装配的区域。
更多信息：- [「零件集和装配集有何不同？，」Abaqus/CAE User's Guide 第 73.2.2 节](../usi/usi-link.md#usi-set-conc-difference)

### attachment line

Abaqus/CAE 中的功能，允许您通过将选定点投影穿过多个面来指定离散紧固件的位置。
更多信息：- [「了解附着点和附着线，」Abaqus/CAE User's Guide 第 59.1 节](../usi/usi-link.md#usi-att-conc-attach-methods)

### attachment point

Abaqus/CAE 中的功能，允许您为基于点的紧固件指定 [positioning point](gl01gls17.md#gls-positioningpoint) 的位置。
更多信息：- [「了解附着点和附着线，」Abaqus/CAE User's Guide 第 59.1 节](../usi/usi-link.md#usi-att-conc-attach-methods)

### Attachment toolset

Abaqus/CAE 工具集，在 Property、Assembly 和 Interaction 模块中可用，允许您创建和管理附着点和附着线，可用于创建基于点和离散的紧固件。
更多信息：- [第 59 章，「The Attachment toolset，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-att)

### AutoCAD files

存储在 AutoCAD 文件（`*file_name*.dxf`）中的二维轮廓，可作为独立草图导入 Abaqus/CAE。
更多信息：- [「导入的草图，」Abaqus/CAE User's Guide 第 20.3.2 节](../usi/usi-link.md#usi-ske-import)
