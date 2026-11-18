import "server-only";
import { v2 as cloudinary } from "cloudinary";
import { extractCloudinaryPublicId, getTransparentImageUrl } from "./cloudinaryUtils";

export { extractCloudinaryPublicId, getTransparentImageUrl };

const CONFIGURED = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
);

if (CONFIGURED) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Permanently deletes an asset from Cloudinary.
 * Safe to call with non-Cloudinary URLs (will no-op and return false).
 */
export async function deleteCloudinaryAsset(url?: string | null): Promise<boolean> {
  if (!CONFIGURED || !url) return false;
  const publicId = extractCloudinaryPublicId(url);
  if (!publicId) return false;

  try {
    const res = await cloudinary.uploader.destroy(publicId, { invalidate: true });
    return res.result === "ok";
  } catch (err) {
    console.error(`[Cloudinary] Failed to delete asset "${publicId}":`, err);
    return false;
  }
}

/**
 * Deletes multiple Cloudinary assets concurrently.
 */
export async function deleteCloudinaryAssets(urls: (string | null | undefined)[]): Promise<void> {
  if (!CONFIGURED || !urls || !urls.length) return;
  const validUrls = urls.filter((u): u is string => Boolean(u));
  await Promise.allSettled(validUrls.map((u) => deleteCloudinaryAsset(u)));
}
