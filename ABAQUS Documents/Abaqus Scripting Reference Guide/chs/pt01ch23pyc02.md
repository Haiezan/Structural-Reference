# 23.5 writeFreeBodyReport

此命令将自由体输出报告写入文件。

### 23.5.1 writeFreeBodyReport(...)

此方法将 FreeBody 对象写入用户定义的 ASCII 文件。

**Path**

```
session.writeFreeBodyReport
```

**Required arguments**

*fileName*

指定写入自由体输出的文件名的 String。

*append*

指定是否将自由体输出追加到现有文件的 Boolean。默认值为 ON。

**Optional arguments**

*step*

标识从中获取数值的分析步的 Int。默认值为当前分析步。

*frame*

标识从中获取数值的帧的 Int。默认值为当前帧。

*stepFrame*

指示从指定帧还是从所有活动帧获取数值的 SymbolicConstant。可能值为 SPECIFY 和 ALL。默认值为 SPECIFY。

*odb*

指定从中读取数据的输出数据库的 Odb 对象。
