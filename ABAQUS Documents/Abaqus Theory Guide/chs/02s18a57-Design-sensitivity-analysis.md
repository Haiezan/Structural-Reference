# 2.18.1 设计灵敏度分析

### 2.18.1 设计灵敏度分析

**产品：** Abaqus/Design

Abaqus/Design支持静态应力和频率问题的设计灵敏度分析（DSA）。DSA提供某些响应量相对于指定输入量的导数。这些导数被称为*灵敏度*。可用于DSA的响应是Abaqus输出变量列表的一个子集，被称为*设计响应*；指定的输入量被称为*设计参数*。作为设计参数函数的量被称为设计依赖的。DSA理论从分析计算所需导数的角度提出，首先针对静态应力分析，然后针对频率分析。在每节末尾讨论基于该理论的替代数值方法。
**静态应力分析的DSA**

DSA的方程可以基于总位移公式或增量位移公式推导。总位移公式适用于历史无关问题，其中问题的当前状态仅取决于总位移。增量公式适用于历史相关问题，其中问题的当前状态取决于增量开始时的状态和增量位移。
### 非线性平衡问题的总位移DSA公式
![](../graphics/stm_eqn02773.gif)![](../graphics/stm_eqn02774.gif)![](../graphics/stm_eqn02775.gif)![](../graphics/stm_eqn02776.gif)![](../graphics/stm_eqn00657.gif)
设*R*和*P*分别是设计响应和设计参数的数量。设每个响应![](../graphics/stm_eqn02777.gif)![](../graphics/stm_eqn02778.gif)![](../graphics/stm_eqn00657.gif)
为隐式；即，它仅由其解为![](../graphics/stm_eqn00657.gif)![](../graphics/stm_eqn02779.gif)![](../graphics/stm_eqn02780.gif)
假设我们已在增量结束时求解了由[方程2.1.1-2](02s01a13-Procedures-overview-and-basic-equations.md)定义的平衡问题，并且我们有了收敛解对于设计参数![](../graphics/stm_eqn02781.gif)![](../graphics/stm_eqn02782.gif)

![](../graphics/stm_eqn02783.gif)中
![](../graphics/stm_eqn02784.gif)![](../graphics/stm_eqn02780.gif)![](../graphics/stm_eqn00657.gif)

![](../graphics/stm_eqn02785.gif)中
![](../graphics/stm_eqn02786.gif)![](../graphics/stm_eqn02787.gif)

![](../graphics/stm_eqn02788.gif)是总位移DSA问题的解。
![](../graphics/stm_eqn02789.gif)![](../graphics/stm_eqn02790.gif)![](../graphics/stm_eqn02791.gif)![](../graphics/stm_eqn02791.gif)![](../graphics/stm_eqn02776.gif)![](../graphics/stm_eqn02792.gif)![](../graphics/stm_eqn02793.gif)
Abaqus中使用的DSA算法被称为*直接微分法*（DDM），包括以下操作。获得收敛平衡解后，必须以逐单元方式计算三个数组
DSA计算中使用的系数矩阵![](../graphics/stm_eqn02794.gif)仅是平衡迭代算法中使用的最新切线刚度矩阵。在DSA计算阶段，这个矩阵仍然以分解形式可用，可以轻松检索以对DSA右边向量执行回代。这使得DSA模块成为平衡分析的高效附加组件，能够以相对较低的成本进行灵敏度计算。
![](../graphics/stm_eqn00694.gif)![](../graphics/stm_eqn00657.gif)![](../graphics/stm_eqn02795.gif)### 历史相关平衡问题的增量位移DSA公式

![](../graphics/stm_eqn02796.gif)上面提出的DSA公式简要介绍了DSA在Abaqus中的实现方式；然而，由于一些简化，讨论与大量非线性力学问题无关，特别是那些涉及所建模结构的历史相关行为的问题。在这类问题中的主要困难是，计算[方程2.18.1-2](02s18a57-Design-sensitivity-analysis.md)中残差![](../graphics/stm_eqn02797.gif)![](../graphics/stm_eqn02798.gif)![](../graphics/stm_eqn02799.gif)![](../graphics/stm_eqn00657.gif)![](../graphics/stm_eqn00657.gif)![](../graphics/stm_eqn02798.gif)如，见[Kleiber et al. (1997)](07s01a01-References.md)。符号![](../graphics/stm_eqn02800.gif)在这种情况下，[方程2.18.1-4](02s18a57-Design-sensitivity-analysis.md)取以下形式：

