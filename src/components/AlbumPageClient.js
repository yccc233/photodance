"use client";

import { useState } from "react";
import PhotoWall from "./PhotoWall";
import Lightbox from "./PhotoLightbox";

export default function AlbumPageClient({ photos, layout }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <PhotoWall photos={photos} layout={layout} onPhotoClick={(index) => setLightboxIndex(index)} />
      {lightboxIndex !== null && (
        <Lightbox photos={photos} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}