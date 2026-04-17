# 官方网站设计规格文档

**项目名称：** Structural Reference 官方网站
**创建日期：** 2026-04-17
**文档状态：** 已批准

---

## 1. 项目概述与目标

本项目为 Structural Reference（结构工程参考文档库）构建一个功能完善的官方网站。该文档库包含：

- **ABAQUS Documents**：Abaqus FEA 软件文档（20个模块，600+文件）
- **cuBLAS Documents**：NVIDIA cuBLAS GPU 加速库文档（10个章节）

**核心目标：** 构建一个现代化、高性能、易用的双语文档网站，支持文档浏览、搜索、收藏等功能，同时保持简洁的视觉风格和优秀的用户体验。

---

## 2. 技术选型

| 类别 | 选择 | 说明 |
|------|------|------|
| 框架 | Next.js 14 (App Router) | SSR/SSG 支持好，SEO 友好，React 生态 |
| UI 库 | Tailwind CSS | 原子化 CSS，快速开发响应式界面 |
| 搜索 | FlexSearch + Pagefind | 静态索引，构建时生成，免费高效 |
| 部署 | Vercel | 免费额度充足，全球 CDN，与 Next.js 原生集成 |
| 用户数据 | localStorage | 本地存储收藏、阅读历史、搜索记录，无需登录 |
| 统计分析 | 无 | 注重用户隐私 |

---

## 3. 目录结构

```
f:\00AI\Structural-Reference\
├── website/                         # Next.js 网站项目（新建）
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx                # 根布局
│   │   ├── page.tsx                 # 首页
│   │   ├── globals.css               # 全局样式
│   │   ├── docs/                     # 文档相关页面
│   │   │   ├── page.tsx              # 文档中心首页
│   │   │   └── [category]/           # 文档分类
│   │   │       └── [slug]/
│   │   │           └── page.tsx      # 文档阅读页
│   │   ├── about/
│   │   │   └── page.tsx              # 关于我们页
│   │   └── search/
│   │       └── page.tsx              # 搜索结果页
│   ├── components/                   # React 组件
│   │   ├── layout/
│   │   │   ├── Header.tsx            # 顶部导航
│   │   │   ├── Sidebar.tsx            # 侧边目录
│   │   │   └── Footer.tsx             # 底部
│   │   ├── docs/
│   │   │   ├── DocViewer.tsx          # 文档内容展示
│   │   │   ├── TableOfContents.tsx    # 目录导航
│   │   │   ├── DocNavigation.tsx      # 上一章/下一章
│   │   │   └── DocToolbar.tsx         # 工具栏（收藏、字体等）
│   │   ├── search/
│   │   │   ├── SearchModal.tsx        # 搜索弹窗
│   │   │   ├── SearchResults.tsx      # 搜索结果
│   │   │   └── SearchHistory.tsx     # 搜索历史
│   │   └── ui/                       # 通用 UI 组件
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Modal.tsx
│   ├── lib/                          # 工具函数
│   │   ├── docs.ts                   # 文档读取和处理
│   │   ├── search.ts                 # 搜索相关逻辑
│   │   ├── storage.ts                # localStorage 封装
│   │   └── utils.ts                  # 通用工具
│   ├── content/                      # 内容目录（软链接）
│   │   ├── ABAQUS Documents -> ../../ABAQUS Documents
│   │   └── cuBLAS Documents -> ../../cuBLAS Documents
│   └── public/                       # 静态资源
├── docs/superpowers/specs/          # 设计文档（已批准）
├── ABAQUS Documents/                # 现有文档（保持不变）
└── cuBLAS Documents/                 # 现有文档（保持不变）
```

---

## 4. 页面规划

### 4.1 首页 (`/`)

**功能：**
- 项目 Logo 和名称
- 项目简介（中英双语）
- 快速入口：ABAQUS Documents / cuBLAS Documents
- 特色功能展示（搜索、收藏、深色模式等）
- 统计数据（文档数量、分类数等）

### 4.2 文档中心 (`/docs`)

**功能：**
- 文档分类展示（ABAQUS / cuBLAS 两大类）
- 每个分类下的子模块列表
- 最近更新的文档（可选）

### 4.3 文档阅读页 (`/docs/[category]/[slug]`)

**功能：**
- 文档内容展示（支持 Markdown 渲染）
- 左侧：文档目录树（可折叠、多级展开）
- 右侧：文章目录（当前阅读位置、标题导航）
- 顶部：面包屑导航
- 底部：上一章/下一章切换
- 工具栏：收藏、字体大小调整、深色模式、分享

### 4.4 搜索页 (`/search`)

**功能：**
- 搜索输入框
- 搜索历史记录（本地存储）
- 分类筛选（ABAQUS / cuBLAS / 全部分类）
- 搜索结果列表（关键词高亮）
- 相关性排序

### 4.5 关于我们 (`/about`)

**功能：**
- 项目背景介绍
- 文档来源说明
- 贡献指南（可选）
- 联系方式

---

## 5. 核心功能详细设计

### 5.1 文档导航系统

**目录树组件 (`Sidebar.tsx`)：**
- 读取 `INDEX.md` 文件解析目录结构
- 支持多级展开/折叠（默认展开第一级）
- 当前文档高亮显示
- 悬浮显示完整标题（如果截断）
- 响应式：移动端以抽屉形式展示

