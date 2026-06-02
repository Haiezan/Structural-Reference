# 2.5.3 使用模态叠加的线性动力学分析

### 2.5.3 使用模态叠加的线性动力学分析

**产品：** Abaqus/Standard

使用模态叠加的线性动力学分析计算成本低廉，可以提供对系统动力学行为的有用洞察。通过现代特征值/特征向量提取技术——如 Abaqus/Standard 中可用的子空间方法——获得足够的特征解基的成本不会过高；并且通过模态叠加方法获得动力学响应的后续计算工作相对较小，特别是与用于一般非线性分析的直接积分方法（"隐式动力学分析"第2.4.1节）的成本相比。

模态叠加的基本概念是用系统的一组相对较少的特征模态表示结构响应。特征模态的正交性使该系统解耦。此外，通常只需要接近感兴趣频率的特征模态；例如，通常只需要最低的几个频率来获得结构对相对长期加载（如对低频激发的稳态响应）的线性动力学响应的准确估计。该技术可以有限的方式扩展到非线性状态，但叠加和正交性原理仅适用于纯线性系统：因此，本节中描述的方法仅针对线性分析实现。

Abaqus/Standard 有两个"子空间"过程——一个用于非线性动力学，另一个用于稳态动力学分析——它们使用一些投影平衡方程的特征模态。在这两种情况下，系统的特征模态都用作计算动力学响应的一组全局基向量，即使系统在动力学响应期间表现出非线性或频率相关效应。与以系统所有自由度开发的完全非线性动力学响应分析相比，这些方法具有成本效益。稳态响应的子空间投影方法在"基于子空间的稳态动力学分析"第2.6.2节中描述。时域子空间投影方法在"子空间动力学"第2.4.3节中描述。

为线性系统模态动力学分析提供的过程总结如下：

模态动力学时间历史分析（参见"模态动力学分析"第2.5.5节）。

此过程可用于获得系统对作为时间函数给出的加载条件的时间历史响应。响应通过时间积分：使用的积分方法对于逐段线性变化荷载是精确的。因此，此分析过程中的唯一近似是问题的线性化、空间建模（即有限元模型的选择）、荷载定义以及用于表示系统的特征模态数量的选择。

响应谱分析（参见"响应谱分析"第2.5.6节）。

响应谱分析通常用于获得系统对输入谱的峰值显著响应的近似上限，作为频率的函数：它给出一个自由度系统作为其基本振动频率和阻尼比函数的 最大响应。该方法计算成本非常低，并提供关于系统频率响应谱行为的有用信息。

稳态谐波响应分析（参见"稳态线性动力学分析"第2.5.7节和"基于子空间的稳态动力学分析"第2.6.2节）。

当需要系统对谐波激发的稳态响应时使用此过程。解以求解变量（应力、位移等）的峰值幅值和相位关系给出，作为频率的函数：提供后处理选项以方便显示此类结果。

为直接谐波响应分析提供了类似选项，不使用特征模态作为基。直接方法在计算上比模态方法昂贵得多：但如果系统是非对称的（因为 Abaqus 目前没有非对称特征值提取能力）或者系统的行为包括与频率相关的参数，则需要它。

"子空间"方法通常比直接方法便宜。它通常用于非对称系统或当系统的行为包括与频率相关的参数或离散阻尼时。

随机响应分析（参见"随机响应分析"第2.5.8节）。

当结构持续激发且荷载可以以"功率谱密度函数"的形式统计表达时使用此过程。响应以统计量计算，如节点和单元变量的均值和标准差。
### 参考

### 参考

"Abaqus Analysis User's Guide" 第6.3.1节"动力学分析过程：概述"

**校审补全说明：** 以下保留英文源文的非图片文本，用于补足本页此前过短或参考文献页中文字符过少的问题；公式和图片引用不在此重复，以上文校准后的中文正文为准。

**?????2.5.3 Linear dynamic analysis using modal superposition**

**?????2.5.3 Linear dynamic analysis using modal superposition**

**Product: **Abaqus/Standard

