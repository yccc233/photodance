# PhotoDance 照片墙应用设计

## 概述

一个展示型照片墙应用，主页展示多个相册入口，每个相册可配置不同布局风格，照片存放在本地 public 目录下。

## 技术栈

- Next.js 16 + React 19
- Tailwind CSS 4
- 文件系统读取照片（public 目录）

## 目录结构

```
src/
├── app/
│   ├── page.js                    # 主页 - 相册入口列表
│   ├── layout.js                  # 根布局
│   ├── globals.css                # 全局样式
│   └── albums/
│       └── [slug]/
│           └── page.js            # 相册详情页（动态路由）
├── config/
│   └── albums.js                  # 相册配置
└── components/
    ├── AlbumCard.js               # 主页相册卡片组件
    └── PhotoWall.js               # 照片墙组件（根据布局类型渲染不同子组件）

public/
└── photos/                        # 照片存放目录
    ├── travel/                    # 旅行相册
    │   ├── cover.jpg              # 相册封面
    │   ├── 1.jpg
    │   └── 2.jpg
    └── food/                      # 美食相册
        ├── cover.jpg
        └── 1.jpg
```

## 核心设计

### 1. 主页 (`/`)

- 展示所有相册卡片网格
- 每张卡片：封面图 + 标题 + 描述
- 点击进入对应相册详情页
- 风格：简约现代，大量留白

### 2. 相册详情页 (`/albums/[slug]`)

- 动态路由，根据 slug 匹配相册配置
- 根据配置的 `layout` 字段渲染对应布局
- 顶部返回按钮回到主页
- 支持的布局类型：
  - `masonry` — 瀑布流，高度不等紧密拼贴
  - `grid` — 网格，整齐方块排列
  - `timeline` — 时间线，按时间顺序排列

### 3. 相册配置 (`src/config/albums.js`)

```js
export const albums = [
  {
    slug: "travel",
    title: "旅行",
    description: "2024年的旅行记录",
    layout: "masonry",
    cover: "/photos/travel/cover.jpg",
    photosFolder: "/photos/travel"
  },
  {
    slug: "food",
    title: "美食",
    description: "各地美食记录",
    layout: "grid",
    cover: "/photos/food/cover.jpg",
    photosFolder: "/photos/food"
  }
];
```

### 4. 照片墙组件 (`PhotoWall.js`)

接收 `photosFolder` 和 `layout` 属性：
- `layout="masonry"` → 使用 Masonry 布局
- `layout="grid"` → 使用 Grid 布局
- `layout="timeline"` → 使用 Timeline 布局

### 5. 照片读取

使用 Next.js 的 `glob` 或 `fs` 读取 public 目录下指定文件夹的图片文件。

## 扩展方式

1. 在 `public/photos/` 下创建新文件夹，放入照片
2. 在 `src/config/albums.js` 添加新相册配置即可

## 布局风格说明

| 布局 | 特点 | 适用场景 |
|------|------|----------|
| masonry | 高度不等卡片紧密拼贴 | 照片尺寸不一时 |
| grid | 整齐方块网格 | 照片尺寸统一时 |
| timeline | 带日期标记的时间线 | 按时间回顾时 |

## 视觉风格

- 简约现代风格
- 大量留白，照片突出
- 卡片有轻微阴影和圆角
- 响应式设计，适配移动端和桌面端