**文章目录组件 (`TableOfContents.tsx`)：**
- 从 Markdown 内容提取 h2/h3 标题
- 平滑滚动到对应章节
- 当前阅读位置高亮

### 5.2 全文搜索系统

**搜索索引：**
- 使用 Pagefind 在构建时生成搜索索引
- 支持中英文混合搜索
- 索引文件存储在 `public/pagefind/` 目录

**搜索交互：**
- `Cmd/Ctrl + K` 快捷键打开搜索弹窗
- 实时搜索建议（debounce 300ms）
- 搜索历史记录（localStorage，最多保存 10 条）
- 关键词高亮显示
- 分类筛选（ABAQUS / cuBLAS）
- 相关性排序

### 5.3 用户个性化功能

**localStorage 数据结构：**
```typescript
interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  sidebarcollapsed: boolean;
}

interface UserData {
  favorites: string[];           // 收藏的文档路径
  history: string[];              // 阅读历史（最近 50 条）
  searchHistory: string[];        // 搜索历史（最近 10 条）
  lastVisited: string;            // 最后访问的文档
}
```

### 5.4 深色/浅色主题

**实现方式：**
- 使用 Tailwind CSS 的 `dark:` 变体
- 通过 `next-themes` 库管理主题切换
- 主题偏好保存到 localStorage
- 支持 `system` 跟随系统设置

---

## 6. 视觉设计规范

### 6.1 配色方案

**浅色模式：**
- 主色（Primary）：`#2563eb` (Blue-600)
- 次色（Secondary）：`#64748b` (Slate-500)
- 背景色：`#ffffff`
- 文字色：`#1e293b` (Slate-800)
- 边框色：`#e2e8f0` (Slate-200)
- 强调色：`#f97316` (Orange-500)

**深色模式：**
- 主色：`#3b82f6` (Blue-500)
- 次色：`#94a3b8` (Slate-400)
- 背景色：`#0f172a` (Slate-900)
- 文字色：`#f1f5f9` (Slate-100)
- 边框色：`#334155` (Slate-700)

### 6.2 字体规范

- 中文字体：系统默认（`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`）
- 英文字体：`Inter`（通过 Google Fonts 加载）
- 代码字体：`JetBrains Mono`（代码块使用）
- 字号：
  - 正文：16px
  - 小字：14px
  - 大字：18px / 20px
  - 标题：24px / 32px / 48px

### 6.3 间距与布局

- 基础间距单位：4px
- 内容最大宽度：1280px
- 侧边栏宽度：280px（桌面端）
- 移动端断点：768px（md）、1024px（lg）

---

## 7. SEO 优化

**技术实现：**
- Next.js App Router 默认支持 SSR/SSG
- 每个页面生成唯一的 `metadata`（标题、描述、关键词）
- 生成 `sitemap.xml` 和 `robots.txt`
- 使用语义化 HTML 标签
- 图片添加 `alt` 属性
- 生成 Open Graph 和 Twitter Card 标签

**内容优化：**
- 文档链接使用有意义的 slug
- URL 结构清晰：`/docs/abaqus-analysis-users-guide/ch01`
- 生成面包屑导航（有助于 SEO）

---

## 8. 性能优化

**加载优化：**
- 图片使用 `next/image` 组件（自动懒加载、WebP 转换）
- 代码分割（Next.js 自动实现）
- 文档内容分页（每篇文档限制在合理长度）
- 搜索索引按需加载

**渲染优化：**
- 使用 ISR（Incremental Static Regeneration）实现增量更新
- 静态资源 CDN 缓存

**用户体验优化：**
- 首屏加载骨架屏
- 页面切换过渡动画
- 滚动条平滑滚动

---

## 9. 浏览器兼容性

确保在以下浏览器中正常工作：

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## 10. 开发计划

### Phase 1: 项目基础搭建
- 初始化 Next.js 项目
- 配置 Tailwind CSS 和主题系统
- 创建基础布局组件（Header、Sidebar、Footer）
- 配置路径别名和软链接

### Phase 2: 文档展示功能
- 实现文档读取和解析（读取 INDEX.md 和 markdown 文件）
- 实现文档阅读页面
- 实现目录树组件
- 实现文章目录组件

### Phase 3: 搜索功能
- 集成 Pagefind 搜索
- 实现搜索弹窗组件
- 实现搜索历史功能

### Phase 4: 用户功能
- 实现收藏功能
- 实现阅读历史
- 实现主题切换
- 实现字体大小调整

### Phase 5: 其他页面和优化
- 实现首页
- 实现关于我们页面
- SEO 优化
- 性能优化
- 响应式测试

---

## 11. 验收标准

1. 所有核心页面（首页、文档中心、文档阅读页、搜索、关于）可正常访问
2. 文档目录树可正常展开/折叠和导航
3. 搜索功能返回正确结果，支持关键词高亮
4. 主题切换（深色/浅色）正常工作
5. 收藏功能可将文档添加到收藏列表
6. 阅读历史记录正确保存
7. 在桌面端和移动端均有良好显示效果
8. 在 Chrome、Firefox、Safari、Edge 中正常显示
9. 页面加载速度满足用户期望
10. SEO 元信息正确生成
