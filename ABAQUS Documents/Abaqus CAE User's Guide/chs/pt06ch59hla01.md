# 59.3 通过选取或读取文件来创建附着点







您可以通过从视口中选取每个点或从文件中读取点的坐标来定位附着点。如果需要，您可以通过将指定点投影到选定面上来创建附着点。您可以使用连接点来定义基于点的紧固件的位置。有关详细信息，请参阅["About fasteners," Section 29.1](pt04ch29s01.md)。

**通过拾取或读取文件来创建附着点：**

1. 从主菜单栏中，选择****工具**![](../graphics/images/arrow.gif)**附件**![](../graphics/images/arrow.gif)**文件中的点/通过拾取****。 Abaqus/CAE 显示 **创建连接点** 对话框。 **提示：**您还可以使用![](../graphics/ico_attPtByPick.png)工具通过拾取或读取文件来创建附着点，该工具位于相互作用模块工具箱或属性模块工具箱中的附着工具中。有关工具箱中附件工具的图表，请参见["Understanding attachment points and lines," Section 59.1](pt06ch59s01.md)。
2. 在对话框中，使用以下方法之一输入表中每个附着点的坐标： - 选择![](../graphics/ico_selectBlue.png)从视口中的零件或装配中选取一个点。您可以从零件中选择任何现有点，包括顶点、基准点、感兴趣的点、参考点和孤立网格节点。您还可以在提示区域中显示的文本字段中输入该点的 *X*-、*Y*- 和 *Z*- 坐标。 - 单击![](../graphics/ico_fileOpen.png)读取包含每个点的 *X*-、*Y*- 和 *Z*- 坐标的 ASCII 文件。 - 单击![](../graphics/ico_delete.png)从表中删除所选行。有关更多信息，请参阅["Entering tabular data," Section 3.2.7](pt01ch03s02s07.md)。如果在零件上创建附着点，则您提供的坐标是相对于零件的坐标系的。如果在装配体上创建附着点，则坐标是相对于装配体的全局坐标系的。
3. 要将指定点投影到选定的面上，请显示 **投影** 选项卡页，然后执行以下操作： 1. 切换到 **投影到面**。 2. Click![](../graphics/ico_selectBlue.png), and select the faces onto which the points will be projected.这些面可以是平面的或非平面的。 3. 选择投影点的方法。 - 选择 **Proximity** 以允许 Abaqus/CAE 绘制从每个点到所选面上最近点的矢量。 - 选择 **方向** 定义沿其投影点的矢量。 Click![](../graphics/ico_selectBlue.png)to choose the **Start point** and **End point** of the vector.有关更多信息，请参阅["Understanding the projection methods," Section 59.2](pt06ch59s02.md)。
4. By default, Abaqus/CAE creates a set that will contain the attachment points.如果需要，您可以修改集名称。如果您不想创建包含附着点的集，请关闭**使用名称创建集**。
5. 单击 **确定** 创建连接点。 Abaqus/CAE 显示连接点。您无法修改附着点； you must delete the points and create new points.

![](../graphics/images/black4rule.gif)有关相关主题的信息，请单击以下任意项目：-["Understanding attachment points and lines," Section 59.1](pt06ch59s01.md)-["About fasteners," Section 29.1](pt04ch29s01.md)




