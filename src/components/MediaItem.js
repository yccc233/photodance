import Image from "next/image";

function PlayIcon() {
  return (
    <div className="media-item__play-icon">
      <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

export default function MediaItem({ media, onClick, className, style }) {
  const src = typeof media === "string" ? media : media.src || media;
  const isVideo = typeof media === "object" && media.isVideo;
  const thumb = typeof media === "object" ? media.thumb : undefined;
  const blurDataURL = typeof media === "object" ? media.blurDataURL : undefined;

  if (isVideo) {
    return (
      <div className={`${className} media-item--video`} style={style} onClick={onClick}>
        <span className="media-item__badge">视频</span>
        <video
          src={src}
          className="media-item__video"
          preload="metadata"
          muted
          playsInline
          draggable={false}
        />
        <PlayIcon />
      </div>
    );
  }

  return (
    <div className={className} style={style} onClick={onClick}>
      <Image
        src={thumb || src}
        alt=""
        width={typeof media === "object" && media.width ? media.width : 400}
        height={typeof media === "object" && media.height ? media.height : 300}
        className="media-item__image"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
      />
    </div>
  );
}