![](../graphics/stm_eqn02801.gif)![](../graphics/stm_eqn02802.gif)中

![](../graphics/stm_eqn02799.gif)示量![](../graphics/stm_eqn02803.gif)![](../graphics/stm_eqn02804.gif)![](../graphics/stm_eqn02805.gif)![](../graphics/stm_eqn02773.gif)![](../graphics/stm_eqn02774.gif)![](../graphics/stm_eqn02799.gif)![](../graphics/stm_eqn02780.gif)从DSA求解算法的角度来看，总方法和增量方法之间的根本区别在于，在后一种情况下，所有状态变量![](../graphics/stm_eqn02806.gif)DSA求解过程类似于总位移方法。平衡计算完成后，在单元循环中组装显式设计导数数组![](../graphics/stm_eqn02794.gif)后将解向量代入[方程2.18.1-5](02s18a57-Design-sensitivity-analysis.md)。
### 计算方法
![](../graphics/stm_eqn02804.gif)![](../graphics/stm_eqn02807.gif)![](../graphics/stm_eqn02808.gif)
DSA所需的导数可以分析或数值计算。在分析方法中，有限元方程根据前几节描述的理论精确微分。这种方法实现困难，但高效并产生精确灵敏度。在数值方法中，一些或所有所需导数使用有限差分技术计算。数值方法可以进一步分为*整体*或*全局*有限差分方法和*半解析*方法。在全局有限差分方法中，响应灵敏度相对于特定设计参数通过扰动该设计参数多次（取决于有限差分技术）获得，并对每个扰动执行整个平衡分析。为每个分析保留响应，然后差分以获得响应灵敏度。这种方法计算成本高，因为必须为每个扰动求解整个平衡问题，但它易于实现。半解析方法在Abaqus中使用，可以视为分析和全局有限差分方法之间的折衷。在半解析方法中，DSA单元向量通过差分获得；但与分析方法一样，DSA解通过回代相对于![](../graphics/stm_eqn02809.gif)![](../graphics/stm_eqn02810.gif)
半解析方法的目的是通过有限差分数值计算DSA向量![](../graphics/stm_eqn02811.gif)![](../graphics/stm_eqn02812.gif)![](../graphics/stm_eqn02780.gif)![](../graphics/stm_eqn02811.gif)
*x*的扰动。
![](../graphics/stm_eqn02813.gif)
为了一般性，考虑历史相关情况。为了近似![](../graphics/stm_eqn02814.gif)![](../graphics/stm_eqn02815.gif)![](../graphics/stm_eqn02804.gif)
应于设计参数扰动的状态变化近似为
![](../graphics/stm_eqn02816.gif)
复上述过程，然后将结果差分以获得显式设计导数![](../graphics/stm_eqn02817.gif)
一旦找到（增量）位移灵敏度，可以使用
![](../graphics/stm_eqn02818.gif)![](../graphics/stm_eqn02780.gif)
得响应灵敏度![](../graphics/stm_eqn02819.gif)![](../graphics/stm_eqn00280.gif)![](../graphics/stm_eqn02820.gif)![](../graphics/stm_eqn01186.gif)下面提出的理论假设所有特征值都是 distinct 的（即，没有重复特征值）。如果并非如此，需要进行额外操作以获得与重复特征值对应的特征值和特征向量灵敏度，以下灵敏度的方程将不正确。重复特征值情况将在下一节中考虑。

![](../graphics/stm_eqn02821.gif)执行频率分析意味着求解以下特征值问题（见"特征值提取"第2.5.1节）：

![](../graphics/stm_eqn02822.gif)![](../graphics/stm_eqn02780.gif)中![](../graphics/stm_eqn02823.gif)![](../graphics/stm_eqn00904.gif)

![](../graphics/stm_eqn02824.gif)微分[方程2.18.1-6](02s18a57-Design-sensitivity-analysis.md)获得以下方程：

![](../graphics/stm_eqn02825.gif)中![](../graphics/stm_eqn00280.gif)![](../graphics/stm_eqn02826.gif)![](../graphics/stm_eqn00280.gif)![](../graphics/stm_eqn02827.gif)左乘，利用[方程2.18.1-6](02s18a57-Design-sensitivity-analysis.md)，并操作结果给出特征值灵敏度：

