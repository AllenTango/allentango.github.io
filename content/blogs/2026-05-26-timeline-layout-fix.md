---
title: "时间轴布局修复笔记"
date: "2026-05-26"
tags: ["CSS", "调试", "Memoria"]
type: "blog"
---

## 问题背景

Memoria 的桌面端时间轴（Timeline）出现了布局异常：
1. **卡片与锚点（dot）方向不匹配** — 标注说 `data-side=right` 应在视图右侧，但实际显示在左侧
2. **锚点（dot）不在时间轴白线上** — dot 偏离轴线，甚至贴在卡片边框上
3. **锚点过密** — dot 和卡片看起来分离，视觉关联感弱

## 核心问题：CSS 定位模型理解偏差

时间轴的结构是：
- `.timeline-entries` — 容器，轴线居中（`left: 50%`）
- `.timeline-entry` — 每个条目，宽度为容器的 50%
- `.timeline-node` / `.timeline-dot` — 锚点，期望在轴线上

之前的 CSS 用 `align-self: flex-end/start` 来定位 entry，但 **flexbox 的 `align-self` 只是让元素靠 flex 容器末端对齐，并不能让元素边缘精准对齐 50% 边界**。

同时，`data-side` 的语义也容易混淆：
- `data-side=left` = 内容在**视图左侧**（卡片在左，entry 左对齐）
- `data-side=right` = 内容在**视图右侧**（卡片在右，entry 右对齐）

## 解决过程

### 第一步：修复 dot 位置

把 `.timeline-entry` 从 `width: 50%` + `align-self: flex-end/start` 改为 **绝对定位**：

```css
/* 用 left/right 50% 让 entry 边缘精准对齐轴线 */
.timeline-entry[data-side="right"] {
  position: absolute;
  left: 50%;
}
.timeline-entry[data-side="left"] {
  position: absolute;
  right: 50%;
}

/* dot 居中于轴线 */
.timeline-node {
  left: 50%;
  transform: translate(-50%, -50%);
}
```

这样 dot 中心精准对齐 600px 处（轴线）。

### 第二步：确定 `data-side` 的正确语义

经过反复调试确认：
- `data-side=left` → 卡片在**视图左侧**，entry 左对齐，dot 在 entry 右边缘
- `data-side=right` → 卡片在**视图右侧**，entry 右对齐，dot 在 entry 左边缘

这与 `Window.orientation` 的语义一致：`left` = -90°，`right` = 90°。

### 第三步：调整视觉间距

用户反馈 dot 过密、与卡片分离。解决方案：
- **dot 保持在轴线上**（不偏移 dot）
- **卡片轻微远离轴线**：左侧 `padding-left: 15px`，右侧 `padding-right: 15px`

这样 dot 和卡片的视觉关联更紧密，同时 dot 始终在时间轴上。

### 第四步：清理冗余 CSS

删除两处冗余：
1. `.site-footer` 重复声明（连续两行完全相同）
2. `.scroll-sentinel` / `.scroll-no-more` 移动端样式（实际未被使用）

## 最终结果

| 修复项 | 结果 |
|--------|------|
| 卡片方向 | ✅ `data-side=left` 在视图左侧，`data-side=right` 在视图右侧 |
| dot 位置 | ✅ dot 精准在时间轴白线上 |
| dot 大小 | ✅ 从 14px 增大到 18px，更醒目 |
| 卡片间距 | ✅ 卡片轻微远离轴线，视觉更舒适 |
| CSS 冗余 | ✅ 删除重复规则 |

## 经验总结

1. **Flexbox `align-self` 做不到精准定位**：想让元素边缘精确对齐某个百分比位置，用 `position: absolute` + `left/right: 50%` 更可靠
2. **transform 的百分比是相对于自身**：所以 `translate(-50%, -50%)` 能让 dot 中心对齐边缘，这正是我们想要的
3. **`data-side` 的语义要明确**：`left`/ `right` 指的是内容在哪一侧，不是对齐方向
4. **调试时善用截图**：每次修复后用截图确认，避免反复试错

## 相关文件

- `/themes/dracula/layout.css` — 时间轴样式
- `/dist/layout.css` — 构建输出（与源文件同步）
- `/src/renderer.js` — 时间轴 HTML 生成逻辑