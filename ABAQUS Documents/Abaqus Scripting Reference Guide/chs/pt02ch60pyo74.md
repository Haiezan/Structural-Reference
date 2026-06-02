# 60.74 Permeability 对象

Permeability 对象用于定义孔隙流体渗透率。

**访问**

```
materialApi.materials()[*name*].permeability()
```

### 60.74.1 Permeability(...)

此方法创建一个 Permeability 对象。

**路径**

```
materialApi.materials()[*name*].Permeability
```

**原型**

```
odb_Permeability&
Permeability(double specificWeight,
             double inertialDragCoefficient,
             const odb_SequenceSequenceDouble& table,
             const odb_String& type,
             bool temperatureDependency,
             int dependencies);
```

**必需参数**

*specificWeight*

一个 Double，指定润湿液体的比重，![](../graphics/ker_eqn00296.gif)![](../graphics/ker_eqn00296.gif)![](../graphics/ker_eqn00143.gif)![](../graphics/ker_eqn00289.gif)![](../graphics/ker_eqn00144.gif)![](../graphics/ker_eqn00145.gif)![](../graphics/ker_eqn00146.gif)![](../graphics/ker_eqn00289.gif)![](../graphics/ker_eqn00144.gif)![](../graphics/ker_eqn00147.gif)![](../graphics/ker_eqn00145.gif)![](../graphics/ker_eqn00148.gif)![](../graphics/ker_eqn00149.gif)![](../graphics/ker_eqn00146.gif)![](../graphics/ker_eqn00289.gif)![](../graphics/ker_eqn00143.gif)![](../graphics/ker_eqn00289.gif)![](../graphics/ker_eqn00289.gif)![](../graphics/ker_eqn00289.gif) 方法的参数具有相同的名称和描述。

此外，Permeability 对象可以具有以下成员：

**原型**

```
odb_SaturationDependence saturationDependence() const;
odb_VelocityDependence velocityDependence() const;
```

*saturationDependence*

一个 [SaturationDependence](pt02ch60pyo88.md) 对象，指定材料渗透率对润湿液体饱和度的依赖关系。

*velocityDependence*

一个 [VelocityDependence](pt02ch60pyo105.md) 对象，指定材料渗透率对流体流速的依赖关系。

### 60.74.3 对应的分析关键字

| [*PERMEABILITY](../key/key-link.md#usb-kws-mpermeabil) |
| --- |
### 60.74.3 Corresponding analysis keywords
