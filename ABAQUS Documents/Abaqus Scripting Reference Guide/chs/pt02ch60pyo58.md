# 60.58 Gel 对象

Gel 对象用于定义膨胀凝胶。

**访问**

```
materialApi.materials()[*name*].gel()
```

### 60.58.1 Gel(...)

此方法创建一个 Gel 对象。

**路径**

```
materialApi.materials()[*name*].Gel
```

**原型**

```
odb_Gel&
Gel(const odb_SequenceSequenceDouble& table);
```

**必需参数**

*table*

一个 odb_SequenceSequenceDouble，指定如下所述的项目。

**可选参数**

无。

**表数据**

- 完全干燥时凝胶颗粒的半径，![](../graphics/ker_eqn00259.gif)![](../graphics/ker_eqn00260.gif)![](../graphics/ker_eqn00261.gif)![](../graphics/ker_eqn00262.gif) 方法的参数具有相同的名称和描述。

### 60.58.3 对应的分析关键字

| [*GEL](../key/key-link.md#usb-kws-mgel) |
| --- |
### 60.58.3 Corresponding analysis keywords
