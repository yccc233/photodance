"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import AlbumHeader from "./AlbumHeader";
import AlbumInfoSection from "./AlbumInfoSection";
import PhotoWall from "./PhotoWall";
import Lightbox from "./PhotoLightbox";
import ScrollProgress from "./ScrollProgress";

export default function AlbumSlidePanel({
  photos,
  layout,
  albumTitle,
  albumDescription,
  photoCount,
  albumCover,
  albumDate,
  heroPosition,
  heroScale,
}) {
  const router = useRouter();
  const panelRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [entering, setEntering] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation on next frame
    const frame = requestAnimationFrame(() => setEntering(true));
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  const handleBack = useCallback(() => {
    setLeaving(true);
    setTimeout(() => {
      router.back();
    }, 350);
  }, [router]);

  return (
    <div className={`album-slide ${entering ? "album-slide--enter" : ""} ${leaving ? "album-slide--leave" : ""}`}>
      <div className="album-slide__backdrop" onClick={handleBack} />
      <div className="album-slide__panel" ref={panelRef}>
        <div className="album-page">
          <div className="album-page__bg-grain" />
          <AlbumHeader title={albumTitle} onBack={handleBack} />
          <ScrollProgress containerRef={panelRef} />
          <main className="album-page__content">
            <AlbumInfoSection
              title={albumTitle}
              description={albumDescription}
              photoCount={photoCount}
              cover={albumCover}
              date={albumDate}
              heroPosition={heroPosition}
              heroScale={heroScale}
            />
            <PhotoWall
              photos={photos}
              layout={layout}
              onPhotoClick={(index) => setLightboxIndex(index)}
            />
          </main>
          <footer className="album-page__footer">
            <p>俞澄❤张昕</p>
          </footer>
        </div>
      </div>
      {lightboxIndex !== null && (
        <Lightbox photos={photos} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
}
