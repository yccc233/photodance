import { promises as fs } from "node:fs";
import path from "node:path";

export async function getPhotosFromFolder(photosFolder) {
  const relativePath = photosFolder.replace(/^\//, "");
  const fullPath = path.join(process.cwd(), "public", relativePath);

  const imageExts = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const videoExts = [".mp4", ".mov", ".webm", ".avi"];
  const supportedExtensions = [...imageExts, ...videoExts];

  function isVideo(ext) {
    return videoExts.includes(ext);
  }

  try {
    const files = await fs.readdir(fullPath);
    const photos = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return supportedExtensions.includes(ext) && !file.startsWith('.thumbs');
      })
      .sort((a, b) => {
        // Sort: images first, then videos
        const aIsVideo = isVideo(path.extname(a).toLowerCase());
        const bIsVideo = isVideo(path.extname(b).toLowerCase());
        if (aIsVideo && !bIsVideo) return 1;
        if (!aIsVideo && bIsVideo) return -1;
        return a.localeCompare(b);
      })
      .map((file) => ({ path: `/${relativePath}/${file}`, isVideo: isVideo(path.extname(file).toLowerCase()) }));

    // Try to read manifest for thumbnails and metadata
    let manifest = null;
    try {
      const manifestPath = path.join(fullPath, "manifest.json");
      const manifestData = await fs.readFile(manifestPath, "utf8");
      manifest = JSON.parse(manifestData);
    } catch {
      // No manifest - running before thumbnails generated
    }

    if (manifest && manifest.photos && manifest.photos.length > 0) {
      const manifestLookup = new Map(
        manifest.photos.map((p) => [p.name, p])
      );

      return photos.map(({ path: photoPath, isVideo }) => {
        const fileName = path.basename(photoPath);
        const meta = manifestLookup.get(fileName);
        return {
          src: photoPath,
          thumb: meta ? `/${relativePath}/${meta.thumb}` : photoPath,
          width: meta?.width || null,
          height: meta?.height || null,
          blurDataURL: meta?.blurDataURL || null,
          isVideo: isVideo || meta?.isVideo || false,
        };
      });
    }

    return photos.map(({ path: photoPath, isVideo }) => ({
      src: photoPath,
      isVideo,
    }));
  } catch {
    return [];
  }
}

export async function getAlbumCoverThumb(album) {
  const relativePath = album.photosFolder.replace(/^\//, "");
  const fullPath = path.join(process.cwd(), "public", relativePath);

  try {
    const manifestPath = path.join(fullPath, "manifest.json");
    const manifestData = await fs.readFile(manifestPath, "utf8");
    const manifest = JSON.parse(manifestData);

    const coverFileName = path.basename(album.cover);
    const coverMeta = manifest.photos.find((p) => p.name === coverFileName);

    if (coverMeta) {
      return `/${relativePath}/${coverMeta.thumb}`;
    }
  } catch {
    // No manifest
  }

  return album.cover;
}

export async function getAlbumsWithCoverThumbs(albums) {
  return Promise.all(
    albums.map(async (album) => ({
      ...album,
      coverThumb: await getAlbumCoverThumb(album),
    }))
  );
}
