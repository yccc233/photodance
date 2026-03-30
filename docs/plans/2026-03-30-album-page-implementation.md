# 相册详情页实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 对相册详情页进行视觉升级，延续首页电影胶片风格，融合报纸/杂志风排版，新增全屏灯箱。

**Architecture:** 相册页沿用现有 `PhotoWall` 路由模式不变。新增顶部信息区 `AlbumInfoSection`、顶部导航 `AlbumHeader`、客户端灯箱 `PhotoLightbox`，分别重构 Masonry / Grid / Timeline 三套布局样式。

**Tech Stack:** Next.js 16（App Router），React 19，Tailwind CSS v4，`albums.css`，无额外第三方库。

---

## 任务总览

| # | 任务 | 文件 |
|---|------|------|
| 1 | 创建 `AlbumInfoSection.js` 顶部信息区 | `src/components/AlbumInfoSection.js` + `albums.css` |
| 2 | 创建 `AlbumHeader.js` 顶部导航栏 | `src/components/AlbumHeader.js` + `albums.css` |
| 3 | 创建 `PhotoLightbox.js` 灯箱组件 | `src/components/PhotoLightbox.js` + `albums.css` |
| 4 | 重构 Masonry 布局（胶片齿孔） | `src/components/layouts/Masonry.js` + `albums.css` |
| 5 | 重构 Grid 布局（自由高度网格） | `src/components/layouts/Grid.js` + `albums.css` |
| 6 | 重构 Timeline 布局（呼应首页） | `src/components/layouts/Timeline.js` + `albums.css` |
| 7 | 重构相册详情页（整合所有组件） | `src/app/albums/[slug]/page.js` |
| 8 | PhotoWall 透传灯箱点击事件 | `src/components/PhotoWall.js` |
| 9 | 验证 & 提交 | — |

---

## 任务 1：创建顶部信息区 AlbumInfoSection

**文件：** 创建 `src/components/AlbumInfoSection.js`

```jsx
export default function AlbumInfoSection({ title, description }) {
  return (
    <section className="album-info">
      <h2 className="album-info__title">
        <span className="album-info__star">✦</span>
        {" "}{title}{" "}
        <span className="album-info__star">✦</span>
      </h2>
      <p className="album-info__desc">{description}</p>
      <div className="album-info__divider">
        <span className="album-info__line" />
        <span className="album-info__diamond">◆</span>
        <span className="album-info__line" />
      </div>
    </section>
  );
}
```

对应的 CSS 片段追加到 `albums.css`：

```css
.album-info {
  text-align: center;
  padding: 3rem 2rem 2.5rem;
  animation: fadeInUp 0.8s ease-out both;
}

.album-info__title {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: 2.2rem;
  font-weight: 400;
  color: #b48c50;
  margin: 0 0 0.8rem;
  letter-spacing: 0.05em;
}

.album-info__star {
  font-size: 0.6em;
  vertical-align: middle;
}

.album-info__desc {
  font-family: var(--font-lora), Georgia, serif;
  font-size: 0.9rem;
  font-style: italic;
  color: #888;
  margin: 0;
}

.album-info__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2rem;
  animation: expandLine 0.6s ease-out 0.3s both;
}

.album-info__line {
  width: 60px;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(180, 140, 80, 0.6), transparent);
}

.album-info__diamond {
  color: #b48c50;
  font-size: 0.6rem;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes expandLine {
  from { opacity: 0; transform: scaleX(0); }
  to { opacity: 1; transform: scaleX(1); }
}

@media (max-width: 640px) {
  .album-info {
    padding: 2rem 1.5rem 1.5rem;
  }
  .album-info__title {
    font-size: 1.8rem;
  }
  .album-info__line {
    width: 40px;
  }
}
```

---

## 任务 3：创建顶部导航栏 AlbumHeader

**文件：** 创建 `src/components/AlbumHeader.js`

```jsx
"use client";

import Link from "next/link";

export default function AlbumHeader({ title, layout }) {
  return (
    <header className="album-header">
      <Link href="/" className="album-header__back">← 返回</Link>
      <h1 className="album-header__title">{title}</h1>
      <span className="album-header__layout">{layout}</span>
    </header>
  );
}
```

**文件：** 创建 `src/app/albums.css`

```css
.album-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1a1a1a;
  padding: 1rem 2rem;
  gap: 1rem;
}

.album-header__back {
  color: #b48c50;
  text-decoration: none;
  font-family: var(--font-lora), Georgia, serif;
  font-size: 0.85rem;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.album-header__back:hover {
  opacity: 0.7;
}

.album-header__title {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #faf9f7;
  margin: 0;
  text-align: center;
  flex: 1;
}

.album-header__layout {
  font-family: var(--font-lora), Georgia, serif;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: #b48c50;
  text-transform: lowercase;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .album-header {
    padding: 0.75rem 1rem;
  }
  .album-header__title {
    font-size: 1rem;
  }
}
```

