# D







### damage evolution

在满足一个或多个损伤起始准则后定义材料如何退化的法则。多种形式的损伤演化可以同时作用于材料上，每个损伤起始准则对应一种。
更多信息：- [「韧性金属的损伤演化和元素去除，」Abaqus Analysis User's Guide 第 24.2.3 节](../usb/usb-link.md#usb-mat-cdamageevolductile)

- [「纤维增强复合材料的损伤演化和元素去除，」Abaqus Analysis User's Guide 第 24.3.3 节](../usb/usb-link.md#usb-mat-cdamageevolfibercomposite)

- [「低循环疲劳中韧性材料的损伤演化，」Abaqus Analysis User's Guide 第 24.4.3 节](../usb/usb-link.md#usb-mat-cdamageevolfatigue)

- [「定义损伤」中的「损伤演化，」Abaqus/CAE User's Guide 第 12.9.3 节](../usi/usi-link.md#usi-prp-mechanical-damage-evolution)

### damage initiation criteria

将引发裂纹的条件。它们可以基于最大主应力或最大主应变来代表材料的行为。
更多信息：- [第 24 章，「Progressive Damage and Failure，」Abaqus Analysis User's Guide](../usb/usb-link.md#usbdamage)

- [「定义损伤，」Abaqus/CAE User's Guide 第 12.9.3 节](../usi/usi-link.md#usi-prp-mechanical-damage)

### data check

Abaqus/Standard、Abaqus/Explicit 或 Abaqus/CFD 的简写执行，仅检查模型是否一致以及是否设置了所有必需的模型选项。
更多信息：- [「Abaqus/Standard、Abaqus/Explicit 和 Abaqus/CFD 执行，」Abaqus Analysis User's Guide 第 3.2.2 节](../usb/usb-link.md#usb-int-danalysisproc)

- [「对模型执行数据检查，」Abaqus/CAE User's Guide 第 19.7.3 节](../usi/usi-link.md#usi-ana-jobman-datacheckbtn)

- [「对适应过程执行数据检查，」Abaqus/CAE User's Guide 第 19.9.2 节](../usi/usi-link.md#usi-ana-adpman-datacheckbtn)

### data line

Abaqus/Standard、Abaqus/Explicit 或 Abaqus/CFD 输入文件中的一行，用于提供比选项上的参数更容易以列表形式给出的数据。如果需要数据行，它必须紧跟在引入选项的关键字行之后。
更多信息：- [「输入语法规则，」Abaqus Analysis User's Guide 第 1.2.1 节](../usb/usb-link.md#usb-int-iinputsyntax)

### datum

Abaqus/CAE 模型的特征，表示可用于在建模零件或装配时进行参考的辅助几何。可用的 datum 类型包括：点、轴、平面和坐标系。
更多信息：- [「了解基准几何的作用，」Abaqus/CAE User's Guide 第 62.1 节](../usi/usi-link.md#usi-dtm-intro)

### Datum toolset

Abaqus/CAE 工具集，用于相对于现有几何（如顶点、平面和边）以及现有基准几何创建基准点、轴、平面和坐标系。
更多信息：- [第 62 章，「The Datum toolset，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-dtm)

### decoration

Abaqus/CAE viewport 标题和 viewport 边框。
更多信息：- [「使用 viewports，」Abaqus/CAE User's Guide 第 4.3 节](../usi/usi-link.md#uss-cnv-workwith-viewports)

### deformable part

可以在载荷下变形的零件。另请参阅 [discrete rigid part](gl01gls05.md#gls-discreterigid)。
更多信息：- [「零件类型，」Abaqus/CAE User's Guide 第 11.4.2 节](../usi/usi-link.md#usi-prt-conc-type)

### deformation scale factor

当您在 Abaqus/CAE 中显示变形模型绘图时应用于变形场的因子。您可以缩放变形以放大、缩小或以其他方式扭曲变形模型形状。
更多信息：- [「缩放变形，」Abaqus/CAE User's Guide 第 55.4.1 节](../usi/usi-link.md#usv-custom-deffactorframe)

### deformed field output variable

控制 Abaqus/CAE 中变形形状绘图中模型形状的变量。变形场输出变量只能是向量量，如位移或速度。
更多信息：- [「选择变形场输出变量，」Abaqus/CAE User's Guide 第 42.5.4 节](../usi/usi-link.md#usv-res-deformedtabbtn)

### deformed shape plot

Abaqus/CAE 绘图，根据您指定的变形场输出变量的值显示模型在分析结果的指定步骤和帧处的形状。
更多信息：- [第 43 章，「绘制未变形和变形形状，」Abaqus/CAE User's Guide](../usi/usi-link.md#usv-deformed)

### degrees of freedom（dof）

分析期间计算的基本变量：完整指定身体或系统的位移或变形位置和方向的独立位移和/或旋转集合。例如，在应力/位移分析中，自由度是平移。对于壳和梁元素，自由度是每个节点处的旋转。
更多信息：- [「约定，」Abaqus Analysis User's Guide 第 1.2.2 节](../usb/usb-link.md#usb-int-iconventions)

### Discrete Field toolset

Abaqus/CAE 工具集，允许您在 Property 模块、Interaction 模块或 Load 模块中创建和管理离散场。离散场将唯一值与网格模型中的单个节点或元素相关联。您可以使用离散场为选定模型属性定义空间变化参数，例如在初始温度预定义场中随节点变化的温度。
更多信息：- [第 63 章，「The Discrete Field toolset，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-dfl)

### discrete orientation

每个原生或孤立网格元素的空间变化方向的定义。离散方向可以基于零件的拓扑结构。您定义 [normal axis](gl01gls15.md#gls-normalaxis) 和 [primary axis](gl01gls17.md#gls-primaryaxis)，Abaqus/CAE 使用这些轴构建右手笛卡尔坐标系。有多种选择方法可用于定义所需轴。离散方向可用于材料方向和复合铺层方向。
更多信息：- [「将离散方向用于材料方向和复合铺层方向，」Abaqus/CAE User's Guide 第 12.16 节](../usi/usi-link.md#usi-prp-discrete-orient)

### discrete rigid part

假定为刚性的零件，用于在接触分析中对不能变形的物体进行建模。另请参阅 [deformable part](gl01gls05.md#gls-deformbody)。
更多信息：- [「刚体零件，」Abaqus/CAE User's Guide 第 11.7.1 节](../usi/usi-link.md#usi-prt-conc-rigid)

### discrete set

Abaqus/CAE 集，由您从孤立网格中选择节点或元素组成。
更多信息：- [第 73 章，「The Set and Surface toolsets，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-set)

### display group

Abaqus/CAE 中选定模型组件的集合，可以包含零件实例、几何体（体、面或边）、节点、元素和曲面或默认（整个）模型的任意组合。显示组允许您减少屏幕上的混乱并专注于模型中感兴趣的区域。
更多信息：- [第 78 章，「使用显示组显示模型的子集，」Abaqus/CAE User's Guide](../usi/usi-link.md#uss-dgp)

### display list

Abaqus/CAE 中帮助您更快显示重复图像的功能。当对象被重复显示时（例如，在动画中），系统必须执行许多计算来渲染每个动画帧。如果您启用显示列表选项，则第一次显示动画时这些计算的结果存储在显示列表中。下次显示动画时，Abaqus/CAE 引用显示列表而不是再次执行计算；因此，动画更快。
更多信息：- [「使用显示列表，」Abaqus/CAE User's Guide 第 7.2 节](../usi/usi-link.md#uss-pfm-lists)

### DMP（distributed memory parallel）

一种并行执行模式，其中每个处理器都有自己的内存。Abaqus 支持使用特定 MPI 库和互连的 DMP。另请参阅 [MPI](gl01gls14.md#gls-mpi)。

### double buffering

Abaqus/CAE 中使用的图形渲染技术，用于在刷新 viewport 时防止屏幕闪烁。
更多信息：- [「GraphicsOptions 对象，」Abaqus Scripting Reference Guide 第 17.9 节](../ker/ker-link.md#ker-graphicsoptions-pyc)

### double precision

以 8 B 存储和操作浮点数，而不是使用标准 4 B 的单精度。Abaqus/Explicit 默认使用双精度执行计算。
更多信息：- [「Abaqus/Standard、Abaqus/Explicit 和 Abaqus/CFD 执行，」Abaqus Analysis User's Guide 第 3.2.2 节](../usb/usb-link.md#usb-int-danalysisproc)

- [「使用 Abaqus 环境设置，」Abaqus Analysis User's Guide 第 3.3.1 节](../usb/usb-link.md#usb-int-denvfile)

### drag mode

Abaqus/CAE 中的设置，允许您在平移、缩放和旋转等鼠标操作期间以简单线框形式显示图像；此模式允许在填充渲染样式（而非当前渲染样式（线框、填充、隐藏线或阴影））下更快地操作非常大的模型。
更多信息：- [「控制拖动模式，」Abaqus/CAE User's Guide 第 7.6 节](../usi/usi-link.md#uss-pfm-dm)

### drawing area

Abaqus/CAE [canvas](gl01gls04.md#gls-canvas) 的可见部分。
更多信息：- [「主窗口的组件，」Abaqus/CAE User's Guide 第 2.2.1 节](../usi/usi-link.md#uss-top-mainabqwindow)
