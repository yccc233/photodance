import MediaItem from "../MediaItem";
import "../../app/albums.css";

export default function Masonry({ photos, onPhotoClick }) {
  return (
    <div className="masonry">
      {photos.map((photo, index) => (
        <MediaItem
          key={index}
          media={photo}
          className="masonry__item"
          onClick={() => onPhotoClick && onPhotoClick(index)}
          style={{ "--item-index": index }}
        />
      ))}
    </div>
  );
}