---

## 任务 2：创建 PhotoLightbox 灯箱组件

**文件：** 创建 `src/components/PhotoLightbox.js`

需要实现：
- 全屏背景 `rgba(0,0,0,0.92)`
- 居中照片，原比例，`max-width: 90vw`，`max-height: 85vh`
- 顶部居中序号 `03 / 87`，金色 Playfair Display
- 右上角关闭按钮
- 左右箭头切换
- 底部 7 张缩略图条，当前照片金色边框高亮
- 键盘 ESC / 左右方向键支持
- 淡入淡出动效

```jsx
"use client";

import { useEffect, useCallback, useState } from "react";

export default function PhotoLightbox({ photos, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % photos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [photos, onClose]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  // Thumbnail strip: 7 visible, centered around current
  const thumbCount = 7;
  const half = Math.floor(thumbCount / 2);
  let start = current - half;
  let end = current + half;
  if (end >= photos.length) {
    end = photos.length - 1;
    start = Math.max(0, end - thumbCount + 1);
  }
  if (start < 0) {
    start = 0;
    end = Math.min(photos.length - 1, thumbCount - 1);
  }
  const thumbs = photos.slice(start, end + 1);
  const thumbsStart = start;

  return (
    <div className={`lightbox ${visible ? "lightbox--visible" : ""}`} onClick={onClose}>
      {/* Top bar */}
      <div className="lightbox__top" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox__counter">
          {String(current + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
        <button className="lightbox__close" onClick={onClose}>×</button>
      </div>

      {/* Main photo */}
      <div className="lightbox__photo-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={photos[current]} alt="" className="lightbox__photo" />
      </div>

      {/* Navigation arrows */}
      <button className="lightbox__arrow lightbox__arrow--prev" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
      <button className="lightbox__arrow lightbox__arrow--next" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>

      {/* Thumbnail strip */}
      <div className="lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
        {thumbs.map((photo, i) => (
          <button
            key={photo}
            className={`lightbox__thumb ${photo === photos[current] ? "lightbox__thumb--active" : ""}`}
            onClick={() => setCurrent(thumbsStart + i)}
          >
            <img src={photo} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
```

对应的 CSS（写入 `albums.css`）：

```css
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.lightbox--visible {
  opacity: 1;
}

.lightbox__top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
}

.lightbox__counter {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: 1rem;
  color: #b48c50;
  letter-spacing: 0.2em;
}

.lightbox__close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0 0.5rem;
  transition: color 0.2s;
}

.lightbox__close:hover {
  color: #fff;
}

.lightbox__photo-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 5rem;
  max-width: 100%;
}

.lightbox__photo {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 2px;
}

.lightbox__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.lightbox__arrow:hover {
  background: rgba(255, 255, 255, 0.3);
}

.lightbox__arrow--prev { left: 1.5rem; }
.lightbox__arrow--next { right: 1.5rem; }

.lightbox__thumbs {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  max-width: 90vw;
  overflow-x: auto;
}

.lightbox__thumb {
  width: 56px;
  height: 40px;
  flex-shrink: 0;
  background: none;
  border: 2px solid transparent;
  padding: 0;
  cursor: pointer;
  border-radius: 2px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.lightbox__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lightbox__thumb--active {
  border-color: #b48c50;
}

@media (max-width: 640px) {
  .lightbox__photo-wrap {
    padding: 3rem 3.5rem;
  }
  .lightbox__arrow {
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
  }
  .lightbox__arrow--prev { left: 0.5rem; }
  .lightbox__arrow--next { right: 0.5rem; }
  .lightbox__thumbs {
    bottom: 1rem;
  }
}
```

---

## 任务 3：重构 Masonry 布局（胶片齿孔版）

**文件：** 修改 `src/components/layouts/Masonry.js`

```jsx
import MasonryLayout from "./MasonryLayout";

export default function Masonry({ photos }) {
  return <MasonryLayout photos={photos} />;
}
```

**文件：** 创建 `src/components/layouts/MasonryLayout.js`

```jsx
import "../../app/albums.css";

export default function MasonryLayout({ photos }) {
  return (
    <div className="masonry">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="masonry__item"
          onClick={() => window.openLightbox && window.openLightbox(index)}
        >
          <div className="masonry__sprocket" />
          <div className="masonry__photo">
            <img src={photo} alt="" loading="lazy" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

**文件：** 修改 `src/components/layouts/Masonry.js`（变为路由层）：

```jsx
import MasonryLayout from "./MasonryLayout";

