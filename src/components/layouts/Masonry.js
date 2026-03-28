export default function Masonry({ photos }) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {photos.map((photo, index) => (
        <div key={index} className="break-inside-avoid">
          <img
            src={photo}
            alt=""
            className="w-full rounded-lg"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
