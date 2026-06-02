# *UNIAXIAL
![](../graphics/key_eqn00106.gif)




### *UNIAXIAL通过加载和卸载试验数据表征织物材料。

此选项用于指示沿特定方向开始剪切或单轴试验数据，以定义织物材料的行为。它必须与[*FABRIC](ch06abk01.md)选项一起使用。

**产品：**Abaqus/Explicit

**类型：**模型数据

**级别：**模型

##### **参考：**

- ["织物材料行为," Section 23.4.1 of the Abaqus Analysis User's Guide](../usb/usb-link.md#usb-mat-cfabric)
- [*FABRIC](ch06abk01.md)
- [*LOADING DATA](ch12abk03.md)
- [*UNLOADING DATA](ch20abk05.md)

### **必需参数：**

COMPONENT

设置COMPONENT=1以定义"纬向"方向织物纤维的单轴行为。

设置COMPONENT=2以定义"经向"方向织物纤维的单轴行为。

设置COMPONENT=SHEAR以定义织物的剪切响应。

**此选项没有关联的数据行。**





### **Optional parameter: **
### **Optional parameter when the [*UNIAXIAL TEST DATA](ch20abk04.md) option is used in conjunction with the [*HYPERELASTIC](ch08abk06.md), MARLOW option: **
### **Data lines to specify uniaxial test data for hyperelasticity other than the Marlow model (the nominal strains must be arranged in either ascending or descending order if the SMOOTH parameter is used): **
### **Data lines to specify uniaxial test data for the Marlow model (the nominal strains must be arranged in ascending order if the SMOOTH parameter is used): **
### Using uniaxial test data to define an elastomeric foam
### **Data lines to specify uniaxial test data for a hyperfoam: **
### Using uniaxial test data to define a low-density foam material
### **Required parameter: **
### **Optional parameter: **
### **Data lines to specify uniaxial test data for [*LOW DENSITY FOAM](ch12abk04.md), LATERAL STRAIN DATA=NO: **
### **Data lines to specify uniaxial test data for [*LOW DENSITY FOAM](ch12abk04.md), LATERAL STRAIN DATA=YES: **
### Using uniaxial test data to define the Mullins effect material model
### **Data lines to specify uniaxial test data for defining the unloading-reloading response of the Mullins effect material model: **