Linear dynamic analysis using modal superposition is computationally inexpensive and can provide useful insight into the dynamic behavior of a system. With modern eigenvalue/eigenvector extraction techniques---such as the subspace method available in Abaqus/Standard---the cost of obtaining a sufficient basis of eigensolutions is not excessive; and the subsequent computational effort involved in obtaining the dynamic response by modal superposition methods is relatively small, especially when compared to the cost of the direct integration methods used for general nonlinear analysis ("Implicit dynamic analysis,"  Section 2.4.1).

The basic concept of modal superposition is that the response of the structure is expressed in terms of a relatively small number of eigenmodes of the system. The orthogonality of the eigenmodes uncouples this system. Furthermore, only eigenmodes that are close to the frequencies of interest are usually needed; for example, only the lowest few frequencies are usually required to obtain an accurate estimate of a structure's linear dynamic response to relatively long-term loading (for example, its steady-state response to low frequency excitation). The technique can be extended in a limited way into the nonlinear rgime, but the superposition and orthogonality principles apply only to purely linear systems: for this reason the methods described in this section are implemented only for linear analysis.

Abaqus/Standard has two "subspace" procedures---one for nonlinear dynamic and the other one for steady-state dynamic analysis---that use some of the eigenmodes of the system on which the equilibrium equations are projected. In both cases the system's eigenmodes are used as a set of global basis vectors for computing the dynamic response, even though the system exhibits nonlinear or frequency-dependent effects during the dynamic response. These methods are cost-effective compared to fully nonlinear dynamic response analysis developed in terms of all the system's degrees of freedom. The subspace projection method for steady-state response is described in "Subspace-based steady-state dynamic analysis,"  Section 2.6.2. The time-domain subspace projection method is described in "Subspace dynamics,"  Section 2.4.3.

The procedures provided for modal dynamic analysis of linear systems are summarized below:

Modal dynamic time history analysis (see "Modal dynamic analysis,"  Section 2.5.5).

This procedure can be used to obtain the time history response of a system to loading conditions that are given as functions of time. The response is integrated through time: the integration method used is exact for loadings that vary piecewise linearly with time. Thus, the only approximations in this analysis procedure are the linearization of the problem, the spatial modeling (that is, the choice of the finite element model), the loading definitions, and the choice of the number of eigenmodes used to represent the system.

Response spectrum analysis (see "Response spectrum analysis,"  Section 2.5.6).

Response spectrum analysis is often used to obtain an approximate upper bound to the peak significant response of a system to an input spectrum as a function of frequency: it gives the maximum response of a one degree of freedom system as a function of its fundamental frequency of vibration and of its damping ratio. The method has very low computational cost and gives useful information about the spectral behavior of a system with respect to frequency.

Steady-state harmonic response analysis (see "Steady-state linear dynamic analysis,"  Section 2.5.7, and "Subspace-based steady-state dynamic analysis,"  Section 2.6.2).

This procedure is used when the steady-state response of a system to harmonic excitation is required. The solution is given as the peak amplitudes and phase relationships of the solution variables (stress, displacement, etc.) as functions of frequency: postprocessing options are provided to display such results conveniently.

A similar option is provided for direct harmonic response analysis without using the eigenmodes as a basis. The direct method is significantly more expensive computationally than the modal method: it is needed if the system is nonsymmetric (because Abaqus presently does not have a nonsymmetric eigenvalue extraction capability) or if the system's behavior includes frequency-dependent parameters.

The "subspace" method is typically less expensive than the direct method. It is generally used for nonsymmetric systems or when the system's behavior includes frequency-dependent parameters or discrete damping.

Random response analysis (see "Random response analysis,"  Section 2.5.8).

This procedure is used when the structure is excited continuously and the loading can be expressed statistically in terms of a "Power Spectral Density Function." The response is calculated in terms of statistical quantities, such as the mean value and the standard deviation of nodal and element variables.
**?????Reference**

**?????Reference**

"Dynamic analysis procedures: overview,"  Section 6.3.1 of the Abaqus Analysis User's Guide
