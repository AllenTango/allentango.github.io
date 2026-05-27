---
title: "Memoria 本地资源引用测试"
date: "2026-05-25"
tags: ["测试", "功能验证", "本地资源"]
description: "验证博客文章中的本地图片引用是否能正常显示。"
---

## 测试目的

验证 Memoria 是否支持在 Markdown 文章中引用本地文件目录下的图片资源。

## 本地图片引用示例

在 Markdown 中直接使用相对路径引用 `public/images/` 目录下的图片：

![博客占位图](/public/images/blog-placeholder.jpg)

上面是一张在 `public/images/blog-placeholder.jpg` 的图片，通过 `/public/images/blog-placeholder.jpg` 路径引用。

## 多图展示

![照片1](/public/images/photo-1.jpg)
![照片2](/public/images/photo-2.jpg)

## 验证方法

1. 构建：`npm run build`
2. 检查 `dist/public/images/` 目录是否包含所有图片文件
3. 在浏览器中打开 `dist/index.html`，确认图片正常显示

## 技术细节

- 资源文件统一放在项目根目录的 `public/` 下
- 构建时 `public/` 目录会被完整复制到 `dist/public/`
- 引用路径使用绝对路径（以 `/public/` 开头）
- 这样无论 HTML 文件在哪个子目录，都能正确找到资源

如果图片能正常显示，说明本地资源引用功能工作正常 ✅
