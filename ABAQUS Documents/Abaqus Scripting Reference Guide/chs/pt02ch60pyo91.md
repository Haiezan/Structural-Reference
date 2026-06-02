# 60.91 SimpleShearTestData 对象

SimpleShearTestData 对象提供简单剪切测试数据。

**访问**

```
materialApi.materials()[*name*].hyperfoam().simpleShearTestData()
```

### 60.91.1 SimpleShearTestData(...)

此方法创建一个 SimpleShearTestData 对象。

**路径**

```
materialApi.materials()[*name*].hyperfoam().SimpleShearTestData
```

**原型**

```
odb_SimpleShearTestData&
SimpleShearTestData(const odb_SequenceSequenceDouble& table);
```

**必需参数**

*table*

一个 odb_SequenceSequenceDouble，指定如下所述的项目。

**可选参数**

无。

**表数据**

- 名义剪切应力，![](../graphics/ker_eqn00332.gif)![](../graphics/ker_eqn00040.gif)![](../graphics/ker_eqn00366.gif) 方法的参数具有相同的名称和描述。

### 60.91.3 对应的分析关键字

| [*SIMPLE SHEAR TEST DATA](../key/key-link.md#usb-kws-msimplesheartestdata) |
| --- |
### 60.91.3 Corresponding analysis keywords
