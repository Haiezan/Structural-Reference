# 60.88 SaturationDependence 对象

SaturationDependence 对象用于指定材料渗透率对润湿液体饱和度的依赖关系。

**访问**

```
materialApi.materials()[*name*].permeability().saturationDependence()
```

### 60.88.1 SaturationDependence(...)

此方法创建一个 SaturationDependence 对象。

**路径**

```
materialApi.materials()[*name*].permeability().SaturationDependence
```

**原型**

```
odb_SaturationDependence&
SaturationDependence(const odb_SequenceSequenceDouble& table);
```

**必需参数**

*table*

一个 odb_SequenceSequenceDouble，指定如下所述的项目。

**可选参数**

无。

**表数据**

- ![](../graphics/ker_eqn00362.gif)![](../graphics/ker_eqn00234.gif) 方法的参数具有相同的名称和描述。

### 60.88.3 对应的分析关键字

| [*PERMEABILITY](../key/key-link.md#usb-kws-mpermeabil) |
| --- |
### 60.88.3 Corresponding analysis keywords
