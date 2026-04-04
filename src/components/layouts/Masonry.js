import Image from "next/image";
import "../../app/albums.css";

export default function Masonry({ photos, onPhotoClick }) {
  return (
    <div className="masonry">
      {photos.map((photo, index) => {
        const src = typeof photo === "string" ? photo : photo.thumb;
        const blurDataURL = typeof photo === "string" ? undefined : photo.blurDataURL;
        const width = typeof photo === "object" ? photo.width : null;
        const height = typeof photo === "object" ? photo.height : null;

        return (
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
          </div>
        );
      })}
    </div>
  );
}
