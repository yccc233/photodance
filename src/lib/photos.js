import { promises as fs } from "node:fs";
import path from "node:path";

export async function getPhotosFromFolder(photosFolder) {
  const relativePath = photosFolder.replace(/^\//, "");
  const fullPath = path.join(process.cwd(), "public", relativePath);

  const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

  try {
    const files = await fs.readdir(fullPath);
    const photos = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return supportedExtensions.includes(ext);
      })
      .map((file) => `/${relativePath}/${file}`);

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

      return photos.map((photoPath) => {
        const fileName = path.basename(photoPath);
        const meta = manifestLookup.get(fileName);
        return {
          src: photoPath,
          thumb: meta ? `/${relativePath}/${meta.thumb}` : photoPath,
          width: meta?.width || null,
          height: meta?.height || null,
          blurDataURL: meta?.blurDataURL || null,
        };
      });
    }

    return photos;
  } catch {
    return [];
  }
}
