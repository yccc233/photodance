import { albums } from "@/config/albums";
import AlbumCard from "@/components/AlbumCard";

export default function Home() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">PhotoDance</h1>
        <p className="text-gray-600">我的照片墙</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album) => (
          <AlbumCard key={album.slug} album={album} />
        ))}
      </main>
    </div>
  );
}
