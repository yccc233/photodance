import { albums } from "@/config/albums";
import PhotoWall from "@/components/PhotoWall";
import Link from "next/link";

export async function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export default async function AlbumPage({ params }) {
  const album = albums.find((a) => a.slug === params.slug);

  if (!album) {
    return <div>Album not found</div>;
  }

  // TODO: 后续实现从文件夹读取照片
  const photos = [];

  return (
    <div className="min-h-screen p-8">
      <Link href="/" className="text-blue-500 hover:underline mb-8 inline-block">
        ← 返回
      </Link>
      <h1 className="text-3xl font-bold mb-2">{album.title}</h1>
      <p className="text-gray-600 mb-8">{album.description}</p>
      <PhotoWall photos={photos} layout={album.layout} />
    </div>
  );
}
