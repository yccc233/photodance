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
 */

export const albums = [
  {
    slug: "lianyungang",
    title: "连云港",
    description: "2024年的旅行记录",
    layout: LAYOUT_TYPES.MASONRY,
    cover: "/photos/lianyungang/DSC08607.JPG",
    photosFolder: "/photos/lianyungang",
    date: "2024.03"
  },
  {
    slug: "nanjing",
    title: "南京",
    description: "金陵古都的记忆",
    layout: LAYOUT_TYPES.MASONRY,
    cover: "/photos/nanjing/DSC08290.JPG",
    photosFolder: "/photos/nanjing",
    date: "2024.05"
  },
  {
    slug: "suzhou",
    title: "苏州",
    description: "江南水乡的风情",
    layout: LAYOUT_TYPES.MASONRY,
    cover: "/photos/suzhou/DSC08409.JPG",
    photosFolder: "/photos/suzhou",
    date: "2024.08"
  },
  {
    slug: "timeline-album",
    title: "时光印记",
    description: "按时间排序的回忆",
    layout: LAYOUT_TYPES.MASONRY,
    cover: "/photos/timeline-album/DSC08493.JPG",
    photosFolder: "/photos/timeline-album",
    date: "2024.10"
  },
  {
    slug: "grid-album",
    title: "随手拍",
    description: "日常记录的瞬间",
    layout: LAYOUT_TYPES.MASONRY,
    cover: "/photos/grid-album/DSC08581.JPG",
    photosFolder: "/photos/grid-album",
    date: "2025.01"
  }
];
