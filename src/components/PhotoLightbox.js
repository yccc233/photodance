"use client";

import { useEffect, useCallback, useState } from "react";

export default function PhotoLightbox({ photos, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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