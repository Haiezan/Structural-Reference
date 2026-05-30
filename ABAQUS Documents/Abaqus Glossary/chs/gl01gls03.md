# B







### base feature

构建 Abaqus/CAE 零件时创建的第一个特征；您通过添加更多特征来构建零件的其余部分，这些特征修改或添加到基础特征。零件的所有其他特征都是基础特征的子项；因此，基础特征无法被抑制或删除。
更多信息：- [「基础特征，」Abaqus/CAE User's Guide 第 11.3.2 节](../usi/usi-link.md#usi-prt-conc-base)

### base solution

通常指过程的初始运行或求解；含义根据使用该术语的上下文而有所不同。
更多信息：- [「误差指示器的特性」中的「基于求解的网格尺寸，」Abaqus Analysis User's Guide 第 12.3.3 节](../usb/usb-link.md#usb-anl-aadpsizing-chracteristics)

### base solution variable

选择用于计算过程基求解的变量。基求解变量表示为基求解的元素平均值，并通过「AVG」后缀标识；例如 MISESAVG。
更多信息：- [「求解精度」中的「误差指示器输出，」Abaqus Analysis User's Guide 第 4.1.4 节](../usb/usb-link.md#usb-anl-aadperrorindicators-variables)

### basic manager

Abaqus/CAE 对话框，其中包含您在当前模型中创建的所有特定类型对象的列表。basic manager 还包含 **Create**、**Edit**、**Copy**、**Rename** 和 **Delete** 按钮，可用于操作现有对象和创建新对象。另请参阅 [step-dependent manager](gl01gls20.md#gls-stepmanager)。
更多信息：- [「什么是 basic managers？，」Abaqus/CAE User's Guide 第 3.4.1 节](../usi/usi-link.md#uss-int-mgr-whatis)

### BC

请参阅 [boundary condition](gl01gls03.md#gls-boundarycondition)。

### beam sections

梁元素横截面的面积属性。
更多信息：- [「网格化梁横截面，」Abaqus Analysis User's Guide 第 10.6 节](../usb/usb-link.md#usbabeamgen)

- [「选择梁横截面，」Abaqus Analysis User's Guide 第 29.3.2 节](../usb/usb-link.md#usb-elm-ebeamsections)

### bias factor

在 [adaptive remeshing](gl01gls02.md#gls-adaptiveremeshing) 规则中定义的因子，用于确定最小和最大求解强度位置之间的元素尺寸分布。
更多信息：- [「偏差因子」中的「基于求解的网格尺寸，」Abaqus Analysis User's Guide 第 12.3.3 节](../usb/usb-link.md#usb-anl-aadpsizing-biasfactor)

### bias function

请参阅 [bias parameter](gl01gls03.md#gls-biasparam)。
更多信息：- [「偏差参数」中的「基于模式的稳态动态分析，」Abaqus Analysis User's Guide 第 6.3.8 节](../usb/usb-link.md#usb-anl-asteadystdyn-biasparam)

### bias parameter

在稳态动态分析中，用于将需要结果的频率点偏向用户定义频率范围末端的变量。偏差参数提供更紧密的结果点间距，可以朝向每个频率区间的中部或朝向区间末端。
更多信息：- [「偏差参数」中的「基于模式的稳态动态分析，」Abaqus Analysis User's Guide 第 6.3.8 节](../usb/usb-link.md#usb-anl-asteadystdyn-biasparam)

### blend

可以在 Abaqus/CAE 中创建的几何圆角或倒角，用于平滑三维实体零件的边缘。
更多信息：- [「混合特征，」Abaqus/CAE User's Guide 第 11.9.5 节](../usi/usi-link.md#usi-prt-conc-round)

### blind cut

穿透三维物体的切割，仅到指定深度，而不是完全穿透。在 Abaqus/CAE 中，此深度存储为切割特征的参数，可以进行修改。
更多信息：- [「添加切割特征，」Abaqus/CAE User's Guide 第 11.24 节](../usi/usi-link.md#usi-prt-help-addcut)

### bottom-up meshing

一种手动过程，用于在无法使用自动自上而下网格技术进行网格划分或难以进行网格划分的实体区域上创建六面体或六面体主导网格。bottom-up meshing 允许您选择 sweep、extrude 或 revolve 方法以及 Abaqus/CAE 用来构建六面体元素实体网格的源面和连接面等参数。另请参阅 [top-down meshing](gl01gls21.md#gls-topdown)。
更多信息：- [第 17 章，「The Mesh module，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-mgn)

### boundary condition

基本求解变量（如位移、旋转或温度）的预设值。
更多信息：- [「Abaqus/Standard 和 Abaqus/Explicit 中的边界条件，」Abaqus Analysis User's Guide 第 34.3.1 节](../usb/usb-link.md#usb-prc-pboundary)

- [「Abaqus/CFD 中的边界条件，」Abaqus Analysis User's Guide 第 34.3.2 节](../usb/usb-link.md#usb-prc-pboundarycfd)

- [第 16 章，「The Load module，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-lbi)

### boundary face

在 Abaqus/Standard 分析中，指外露面或自由表面。
更多信息：- [「Eulerian 分析，」Abaqus Analysis User's Guide 第 14.1.1 节](../usb/usb-link.md#usb-anl-aeuleriananalysis)

在 Abaqus/CAE 模型中，仅由单个元素共享的三维元素的表面。
更多信息：- [「合并和切割零件实例，」Abaqus/CAE User's Guide 第 13.7.1 节](../usi/usi-link.md#usi-asm-conc-merge-hybrid)

### boundary mesh

在三维几何区域边界面上生成的网格。
更多信息：- [「什么是四面体边界网格？，」Abaqus/CAE User's Guide 第 17.10.4 节](../usi/usi-link.md#usi-mgn-conc-meshing-freepreview)