![](../graphics/stm_eqn02828.gif)![](../graphics/stm_eqn02829.gif)![](../graphics/stm_eqn00007.gif)![](../graphics/stm_eqn02830.gif)![](../graphics/stm_eqn02831.gif)![](../graphics/stm_eqn02832.gif)了质量和刚度导数外，该方程中的所有量在特征值问题求解后都是已知的。
### 重复特征值情况
![](../graphics/stm_eqn02833.gif)![](../graphics/stm_eqn02834.gif)![](../graphics/stm_eqn02835.gif)
本节概述用于获得重复特征值特征值灵敏度的公式。更多信息可以在[Mills-Curran](07s01a01-References.md)（1988）和[Shaw](07s01a01-References.md)（1991）的论文中找到。当特征值![](../graphics/stm_eqn02836.gif)
替换[方程2.18.1-9](02s18a57-Design-sensitivity-analysis.md)中的特征向量![](../graphics/stm_eqn02837.gif)![](../graphics/stm_eqn02838.gif)![](../graphics/stm_eqn02835.gif)![](../graphics/stm_eqn00280.gif)![](../graphics/stm_eqn00007.gif)![](../graphics/stm_eqn00280.gif)
![](../graphics/stm_eqn02839.gif)![](../graphics/stm_eqn02780.gif)[方程2.18.1-12](02s18a57-Design-sensitivity-analysis.md)被识别为一个![](../graphics/stm_eqn02840.gif)![](../graphics/stm_eqn02839.gif)### 选择有限差分区间

![](../graphics/stm_eqn02841.gif)![](../graphics/stm_eqn02842.gif)Abaqus使用启发式算法自动确定差分方案中使用的扰动大小。该算法的目标是选择能导致准确计算导数的扰动大小。这是在逐单元基础上完成的，因此对于给定设计参数，一个单元的扰动大小可能与另一个单元的扰动大小不同。扰动大小的选择基于每个设计参数![](../graphics/stm_eqn02843.gif)![](../graphics/stm_eqn02842.gif)![](../graphics/stm_eqn00904.gif)静态步骤。对于静态步骤，标量度量选择为单元伪荷载的范数：

![](../graphics/stm_eqn00904.gif)![](../graphics/stm_eqn02842.gif)![](../graphics/stm_eqn02824.gif)![](../graphics/stm_eqn02839.gif)![](../graphics/stm_eqn02839.gif)![](../graphics/stm_eqn02842.gif)![](../graphics/stm_eqn02839.gif)![](../graphics/stm_eqn02644.gif)![](../graphics/stm_eqn02839.gif)![](../graphics/stm_eqn02839.gif)![](../graphics/stm_eqn02844.gif)![](../graphics/stm_eqn02845.gif)![](../graphics/stm_eqn02844.gif)![](../graphics/stm_eqn02846.gif)![](../graphics/stm_eqn02839.gif)![](../graphics/stm_eqn02847.gif)![](../graphics/stm_eqn02848.gif)![](../graphics/stm_eqn02849.gif)![](../graphics/stm_eqn02848.gif)![](../graphics/stm_eqn02850.gif)![](../graphics/stm_eqn02848.gif)频率步骤。对于频率步骤，标量度量选择为矩阵设置更严格的容差会导致算法投入更多努力寻找最佳扰动大小，但不保证更准确的灵敏度。
### 参考

### 参考

"Abaqus Analysis User's Guide"第19.1.1节"设计灵敏度分析"


**校审补全说明：** 以下保留英文源文的非图片文本，用于补足本页此前过短或参考文献页中文字符过少的问题；公式和图片引用不在此重复，以上文校准后的中文正文为准。

**?????2.18.1 Design sensitivity analysis**

**?????2.18.1 Design sensitivity analysis**

**Product: **Abaqus/Design

Abaqus/Design supports design sensitivity analysis (DSA) for static stress and frequency problems. DSA provides derivatives of certain response quantities with respect to specified input quantities. These derivatives are known as *sensitivities*. The responses available for DSA are a subset of the list of Abaqus output variables and are known as *design responses*; the specified input quantities are known as *design parameters*. Quantities that are functions of design parameters are referred to as being design dependent. The DSA theory is presented from the perspective of computing the required derivatives analytically, first for static stress analysis and then for frequency analysis. At the end of each section an alternative numerical approach based on this theory is discussed.
**?????DSA for static stress analysis**

The equations pertaining to DSA can be derived based on a total displacement formulation or an incremental displacement formulation. The total displacement formulation is intended for history-independent problems, where the current state of the problem depends only on the total displacements. The incremental formulation is intended for history-dependent problems, where the current state of the problem depends on the state at the beginning of the increment and the incremental displacements.Total displacement DSA formulation for nonlinear equilibrium problems

