import { albums } from "@/config/albums";
import AlbumInfoSection from "@/components/AlbumInfoSection";
import AlbumPageClient from "@/components/AlbumPageClient";
import ScrollProgress from "@/components/ScrollProgress";
import { getPhotosFromFolder } from "@/lib/photos";
import "../../albums.css";

export async function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export default async function AlbumPage({ params }) {
  const { slug } = await params;
  const album = albums.find((a) => a.slug === slug);

  if (!album) {
    return <div>Album not found</div>;
  }

  const photos = await getPhotosFromFolder(album.photosFolder);

  return (
    <div className="album-page">
      <div className="album-page__bg-grain" />
      <AlbumPageClient photos={photos} layout={album.layout} albumTitle={album.title} albumDescription={album.description} photoCount={photos.length} albumCover={album.cover} albumDate={album.date} heroPosition={album.heroPosition} heroScale={album.heroScale} />
      <footer className="album-page__footer">
        <p>俞澄❤张昕</p>
      </footer>
    </div>
  );
}
