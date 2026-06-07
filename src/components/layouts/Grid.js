import MediaItem from "../MediaItem";
import "../../app/albums.css";

export default function Grid({ photos, onPhotoClick }) {
  return (
    <div className="grid-layout">
      {photos.map((photo, index) => (
        <MediaItem
          key={index}
          media={photo}
          className="grid__item"
          onClick={() => onPhotoClick && onPhotoClick(index)}
          style={{ "--item-index": index }}
        />
      ))}
    </div>
  );
}
