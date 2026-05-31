# 文档翻译与校核流程说明

本文档记录本仓库双语工程文档的翻译、修复、校核流程，适用于 `ABAQUS Documents`、`cuBLAS Documents` 等采用 `eng/`、`chs/`、`graphics/` 结构的文档模块。流程目标是保证中文文档与英文源文档在文件完整性、图片引用、章节结构、技术术语和 CAE 专业表达上保持一致。

## 适用目录结构

每个文档模块通常采用以下结构：

```text
文档模块/
├── eng/          # 英文源文档
├── chs/          # 中文译文
├── graphics/     # 图片、公式、图表
└── INDEX.md      # 索引
```

后续命令中的示例目标目录为：

```text
F:\00AI\Structural-Reference\ABAQUS Documents\Abaqus Analysis User's Guide
```

处理其它模块时只需替换该路径。

## 总体流程

1. 建立基线审计报告。
2. 建立或更新专业术语词典，统一维护在 `ABAQUS Documents/术语表.md`。
3. 按词典做高置信术语校对与修复，先消除可机械处理的专业术语不一致。
4. 修复硬性问题：缺文件、多文件、占位翻译、坏图片、图片计数不一致、严重短缺、整页英文未翻译。
5. 复核章节结构：标题层级、全角标题符号、机翻破坏的 Markdown 标记。
6. 重新全量审计，确认硬性问题归零。
7. 输出报告和备份位置。

## 备份原则

所有批量修复前必须先备份原文件。建议统一放在：

```text
.repair-backups/<UTC时间戳>/<文档模块名>/<修复类别>/
```

示例：

```text
.repair-backups/2026-05-31T15-34-29-025088+00-00/Abaqus Analysis User's Guide/cae-terminology-high-confidence/
```

规则：

- 每次批量写入前创建独立备份目录。
- 只备份实际会修改的文件。
- 不覆盖历史备份。
- 不回退用户或其它流程产生的无关改动。

## 第一阶段：硬性问题审计

硬性问题包括：

- `eng` 与 `chs` 文件数量不一致。
- 中文缺文件或多文件。
- 存在 `Translation in progress`。
- 图片 Markdown 语法损坏。
- 图片路径不存在。
- 英文和中文图片引用数量不一致。
- 中文文件与英文完全相同。
- 中文长度严重短缺。

建议审计项：

```text
eng_count / chs_count
missing_chs / extra_chs
translation_in_progress
malformed_image_links
broken_image_refs
image_mismatch
identical_to_english_gt800
severe_short
low_ratio_or_low_cn
heading_count_mismatch
```

判断标准：

- `severe_short`：英文大于 5000 字符且中文/英文长度比小于 0.2，通常视为严重短缺。
- `low_ratio_or_low_cn`：中文/英文长度比小于 0.35，或中文汉字极少但英文词很多，作为疑似项，不直接等同错误。
- `identical_to_english_gt800`：超过 800 字符且中英文完全相同，通常视为未翻译。

## 第二阶段：专业术语词典

术语词典必须先于大规模翻译和修复建立，避免后续机翻、复用译文或批量修复时继续放大不一致术语。Abaqus 相关术语统一维护在：

```text
F:\00AI\Structural-Reference\ABAQUS Documents\术语表.md
```

术语词典应包含以下字段：

```text
英文术语
标准译法
可接受译法
不推荐译法
适用说明
```

使用规则：

- 新增或处理 Abaqus 文档模块前，先读取 `ABAQUS Documents/术语表.md`。
- 若发现新术语，先补充术语表，再执行翻译或批量校对。
- 术语表中已有“标准译法”时，优先使用标准译法。
- “可接受译法”仅在上下文确实需要时使用，并应在报告中说明。
- “不推荐译法”作为校对规则来源，可用于定位高置信术语问题。

示例核心术语：

| English | 标准译法 | 可接受译法 | 不推荐译法 |
| --- | --- | --- | --- |
| Step module | 分析步模块 |  | 步骤模块、步长模块 |
| Load module | 载荷模块 |  | 加载模块、负载模块 |
| Interaction module | 相互作用模块 |  | 交互模块 |
| Assembly | 装配体 |  | 组装体、程序集 |
| Part | 部件 |  | 零件模块 |
| Element | 单元 |  | 元素 |
| Node | 节点 |  | 结点 |
| Active degrees of freedom | 活动自由度 | 有效自由度 | 激活自由度 |
| Solution variable | 求解变量 |  | 解变量 |
| Natural frequency | 固有频率 |  | 自然频率 |
| Kinematic hardening | 运动硬化 |  | 运动学硬化 |
| Film condition | 膜条件 | 对流换热条件 | 薄膜条件 |

## 第三阶段：术语校对

术语校对应在硬性问题修复前执行，原因是：文件复用、机器翻译和结构修复都可能保留原有术语问题；先清理高置信术语可以降低后续人工复核成本。

术语校对分两级。

### 高置信、低风险项

这类可以批量替换：

- CAE 模块名：`步骤模块` -> `分析步模块`
- CAE 模块名：`加载模块` -> `载荷模块`
- CAE 模块名：`交互模块` -> `相互作用模块`
- 明显误译：`海量信息` -> `质量信息`
- 动力学术语：`自然频率` -> `固有频率`
- 材料术语：`运动学硬化` -> `运动硬化`
- 求解术语：`解变量` -> `求解变量`
- 方向术语：`本地方向` -> `局部方向`

