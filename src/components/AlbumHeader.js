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