import { promises as fs } from "node:fs";
import path from "node:path";

export async function getPhotosFromFolder(photosFolder) {
  // photosFolder like "/photos/travel" -> "public/photos/travel"
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

    return photos;
  } catch {
    return [];
  }
}
