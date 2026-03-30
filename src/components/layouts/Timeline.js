import "../../app/albums.css";

export default function Timeline({ photos, onPhotoClick }) {
  return (
    <div className="timeline">
      <div className="timeline__line" />
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`timeline__item ${index % 2 === 0 ? "timeline__item--left" : "timeline__item--right"}`}
          onClick={() => onPhotoClick && onPhotoClick(index)}
        >
          <div className="timeline__content">
            <img src={photo} alt="" loading="lazy" />
          </div>
          <div className="timeline__node">
            <div className="timeline__dot" />
          </div>
        </div>
      ))}
    </div>
  );
}