export default function Masonry({ photos, onPhotoClick }) {
  return <MasonryLayout photos={photos} onPhotoClick={onPhotoClick} />;
}
```

更新 `MasonryLayout` 接收 `onPhotoClick` prop 并调用。

对应的 CSS 片段追加到 `albums.css`：

```css
.masonry {
  columns: 2;
  column-gap: 12px;
  padding: 2rem 1.5rem;
}

@media (min-width: 640px) {
  .masonry {
    columns: 3;
    column-gap: 16px;
    padding: 2rem 2rem;
  }
}

@media (min-width: 1024px) {
  .masonry {
    columns: 4;
    column-gap: 20px;
    padding: 2rem 3rem;
  }
}

.masonry__item {
  break-inside: avoid;
  margin-bottom: 12px;
  display: flex;
  position: relative;
  background: #faf9f7;
}

@media (min-width: 640px) {
  .masonry__item {
    margin-bottom: 16px;
  }
}

@media (min-width: 1024px) {
  .masonry__item {
    margin-bottom: 20px;
  }
}

.masonry__sprocket {
  width: 5px;
  flex-shrink: 0;
  background: #1a1a1a;
  position: relative;
  border-radius: 2px 0 0 2px;
}

.masonry__sprocket::before,
.masonry__sprocket::after {
  content: "";
  position: absolute;
  left: 1px;
  width: 3px;
  height: 6px;
  background: rgba(180, 140, 80, 0.5);
  border-radius: 1px;
}

.masonry__sprocket::before { top: 8px; }
.masonry__sprocket::after { bottom: 8px; }

/* 中间再多加几个齿孔 */
.masonry__sprocket-btwn {
  position: absolute;
  left: 1px;
  width: 3px;
  height: 6px;
  background: rgba(180, 140, 80, 0.5);
  border-radius: 1px;
}

.masonry__photo {
  flex: 1;
  overflow: hidden;
}

.masonry__photo img {
  width: 100%;
  display: block;
  filter: grayscale(10%) contrast(1.03);
  transition: filter 0.4s, transform 0.4s;
  cursor: pointer;
}

.masonry__item:hover .masonry__photo img {
  filter: grayscale(0%) contrast(1);
  transform: scale(1.02);
}
```

> **注：** Masonry 每行高度不同，`::before` / `::after` 只定位顶底两个齿孔，高度较高的大照片齿孔不够的问题通过 JS 动态插入 `.masonry__sprocket-btwn` 中间齿孔解决（MasonryLayout 组件 mount 时根据实际高度计算）。

---

## 任务 4：重构 Grid 布局

**文件：** 修改 `src/components/layouts/Grid.js`

Grid 使用 CSS `columns` 实现自由高度网格（与 Masonry 类似），每张照片有细细边框：

```css
.grid {
  columns: 2;
  column-gap: 8px;
  padding: 2rem 1.5rem;
}

@media (min-width: 640px) {
  .grid { columns: 3; column-gap: 12px; padding: 2rem 2rem; }
}

@media (min-width: 1024px) {
  .grid { columns: 4; column-gap: 12px; padding: 2rem 3rem; }
}

