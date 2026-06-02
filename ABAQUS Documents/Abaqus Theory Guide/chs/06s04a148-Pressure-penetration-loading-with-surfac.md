# 6.4.1 带表面接触的压力渗透载荷

### 6.4.1 带表面接触的压力渗透载荷

**产品：** Abaqus/Standard

Abaqus/Standard允许模拟流体渗透到两个接触体之间的表面并施加垂直于表面的流体压力。使用基于表面的接触方法来模拟物体之间的相互作用，其中一个表面定义提供"主"表面，另一个表面定义提供"从"表面。两个表面都可以是可变形的，或者其中一个可以是刚性的。

使用单一从节点-基于的渗透准则。流体将从暴露于流体的一个或多个位置渗透到接触体之间的表面，直到达到接触压力大于用户指定的临界值的点，切断流体的进一步渗透。引入临界接触压力是为了考虑接触表面的粗糙度。该值越高，流体越容易渗透。临界接触压力的默认值是零，在这种情况下，仅当接触压力为零且接触丢失时才会发生流体渗透。当节点具有"OPEN"的接触状态时，其最近的相邻节点也被认为受到流体压力。用户指定的初始暴露于流体的节点将始终受到流体压力，与这些节点处的接触状态无关。

压力渗透载荷将在增量开始时垂直于元素表面施加，并且即使在该增量期间流体进一步渗透，也将保持在该增量期间恒定。在二维中，使用节点积分方案将分布压力渗透载荷集成在元素上；分布载荷在元素上的变化将由元素节点处的载荷幅度决定，这些节点与基点重合。考虑三个节点在从表面上的接触相互作用——由两个一阶元素的面组成的101、102和103——与由两个元素的面组成的主表面——由节点201、202和203描述。

如果具有压力幅度f的流体已渗透到从表面上的节点102，则元素1上分布载荷的变化为

元素2上分布载荷的变化为

![](../graphics/stmpresspensurf-non-match.png)![](../graphics/stm_eqn08226.gif)其中和是一阶元素面上的形状函数。

![](../graphics/stm_eqn08227.gif)![](../graphics/stm_eqn08228.gif)![](../graphics/stm_eqn08229.gif)对于基于元素的主表面，我们还必须考虑流体压力如何施加到主表面，这取决于主表面上"锚"点的位置。"锚"点选择为主表面上最接近最后暴露于流体压力的从节点（压力渗透尖端）的点。从"锚点"到用户指定初始暴露于流体的主表面节点之间的所有节点都被认为受到流体压力。

压力渗透能力不要求接触表面具有匹配的网格；然而，当网格最初匹配时可以获得最佳精度。对于最初不匹配的网格，基于平衡考虑来评估主表面上施加的等效流体压力。

![](../graphics/stm_eqn08230.gif)对于一阶元素，如果是和面上节点202和203由于分布载荷产生的等效力，则元素5（主表面上与锚点关联的元素）上分布载荷的变化为

二阶元素使用类似的方法。

![](../graphics/stmpresspensurf-stress-dist-nls.png)![](../graphics/stm_eqn08231.gif)![](../graphics/stm_eqn08232.gif)### 参考

![](../graphics/stm_eqn08233.gif)### 参考

"Abaqus Analysis User's Guide"第37.1.7节"压力渗透载荷"
### 参考
### 参考



**校审补全说明：** 以下保留英文源文的非图片文本，用于补足本页此前过短或参考文献页中文字符过少的问题；公式和图片引用不在此重复，以上文校准后的中文正文为准。

**?????6.4.1 Pressure penetration loading with surface-based contact**

**?????6.4.1 Pressure penetration loading with surface-based contact**

**Product: **Abaqus/Standard

Abaqus/Standard allows for the simulation of fluid penetrating into the surface between two contacting bodies and application of the fluid pressure normal to the surfaces. The surface-based contact approach is used to model the interactions between the bodies, where one surface definition provides the "master" surface and the other surface definition provides the "slave" surface. Both surfaces can be deformable, or one can be rigid.

A single slave node&#8211;based penetration criterion is used. Fluid will penetrate into the surface between the contacting bodies from one or multiple locations, which are exposed to the fluid, until a point is reached where the contact pressure is greater than the critical value specified by the user, cutting off further penetration of the fluid. The critical contact pressure is introduced to account for the asperities on the contacting surfaces. The higher this value, the easier the fluid penetrates. The default value of the critical contact pressure is zero, in which case fluid penetration occurs only if the contact pressure is zero and contact is lost. When a node has a contact status of "OPEN," its nearest neighboring nodes are considered to be subjected to the fluid pressure as well. The nodes initially exposed to the fluid, which are specified by the user, will always be subjected to the fluid pressure irrespective of the contact status at these nodes.

The pressure penetration load will be applied normal to the element surface based on the pressure penetration criterion described above at the beginning of an increment and will remain constant over that increment even if the fluid penetrates further during that increment. In two dimensions, a nodal integration scheme is used to integrate the distributed pressure penetration load over an element; the variation of the distributed load over an element will be determined by the load magnitudes at the element's nodes, which are coincident with the base points. Consider the contact interaction of three nodes---101, 102, and 103---on the slave surface made up of faces of two first-order elements, 1 and 2, with a master surface made up of faces of two elements, 4 and 5, which are described by nodes 201, 202, and 203 as shown in [Figure 6.4.1&#8211;1](06s04a148.md).

Figure 6.4.1&#8211;1 Pressure penetration with nonmatching meshes.

If the fluid with a pressure magnitude of *f* has penetrated up to node 102 on the slave surface, the variation of the distributed load over element 1 is given by

and the variation of the distributed load over element 2 is given by

where  and  are the shape functions on the face of a first-order element.

For an element-based master surface we must also consider how the fluid pressure is applied to the master surface, which depends on the location of the "anchor" point on the master surface. The "anchor" point is chosen as the point on the master surface closest to the last slave node subjected to the fluid pressure (pressure penetration tip). All the nodes between the "anchor point" and the node initially exposed to the fluid on the master surface, as specified by the user, are considered to be subjected to the fluid pressure.

The pressure penetration capability does not require that the contacting surfaces have matching meshes; however, the best accuracy is obtained when meshes are initially matching. For initially nonmatching meshes the equivalent fluid pressure applied on the master surface can be evaluated based on equilibrium considerations. For the problem illustrated in [Figure 6.4.1&#8211;1](06s04a148.md), the "anchor" point corresponding to slave node 102 is D. For the element associated with the anchor point (element 5) on the master surface, part of the load is transferred from element 1 and part of the load is transferred from element 2 on the slave surface. The load distribution on element 5 is illustrated in [Figure 6.4.1&#8211;2](06s04a148.md), where  is the element length.

Figure 6.4.1&#8211;2 Stress distribution over an element on the master surface with nonmatching meshes.

Because the fluid pressure will be simulated as a distributed load on the contacting surfaces, the variation of the load over an element needs to be described. For a first-order element if  and  are the equivalent forces at nodes 202 and 203 due to the distributed load shown in [Figure 6.4.1&#8211;2](06s04a148.md), the variation of the distributed load over element 5 on the master surface is given by

A similar approach is used for the second-order elements.
**?????Reference**

**?????Reference**

"Pressure penetration loading,"  Section 37.1.7 of the Abaqus Analysis User's Guide
