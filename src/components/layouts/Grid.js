import "../../app/albums.css";

export default function Grid({ photos, onPhotoClick }) {
  return (
    <div className="grid">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="grid__item"
          onClick={() => onPhotoClick && onPhotoClick(index)}
        >
          <img src={photo} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}