# 60.81 PorousFailureCriteria 对象

PorousFailureCriteria 对象用于指定多孔金属的材料失效准则。

**访问**

```
materialApi.materials()[*name*].porousMetalPlasticity()\
.porousFailureCriteria()
```

### 60.81.1 PorousFailureCriteria(...)

此方法创建一个 PorousFailureCriteria 对象。

**路径**

```
materialApi.materials()[*name*].porousMetalPlasticity()\
.PorousFailureCriteria
```

**原型**

```
odb_PorousFailureCriteria&
PorousFailureCriteria(double fraction,
                      double criticalFraction);
```

**必需参数**

无。

**可选参数**

*fraction*

一个 Double，指定完全失效时的孔隙体积分数，![](../graphics/ker_eqn00344.gif)![](../graphics/ker_eqn00345.gif) 方法的参数具有相同的名称和描述。

### 60.81.3 对应的分析关键字

| [*POROUS FAILURE CRITERIA](../key/key-link.md#usb-kws-mporfailcriteria) |
| --- |
### 60.81.3 Corresponding analysis keywords
