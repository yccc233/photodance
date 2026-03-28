export default function Timeline({ photos }) {
  return (
    <div className="relative space-y-8">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300" />
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`flex items-center gap-8 ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <div className={`w-1/2 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
            <img
              src={photo}
              alt=""
              className="w-full rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="w-0.5 h-4 bg-gray-300" />
          <div className="w-1/2" />
        </div>
      ))}
    </div>
  );
}
