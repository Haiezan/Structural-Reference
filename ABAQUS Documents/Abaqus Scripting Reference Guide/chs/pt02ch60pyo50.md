# 60.50 FailStrain 对象

FailStrain 对象用于定义基于应变的失效度量参数。

**访问**

```
materialApi.materials()[*name*].elastic().failStrain()
```

### 60.50.1 FailStrain(...)

此方法创建一个 FailStrain 对象。

**路径**

```
materialApi.materials()[*name*].elastic().FailStrain
```

**原型**

```
odb_FailStrain&
FailStrain(const odb_SequenceSequenceDouble& table,
           bool temperatureDependency,
           int dependencies);
```

**必需参数**

*table*

一个 odb_SequenceSequenceDouble，指定如下所述的项目。

**可选参数**

*temperatureDependency*

一个布尔值，指定数据是否依赖温度。默认值为 false。

*dependencies*

一个整数，指定场变量依赖数量。默认值为 0。

**表数据**

- 纤维方向拉伸应变极限，![](../graphics/ker_eqn00246.gif)![](../graphics/ker_eqn00247.gif)![](../graphics/ker_eqn00248.gif)![](../graphics/ker_eqn00249.gif)![](../graphics/ker_eqn00083.gif)--![](../graphics/ker_eqn00084.gif) 平面内的剪切应变极限，![](../graphics/ker_eqn00250.gif) 方法的参数具有相同的名称和描述。

### 60.50.3 对应的分析关键字

| [*FAIL STRAIN](../key/key-link.md#usb-kws-mefailstrain) |
| --- |
### 60.50.3 Corresponding analysis keywords
