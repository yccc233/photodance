"use client";

import { useState } from "react";
import AlbumHeader from "./AlbumHeader";
import AlbumInfoSection from "./AlbumInfoSection";
import PhotoWall from "./PhotoWall";
import Lightbox from "./PhotoLightbox";
import ScrollProgress from "./ScrollProgress";

export default function AlbumPageClient({ photos, layout, albumTitle, albumDescription, photoCount }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <AlbumHeader title={albumTitle} />
      <ScrollProgress />
      <main className="album-page__content">
        <AlbumInfoSection title={albumTitle} description={albumDescription} photoCount={photoCount} />
        <PhotoWall photos={photos} layout={layout} onPhotoClick={(index) => setLightboxIndex(index)} />
      </main>
      {lightboxIndex !== null && (
        <Lightbox photos={photos} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}
