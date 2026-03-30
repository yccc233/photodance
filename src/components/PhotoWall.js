"use client";

import Masonry from "./layouts/Masonry";
import Grid from "./layouts/Grid";
import Timeline from "./layouts/Timeline";

export default function PhotoWall({ photos, layout, onPhotoClick }) {
  const props = { photos, onPhotoClick };

  switch (layout) {
    case "grid":
      return <Grid {...props} />;
    case "timeline":
      return <Timeline {...props} />;
    case "masonry":
    default:
      return <Masonry {...props} />;
  }
}