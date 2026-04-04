import Image from "next/image";
import "../../app/albums.css";

export default function Grid({ photos, onPhotoClick }) {
  return (
    <div className="grid">
      {photos.map((photo, index) => {
        const src = typeof photo === "string" ? photo : photo.thumb;
        const blurDataURL = typeof photo === "string" ? undefined : photo.blurDataURL;
        const width = typeof photo === "object" ? photo.width : null;
        const height = typeof photo === "object" ? photo.height : null;

        return (
          <div
            key={index}
            className="grid__item"
            onClick={() => onPhotoClick && onPhotoClick(index)}
          >
            <Image
              src={src}
              alt=""
              width={width || 400}
              height={height || 300}
              style={{ objectFit: "cover" }}
              placeholder={blurDataURL ? "blur" : "empty"}
              blurDataURL={blurDataURL}
            />
          </div>
        );
      })}
    </div>
  );
}
