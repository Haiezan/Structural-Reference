# 12.8 Abaqus/Standard 三维实例：搭接接头的剪切

本仿真模拟搭接接头的剪切，展示了在Abaqus/Standard中使用通用接触的方法。

该模型由两个用钛铆钉连接的铝合金板组成。底板的左端固定，顶部板右端施加力以剪切接头。图12-31显示了组件的基本排列。由于对称性，只对一半接头进行建模以降低计算成本。假设存在摩擦接触。

![](../images/blu4rule.gif)![](../graphics/gsa-lap-assy.png)![](../images/blu4rule.gif)![](../graphics/gsa-lap-platepart1.png)![](../graphics/gsa-lap-platepart2.png)![](../graphics/gsa-lap-platepart3.png)![](../graphics/gsa-lap-rivetpart1.png)![](../graphics/gsa-lap-rivetpart2.png)![](../graphics/gsa-alum.png)![](../graphics/gsa-titanium.png)![](../graphics/gsa-lap-assy1.png)![](../graphics/gsa-lap-assy2.png)![](../graphics/gsa-lap-assy3.png)![](../graphics/gsa-lap-assy4.png)![](../graphics/gsa-lap-set-crn.png)![](../graphics/gsa-lap-set-fix.png)![](../graphics/gsa-lap-set-pull.png)![](../graphics/gsa-lap-set-symm.png)![](../graphics/gsa-lap-mesh.png)![](../images/blu4rule.gif)![](../graphics/gsa-lap-def.png)![](../graphics/gsa-lap-mises.png)![](../graphics/gsa-lap-path1-nls.png)![](../graphics/gsa-lap-path2-nls.png)

**图 12-51** 顶板螺栓孔周围的CPRESS分布。
## 12.8.1 Preprocessing—creating the model with Abaqus/CAE
### Part definition
#### Plate
#### Rivet
### Material and section properties
### Assembling the parts
### Geometry sets
### Defining steps and output requests
### Defining contact interactions
### Defining boundary conditions
### Mesh creation and job definition
## 12.8.2 Postprocessing
### Deformed model shape and contour plots
### Contact pressures