注意：

- `解变量` 替换时要避免把已有 `求解变量` 变成 `求求解变量`。
- `程序`、`加载`、`幅度`、`振幅` 等普通词不能无条件全局替换。
- `失败` 在程序运行失败语境中可能正确，不应一概替换为 `失效`。

### 中风险项

这类必须结合英文上下文或所在章节判断：

- `程序` 是否应为 `分析过程`。
- `加载` 是否是动词还是 `Load module`。
- `幅度/振幅` 是否是一般物理幅度还是 Abaqus `Amplitude`。
- `体积力` 是否对应 `body force` 还是 `volume force`。
- `零件` 是否可接受，或需统一为 `部件`。
- `膜条件` 是否需进一步写为 `对流换热条件`。

## 第四阶段：硬性问题修复

### 文件配对

处理顺序：

1. 对比 `eng/*.md` 与 `chs/*.md` 文件名。
2. 缺失中文文件优先从同源模块寻找完全相同英文 hash 的中文译文。
3. 多余中文文件先确认是否无英文对应，再备份后删除。

同源复用原则：

- 英文源文件 hash 完全一致时，可复用其它模块的中文译文。
- 若同源译文图片不完整，要优先保留图片计数更完整的版本。
- 复用后必须重新审计图片和标题。

### 图片修复

检查三类问题：

- 图片语法错误，例如 `![](../graphics/xxx.gif：`。
- 图片路径不存在，例如 `../graphics/arrow.gif` 应为 `../graphics/images/arrow.gif`。
- 中英文图片引用数量不一致。

修复策略：

- 坏路径优先按实际文件位置修正。
- 图片数量缺失时，按英文图片顺序补入中文文件相邻位置。
- 多余图片只删除独立图片行或确定是重复插入的内联图片，避免误删正文公式。

完成标准：

```text
malformed_image_links = 0
broken_image_refs = 0
image_mismatch_files = 0
image_missing_total = 0
image_extra_total = 0
```

### 严重短缺与整页英文

处理顺序：

1. 优先从其它文档模块复用同源中文。
2. 如果没有同源译文，再使用翻译脚本或人工翻译。
3. 翻译时必须保护代码块、图片链接、公式图片、Markdown 表格、Abaqus 关键字和链接。

本次实践中使用过的临时脚本：

```text
website/scripts/translate-severe-analysis-user-guide.py
```

该脚本用于严重短缺文件的分块机翻、缓存和备份。由于仓库 `.gitignore` 可能忽略 `*.py`，如需长期保留应另行调整忽略规则或放入受跟踪目录。

## 第五阶段：章节结构复核

重点检查：

- 英文标题数量与中文标题数量差异。
- 中文标题是否被翻译成普通段落。
- `＃＃＃` 全角井号是否未被 Markdown 识别。
- `## # 标题`、`### # 标题` 等混合标题。
- `####标题` 缺少空格。
- 代码行如 `# include <...>` 是否被误当标题。

可安全机械修复的项：

- `####标题` -> `#### 标题`
- `＃＃＃ 标题` -> `### 标题`
- `## # 标题` -> `### 标题`
- 独立加粗行如 `**参考资料**`，若英文对应为标题，可恢复为相同层级标题。

需要人工判断的项：

- 中文比英文多了“参考文献/概述”等辅助标题。
- 中文把英文一个大节拆成多个小节。
- 输出变量索引页中大量英文变量名保留。

最终允许保留的结构差异必须写入报告并说明原因。

## 第六阶段：复查标准

每轮修复后必须至少复查：

```text
missing_chs = 0
extra_chs = 0
translation_in_progress = 0
malformed_image_links = 0
broken_image_refs = 0
image_mismatch_files = 0
identical_to_english_gt800 = 0
severe_short = 0
```

术语修复后还应复查：

```text
remaining_high_confidence_findings = 0
```

标题结构差异若不为 0，需要列出剩余文件并说明保留原因。

## 报告输出

建议在 `website/reports/` 下保存报告：

```text
website/reports/<文档模块>-audit.json
website/reports/<文档模块>-terminology-report.md
website/reports/<文档模块>-terminology-audit.json
website/reports/<文档模块>-terminology-fix.md
```

本次已生成的示例：

```text
website/reports/abaqus-analysis-cae-terminology-report.md
website/reports/abaqus-analysis-cae-terminology-audit.json
website/reports/abaqus-analysis-cae-terminology-high-confidence-fix.md
```

## 完成判定

一个文档模块可视为完成，需满足：

- `eng` 与 `chs` 文件一一对应。
- 无占位翻译。
- 无坏图片路径。
- 无图片计数不一致。
- 无严重短缺译文。
- 无整页英文未翻译。
- 章节结构差异已修复或有明确说明。
- 高置信专业术语问题清零。
- 所有批量修改有备份。
- 已输出审计报告和术语报告。

## 注意事项

- 不要重新生成全部 `.md` 文件，除非源转换流程本身出错。
- 不要随意改动 `eng/` 源文档。
- 不要修改 `graphics/` 文件名，优先修正文档引用。
- 对公式图片和 Abaqus 关键字保持原样。
- 对输出变量名、关键字、子程序名、API 名称通常保留英文。
- 批量替换前必须先做小范围抽样，确认不会误伤。
- 所有脚本输出要使用 UTF-8，PowerShell 控制台显示乱码不等于文件乱码；必要时用 Python `repr()` 直接验证文件内容。
