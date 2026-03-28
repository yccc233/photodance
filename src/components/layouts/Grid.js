export default function Grid({ photos }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <div key={index} className="aspect-square">
          <img
            src={photo}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
