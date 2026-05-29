---
title: "Memoria TypeScript 重构收尾：测试体系重建与文档全面更新"
date: "2026-05-29"
tags: ["里程碑", "TypeScript", "文档", "测试"]
type: "blog"
description: "今天完成了 Memoria 从 JavaScript 到 TypeScript 重构的最后几块拼图。"
---

今天完成了 Memoria 从 JavaScript 到 TypeScript 重构的最后几块拼图。记录一下这几天做的东西。

## 一、测试体系重建

之前 memoria 只有两三个 shell 脚本做冒烟测试，浅得不能再浅。这次写了一个完整的 TS 集成测试脚本 `memoria-integration-test.ts`，26 项测试全覆盖：

- CLI 所有命令的正确性（`init` / `generate` / `clean` / `new blog/vlog/photo` 等）
- frontmatter 格式验证（`type` 字段补上了）
- 三种内容类型的渲染验证
- 重复初始化的报错验证

交互式输入也模拟了——用 `spawn` + `stdin.write` 向 readline 写入预设行，不用等用户输入就能跑自动化测试。

**测试在 CI 里运行，开发阶段也能随时跑。**

## 二、文档全面更新

原来 docs 下的文档很多还是 JS 版本的引用，全改成了 TS 版本：
- `getting-started.md` — 补充了 `npm run build` 步骤（TS 源码要先编译）
- `content-guide.md` — 三种 content 的 frontmatter 补全了 `type` 字段
- `architecture.md` / `developer.md` — `.js` → `.ts` 全部改完
- 新增 `testing.md` — 测试指南，让后来者知道怎么跑测试

## 三、GitHub Pages 文档站

用 GitHub Actions 自动把 `docs/` 目录部署到 GitHub Pages，访问 `https://allentango.github.io/memoria/` 即可在线浏览文档。

单页文档站实现了 Dracula（暗黑）和 Peach（明亮）双主题切换，左侧导航，右侧内容，Markdown 自动渲染成 HTML。

## 四、memoria-site 持续迭代

这个 blog 站本身就是 memoria 的第一个真实用户案例。今天 blog 页的时间轴布局修复了，dot 位置、卡片间距、左右对齐全部调顺了。

---

总结一句话：**今天把 memoria 从"能跑"变成了"能用且专业"。** 🚀