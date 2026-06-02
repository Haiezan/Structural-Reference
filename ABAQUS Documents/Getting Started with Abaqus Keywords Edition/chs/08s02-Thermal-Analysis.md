# 8.2 非线性问题的求解

结构的非线性荷载-位移曲线如图8-7所示。

![](../images/blu4rule.gif)![](../graphics/gss-nonlinear-nls.png)![](../graphics/gss-loads-nls.png)![](../graphics/gsk_eqn00124.gif)![](../graphics/gsk_eqn00125.gif)![](../graphics/gsk_eqn00126.gif)![](../graphics/gsk_eqn00127.gif)![](../images/blu4rule.gif)![](../images/blu4rule.gif)![](../graphics/gsk_eqn00128.gif)![](../graphics/gsk_eqn00129.gif)![](../graphics/gsk_eqn00130.gif)![](../graphics/gsk_eqn00128.gif)![](../graphics/gsk_eqn00131.gif)![](../graphics/gsk_eqn00131.gif)![](../graphics/gsk_eqn00132.gif)![](../graphics/gss-first-iteration-nls.png)![](../graphics/gsk_eqn00133.gif)![](../graphics/gsk_eqn00132.gif)![](../graphics/gsk_eqn00134.gif)![](../graphics/gsk_eqn00134.gif)![](../graphics/gsk_eqn00135.gif)![](../graphics/gsk_eqn00136.gif)![](../graphics/gsk_eqn00136.gif)![](../graphics/gsk_eqn00136.gif)![](../graphics/gsk_eqn00136.gif)![](../graphics/gsk_eqn00136.gif)![](../graphics/gsk_eqn00134.gif)![](../graphics/gsk_eqn00132.gif)![](../graphics/gsk_eqn00131.gif)![](../graphics/gsk_eqn00137.gif)![](../graphics/gsk_eqn00131.gif)![](../graphics/gsk_eqn00133.gif)![](../graphics/gsk_eqn00136.gif)![](../graphics/gsk_eqn00138.gif)![](../graphics/gss-second-iteration-nls.png)![](../graphics/gsk_eqn00139.gif)![](../graphics/gsk_eqn00140.gif)![](../graphics/gsk_eqn00139.gif)![](../graphics/gsk_eqn00138.gif)![](../graphics/gsk_eqn00141.gif)![](../images/blu4rule.gif)![](../graphics/gsk_eqn00142.gif)![](../graphics/gsk_eqn00143.gif)![](../graphics/gss-c7-tot-step-input-nls.png)![](../graphics/gsk_eqn00144.gif)![](../graphics/gsk_eqn00145.gif)![](../graphics/gsk_eqn00146.gif)![](../graphics/gsk_eqn00146.gif)。

如果增量在少于五次迭代中收敛，这表明解相当容易找到。因此，如果连续两个增量需要少于五次迭代来获得收敛解，Abaqus/Standard 自动将增量大小增加50%。

自动荷载增量方案的详细信息在消息文件中给出，详见8.4.3节"结果"。
## 8.2.1 Steps, increments, and iterations
## 8.2.2 Equilibrium iterations and convergence in Abaqus/Standard
### Convergence
## 8.2.3 Automatic incrementation control in Abaqus/Standard
