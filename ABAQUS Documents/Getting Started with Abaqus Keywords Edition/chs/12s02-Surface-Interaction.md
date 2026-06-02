# 12.2 定义表面

表面是从底层元素的面创建的。下面的讨论假设表面将在 Abaqus/CAE 中定义。在 Abaqus 中可创建的表面类型的限制在《Abaqus Analysis User's Guide》第 2.3 节"Surface definition"中有讨论；在开始接触模拟之前请阅读这些内容。

**连续单元上的表面**

对于二维和三维实体连续单元，您可以通过在视口中选择部件实例的区域来指定构成接触表面的部件区域。

**结构单元、表面单元和刚性单元上的表面**

有四种方法可以在结构单元、表面单元和刚性单元上定义表面：单侧表面、双侧表面、基于边的表面和基于节点的表面。

使用单侧表面，您可以指定单元的哪一侧构成接触表面。与正单元法线方向相同的侧面称为 **SPOS**，而与负单元法线方向相同的侧面称为 **SNEG**，如图 12-1 所示。单元的连通性定义了正单元法线，如《使用壳单元》第 5 章中所讨论的。正单元法线可以在 Abaqus/CAE 中查看。

**图 12-1** 二维壳单元或刚性单元上的表面。

![](../graphics/gss-surface-nls.png)![](../graphics/gsx-cont-shell-edge-nls.png)![](../graphics/gsi-analrigidsurf-nls.png)

解析刚性表面的优点是它们仅由少量几何点定义，计算效率高。然而，在三维中可以用它们创建的形状范围是有限的。

离散化刚性表面基于构成刚性体的底层单元；因此，它们可以比解析刚性表面具有更复杂的几何形状。离散化刚性表面的定义方式与可变形体上的表面完全相同。
### Surfaces on continuum elements
### Surfaces on structural, surface, and rigid elements
### Rigid surfaces
