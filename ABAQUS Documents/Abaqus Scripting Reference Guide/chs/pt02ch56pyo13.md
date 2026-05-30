# 56.13 UserAmplitude object

UserAmplitude 对象使用 [`UAMP`](../sub/sub-link.md#sub-xsl-uamp) 或 [`VUAMP`](../sub/sub-link.md#sub-xsl-vuamp) 用户子程序定义幅值曲线。

UserAmplitude 对象派生自 [Amplitude](pt02ch56pyo01.md) 对象。

**Access**

```
amplitudeApi.amplitudes()[*name*]
```

### 56.13.1 UserAmplitude(...)

此方法创建 UserAmplitude 对象。

**Path**

```
amplitudeApi.UserAmplitude
```

**Prototype**

```
odb_UserAmplitude&
UserAmplitude(const odb_String& name,
              int numVariables,
              const odb_String& timeSpan);
```

**Required arguments**

*name*

指定仓库键的 odb_String。

*numVariables*

指定 [`UAMP`](../sub/sub-link.md#sub-xsl-uamp) 或 [`VUAMP`](../sub/sub-link.md#sub-xsl-vuamp) 用户子程序变量数量的 Int。

**Optional argument**

*timeSpan*

指定幅值时间跨度的 odb_String。可能值为 `"STEP"` 和 `"TOTAL"`。默认值为 `"STEP"`。

**Return value**

UserAmplitude 对象。

**Exceptions**

InvalidNameError 和 RangeError。

### 56.13.2 setValues(...)

此方法修改 UserAmplitude 对象。

**Required arguments**

无。

**Optional arguments**

`setValues` 的可选参数与 [UserAmplitude](pt02ch56pyo13.md#ker-useramplitude-useramplitude-cpp) 方法的参数相同，但不包括 *name* 参数。

**Return value**

无。

**Exceptions**

RangeError。
