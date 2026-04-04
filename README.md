# PhotoDance

PhotoDance 是一个照片画廊网站，展示多个相册，支持瀑布流（masonry）、网格（grid）、时间线（timeline）三种布局。

## 快速开始

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 常用命令

```bash
npm run dev      # 开发服务器
npm run build    # 构建（自动生成缩略图 + 生产构建）
npm run start    # 生产服务器
npm run lint     # ESLint
npm run thumbs   # 仅重新生成缩略图
```

## 添加新相册

1. 在 `src/config/albums.js` 中添加条目，指定 `slug`、`title`、`description`、`layout`、`cover`、`photosFolder`
2. 将照片放入 `public/photos/{folder}/`
3. 运行 `npm run build` — 缩略图和 manifest 自动生成

## 技术特性

### 缩略图与动态加载

为解决大量高清照片的加载性能问题，系统在构建时自动生成缩略图：

- **构建时处理**：使用 `sharp` 在 `npm run build` 时生成 400px 宽 WebP 缩略图，存储于 `public/photos/{album}/.thumbs/`
- **Blur 占位符**：每张缩略图对应一个 10px 宽的 base64 WebP blur 图片，存储在 `manifest.json` 中
- **渐进展示**：相册列表使用缩略图 + `next/image` blur 占位符，页面加载无跳动
- **Lightbox 高清加载**：点击照片打开 Lightbox 时才加载原图（非预加载），避免一次性请求高清大图

相关文件：
- `scripts/generate-thumbs.mjs` — 缩略图生成脚本
- `src/lib/photos.js` — 读取 manifest，返回带缩略图和 blurDataURL 的照片对象
- `src/components/layouts/*` — 使用 `next/image` + blur 占位符
- `src/components/PhotoLightbox.js` — Lightbox 懒加载原图

### 相册布局

三种布局通过 `src/components/PhotoWall.js` 路由分发：

- `masonry` — 瀑布流，左侧有菲林孔装饰
- `grid` — 统一尺寸网格
- `timeline` — 左右交替时间线

### 设计风格

- 主色调：金色 `#b48c50`、深色 `#1a1a1a`、米白 `#faf9f7`
- 字体：Playfair Display（标题）+ Lora（正文）

## 项目结构

```
src/
  app/                    # Next.js App Router 页面
    albums/[slug]/        # 相册详情页
    albums.css            # 相册相关所有样式（lightbox、masonry、grid、timeline）
    home.css              # 首页动画样式
    globals.css           # 全局样式
  components/
    layouts/              # 三种布局组件（Masonry、Grid、Timeline）
    PhotoWall.js          # 布局路由
    PhotoLightbox.js      # 全屏照片查看器
    AlbumCard.js          # 首页相册卡片
    AlbumHeader.js        # 相册页顶部导航
    AlbumInfoSection.js   # 相册标题描述区
    ScrollReveal.js       # 滚动动画组件
  config/albums.js        # 相册配置
  lib/photos.js          # 照片读取（getPhotosFromFolder）
public/photos/            # 照片源文件（按相册分子目录）
  {album}/
    .thumbs/              # 自动生成的缩略图
    manifest.json          # 自动生成的元数据
scripts/
  generate-thumbs.mjs     # 缩略图生成脚本
```
