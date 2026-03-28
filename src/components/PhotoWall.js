import Masonry from "./layouts/Masonry";
import Grid from "./layouts/Grid";
import Timeline from "./layouts/Timeline";

export default function PhotoWall({ photos, layout }) {
  switch (layout) {
    case "grid":
      return <Grid photos={photos} />;
    case "timeline":
      return <Timeline photos={photos} />;
    case "masonry":
    default:
      return <Masonry photos={photos} />;
  }
}
