import Image from "next/image";

export default function AlbumInfoSection({ title, description, photoCount, cover, date, heroPosition, heroScale }) {
  const imgStyle = {
    objectFit: "cover",
    objectPosition: heroPosition || "center",
  };
  if (heroScale) {
    imgStyle.transform = `scale(${heroScale})`;
  }

  return (
    <section className="album-hero">
      <div className="album-hero__image-wrap">
        <Image
          src={cover}
          alt=""
          fill
          className="album-hero__image"
          priority
          sizes="100vw"
          style={imgStyle}
        />
        <div className="album-hero__overlay" />
      </div>
      <div className="album-hero__content">
        <p className="album-hero__date">{date}</p>
        <h1 className="album-hero__title">{title}</h1>
        <div className="album-hero__divider">
          <span className="album-hero__line" />
          <span className="album-hero__dot" />
          <span className="album-hero__line" />
        </div>
        <p className="album-hero__desc">{description}</p>
        <p className="album-hero__count">{photoCount} 张照片</p>
      </div>
    </section>
  );
}
