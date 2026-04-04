import Image from "next/image";
import "../../app/albums.css";

export default function Timeline({ photos, onPhotoClick }) {
  return (
    <div className="timeline">
      <div className="timeline__line" />
      {photos.map((photo, index) => {
        const src = typeof photo === "string" ? photo : photo.thumb;
        const blurDataURL = typeof photo === "string" ? undefined : photo.blurDataURL;
        const width = typeof photo === "object" ? photo.width : null;
        const height = typeof photo === "object" ? photo.height : null;

        return (
          <div
            key={index}
            className={`timeline__item ${index % 2 === 0 ? "timeline__item--left" : "timeline__item--right"}`}
            onClick={() => onPhotoClick && onPhotoClick(index)}
          >
            <div className="timeline__content">
              <Image
                src={src}
                alt=""
                width={width || 600}
                height={height || 400}
                style={{ objectFit: "cover" }}
                placeholder={blurDataURL ? "blur" : "empty"}
                blurDataURL={blurDataURL}
              />
            </div>
            <div className="timeline__node">
              <div className="timeline__dot" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
