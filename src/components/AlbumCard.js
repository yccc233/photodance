import Link from "next/link";

export default function AlbumCard({ album }) {
  return (
    <Link href={`/albums/${album.slug}`}>
      <div className="group cursor-pointer">
        <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
          <img
            src={album.cover}
            alt={album.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="mt-4 text-xl font-semibold">{album.title}</h3>
        <p className="text-gray-600 mt-1">{album.description}</p>
      </div>
    </Link>
  );
}
