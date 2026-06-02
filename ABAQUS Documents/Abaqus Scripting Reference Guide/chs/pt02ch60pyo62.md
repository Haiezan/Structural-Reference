# 60.62 Hypoelastic 对象

Hypoelastic 对象用于指定亚弹性材料特性。

**访问**

```
materialApi.materials()[*name*].hypoelastic()
```

### 60.62.1 Hypoelastic(...)

此方法创建一个 Hypoelastic 对象。

**路径**

```
materialApi.materials()[*name*].Hypoelastic
```

**原型**

```
odb_Hypoelastic&
Hypoelastic(const odb_SequenceSequenceDouble& table,
            bool user);
```

**必需参数**

*table*

一个 odb_SequenceSequenceDouble，指定如下所述的项目。

**可选参数**

*user*

一个布尔值，指定是否通过用户子程序 [`UHYPEL`](../sub/sub-link.md#sub-xsl-uhypel) 定义亚弹性。默认值为 false。

**表数据**

- 瞬时杨氏模量，![](../graphics/ker_eqn00163.gif)![](../graphics/ker_eqn00164.gif)![](../graphics/ker_eqn00285.gif)![](../graphics/ker_eqn00286.gif)![](../graphics/ker_eqn00287.gif) 方法的参数具有相同的名称和描述。

### 60.62.3 对应的分析关键字

| [*HYPOELASTIC](../key/key-link.md#usb-kws-mhypoelastic) |
| --- |
### 60.62.3 Corresponding analysis keywords
