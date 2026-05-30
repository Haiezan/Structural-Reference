# C







### CAD Connection toolset

Abaqus/CAE 工具集，允许您从 Abaqus/CAE 到第三方 CAD 系统创建连接；您可以使用 CAD 系统修改模型或更改其位置，并且可以使用已建立的连接在 Abaqus/CAE 中快速更新模型。
更多信息：- [第 60 章，「The CAD Connection toolset，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-cad)

### canvas

Abaqus/CAE 主窗口中进行工作的区域。
更多信息：- [第 4 章，「在画布上管理 viewports，」Abaqus/CAE User's Guide](../usi/usi-link.md#uss-cnv)

### CATIA

Dassault Systèmes 的 CAD/CAM/CAE 软件包。CATIA 格式的零件和装配可以导入 Abaqus/CAE。
更多信息：- [「可以从 Abaqus/CAE 导入和导出哪些类型的文件？，」Abaqus/CAE User's Guide 第 10.1.1 节](../usi/usi-link.md#usi-imp-concepts-whatkind)

### chamfer

连接两个表面的直线混合，创建斜切边缘。
更多信息：- [「混合特征，」Abaqus/CAE User's Guide 第 11.9.5 节](../usi/usi-link.md#usi-prt-conc-round)

### check box

Abaqus/CAE 对话框的元素，可用于交替关闭或打开特定选项。
更多信息：- [「使用基本对话框组件，」Abaqus/CAE User's Guide 第 3.2.1 节](../usi/usi-link.md#uss-int-dialog-basic)

### child feature

Abaqus/CAE 中的特征，创建时依赖于称为父特征的现有特征，以获取几何和尺寸信息。当您修改父特征时，修改可能会更改其子特征。同样，当您删除父特征时，Abaqus/CAE 会自动删除其所有子特征。
更多信息：- [「零件和特征之间的关系，」Abaqus/CAE User's Guide 第 11.3.1 节](../usi/usi-link.md#usi-prt-conc-parts-features)

### coarsening rate limit

您在重划分规则中指定的限制，用于调节当 Abaqus/CAE 自适应重划分网格时将较大元素引入网格的速率。
更多信息：- [「细化和粗化速率因子」中的「基于求解的网格尺寸，」Abaqus Analysis User's Guide 第 12.3.3 节](../usb/usb-link.md#usb-anl-aadpsizing-ratefactors)

- [「选择重划分规则约束，」Abaqus/CAE User's Guide 第 17.21.4 节](../usi/usi-link.md#usi-mgn-adaptivity-ruleconstraints)

### co-execution

在 Abaqus/CAE 中相互同步执行的两个 Abaqus 分析作业的协同模拟执行。
更多信息：- [「结构到结构协同模拟，」Abaqus Analysis User's Guide 第 17.3.1 节](../usb/usb-link.md#usb-anl-acosimabqtoabq)

- [「流体到结构和共轭热传递协同模拟，」Abaqus Analysis User's Guide 第 17.3.2 节](../usb/usb-link.md#usb-anl-acosimcfdtoabq)

- [「了解分析作业，」Abaqus/CAE User's Guide 第 19.2 节](../usi/usi-link.md#usi-ana-concepts)

- [第 26 章，「Co-simulation，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-adv-cosimulations)

### compass

请参阅 [3D compass](gl01gls01.md#gls-3dcompass)。

### compatible mesh

两个网格之间的界面，其中网格拓扑在界面上是一致的。
更多信息：- [「零件实例之间的兼容网格，」Abaqus/CAE User's Guide 第 17.14.3 节](../usi/usi-link.md#usi-mgn-advanced-compatibility)

### connector

在 Abaqus 分析中，对模型组件之间的机械接头或紧固件行为进行建模的元素，可能包括（非线性）力与位移（或速度）的关系、摩擦、损伤和其他现象。
更多信息：- [第 31 章，「Connector Elements，」Abaqus Analysis User's Guide](../usb/usb-link.md#usbconnector)

在 Abaqus/CAE 模型中，允许您对装配中两点之间的机械关系进行建模的连接。
更多信息：- [「什么是 connector？，」Abaqus/CAE User's Guide 第 24.2 节](../usi/usi-link.md#usi-adv-conn-whatis)

### constraint

在建模相互作用中，在模拟期间强制执行的特定自由度之间的关系；例如，线性约束、一般约束和运动耦合。
更多信息：- [第 35 章，「Constraints，」Abaqus Analysis User's Guide](../usb/usb-link.md#usbconstraints)

在预设条件下，自由度的预设值。另请参阅 [boundary condition](gl01gls03.md#gls-boundarycondition)。
更多信息：- [「管理预设条件，」Abaqus/CAE User's Guide 第 16.3 节](../usi/usi-link.md#usi-lbi-edit-manager)

在 Abaqus/CAE 装配中，指定零件之间几何关系以建立其相对位置的特征。
更多信息：- [「位置约束方法有何不同，」Abaqus/CAE User's Guide 第 13.5.2 节](../usi/usi-link.md#usi-asm-concept-alignmate)

在 Abaqus/CAE 草图中，用于指定草图中实体之间几何关系的特征。
更多信息：- [「自定义 Sketcher 中约束的使用，」Abaqus/CAE User's Guide 第 20.9.10 节](../usi/usi-link.md#usi-ske-constraintsframe)

### constraint control point

耦合约束定义中耦合表面运动被约束到的点。
更多信息：- [「耦合约束，」Abaqus Analysis User's Guide 第 35.3.2 节](../usb/usb-link.md#usb-cni-pcoupling)

- [「定义耦合约束，」Abaqus/CAE User's Guide 第 15.15.4 节](../usi/usi-link.md#usi-itn-helptopic-coupling)

### constraint region

耦合约束所涉及的基于元素或基于节点的表面。
更多信息：- [「耦合约束，」Abaqus Analysis User's Guide 第 35.3.2 节](../usb/usb-link.md#usb-cni-pcoupling)

- [「定义耦合约束，」Abaqus/CAE User's Guide 第 15.15.4 节](../usi/usi-link.md#usi-itn-helptopic-coupling)

### construction geometry

Abaqus/CAE Sketch 模块中的点、线或圆，帮助您在草图中定位和对齐对象。 construction geometry 仅在绘制时可见，退出 Sketch 模块后，在您创建或修改的零件或装配上不可见。
更多信息：- [「构造几何，」Abaqus/CAE User's Guide 第 20.5.2 节](../usi/usi-link.md#usi-ske-congeo)

- [「连接器：概述，」Abaqus Analysis User's Guide 第 31.1.1 节](../usb/usb-link.md#usb-elm-econnectoroverview)

### contact initialization

在 Abaqus 一般接触定义中，用于在分析开始时调整表面位置的一组规则。 contact initialization 旨在对由网格离散化引起的轻微过闭合或间隙进行轻微校正。
更多信息：- [「控制 Abaqus/Standard 中的初始接触状态，」Abaqus Analysis User's Guide 第 36.2.4 节](../usb/usb-link.md#usb-cni-agenlcontinitializationstd)

- [「控制 Abaqus/Explicit 中一般接触的初始接触状态，」Abaqus Analysis User's Guide 第 36.4.4 节](../usb/usb-link.md#usb-cni-aadjustgeneral)

- [「接触初始化编辑器，」Abaqus/CAE User's Guide 第 15.9.5 节](../usi/usi-link.md#usi-itn-manage-continiteditor)

### contact pair

可以根据机械、热、电气或孔隙流体接触属性相互作用的两个模型表面。
更多信息：- [「在 Abaqus/Standard 中定义接触对，」Abaqus Analysis User's Guide 第 36.3 节](../usb/usb-link.md#usbcontactpairstd)

- [「在 Abaqus/Explicit 中定义接触对，」Abaqus Analysis User's Guide 第 36.5 节](../usb/usb-link.md#usbcontactpairexp)

### context bar

Abaqus/CAE GUI 的一部分，位于画布和绘图区域正上方，包含 **Module** 列表，您可以从该列表中选择模块；上下文栏中的其他项目是您正在工作的模块的功能。（Abaqus/Viewer 仅包含 Visualization 模块。）
更多信息：- [「主窗口的组件，」Abaqus/CAE User's Guide 第 2.2.1 节](../usi/usi-link.md#uss-top-mainabqwindow)

### context-sensitive help

一组详细说明，允许您立即访问 Abaqus/CAE 在线指南中的特定信息。通过从主菜单栏选择 ****Help**![](../graphics/images/arrow.gif)**On Context****，然后单击 Abaqus/CAE 窗口或对话框的几乎任何特征来调用上下文相关帮助。
更多信息：- [「显示上下文相关帮助，」Abaqus/CAE User's Guide 第 2.6.1 节](../usi/usi-link.md#uss-gst-cshelp)

### contour plot

Abaqus/CAE Visualization 模块的图形输出，显示在指定步骤和帧中特定分析变量的值。这些值以彩色线、彩色带或彩色面的形式显示在模型上，具体取决于您选择的自定义选项。
更多信息：- [第 44 章，「对分析结果进行等值线绘制，」Abaqus/CAE User's Guide](../usi/usi-link.md#usv-contour)

### CORM（components of relative motion）

相对于连接器的局部位移和旋转。
更多信息：- [「连接器类型库，」Abaqus Analysis User's Guide 第 31.1.5 节](../usb/usb-link.md#usb-elm-econnectortypelibrary)

- [「创建连接器截面，」Abaqus/CAE User's Guide 第 15.12.11 节](../usi/usi-link.md#usi-itn-help-createconnprop)

### co-simulation

一种多物理场能力，在 Abaqus 内或作为单独的附加分析功能提供多种功能，用于 Abaqus 与另一个分析程序的运行时耦合。Abaqus 分析可以耦合到另一个 Abaqus 分析或第三方分析程序，以执行多学科模拟和多域（多模型）耦合。
更多信息：- [「协同模拟：概述，」Abaqus Analysis User's Guide 第 17.1.1 节](../usb/usb-link.md#usb-anl-acosimulationover)

- [第 26 章，「Co-simulation，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-adv-cosimulations)

### CSYS（coordinate system）

Abaqus/CAE 基准坐标系，可以是矩形、圆柱形或球形。
更多信息：- [「创建基准坐标系，」Abaqus/CAE User's Guide 第 62.9 节](../usi/usi-link.md#usi-dtm-csys)

### current viewport

画布上的一个窗口，通过与其他 viewports 不同的颜色标题栏标识，在该窗口中进行 Abaqus/CAE 工作。在任何给定时间只有一个 current viewport。
更多信息：- [「什么是 viewport？，」Abaqus/CAE User's Guide 第 4.1.1 节](../usi/usi-link.md#uss-cnv-whatis-viewport)

### custom view

Abaqus/CAE 允许您应用于选定 viewport 中对象的预定义视图（位置、方向和比例因子的特定组合）。自定义视图包括正面、背面、左面、右面、顶面、底面和等轴测，以及四个用户定义的视图。
更多信息：- [「自定义视图，」Abaqus/CAE User's Guide 第 5.2.8 节](../usi/usi-link.md#uss-viw-under-predefviews)
