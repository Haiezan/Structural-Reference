# F







### facet

单个元素面或边。

### fastener

两个或多个表面之间的点对点连接，如点焊或铆钉连接。当您对紧固件建模时，连接到每个被连接表面的附件会分布到要连接在紧固点 [fastening point](gl01gls07.md#gls-fasteningpoint) 附近的几 个节点。
更多信息：- [「网格无关紧固件，」Abaqus Analysis User's Guide 第 35.3.4 节](../usb/usb-link.md#usb-cni-afastener)

- [「关于紧固件，」Abaqus/CAE User's Guide 第 29.1 节](../usi/usi-link.md#usi-eng-fastener-overview)

### fastening point

紧固件层连接到被紧固件连接的表面的实际点。位置通过考虑 [positioning point](gl01gls17.md#gls-positioningpoint) 位置、投影方法和要被紧固的表面来确定。
更多信息：- [「网格无关紧固件，」Abaqus Analysis User's Guide 第 35.3.4 节](../usb/usb-link.md#usb-cni-afastener)

### features

构成 Abaqus/CAE 本机零件和装配的基本定义，如几何操作和位置约束。每个特征包含参数，如大小、位置和深度。Abaqus/CAE 保留定义每个特征的参数，并在修改特征时使用此信息重新生成零件或装配。
更多信息：- [「什么是基于特征的建模？，」Abaqus/CAE User's Guide 第 11.3 节](../usi/usi-link.md#usi-prt-concepts)

### feature angle

连接到一个边的两个小平面法线之间形成的角度。
更多信息：- [「为 Abaqus/Explicit 中的一般接触分配表面属性，」Abaqus Analysis User's Guide 第 36.4.2 节](../usb/usb-link.md#usb-cni-asurfacepropassign)

- [「Abaqus/Standard 中一般接触的表面属性，」Abaqus Analysis User's Guide 第 36.2.2 节](../usb/usb-link.md#usb-cni-asurfacepropassignstd)

- [「定义模型特征边，」Abaqus/CAE User's Guide 第 55.3.2 节](../usi/usi-link.md#usv-gen-featureframe)

- [「定义网格特征边，」Abaqus/CAE User's Guide 第 76.5 节](../usi/usi-link.md#uss-dsp-dynamic-featangle)

### Feature Manipulation toolset

包含用于创建和管理特征的工具的 Abaqus/CAE 工具集。
更多信息：- [第 65 章，「The Feature Manipulation toolset，」Abaqus/CAE User's Guide](../usi/usi-link.md#usi-fts)

### field

表示变量（如位移、温度或压力）在域上的值的输入或输出数据的定义。

### field output

相对不频繁地写入输出数据库的变量输出。通常，您从整个模型或较大区域请求场输出；Abaqus/Standard 和 Abaqus/Explicit 在选定频率将变量的每个分量写入输出数据库。在 Abaqus/CAE Visualization 模块中，您可以变形、等值线或符号绘图的形式查看场输出，也可以生成场输出报告。
更多信息：- [「输出到输出数据库，」Abaqus Analysis User's Guide 第 4.1.3 节](../usb/usb-link.md#usb-out-odboutput)

### fillet

以连续方式连接两条线的圆弧。当您使用 Sketch 模块时，可以在两条线之间创建圆角。当创建或修改三维实体零件时，您可以对选定边缘进行圆角或倒圆。
更多信息：- [「在两条线之间绘制圆角，」Abaqus/CAE User's Guide 第 20.10.9 节](../usi/usi-link.md#usi-ske-filletbtn)

- [「混合边缘，」Abaqus/CAE User's Guide 第 11.27 节](../usi/usi-link.md#usi-prt-help-blendedges)

### fixed-interface substructure dynamic modes

所有保留的自由度都已受到约束的 [substructure dynamic modes](gl01gls20.md#gls-substructuredynamic)。
更多信息：- [「定义子结构，」Abaqus Analysis User's Guide 第 10.1.2 节](../usb/usb-link.md#usb-anl-asuperelementdef)

### fixed part instance

在 Abaqus/CAE 中应用装配约束期间位置保持固定的 [part instance](gl01gls17.md#gls-partinstance)。
更多信息：- [「位置约束方法有何不同，」Abaqus/CAE User's Guide 第 13.5.2 节](../usi/usi-link.md#usi-asm-concept-alignmate)

### frame

在结构中，指机械骨架结构。
在有限元模型中，frame 元素为由最初笔直、细长的构件组成的框架结构设计计算提供高效建模。
更多信息：- [「框架元素，」Abaqus Analysis User's Guide 第 29.4.1 节](../usb/usb-link.md#usb-elm-eframe)

在历史输出数据中，指输出数据库结构中对应于模拟快照的容器。此外，该术语适用于动画系列中的单个绘图。
更多信息：- [「生成输出数据库报告，」Abaqus Analysis User's Guide 第 3.2.20 节](../usb/usb-link.md#usb-int-dodbreportproc)

- [「选择结果步骤和帧，」Abaqus/CAE User's Guide 第 42.3 节](../usi/usi-link.md#usv-res-stepframe)

- [第 49 章，「动画绘制，」Abaqus/CAE User's Guide](../usi/usi-link.md#usv-animation)

### free body cross-section

构成您希望 Abaqus/CAE 显示合力和力矩的表面的节点和元素集合。
更多信息：- [「Abaqus/CAE 中自由体截面上的合力和力矩，」Abaqus/CAE User's Guide 第 67.1 节](../usi/usi-link.md#usi-fbd-intro)

- [「创建或编辑自由体截面，」Abaqus/CAE User's Guide 第 67.2 节](../usi/usi-link.md#usi-fbd-hlp-create)

### free body cut

在 Abaqus/CAE 的 Visualization 模块中，显示跨选定模型表面传递的合力和力矩的工具。
更多信息：- [「Abaqus/CAE 中自由体截面上的合力和力矩，」Abaqus/CAE User's Guide 第 67.1 节](../usi/usi-link.md#usi-fbd-intro)

- [「创建或编辑自由体截面，」Abaqus/CAE User's Guide 第 67.2 节](../usi/usi-link.md#usi-fbd-hlp-create)

### free meshing

一种网格划分技术，不使用预建立的网格图案，比结构化网格划分更灵活。当您使用结构化网格划分技术对区域进行网格划分时，可以根据区域拓扑预测网格图案。相比之下，在创建网格之前不可能预测自由网格图案。
更多信息：- [「自由网格划分，」Abaqus/CAE User's Guide 第 17.10 节](../usi/usi-link.md#usi-mgn-conc-free)

### free-interface substructure dynamic modes

所有保留的自由度都未受到约束的 [substructure dynamic modes](gl01gls20.md#gls-substructuredynamic)。
更多信息：- [「定义子结构，」Abaqus Analysis User's Guide 第 10.1.2 节](../usb/usb-link.md#usb-anl-asuperelementdef)

### free rotation handle

[3D compass](gl01gls01.md#gls-3dcompass) 顶部的点，允许您以任意方向旋转模型视图。
更多信息：- [「使用 3D 指南针旋转视图，」Abaqus/CAE User's Guide 第 5.3.1 节](../usi/usi-link.md#uss-viw-3dcompass-rotate)

### frustum

在电影摄影机模式下 viewport 中可见的三维空间；它是一个截头金字塔，其顶点位于摄影机位置。frustum 从近平面（平行于金字塔底面但更靠近摄影机的平面）开始，延伸到远平面（金字塔底面）。近平面和远平面位置由 Abaqus/CAE 中的视图选项决定。
更多信息：- [「了解摄影机模式和视图选项，」Abaqus/CAE User's Guide 第 5.1 节](../usi/usi-link.md#uss-viw-under-camera)
