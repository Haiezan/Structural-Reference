# *INTEGRATED OUTPUT SECTION
![](../graphics/key_eqn00849.gif)![](../graphics/key_eqn00018.gif)![](../graphics/key_eqn00372.gif)![](../graphics/key_eqn00849.gif)![](../graphics/key_eqn00018.gif)![](../graphics/key_eqn00849.gif)![](../graphics/key_eqn00018.gif)![](../graphics/key_eqn00849.gif)![](../graphics/key_eqn00018.gif)![](../graphics/key_eqn00849.gif)![](../graphics/key_eqn00018.gif)![](../graphics/key_eqn00849.gif)![](../graphics/key_eqn00018.gif)





### *INTEGRATED OUTPUT SECTION定义具有局部坐标系和参考点的表面集成输出截面。

此选项用于将表面与坐标系和/或参考节点关联，以跟踪表面的平均运动。它也可以与集成输出请求结合使用，以获取在表面上积分的量的输出。

**产品：** Abaqus/Explicit  Abaqus/CAE

**类型：** 模型数据

**级别：** 零件、零件实例、装配

**Abaqus/CAE：** Step 模块

##### **参考文献：**

- ["集成输出截面定义，" Abaqus Analysis User's Guide 第 2.5.1 节](../usb/usb-link.md#usb-int-aintegratedoutputsect)
- ["输出到输出数据库，" Abaqus Analysis User's Guide 第 4.1.3 节](../usb/usb-link.md#usb-out-odboutput)
- [*INTEGRATED OUTPUT](ch09abk20.md)
- [*SURFACE](ch18abk47.md)

### **必需参数：**

NAME

将此参数设置为一个标签，用于引用集成输出截面。

SURFACE

将此参数设置为要与集成输出截面关联的表面名称（请参阅 ["基于单元的表面定义，" Abaqus Analysis User's Guide 第 2.3.2 节](../usb/usb-link.md#usb-int-adeformablesurf)）。

### **可选参数：**

ORIENTATION

将此参数设置为方向定义（["方向，" Abaqus Analysis User's Guide 第 2.2.5 节](../usb/usb-link.md#usb-int-corientation)）的名称，以定义截面的初始坐标系。可以使用 PROJECT ORIENTATION 参数进一步修改此初始系统。

如果省略此参数，则使用全局坐标系。

POSITION

此参数仅在包含了 REF NODE 参数时相关。

如果参考节点的位置由用户定义，则设置 POSITION=INPUT（默认）。

如果参考节点要从用户定义的位置重新定位到初始配置中表面的中心，则设置 POSITION=CENTER。

PROJECT ORIENTATION

如果截面的初始坐标系不应投影到截面表面上，则设置 PROJECT ORIENTATION=NO（默认）。如果包含了 ORIENTATION 参数，则此选择会产生与定义方向匹配的初始坐标系。如果未指定方向，则初始坐标系与全局坐标系匹配。

如果截面的初始坐标系应通过使用表面的平均法线投影到截面表面上来修改，则设置 PROJECT ORIENTATION=YES。如果未指定方向，则全局坐标系被投影到截面表面上。

REF NODE

将此参数设置为集成输出截面参考节点的节点编号或包含参考节点的节点集名称。如果选择节点集名称，则该节点集必须恰好包含一个节点。

REF NODE MOTION

此参数仅在包含了 REF NODE 参数时相关。

如果参考节点的运动不基于表面的平均运动，则设置 REF NODE MOTION=INDEPENDENT（默认）。

如果参考节点必须随表面的平均平移而平移，则设置 REF NODE MOTION=AVERAGE TRANSLATION。此选择仅在参考节点未连接到模型的其余部分时相关。

如果参考节点必须随表面的平均运动而平移和旋转，则设置 REF NODE MOTION=AVERAGE。此选择仅在参考节点未连接到模型的其余部分时相关。

**此选项没有关联的数据行。**




### **Optional parameters: **
### **Data line for TYPE=ACOUSTIC STATIC PRESSURE: **
### **Data lines for TYPE=CONCENTRATION: **
### **Data lines for TYPE=CONTACT: **
### **Data lines for TYPE=DAMAGE INITIATION, CRITERION=DUCTILE or CRITERION=SHEAR if the REBAR and SECTION POINTS parameters are omitted: **
### **Data lines for TYPE=DAMAGE INITIATION, CRITERION=DUCTILE or CRITERION=SHEAR with the REBAR parameter included: **
### **Data lines for TYPE=DAMAGE INITIATION, CRITERION=DUCTILE or CRITERION=SHEAR with the SECTION POINTS parameter included: **
### **Data lines for TYPE=DAMAGE INITIATION, CRITERION=MSFLD: **
### **Data lines for TYPE=ENRICHMENT: **
### **Data lines for TYPE=FIELD, VARIABLE=*n*: **
### **No data lines are required for TYPE=FIELD, VARIABLE=*n*, FILE=*file*, STEP=*step*, INC=*inc*. **
### **Data lines for TYPE=FLUID PRESSURE: **
### **Data lines to prescribe initial equivalent plastic strain or backstresses using TYPE=HARDENING if the REBAR, SECTION POINTS, and USER parameters are omitted: **
### **Data lines to prescribe initial volumetric compacting plastic strain for the crushable foam model using TYPE=HARDENING: **
### **Data lines for TYPE=HARDENING, REBAR: **
### **No data lines are required for TYPE=HARDENING, USER. **
### **Data lines for TYPE=HARDENING, SECTION POINTS: **
### **Data lines for TYPE=INITIAL GAP: **
### **Data lines for TYPE=MASS FLOW RATE: **
### **Data lines for TYPE=NODE REF COORDINATE: **
### **Data lines to prescribe initial plastic strains using TYPE=PLASTIC STRAIN if the REBAR and SECTION POINTS parameters are omitted: **
### **Data lines for TYPE=PLASTIC STRAIN, REBAR: **
### **Data lines for TYPE=PLASTIC STRAIN, SECTION POINTS: **
### **Data lines for TYPE=PORE PRESSURE if the USER parameter is omitted: **
### **No data lines are required for TYPE=PORE PRESSURE, USER. **
### **No data lines are required for TYPE=PORE PRESSURE, FILE=*file*, STEP=*step*, INC=*inc*. **
### **No data lines are required for TYPE=PORE PRESSURE, FILE=*file*, STEP=*step*, INC=*inc*, INTERPOLATE. **
### **Data lines for TYPE=PORE PRESSURE, FILE=*file*, STEP=*step*, INC=*inc*, DRIVING ELSETS: **
### **Data lines for TYPE=POROSITY: **
### **Data lines for TYPE=PRESSURE STRESS: **
### **No data lines are required for TYPE=PRESSURE STRESS, FILE=*file*, STEP=*step*, INC=*inc*. **
### **Data lines for TYPE=RATIO if the USER parameter is omitted: **
### **No data lines are required for TYPE=RATIO, USER. **
### **No data lines are required for TYPE=RATIO, FILE=*file*, STEP=*step*, INC=*inc*. **
### **Data lines for TYPE=RATIO, FILE=*file*, STEP=*step*, INC=*inc*, DRIVING ELSETS: **
### **Data lines for TYPE=REF COORDINATE: **
### **Data lines for TYPE=RELATIVE DENSITY: **
### **Data lines for TYPE=ROTATING VELOCITY, DEFINITION=COORDINATES: **
### **Data lines for TYPE=ROTATING VELOCITY, DEFINITION=NODES: **
### **Data lines for TYPE=SATURATION: **
### **Data lines for TYPE=SOLUTION if the USER and REBAR parameters are omitted: **
### **Data lines for TYPE=SOLUTION, REBAR: **
### **No data lines are required for TYPE=SOLUTION, USER. **
### **Data lines for TYPE=SPECIFIC ENERGY: **
### **Data lines for TYPE=SPUD EMBEDMENT: **
### **Data lines for TYPE=SPUD PRELOAD: **
### **Data lines for TYPE=STRESS if the GEOSTATIC, REBAR, SECTION POINTS, and USER parameters are omitted: **
### **Data lines for TYPE=STRESS, GEOSTATIC: **
### **Data lines for TYPE=STRESS, REBAR: **
### **Data lines for TYPE=STRESS, SECTION POINTS: **
### **No data lines are required for TYPE=STRESS, USER. **
### **No data lines are required for TYPE=STRESS, FILE=*file*, STEP=*step*, INC=*inc*. **
### **Data lines for TYPE=TEMPERATURE: **
### **No data lines are required for TYPE=TEMPERATURE, FILE=*file*, STEP=*step*, INC=*inc*. **
### **Data lines for TYPE=TEMPERATURE, FILE=*file*, STEP=*step*, INC=*inc*, INTERPOLATE, DRIVING ELSETS: **
### **Data lines for TYPE=VELOCITY: **
### **Data lines for TYPE=VOLUME FRACTION: **
### Defining initial conditions in Abaqus/CFD
### **Required parameters: **
### **Data line for TYPE=DENSITY: **
### **Data lines for TYPE=VELOCITY: **
### **Data line for TYPE=TEMPERATURE: **
### **Data line for TYPE=TURBKE: **
### **Data line for TYPE=TURBEPS: **
### **Data line for TYPE=TURBOMEGA: **
### **Data line for TYPE=TURBNU: **
### **Data line for TYPE=TURBINTENSITY: **
### **Data line for TYPE=TURBVELOCITYSCALE: **
### **Data line for TYPE=TURBVISCOSITYRATIO: **
### **Data line for TYPE=TURBLENGTHSCALE: **
