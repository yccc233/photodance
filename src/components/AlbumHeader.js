"use client";

import Link from "next/link";

function BackIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function AlbumHeader({ title }) {
  return (
    <header className="album-header">
      <Link href="/" className="album-header__back">
        <BackIcon />
        <span>返回</span>
      </Link>
      <h1 className="album-header__title">{title}</h1>
      <div className="album-header__actions" />
    </header>
  );
}
