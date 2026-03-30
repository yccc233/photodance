import { albums } from "@/config/albums";
import AlbumHeader from "@/components/AlbumHeader";
import AlbumInfoSection from "@/components/AlbumInfoSection";
import AlbumPageClient from "@/components/AlbumPageClient";
import { getPhotosFromFolder } from "@/lib/photos";
import "../../app/albums.css";

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
      <div className="album-page__corner album-page__corner--tl" />
      <div className="album-page__corner album-page__corner--tr" />
      <AlbumHeader title={album.title} layout={album.layout} />
      <main className="album-page__content">
        <AlbumInfoSection title={album.title} description={album.description} />
        <AlbumPageClient photos={photos} layout={album.layout} />
      </main>
      <footer className="album-page__footer">
        <p>俞澄❤张昕</p>
      </footer>
    </div>
  );
}