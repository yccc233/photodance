# PhotoDance 照片墙实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 实现一个展示型照片墙应用，主页展示多个相册入口，每个相册可配置不同布局风格

**Architecture:** Next.js App Router 结构，使用动态路由 `/albums/[slug]`，相册配置集中管理，照片从 public 目录读取

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4

---

## Task 1: 创建相册配置和数据结构

**Files:**
- Create: `src/config/albums.js`

**Step 1: 创建配置文件**

```js
// src/config/albums.js
export const albums = [
  {
    slug: "travel",
    title: "旅行",
    description: "2024年的旅行记录",
    layout: "masonry",
    cover: "/photos/travel/cover.jpg",
    photosFolder: "/photos/travel"
  }
];
```

**Step 2: 创建示例照片文件夹结构**

```
public/photos/travel/
├── cover.jpg
├── 1.jpg
├── 2.jpg
└── 3.jpg
```

**Step 3: Commit**

```bash
git add src/config/albums.js
git commit -m "feat: add albums config"
```

---

## Task 2: 创建 PhotoWall 照片墙组件

**Files:**
- Create: `src/components/PhotoWall.js`

**Step 1: 创建基础 PhotoWall 组件**

根据 layout 属性渲染不同的布局：
- `masonry` — 瀑布流
- `grid` — 网格
- `timeline` — 时间线

```jsx
import Masonry from "./layouts/Masonry";
import Grid from "./layouts/Grid";
import Timeline from "./layouts/Timeline";

export default function PhotoWall({ photos, layout }) {
  switch (layout) {
    case "grid":
      return <Grid photos={photos} />;
    case "timeline":
      return <Timeline photos={photos} />;
    case "masonry":
    default:
      return <Masonry photos={photos} />;
  }
}
```

**Step 2: Commit**

```bash
git add src/components/PhotoWall.js
git commit -m "feat: add PhotoWall component with layout switching"
```

---

## Task 3: 创建 Masonry 瀑布流布局

**Files:**
- Create: `src/components/layouts/Masonry.js`

**Step 1: 创建 Masonry 组件**

使用 CSS columns 实现瀑布流：

```jsx
export default function Masonry({ photos }) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {photos.map((photo, index) => (
        <div key={index} className="break-inside-avoid">
          <img
            src={photo}
            alt=""
            className="w-full rounded-lg"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layouts/Masonry.js
git commit -m "feat: add Masonry layout component"
```

---

## Task 4: 创建 Grid 网格布局

**Files:**
- Create: `src/components/layouts/Grid.js`

**Step 1: 创建 Grid 组件**

```jsx
export default function Grid({ photos }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <div key={index} className="aspect-square">
          <img
            src={photo}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layouts/Grid.js
git commit -m "feat: add Grid layout component"
```

---

## Task 5: 创建 Timeline 时间线布局

**Files:**
- Create: `src/components/layouts/Timeline.js`

**Step 1: 创建 Timeline 组件**

