"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";

function PlayOverlay() {
  return (
    <div className="lightbox__thumb-play">
      <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

export default function PhotoLightbox({ photos, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [visible, setVisible] = useState(false);
  const videoRef = useRef(null);
  const wheelTimer = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const getSrc = (photo) => (typeof photo === "string" ? photo : (photo.src || photo));
  const getThumb = (photo) => (typeof photo === "string" ? photo : (photo.thumb || photo.src || photo));
  const isVideo = (photo) => typeof photo === "object" && photo.isVideo;

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    const handleWheel = (e) => {
      // Don't navigate if scrolling in thumbnail strip or video
      if (e.target.closest(".lightbox__thumbs") || e.target.closest("video")) return;
      if (wheelTimer.current) return;
      wheelTimer.current = setTimeout(() => { wheelTimer.current = null; }, 300);
      if (e.deltaY > 0) next();
      else if (e.deltaY < 0) prev();
    };

    const handleTouchStart = (e) => {
      if (e.target.closest(".lightbox__thumbs") || e.target.closest("video")) return;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartX.current == null) return;
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      // Only respond to horizontal swipes (X > Y movement)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) next();
        else prev();
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [photos, onClose, prev, next]);

  // Reset video when switching media
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [current]);

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
  const currentIsVideo = isVideo(currentPhoto);
  const blurDataURL = typeof currentPhoto === "object" ? currentPhoto.blurDataURL : undefined;

  return (
    <div className={`lightbox ${visible ? "lightbox--visible" : ""}`} onClick={onClose}>
      <div className="lightbox__top" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox__counter">
          {String(current + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
        <button className="lightbox__close" onClick={onClose}>×</button>
      </div>

      <div className="lightbox__photo-wrap" onClick={(e) => e.stopPropagation()}>
        {currentIsVideo ? (
          <video
            ref={videoRef}
            src={fullSrc}
            className="lightbox__video"
            controls
            autoPlay
            playsInline
            style={{ maxWidth: "90vw", maxHeight: "85vh" }}
          />
        ) : (
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
        )}
      </div>

      <button className="lightbox__arrow lightbox__arrow--prev" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
      <button className="lightbox__arrow lightbox__arrow--next" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>

      <div className="lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
        {thumbs.map((photo, i) => {
          const thumbSrc = getThumb(photo);
          const photoIsVideo = isVideo(photo);
          const isActive = photo === currentPhoto || (typeof photo === "object" && typeof currentPhoto === "object" && photo.src === currentPhoto.src);

          return (
            <button
              key={`${thumbSrc}-${i}`}
              className={`lightbox__thumb ${isActive ? "lightbox__thumb--active" : ""}`}
              onClick={() => setCurrent(thumbsStart + i)}
            >
              {photoIsVideo ? (
                <div className="lightbox__thumb-video-wrap">
                  <video src={thumbSrc} className="lightbox__thumb-video" preload="metadata" muted playsInline />
                  <PlayOverlay />
                </div>
              ) : (
                <Image
                  src={thumbSrc}
                  alt=""
                  width={56}
                  height={40}
                  style={{ objectFit: "cover" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
