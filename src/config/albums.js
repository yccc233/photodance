/**
 * 相册配置
 *
 * 添加新相册步骤：
 * 1. 在 albums 数组中添加新配置项
 * 2. 将照片放入 public/photos/{folder} 目录
 *
 * @module albums
 */

/**
 * 布局类型枚举
 * @enum {string}
 */
export const LAYOUT_TYPES = {
  MASONRY: "masonry",   // 瀑布流布局 - 照片高度不一，交错排列
  GRID: "grid",         // 网格布局 - 所有照片大小一致
  TIMELINE: "timeline"  // 时间线布局 - 照片左右交替排列
};

/**
 * @typedef {Object} Album
 * @property {string}   slug          - URL路径，如 "beach" → /albums/beach
 * @property {string}   title         - 相册标题，显示在导航栏中央
 * @property {string}   description   - 相册描述，显示在标题下方
 * @property {string}   layout        - 布局类型，可选值见 LAYOUT_TYPES
 * @property {string}   cover         - 封面图路径，相册列表页使用
 * @property {string}   photosFolder  - 照片文件夹路径，相对于 public/photos
 * @property {string}   date          - 日期，格式如 "2024.03"
 * @property {string}   [heroPosition] - hero图object-position，默认"center"；如"center 20%"让图片上移
 */

export const albums = [
  {
    slug: "shenghuozhao",
    title: "生活照",
    description: "日常生活的温暖瞬间",
    layout: LAYOUT_TYPES.MASONRY,
    cover: "/photos/shenghuozhao/IMG_0436.JPEG",
    photosFolder: "/photos/shenghuozhao",
    date: "2022.09"
  },
  {
    slug: "xizang",
    title: "西藏",
    description: "高原上的天空与信仰",
    layout: LAYOUT_TYPES.MASONRY,
    cover: "/photos/xizang/psc.jpg",
    heroPosition: "60% 25%",
    heroScale: 1.3,
    photosFolder: "/photos/xizang",
    date: "2023.10"
  },
  {
    slug: "lianyungang",
    title: "连云港",
    description: "2025年夏，海边的风",
    layout: LAYOUT_TYPES.MASONRY,
    cover: "/photos/lianyungang/DSC08290.JPG",
    photosFolder: "/photos/lianyungang",
    date: "2025.07"
  },
  {
    slug: "xinjiang",
    title: "新疆",
    description: "西域的风光与风情",
    layout: LAYOUT_TYPES.MASONRY,
    cover: "/photos/xinjiang/psc (3).jpg",
    photosFolder: "/photos/xinjiang",
    date: "2025.10"
  }
];
