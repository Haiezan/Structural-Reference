# 60.78 PoreFluidExpansion 对象

PoreFluidExpansion 对象用于指定液压流体的热膨胀系数。

**访问**

```
materialApi.materials()[*name*].poreFluidExpansion()
```

### 60.78.1 PoreFluidExpansion(...)

此方法创建一个 PoreFluidExpansion 对象。

**路径**

```
materialApi.materials()[*name*].PoreFluidExpansion
```

**原型**

```
odb_PoreFluidExpansion&
PoreFluidExpansion(const odb_SequenceSequenceDouble& table,
                   double zero,
                   bool temperatureDependency,
                   int dependencies);
```

**必需参数**

*table*

一个 odb_SequenceSequenceDouble，指定如下所述的项目。

**可选参数**

*zero*

一个 Double，指定 ![](../graphics/ker_eqn00061.gif)![](../graphics/ker_eqn00239.gif) 方法的参数具有相同的名称和描述。

### 60.78.3 对应的分析关键字

| [*EXPANSION](../key/key-link.md#usb-kws-mexpansion) |
| --- |
### 60.78.3 Corresponding analysis keywords
