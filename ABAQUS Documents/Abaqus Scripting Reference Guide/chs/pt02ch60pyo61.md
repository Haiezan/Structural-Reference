# 60.61 Hyperfoam 对象

Hyperfoam 对象用于指定超弹性泡沫的弹性特性。

**访问**

```
materialApi.materials()[*name*].hyperfoam()
```

### 60.61.1 Hyperfoam(...)

此方法创建一个 Hyperfoam 对象。

**路径**

```
materialApi.materials()[*name*].Hyperfoam
```

**原型**

```
odb_Hyperfoam&
Hyperfoam(bool testData,
          odb_Union poisson,
          int n,
          bool temperatureDependency,
          const odb_String& moduli,
          const odb_SequenceSequenceDouble& table);
```

**必需参数**

无。

**可选参数**

*testData*

一个布尔值，指定是否提供测试数据。默认值为 false。

*poisson*

字符串"NONE"或一个 Double，指定材料的有效泊松比，![](../graphics/ker_eqn00164.gif)![](../graphics/ker_eqn00283.gif)![](../graphics/ker_eqn00088.gif)]，为 ![](../graphics/ker_eqn00268.gif) 和 ![](../graphics/ker_eqn00269.gif)![](../graphics/ker_eqn00270.gif)![](../graphics/ker_eqn00088.gif)![](../graphics/ker_eqn00284.gif)![](../graphics/ker_eqn00272.gif) 6 时不允许温度依赖。

**返回值**

一个 Hyperfoam 对象。

**异常**

RangeError。

### 60.61.2 成员

Hyperfoam 对象的成员与 [Hyperfoam](pt02ch60pyo61.md#ker-hyperfoam-hyperfoam-cpp) 方法的参数具有相同的名称和描述。

此外，Hyperfoam 对象可以具有以下成员：

**原型**

```
odb_BiaxialTestData biaxialTestData() const;
odb_VolumetricTestData volumetricTestData() const;
odb_PlanarTestData planarTestData() const;
odb_SimpleShearTestData simpleShearTestData() const;
odb_UniaxialTestData uniaxialTestData() const;
```

*biaxialTestData*

一个 [BiaxialTestData](pt02ch60pyo04.md) 对象。

*volumetricTestData*

一个 [VolumetricTestData](pt02ch60pyo110.md) 对象。

*planarTestData*

一个 [PlanarTestData](pt02ch60pyo76.md) 对象。

*simpleShearTestData*

一个 [SimpleShearTestData](pt02ch60pyo91.md) 对象。

*uniaxialTestData*

一个 [UniaxialTestData](pt02ch60pyo101.md) 对象。

### 60.61.3 对应的分析关键字

| [*HYPERFOAM](../key/key-link.md#usb-kws-mhyperfoam) |
| --- |
