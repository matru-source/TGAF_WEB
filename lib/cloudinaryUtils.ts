/**
 * Client-safe Cloudinary URL utilities.
 * Pure string parsing and URL manipulation with NO Node.js dependencies (fs, http, etc.).
 */

/**
 * Extracts the Cloudinary public_id from a full URL.
 * Handles:
 * - https://res.cloudinary.com/<cloud>/image/upload/v1234/folder/file.ext -> "folder/file"
 * - https://res.cloudinary.com/<cloud>/image/upload/e_background_removal/v1234/folder/file.ext -> "folder/file"
 * - Returns null for non-Cloudinary or local URLs.
 */
export function extractCloudinaryPublicId(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;
  if (!url.includes("cloudinary.com") || !url.includes("/upload/")) return null;

  const parts = url.split("/upload/");
  if (parts.length < 2) return null;

  let path = parts[1];
  path = path.split("?")[0].split("#")[0];

  const segments = path.split("/");
  const versionIndex = segments.findIndex((s) => /^v\d+$/.test(s));

  let publicSegments: string[];
  if (versionIndex !== -1) {
    publicSegments = segments.slice(versionIndex + 1);
  } else {
    // If no version tag, skip leading transformation params (like e_..., c_..., etc.)
    const firstNonTransform = segments.findIndex(
      (s) => !s.includes(",") && !/^[a-z]_[a-z0-9_-]+/i.test(s),
    );
    publicSegments = firstNonTransform !== -1 ? segments.slice(firstNonTransform) : segments;
  }

  const fullPath = publicSegments.join("/");
  // Strip file extension (.jpg, .png, .webp, etc.)
  return fullPath.replace(/\.[a-zA-Z0-9]+$/, "");
}

/**
 * Transforms a Cloudinary URL to apply automatic background removal / transparency.
 * If URL is already Cloudinary, injects e_background_removal,f_png.
 */
export function getTransparentImageUrl(url: string): string {
  if (!url || !url.includes("cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  // If already has background removal, return as is
  if (url.includes("e_background_removal") || url.includes("e_make_transparent")) {
    return url;
  }

  // Insert e_background_removal,f_png right after /upload/
  const parts = url.split("/upload/");
  return `${parts[0]}/upload/e_background_removal,f_png/${parts[1]}`.replace(
    /\.(jpe?g|webp|avif)(\?|$)/i,
    ".png$2",
  );
}
