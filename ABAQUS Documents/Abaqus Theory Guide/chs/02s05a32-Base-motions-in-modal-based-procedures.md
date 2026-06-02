# 2.5.9 基于模态过程的基础运动

### 2.5.9 基于模态过程的基础运动

**产品：** Abaqus/Standard

在基于模态叠加的线性动力学分析中，基础运动（也称为"基础激励"或"地面运动"）通过以下方式处理：基础运动的指定分量被转换为施加在结构上的等效惯性力。这些惯性力然后被投影到结构的特征模态上进行分析。

**基础运动的类型**

基础运动可以指定为以下形式之一：
![](../graphics/stm_eqn01565.gif)![](../graphics/stm_eqn01566.gif)![](../graphics/stm_eqn01567.gif)![](../graphics/stm_eqn01568.gif)
- **加速度历史**：直接指定为时间函数的加速度值。
![](../graphics/stm_eqn01569.gif)![](../graphics/stm_eqn01566.gif)- **速度历史**：直接指定为时间函数的速度值。
- **位移历史**：直接指定为时间函数的位移值。
![](../graphics/stm_eqn01570.gif)![](../graphics/stm_eqn01571.gif)![](../graphics/stm_eqn01572.gif)![](../graphics/stm_eqn01573.gif)![](../graphics/stm_eqn01574.gif)- **响应谱**：定义峰值响应作为频率和阻尼比的函数（仅适用于响应谱分析）。

![](../graphics/stm_eqn01575.gif)### 惯性力方法

对于基础运动分析，Abaqus/Standard将基础加速度![](../graphics/stm_eqn01576.gif)![](../graphics/stm_eqn01577.gif)![](../graphics/stm_eqn01578.gif)![](../graphics/stm_eqn01579.gif)![](../graphics/stm_eqn01580.gif)![](../graphics/stm_eqn01581.gif)![](../graphics/stm_eqn01582.gif)
![](../graphics/stm_eqn01583.gif)
其中*φi*是第*i*个模态的特征向量，*Fi*是节点力向量。

**约束和基础运动**
![](../graphics/stm_eqn01584.gif)![](../graphics/stm_eqn01583.gif)![](../graphics/stm_eqn01585.gif)
基础运动通常应用于结构的底部或基础区域。在有限元模型中，这些区域中的节点通过边界条件或接触条件被约束。当基础运动被指定时，这些约束保持不变，但约束点本身会按照指定的基础运动历史运动。

### 模态参与
![](../graphics/stm_eqn01586.gif)
基础运动在每个模态中的参与程度由模态参与因子描述。模态参与因子*p*定义为
![](../graphics/stm_eqn01587.gif)![](../graphics/stm_eqn01588.gif)![](../graphics/stm_eqn01589.gif)![](../graphics/stm_eqn01084.gif)

![](../graphics/stm_eqn01590.gif)
其中*φ*是特征向量，*M*是质量矩阵，*r*是基础运动方向向量。

### 相对响应与绝对响应

默认情况下，基于模态的响应分析计算相对于基础运动的响应（相对响应）。如果需要绝对响应，可以将基础运动添加到相对响应中：



其中*uTotal*是总响应，*uRelative*是相对响应，*uBase*是基础运动。

### 参考

### 参考

"Abaqus Analysis User's Guide" 第6.3.7节"瞬态模态动力学分析"

"Abaqus Analysis User's Guide" 第6.3.10节"响应谱分析"


**校审补全说明：** 以下保留英文源文的非图片文本，用于补足本页此前过短或参考文献页中文字符过少的问题；公式和图片引用不在此重复，以上文校准后的中文正文为准。

**?????2.5.9 Base motions in modal-based procedures**

**?????2.5.9 Base motions in modal-based procedures**

**Product: **Abaqus/Standard

Structures subjected to ground motion by earthquakes or other excitations such as explosions or dynamic action of machinery are examples in which support motions may have to be considered in the analysis of dynamic response. For modal-based dynamic analyses with modal dynamic, steady-state dynamic, or random response steps, the support motions are simulated by prescribed excitations called base motions that are applied to the suppressed degrees of freedom. The suppressed degrees of freedom are grouped into one or more bases. Multiple bases are required if base motions cannot be described by a single set of rigid body motions. A common case is that of a bridge whose supports are subjected to the same earthquake record but with a time shift.

