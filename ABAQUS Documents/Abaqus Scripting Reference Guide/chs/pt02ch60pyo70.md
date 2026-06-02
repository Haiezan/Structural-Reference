# 60.70 MohrCoulombPlasticity 对象

MohrCoulombPlasticity 对象用于指定扩展的 Mohr-Coulomb 塑性模型。

**访问**

```
materialApi.materials()[*name*].mohrCoulombPlasticity()
```

### 60.70.1 MohrCoulombPlasticity(...)

此方法创建一个 MohrCoulombPlasticity 对象。

**路径**

```
materialApi.materials()[*name*].MohrCoulombPlasticity
```

**原型**

```
odb_MohrCoulombPlasticity&
MohrCoulombPlasticity(const odb_SequenceSequenceDouble& table,
                      odb_Union deviatoricEccentricity,
                      double meridionalEccentricity,
                      bool temperatureDependency,
                      int dependencies,
                      bool useTensionCutoff);
```

**必需参数**

*table*

一个 odb_SequenceSequenceDouble，指定如下所述的项目。

**可选参数**

*deviatoricEccentricity*

字符串"NONE"或一个 Double，指定偏平面中的流动势偏心率，![](../graphics/ker_eqn00289.gif)；1/2 ![](../graphics/ker_eqn00290.gif) 1.0。如果 *deviatoricEccentricity*="NONE"，Abaqus 使用指定的 Mohr-Coulomb 摩擦角计算值。默认值为"NONE"。

*meridionalEccentricity*

一个 Double，指定子午平面中的流动势偏心率，![](../graphics/ker_eqn00062.gif)![](../graphics/ker_eqn00291.gif)![](../graphics/ker_eqn00092.gif)--![](../graphics/ker_eqn00292.gif) 平面内的摩擦角（以度为单位），![](../graphics/ker_eqn00132.gif)![](../graphics/ker_eqn00092.gif)--![](../graphics/ker_eqn00293.gif) 平面内的剪胀角， 方法的参数具有相同的名称和描述。

此外，MohrCoulombPlasticity 对象可以具有以下成员：

**原型**

```
odb_MohrCoulombHardening mohrCoulombHardening() const;
odb_TensionCutOff tensionCutOff() const;
```

*mohrCoulombHardening*

一个 [MohrCoulombHardening](pt02ch60pyo69.md) 对象。

*tensionCutOff*

一个 [TensionCutOff](pt02ch60pyo97.md) 对象。

### 60.70.3 对应的分析关键字

| [*MOHR COULOMB](../key/key-link.md#usb-kws-mmohrcoulomb) |
| --- |
### 60.70.3 Corresponding analysis keywords