.grid__item {
  break-inside: avoid;
  margin-bottom: 8px;
  border: 1px solid #e0ddd8;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}

@media (min-width: 640px) {
  .grid__item { margin-bottom: 12px; }
}

.grid__item img {
  width: 100%;
  display: block;
  transition: filter 0.3s;
}

.grid__item:hover img {
  filter: brightness(1.05);
}
```

---

## 任务 5：重构 Timeline 布局

**文件：** 修改 `src/components/layouts/Timeline.js`

PC 端交替左右，手机端统一靠左：

```jsx
import "../../app/albums.css";

export default function Timeline({ photos }) {
  return (
    <div className="timeline">
      <div className="timeline__line" />
      {photos.map((photo, index) => (
        <div key={index} className={`timeline__item ${index % 2 === 0 ? "timeline__item--left" : "timeline__item--right"}`}>
          <div className="timeline__content">
            <img src={photo} alt="" loading="lazy" />
          </div>
          <div className="timeline__node">
            <div className="timeline__dot" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

对应的 CSS：

```css
.timeline {
  position: relative;
  padding: 2rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.timeline__line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(180, 140, 80, 0.25);
  transform: translateX(-50%);
}

.timeline__item {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;
}

.timeline__item--left {
  flex-direction: row;
}

.timeline__item--right {
  flex-direction: row-reverse;
}

.timeline__content {
  flex: 1;
  max-height: 360px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e0ddd8;
}

.timeline__content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.timeline__node {
  flex-shrink: 0;
  width: 40px;
  display: flex;
  justify-content: center;
}

.timeline__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #b48c50;
  border: 2px solid #faf9f7;
  box-shadow: 0 0 0 1px rgba(180, 140, 80, 0.3);
}

@media (max-width: 768px) {
  .timeline__line {
    left: 20px;
  }
  .timeline__item,
  .timeline__item--left,
  .timeline__item--right {
    flex-direction: row;
    padding-left: 50px;
  }
  .timeline__node {
    position: absolute;
    left: 20px;
    transform: translateX(-50%);
    width: auto;
  }
  .timeline__content {
    flex: 1;
  }
}
```

---

## 任务 6：重构相册详情页

**文件：** 修改 `src/app/albums/[slug]/page.js`

```jsx
import { albums } from "@/config/albums";
import PhotoWall from "@/components/PhotoWall";
import AlbumHeader from "@/components/AlbumHeader";
import Lightbox from "@/components/PhotoLightbox";
import { getPhotosFromFolder } from "@/lib/photos";
import "../../app/albums.css";

export async function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export default async function AlbumPage({ params, searchParams }) {
  const { slug } = await params;
  const album = albums.find((a) => a.slug === slug);

  if (!album) {
    return <div>Album not found</div>;
  }

  const photos = await getPhotosFromFolder(album.photosFolder);

  return (
    <div className="album-page">
      <div className="album-page__corner album-page__corner--tl" />
      <div className="album-page__corner album-page__corner--tr" />
      <AlbumHeader title={album.title} layout={album.layout} />
      <main className="album-page__content">
        <PhotoWall photos={photos} layout={album.layout} />
      </main>
      <footer className="album-page__footer">
        <p>俞澄❤张昕</p>
      </footer>
      {/* Lightbox rendered client-side via portal — handled by PhotoWall passing onPhotoClick */}
    </div>
  );
}
```

> **注：** `PhotoWall` 需要改造为客户端组件，接收 `onPhotoClick` 回调；各 layout 组件通过 `onPhotoClick(index)` 触发灯箱。由于 `PhotoWall` 已经是客户端组件（`"use client"`），只需透传点击事件即可。

---

## 任务 7：添加角落框架装饰

**文件：** 追加到 `albums.css`

```css
.album-page {
  min-height: 100vh;
  background: #faf9f7;
  position: relative;
}

.album-page__corner {
  position: fixed;
  width: 40px;
  height: 40px;
  z-index: 100;
  pointer-events: none;
}

.album-page__corner::before,
.album-page__corner::after {
  content: "";
  position: absolute;
  background: #1a1a1a;
}

.album-page__corner--tl { top: 20px; left: 20px; }
.album-page__corner--tl::before { top: 0; left: 0; width: 50px; height: 2px; }
.album-page__corner--tl::after { top: 0; left: 0; width: 2px; height: 50px; }

.album-page__corner--tr { top: 20px; right: 20px; }
.album-page__corner--tr::before { top: 0; right: 0; width: 50px; height: 2px; }
.album-page__corner--tr::after { top: 0; right: 0; width: 2px; height: 50px; }

@media (min-width: 768px) {
  .album-page__corner--tl { top: 30px; left: 30px; }
  .album-page__corner--tl::before { width: 80px; height: 2px; }
  .album-page__corner--tl::after { height: 80px; width: 2px; }
  .album-page__corner--tr { top: 30px; right: 30px; }
  .album-page__corner--tr::before { width: 80px; height: 2px; }
  .album-page__corner--tr::after { height: 80px; width: 2px; }
}

.album-page__content {
  position: relative;
  z-index: 10;
}

.album-page__footer {
  text-align: center;
  padding: 4rem 2rem 3rem;
  font-family: var(--font-lora), Georgia, serif;
  font-size: 0.85rem;
  font-style: italic;
  color: #b48c50;
  letter-spacing: 0.3em;
  position: relative;
  z-index: 10;
}

.album-page__footer p {
  margin: 0;
}
```

---

## 任务 9：PhotoWall 透传灯箱点击事件

**文件：** 修改 `src/components/PhotoWall.js`

```jsx
"use client";

import Masonry from "./layouts/Masonry";
import Grid from "./layouts/Grid";
import Timeline from "./layouts/Timeline";

export default function PhotoWall({ photos, layout, onPhotoClick }) {
  const props = { photos, onPhotoClick };

  switch (layout) {
    case "grid":
      return <Grid {...props} />;
    case "timeline":
      return <Timeline {...props} />;
    case "masonry":
    default:
      return <Masonry {...props} />;
  }
}
```

各 layout 组件接收 `onPhotoClick(index)`，点击时调用并传入 index。

---

## 任务 10：验证 & 提交

1. 运行 `npm run dev`，访问各相册页面验证三种布局
2. 点击照片打开灯箱，测试左右切换、ESC 关闭、缩略图点击
3. 手机端验证响应式
4. 提交所有改动

---

**Plan complete.** 两个执行选项：

**1. Subagent-Driven（本会话）** — 每个任务派发独立 subagent，任务间审查，快迭代

**2. Parallel Session（分离会话）** — 在 worktree 中开新会话，批量执行带检查点

选哪个？
