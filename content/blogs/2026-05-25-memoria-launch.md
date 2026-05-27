---
title: "Memoria 静态网站生成器发布"
date: "2026-05-25"
tags: ["里程碑", "项目发布"]
type: "blog"
---

今天，Memoria 静态网站生成器正式发布！

这是一个你我大事件记录站的完整解决方案，从零开始构建，全部使用原生技术栈。

## 项目亮点

### 🚀 纯静态架构
- 无需任何前端框架（Vue/React/Angular 统统不需要）
- 输出目录 `dist/` 包含所有 `.html` + `.css` + `.js`
- 可直接部署到 GitHub Pages、Netlify、Vercel 等静态托管

### 🎨 Dracula 官方配色
使用 Dracula Theme 的完整配色系统：

| 变量 | 值 | 用途 |
|------|-----|------|
| `--dracula-pink` | `#FF79C6` | 主强调色 |
| `--dracula-purple` | `#BD93F9` | 链接、次要强调 |
| `--dracula-cyan` | `#8BE9FD` | 卡片标题、代码 |
| `--dracula-yellow` | `#F1FA8C` | 重点文字 |
| `--dracula-background` | `#282A36` | 背景色 |

### ⚙️ GitHub Actions CI/CD
```yaml
- name: Build Site
  run: npm run build
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
```

## 目录结构

```
memoria/
├── src/                    # 编译器
│   ├── index.js           # 入口
│   ├── compiler.js        # Markdown → HTML
│   ├── renderer.js       # 模板渲染
│   └── utils.js          # 工具函数
├── themes/dracula/        # 主题
├── content/blogs/        # 内容
├── skills/dracula-theme/  # 技能文档
└── dist/                  # 构建输出
```

## 用法

```bash
npm install
npm run build      # 构建
npm run dev        # 监听模式
```

## 未来可能的方向

- 📅 事件日历视图
- 🔍 全文搜索
- 📁 事件分类
- 📤 RSS 订阅

---

*大事件，用心记录。Memoria，与你一起。*
