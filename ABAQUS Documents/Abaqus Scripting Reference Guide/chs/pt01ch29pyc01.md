# 29.111 evaluateMaterial

此命令在标准试验条件下评估超弹性材料的行为。

**Access**

```
from material import evaluateMaterial
```

### 29.111.1 evaluateMaterial(...)

此方法在标准试验条件下评估超弹性材料的行为。

**Path**

```
evaluateMaterial
```

**Required arguments**

*material*

Material 对象。

*simulationName*

指定材料评估仿真名称的 String。

**Optional arguments**

**Note:** 虽然 *uniaxialStrainRange*、*biaxialStrainRange*、*planarStrainRange*、*volumeRatioRange* 和 *simpleShearStrainRange* 是可选参数，但必须至少指定其中一个非零值。

*dataSource*

指定在单元试验中材料定义使用试验数据还是系数的 SymbolicConstant。可能值为 TEST_DATA 或 COEFFICIENTS。

*strainEnergyPotentials*

指定要评估哪些材料模型的 SymbolicConstant 序列。可能值包括 POLY_N1、POLY_N2、POLY_N3、POLY_N4、POLY_N5、POLY_N6、OGDEN_N1、OGDEN_N2、OGDEN_N3、OGDEN_N4、OGDEN_N5、OGDEN_N6、REDUCED_POLY_N1、REDUCED_POLY_N2、REDUCED_POLY_N3、REDUCED_POLY_N4、REDUCED_POLY_N5、REDUCED_POLY_N6、ARRUDA_BOYCE、VAN_DER_WAALS、YEOH、MOONEY_RIVLIN 和 NEO_HOOKE。

**Note:** 只有在通过应变能势系数定义材料时，POLY_N3、POLY_N4、POLY_N5 和 POLY_N6 选项才有效。

*marlowData*

`None` 或 SymbolicConstant 序列，指定正在评估的 Marlow 材料定义中包含的试验数据类型。可能值为 UNIAXIAL、BIAXIAL、PLANAR 或 VOLUMETRIC。默认值为 `None`。

*marlowDataType*

`None` 或 SymbolicConstant，指定 Marlow 材料模型的输入数据类型。可能值为 TENSION、COMPRESSION 或 BOTH。

*testDataTypes*

SymbolicConstant 序列，指定被评估材料定义中包含的试验数据类型。可能值为 UNIAXIAL、BIAXIAL、PLANAR 和 VOLUMETRIC。

*uniaxialStrainRange*

指定单轴拉伸试验中施加的最小和最大名义应变的 Float 元组。

*biaxialStrainRange*

指定双轴拉伸试验中施加的最小和最大名义应变的 Float 元组。

*planarStrainRange*

指定平面试验中施加的最小和最大名义应变的 Float 元组。平面试验等效于纯剪切试验。

*volumeRatioRange*

指定最小和最大压缩体积比的 Float 元组。

*simpleShearStrainRange*

指定简单剪切试验中施加的最小和最大剪切应变的 Float 元组。

*viscoDataSource*

`None` 或 SymbolicConstant，指定在单元试验中黏弹性材料定义使用试验数据还是系数。可能值为 TEST_DATA 或 COEFFICIENTS。默认值为 `None`。

*viscoTestDataTypes*

`None` 或 SymbolicConstant 序列，指定被评估黏弹性材料定义中包含的试验数据类型。可能值为 UNIAXIAL、BIAXIAL、PLANAR 或 VOLUMETRIC。默认值为 `None`。

*relaxationTime*

`None` 或 Float，指定应力松弛响应模式的时间周期。默认值为 `None`。

*creepTime*

`None` 或 Float，指定蠕变响应模式的时间周期。默认值为 `None`。

**Return value**

无。

**Exceptions**

如果 *dataSource*=TEST_DATA 且 *strainEnergyPotentials* 包含 POLY_N3、POLY_N4、POLY_N5 或 POLY_N6：

```
MaterialEvaluationError: POLY_N3, POLY_N4, POLY_N5, or POLY_N6 
```

```
not allowed for *dataSource*=TEST_DATA.
```

如果材料评估失败：

```
MaterialEvaluationError: material evaluation failed, see 
```

```
*path to data file*.
```

如果要评估材料的材料类型不是超弹性：

```
MaterialEvaluationError: Material evaluation is currently 
```

```
supported only for hyperelastic materials.
```
