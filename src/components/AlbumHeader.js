"use client";

import Link from "next/link";

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="6" height="6" rx="1" fill="white" fillOpacity="0.9"/>
      <rect x="9" y="1" width="6" height="6" rx="1" fill="white" fillOpacity="0.5"/>
      <rect x="1" y="9" width="6" height="6" rx="1" fill="white" fillOpacity="0.5"/>
      <rect x="9" y="9" width="6" height="6" rx="1" fill="white" fillOpacity="0.9"/>
    </svg>
  );
}

function MasonryIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="6" height="4" rx="0.5" fill="white" fillOpacity="0.9"/>
      <rect x="9" y="1" width="6" height="6" rx="0.5" fill="white" fillOpacity="0.9"/>
      <rect x="1" y="7" width="6" height="8" rx="0.5" fill="white" fillOpacity="0.5"/>
      <rect x="9" y="9" width="6" height="6" rx="0.5" fill="white" fillOpacity="0.5"/>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function AlbumHeader({ title, layout, onLayoutChange }) {
  return (
    <header className="album-header">
      <Link href="/" className="album-header__back">
        <BackIcon />
        <span>返回</span>
      </Link>
      <h1 className="album-header__title">{title}</h1>
      <div className="album-header__actions">
        <button
          className={`album-header__btn ${layout === "masonry" ? "album-header__btn--active" : "album-header__btn--inactive"}`}
          onClick={() => onLayoutChange && onLayoutChange("masonry")}
          title="瀑布流"
        >
          <MasonryIcon />
        </button>
        <button
          className={`album-header__btn ${layout === "grid" ? "album-header__btn--active" : "album-header__btn--inactive"}`}
          onClick={() => onLayoutChange && onLayoutChange("grid")}
          title="网格"
        >
          <GridIcon />
        </button>
      </div>
    </header>
  );
}
