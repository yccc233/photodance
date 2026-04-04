"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";

export default function PhotoLightbox({ photos, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [visible, setVisible] = useState(false);

  const getSrc = (photo) => (typeof photo === "string" ? photo : (photo.src || photo));
  const getThumb = (photo) => (typeof photo === "string" ? photo : (photo.thumb || photo.src || photo));

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

  const currentPhoto = photos[current];
  const fullSrc = getSrc(currentPhoto);
  const blurDataURL = typeof currentPhoto === "object" ? currentPhoto.blurDataURL : undefined;

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
        <Image
          src={fullSrc}
          alt=""
          width={typeof currentPhoto === "object" && currentPhoto.width ? currentPhoto.width : 1920}
          height={typeof currentPhoto === "object" && currentPhoto.height ? currentPhoto.height : 1080}
          className="lightbox__photo"
          style={{ objectFit: "contain" }}
          priority={current === initialIndex}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
        />
      </div>

      {/* Navigation arrows */}
      <button className="lightbox__arrow lightbox__arrow--prev" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
      <button className="lightbox__arrow lightbox__arrow--next" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>

      {/* Thumbnail strip - uses thumbs */}
      <div className="lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
        {thumbs.map((photo, i) => {
          const thumbSrc = getThumb(photo);
          const isActive = photo === currentPhoto || (typeof photo === "object" && typeof currentPhoto === "object" && photo.src === currentPhoto.src);

          return (
            <button
              key={thumbSrc}
              className={`lightbox__thumb ${isActive ? "lightbox__thumb--active" : ""}`}
              onClick={() => setCurrent(thumbsStart + i)}
            >
              <Image
                src={thumbSrc}
                alt=""
                width={56}
                height={40}
                style={{ objectFit: "cover" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
