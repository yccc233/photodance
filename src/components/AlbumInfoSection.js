export default function AlbumInfoSection({ title, description }) {
  return (
    <section className="album-info">
      <h2 className="album-info__title">
        <span className="album-info__star">✦</span>
        {" "}{title}{" "}
        <span className="album-info__star">✦</span>
      </h2>
      <p className="album-info__desc">{description}</p>
      <div className="album-info__divider">
        <span className="album-info__line" />
        <span className="album-info__diamond">◆</span>
        <span className="album-info__line" />
      </div>
    </section>
  );
}