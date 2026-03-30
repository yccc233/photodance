import "../../app/albums.css";

export default function Masonry({ photos, onPhotoClick }) {
  return (
    <div className="masonry">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="masonry__item"
          onClick={() => onPhotoClick && onPhotoClick(index)}
        >
          <div className="masonry__sprocket">
            <div className="masonry__sprocket-hole" />
            <div className="masonry__sprocket-hole" />
            <div className="masonry__sprocket-hole" />
          </div>
          <div className="masonry__photo">
            <img src={photo} alt="" loading="lazy" />
          </div>
        </div>
      ))}
    </div>
  );
}