Let *R* and *P* be the numbers of design responses and design parameters, respectively. Let each response , , be a function of design parameters ,  and depend on them both explicitly and via the displacement field represented here by the nodal displacement vector  (see the definition of finite element interpolation in "Procedures: overview and basic equations,"  Section 2.1.1),

The dependence  is only implicit; i.e., it is implied only by the design dependence of coefficients in the equilibrium equation system whose solution is .

Assume that we have solved an equilibrium problem defined by [Equation 2.1.1&#8211;2](02s01a13-Procedures-overview-and-basic-equations.md) at the end of an increment and that we have the converged solution  as well as values of all responses. Sensitivity of a response  with respect to design parameter  is defined as

All but one quantity in the above equation can be determined explicitly given the equilibrium solution. The only unknown is ; to compute it, an additional system of equations has to be solved.

Rewrite [Equation 2.1.1&#8211;2](02s01a13-Procedures-overview-and-basic-equations.md) in the form

where

All the quantities in the above equation are assumed to depend on design parameters  explicitly or via displacement field . Differentiation of the above two equations with respect to design parameters leads to the following equation:

in which

is the tangent stiffness (Jacobian) matrix defined in [Equation 2.1.1&#8211;4](02s01a13-Procedures-overview-and-basic-equations.md) and  is an explicitly determinable quantity. Substituting [Equation 2.18.1&#8211;3](02s18a57-Design-sensitivity-analysis.md) into [Equation 2.18.1&#8211;1](02s18a57-Design-sensitivity-analysis.md), we obtain

which is the solution of the total displacement DSA problem.

The DSA algorithm used in Abaqus is known as the *direct differentiation method* (DDM) and consists of the following operations. After the converged equilibrium solution is obtained, the three arrays , , and  have to be computed in an element-by-element manner.  is often called the pseudoload since it becomes the right-hand side of the DSA problem. The final DSA solution is obtained by solving the system of [Equation 2.18.1&#8211;3](02s18a57-Design-sensitivity-analysis.md) for each  with respect to the unknown vectors of nodal displacement sensitivity . The displacement sensitivities are then substituted into [Equation 2.18.1&#8211;1](02s18a57-Design-sensitivity-analysis.md) to compute .

The coefficient matrix  used in the DSA computations is simply the last tangent stiffness matrix used in the equilibrium iterative algorithm. At the stage of the DSA computations this matrix is still available in the decomposed form and can be retrieved easily to perform the back substitutions for the DSA right-hand-side vectors. This makes the DSA module a very efficient add-on to the equilibrium analysis enabling sensitivity computations at a relatively low cost.Incremental displacement DSA formulation for history-dependent equilibrium problems

The formulation of DSA presented above provides a brief introduction to the way DSA is implemented in Abaqus; however, due to some simplifications, the discussion is not relevant to a large number of nonlinear mechanical problems, especially those involving history-dependent behavior of the structure modeled. The main difficulty in such problems is that many quantities necessary to compute the residual  in [Equation 2.18.1&#8211;2](02s18a57-Design-sensitivity-analysis.md) or to define design responses do not lend themselves to be expressed as functions of total displacement . Rather, at each time increment they are functions of certain state variables at the beginning of the increment (referred to as the time instant *t*) and of the incremental displacements, :



see, for example, [Kleiber et al. (1997)](07s01a01-References.md). The notation  stands for a set of state variables  that may include tensors (stress, back stress, etc.) as well as scalar quantities (equivalent plastic strain, etc.) defined for a particular material point at time *t*. Some responses may also depend directly on the displacement , and the beginning-of-the-increment value of  will, generally, also enter into the set .

In such a case [Equation 2.18.1&#8211;4](02s18a57-Design-sensitivity-analysis.md) takes the following form:

where

denotes the *explicit design derivative* of a quantity .

The fundamental difference, from the point of view of the DSA solution algorithm, between the total and incremental approach is that in the latter case all state variables  effectively become additional, or *internal*, design responses, whose sensitivities must be computed and updated at the end of each time increment to proceed with the DSA in the next increment. The number of such internal responses may be significant with obvious effects both on the computational time and memory requirement.

The DSA solution procedure is similar to that in the total displacement approach. After the equilibrium computations are complete, the arrays of explicit design derivatives ,  (the pseudoload), and the derivatives with respect to displacements  are assembled in the element loop. The set of design responses , , includes in this case all the scalars and tensor components of . In the direct differentiation method the following system of equations is solved for each design parameter :

and the solution vectors are substituted into [Equation 2.18.1&#8211;5](02s18a57-Design-sensitivity-analysis.md).Computational approach

The derivatives required for DSA can be computed analytically or numerically. In the analytical approach the finite element equations are differentiated exactly, following the theory described in the previous sections. This approach is difficult to implement, but it is efficient and yields exact sensitivities. In the numerical approach some or all of the required derivatives are computed using the finite difference technique. The numerical approach can be further subdivided into the *overall* or *global* finite difference approach and the *semi-analytic* approach. In the global finite difference approach the response sensitivities with respect to a particular design parameter are obtained by perturbing that design parameter a number of times (depending on the finite difference technique) and performing an entire equilibrium analysis for each perturbation. The responses are retained for each analysis and then differenced to obtain the response sensitivities. This approach is computationally expensive since an entire equilibrium problem must be solved for each perturbation, but it is easily implemented. The semi-analytic approach is used in Abaqus and can be viewed as a compromise between the analytic and global finite difference approaches. In the semi-analytic approach the DSA element vectors are obtained by differencing; but, like the analytic approach, the DSA solution is obtained by back-substitution against . The advantage of the semi-analytic approach is that it is much easier to implement than the analytic approach and much more efficient than the global finite difference approach. The details of this method are described in the following paragraphs.

The objective of the semi-analytic approach is to compute the DSA vectors  and  numerically by finite differencing. For simplicity, assume that the finite difference technique is central difference such that for a given function , the derivative of *A* with respect to *x* is

where  is the perturbation of *x*.

For generality, consider the history-dependent case. To approximate the explicit design derivatives of , the incremental displacement is held constant while a positive perturbation  is applied to each design parameter . In this way perturbed values of  are obtained as

The change in the state corresponding to a perturbation in the design parameters is approximated by

The above process is repeated for a negative perturbation (), after which the results are differenced to arrive at the explicit design derivative .

Once the (incremental) displacement sensitivities are found, the response sensitivities  can be obtained using

 where

 The process is repeated for a negative perturbation of , and the results are differenced.

The finite difference interval must be chosen carefully. If the interval is too small, round-off or *cancellation* errors occur due to loss of precision during the differencing operations. On the other hand, if the interval is too large, *truncation* errors may occur. Truncation errors arise from the fact that differencing formulas are based on truncated Taylor series expansions. Abaqus will automatically choose a perturbation size that provides the best compromise between cancellation and truncation errors.
**?????DSA for frequency analysis**

This discussion will build upon the concepts and terminology described above, so it is recommended that the previous section be read first. The discussion below is divided into two sections depending on the characteristics of the eigenvalue problem: distinct eigenvalues and repeated eigenvalues.Distinct eigenvalue case

The theory presented below assumes that all the eigenvalues are distinct (i.e., no repeated eigenvalues). If this is not the case, further manipulations are required to obtain the eigenvalue and eigenvector sensitivities corresponding to the repeated eigenvalues, and the following equations for the sensitivities will be incorrect. The repeated eigenvalue case is considered in the next section.

Performing a frequency analysis means solving the following eigenvalue problem (see "Eigenvalue extraction,"  Section 2.5.1):

where  represents the eigenvalues,  represents the eigenvectors, and  is the mass matrix. In addition, the eigenvectors are scaled such that either

 or

for each mode. The default is the first scaling scheme. To obtain eigenvalue and eigenvector sensitivities, first differentiate [Equation 2.18.1&#8211;6](02s18a57-Design-sensitivity-analysis.md) with respect to design parameter  to obtain the following equation:

where  represents a particular mode number.

Pre-multiplying by , making use of [Equation 2.18.1&#8211;6](02s18a57-Design-sensitivity-analysis.md), and manipulating the result gives the eigenvalue sensitivities:

Except for the mass and stiffness derivatives, all quantities in this equation are known once the eigenvalue problem has been solved.Repeated eigenvalue case

This section outlines the formulation used to obtain eigenvalue sensitivities for repeated eigenvalues. Further information can be found in the papers by [Mills-Curran](07s01a01-References.md) (1988) and [Shaw](07s01a01-References.md) (1991). When an eigenvalue  repeats *R* times, the eigenvectors  associated with  are linearly independent but not unique---any linear combination of these eigenvectors is also an eigenvector. Because of this non-uniqueness, the eigenvectors may not be continuous or differentiable in the design parameter. However, a set of *R* eigenvectors  that are continuous and differentiable can be obtained by an orthogonal transformation:

where , and  is to be determined. Replacing the eigenvectors  with the eigenvectors  in [Equation 2.18.1&#8211;9](02s18a57-Design-sensitivity-analysis.md) and premultiplying by  yields in matrix notation:

where ,  is a diagonal matrix,

and

[Equation 2.18.1&#8211;12](02s18a57-Design-sensitivity-analysis.md) is recognized as an  reduced eigenvalue problem whose *R* eigenvalues  are the eigenvalue sensitivities associated with the repeated eigenvalue  and whose eigenvectors are . *N* sensitivities are obtained for the single eigenvalue . The physical interpertation of this is that a perturbation in the design parameter may cause the original repeated mode to branch into as many as *N* distinct modes (imagine a beam with a circular cross-section perturbed into an elliptical section; the repeated modes associated with the original symmetry of the section now split into distinct modes associated with the minor and major axes of the ellipse).Computational approach

A semi-analytic approach is used to compute the eigenvalue sensitivities. The basic idea of this approach, as outlined in the section on static DSA, is to compute some of the required intermediate derivatives using finite differencing. In the context of DSA for frequency procedures this means that the derivatives of the mass and stiffness matrices are computed using finite differencing.
**?????Choosing the finite difference interval**

Abaqus uses a heuristic algorithm to automatically determine the perturbation sizes to be used in the differencing scheme. The objective of the algorithm is to select the perturbation sizes that lead to accurately computed derivatives. This is done on an element to element basis, so it is possible for a given design parameter that the perturbation size for one element will be different from that of another element. The selection of the perturbation sizes is based on the behavior of a scalar metric  for each design parameter . This metric must be both convenient and representative of the terms that are numerically differenced. It is chosen as follows:

Static steps. For static steps the scalar metric is chosen as the norm of the element pseudoload:

Since an accurate pseudoload is necessary to obtain an accurate sensitivity solution, the norm of the pseudoload is an appropriate choice for . This choice is also convenient since the pseudoload has to be computed in any case.

Frequency steps. For frequency steps the scalar metric is chosen as the projection of the matrix  onto an eigenvector :

The choice of  depends on whether a given mode  has a distinct eigenvalue or is associated with a repeated eigenvalue.

If mode  has a distinct eigenvalue,  is taken as . Consequently,  becomes simply the numerator of [Equation 2.18.1&#8211;10](02s18a57-Design-sensitivity-analysis.md). Therefore,  is a direct measure of the magnitude of the eigenvalue sensitivity and is also convenient since this term already must be calculated to obtain the eigenvalue sensitivity.

Unlike the distinct eigenvalue case, the sensitivities of a repeated eigenvalue cannot be treated independently. The sensitivities of a repeated eigenvalue are extracted simultaneously from the same reduced eigenvalue system, and this system is obtained by numerical differencing (recall [Equation 2.18.1&#8211;12](02s18a57-Design-sensitivity-analysis.md) and [Equation 2.18.1&#8211;13](02s18a57-Design-sensitivity-analysis.md)). Consequently a single perturbation size (for each design parameter) must be used to obtain all sensitivities of a repeated eigenvalue. To calculate the single perturbation size, a single scalar metric is obtained by taking  as the sum of the eigenvectors associated with the repeated eigenvalue. The calculation of  is similar to the calculation of the matrix  (the only term in the reduced eigenvalue system obtained by numerical differencing); therefore, this choice  is both representative of the repeated eigenvalue case and involves differencing calculations that are already being done to obtain the reduced eigenvalue system.The basic idea of the algorithm is compute the scalar metric  for a range of perturbation sizes , , which vary by orders of magnitude. For each , a corresponding  is computed. The relative change in  between consecutive perturbation sizes, calculated as , is used to measure how close a perturbation size is to optimum. In this range of perturbation sizes the one that yields the smallest relative change, denoted as , is identified as the best perturbation size, . If  is not less than a specified tolerance, the range of perturbation sizes is expanded (up to a certain limit), and the testing continues. It is important to realize that  is not used directly in assessing the accuracy of the numerical differentiation but rather is intended as a means for determining the optimum perturbation size. Thus, a tighter tolerance on  causes the algorithm to expend more effort in finding an optimum perturbation size but does not guarantee more accurate sensitivities.
**?????Reference**

**?????Reference**

"Design sensitivity analysis,"  Section 19.1.1 of the Abaqus Analysis User's Guide