```jsx
export default function Timeline({ photos }) {
  return (
    <div className="relative space-y-8">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300" />
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`flex items-center gap-8 ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <div className={`w-1/2 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
            <img
              src={photo}
              alt=""
              className="w-full rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="w-0.5 h-4 bg-gray-300" />
          <div className="w-1/2" />
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layouts/Timeline.js
git commit -m "feat: add Timeline layout component"
```

---

## Task 6: 创建相册详情页

**Files:**
- Create: `src/app/albums/[slug]/page.js`

**Step 1: 创建动态路由页面**

```jsx
import { albums } from "@/config/albums";
import PhotoWall from "@/components/PhotoWall";
import Link from "next/link";

export async function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export default async function AlbumPage({ params }) {
  const album = albums.find((a) => a.slug === params.slug);

  if (!album) {
    return <div>Album not found</div>;
  }

  // TODO: 后续实现从文件夹读取照片
  const photos = [];

  return (
    <div className="min-h-screen p-8">
      <Link href="/" className="text-blue-500 hover:underline mb-8 inline-block">
        ← 返回
      </Link>
      <h1 className="text-3xl font-bold mb-2">{album.title}</h1>
      <p className="text-gray-600 mb-8">{album.description}</p>
      <PhotoWall photos={photos} layout={album.layout} />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/albums/[slug]/page.js
git commit -m "feat: add album detail page with dynamic routing"
```

---

## Task 7: 创建主页相册卡片组件

**Files:**
- Create: `src/components/AlbumCard.js`

**Step 1: 创建 AlbumCard 组件**

```jsx
import Link from "next/link";

export default function AlbumCard({ album }) {
  return (
    <Link href={`/albums/${album.slug}`}>
      <div className="group cursor-pointer">
        <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
          <img
            src={album.cover}
            alt={album.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="mt-4 text-xl font-semibold">{album.title}</h3>
        <p className="text-gray-600 mt-1">{album.description}</p>
      </div>
    </Link>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/AlbumCard.js
git commit -m "feat: add AlbumCard component"
```

---

## Task 8: 实现主页

**Files:**
- Modify: `src/app/page.js`

**Step 1: 更新主页**

```jsx
import { albums } from "@/config/albums";
import AlbumCard from "@/components/AlbumCard";

export default function Home() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">PhotoDance</h1>
        <p className="text-gray-600">我的照片墙</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album) => (
          <AlbumCard key={album.slug} album={album} />
        ))}
      </main>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/page.js
git commit -m "feat: implement home page with album list"
```

---

## Task 9: 实现照片文件夹读取

**Files:**
- Modify: `src/app/albums/[slug]/page.js`
- Modify: `src/config/albums.js`

**Step 1: 创建照片读取工具函数**

Create: `src/lib/photos.js`

```js
import { globby } from "next/dist/compiled/@edge-runtime/primitives";

export async function getPhotosFromFolder(photosFolder) {
  // 构造 public 目录下的完整路径模式
  const basePath = photosFolder.replace("/photos", "photos");
  const pattern = `${basePath}/*.{jpg,jpeg,png,gif,webp}`;

  try {
    const files = await globby(pattern, { absolute: false });
    return files.map((f) => `/${f}`);
  } catch {
    return [];
  }
}
```

**Step 2: 更新相册页面使用照片读取**

Modify: `src/app/albums/[slug]/page.js`

```jsx
import { albums } from "@/config/albums";
import PhotoWall from "@/components/PhotoWall";
import Link from "next/link";
import { getPhotosFromFolder } from "@/lib/photos";

export async function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export default async function AlbumPage({ params }) {
  const album = albums.find((a) => a.slug === params.slug);

  if (!album) {
    return <div>Album not found</div>;
  }

  const photos = await getPhotosFromFolder(album.photosFolder);

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <Link href="/" className="text-blue-500 hover:underline mb-8 inline-block">
        ← 返回
      </Link>
      <h1 className="text-3xl font-bold mb-2">{album.title}</h1>
      <p className="text-gray-600 mb-8">{album.description}</p>
      <PhotoWall photos={photos} layout={album.layout} />
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add src/lib/photos.js src/app/albums/[slug]/page.js
git commit -m "feat: implement photo folder reading"
```

---

## Task 10: 添加全局样式和布局优化

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.js`

**Step 1: 更新全局样式**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-zinc-50;
}
```

**Step 2: 更新布局确保一致**

```jsx
import "./globals.css";

export const metadata = {
  title: "PhotoDance",
  description: "我的照片墙",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/globals.css src/app/layout.js
git commit -m "feat: add global styles and layout"
```

---

## Task 11: 创建示例照片并测试

**Step 1: 创建示例照片文件夹**

在 public/photos/travel/ 下放置几张示例照片

**Step 2: 运行开发服务器测试**

```bash
npm run dev
```

访问 http://localhost:3000 查看效果

**Step 3: 如果测试通过，提交最终变更**

```bash
git add -A
git commit -m "feat: photodance photo wall app complete"
```