The degrees of freedom that are suppressed without being assigned to a named base make up the *primary* base, which typically is the only base if the motion can be described by a single set of rigid body motions. The suppressed degrees of freedom that are associated with named boundary conditions make up the *secondary* base or bases. Abaqus/Standard uses different approaches to handle primary and secondary base motions. The modal participation method is used for primary base motions, and the "big mass" method is used for secondary base motions. Multiple bases can be used only in modal dynamic and steady-state dynamic analyses.
**?????Primary base motions**

Let us consider structural motions *relative* to the base motion, . The total response, , of the dynamic system will now consist of the relative response, , and the applied base motion excitation, :

with similar expressions for velocities and accelerations. Substituting  in the linearized equation of motion gives

The base acceleration is converted into applied inertia loads . Here it has been assumed that there is no damping on rigid body modes (i.e., Rayleigh damping with  is not allowed). If the prescribed excitation is given in the form of a displacement or a velocity, Abaqus/Standard differentiates it to obtain the acceleration. The base motion vector can be expressed in terms of the rigid body mode vectors, , and time dependent base motion values, :

Projecting the equation of motion into the eigenspace we have

where  and  denote the relative generalized coordinate and mode shape for the mode *m*; ,  and  are modal stiffness, modal damping, and modal mass, respectively; and

is the modal participation factor for mode *m* and degree of freedom *j*.

Kinematic boundary conditions defined without being assigned a base name in an eigenfrequency step cannot be changed in any of the subsequent modal-based procedures. The kinematic constraints are built into the eigenvectors and into the participation factors for each mode, which implies that all degrees of freedom in the primary base must be subjected to the same rigid body motion.

The participation factors are used to calculate the equivalent forcing function, and the equation of motion is solved for the relative quantities (such as relative displacements, relative velocities, and relative accelerations---output variables U, V, and A, respectively). To obtain total kinematic quantities (such as total displacements, total velocities, and total accelerations---output variables TU, TV, and TA, respectively), the primary base motions are added to the relative responses.
**?????Secondary base motions**

The base motion treatment described above cannot be applied to secondary bases. Instead, Abaqus/Standard uses a "big mass" approach to simulate the motion of secondary bases. In this approach a big mass (much bigger than the total mass of the structure) is added to each degree of freedom in a secondary base during the eigenfrequency step. This generates additional low frequency modes associated with the masses . As more big masses are applied, more low frequency modes will be extracted in the frequency analysis step. To keep the number of frequencies of interest the same, the number of eigenvalues extracted is automatically increased. Hence, the size of the subspace will grow proportionally to the number of degrees of freedom associated with secondary bases.

The desired base motion is obtained by applying a point force to each degree of freedom in the modal superposition step:

where  is the big mass and  is the applied acceleration prescribed for degree of freedom *N* associated with secondary supports.

Using the notation used in the equation of motion for primary base motions, the equation of motion for combined primary and secondary base motions is readily written as

with

where  is the diagonal matrix containing the big masses for secondary base *i* and  is the base motion applied to this base. The mass matrix  now contains the mass of the structure as well as the big masses associated with the secondary bases. Projecting the equation of motion into the eigenspace (expanded by the low frequency modes) we obtain

Again, the quantities solved for are relative to the primary support, including those obtained at the secondary supports.

The big masses should be chosen as large as possible to obtain accurate base motions but should not be so large as to cause excessive round-off errors or overflows. To provide six digits of numerical accuracy, Abaqus/Standard chooses each big mass equal to 106 times the total mass of the structure and each big rotary inertia equal to 106 times the total moment of inertia of the structure.

For acoustic pressure degree of freedom the big mass is calculated as equal to 106 times the total acoustic mass of the model. Secondary base motions for acoustic pressure are available only with the SIM architecture.

The big masses, which are introduced in the eigenfrequency step, are not included in the model for other steps in a multiple step analysis. Hence, the total mass of the structure and the printed messages about masses and inertia of the entire model are not affected. However, the presence of the masses will be noticeable in the output tables printed in the eigenvalue extraction step, as well as in the information for the generalized masses and effective masses. See "Double cantilever subjected to multiple base motions,"  Section 1.4.12 of the Abaqus Benchmarks Guide, for an example of the use of the base motion feature.
**?????References**

**?????References**

"Transient modal dynamic analysis,"  Section 6.3.7 of the Abaqus Analysis User's Guide

"Mode-based steady-state dynamic analysis,"  Section 6.3.8 of the Abaqus Analysis User's Guide

"Random response analysis,"  Section 6.3.11 of the Abaqus Analysis User's Guide

"Amplitude curves,"  Section 34.1.2 of the Abaqus Analysis User's Guide
