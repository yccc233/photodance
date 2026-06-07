import { albums } from "@/config/albums";
import { getPhotosFromFolder } from "@/lib/photos";
import AlbumSlidePanel from "@/components/AlbumSlidePanel";

export default async function InterceptedAlbumPage({ params }) {
  const { slug } = await params;
  const album = albums.find((a) => a.slug === slug);

  if (!album) {
    return null;
  }

  const photos = await getPhotosFromFolder(album.photosFolder);

  return (
    <AlbumSlidePanel
      photos={photos}
      layout={album.layout}
      albumTitle={album.title}
      albumDescription={album.description}
      photoCount={photos.length}
      albumCover={album.cover}
      albumDate={album.date}
      heroPosition={album.heroPosition}
      heroScale={album.heroScale}
    />
  );
}
