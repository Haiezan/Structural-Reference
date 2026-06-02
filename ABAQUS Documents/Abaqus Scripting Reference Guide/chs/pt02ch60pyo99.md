# 60.99 TriaxialTestData 对象

TriaxialTestData 对象提供三轴测试数据。

**访问**

```
materialApi.materials()[*name*].druckerPrager().triaxialTestData()
```

### 60.99.1 TriaxialTestData(...)

此方法创建一个 TriaxialTestData 对象。

**路径**

```
materialApi.materials()[*name*].druckerPrager().TriaxialTestData
```

**原型**

```
odb_TriaxialTestData&
TriaxialTestData(const odb_SequenceSequenceDouble& table,
                 odb_Union a,
                 odb_Union b,
                 odb_Union pt);
```

**必需参数**

*table*

一个 odb_SequenceSequenceDouble，指定如下所述的项目。

**可选参数**

*a*

字符串"NONE"或一个 Double，指定材料常数 ![](../graphics/ker_eqn00278.gif)![](../graphics/ker_eqn00038.gif)![](../graphics/ker_eqn00373.gif)![](../graphics/ker_eqn00374.gif)![](../graphics/ker_eqn00375.gif) 方法的参数具有相同的名称和描述。

### 60.99.3 对应的分析关键字

| [*TRIAXIAL TEST DATA](../key/key-link.md#usb-kws-mtritestdata) |
| --- |
### 60.99.3 Corresponding analysis keywords
