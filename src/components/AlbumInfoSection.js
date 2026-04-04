export default function AlbumInfoSection({ title, description, photoCount }) {
  return (
    <section className="album-info">
      <p className="album-info__subtitle">{description}</p>
      <div className="album-info__divider">
        <span className="album-info__line" />
        <span className="album-info__dot">•</span>
        <span className="album-info__line" />
      </div>
      <div className="album-info__count">
        <span className="album-info__count-num">{photoCount}</span> 张照片
      </div>
    </section>
  );
}
