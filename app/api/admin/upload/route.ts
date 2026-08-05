import { NextResponse } from "next/server";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const FOLDER = "goodearth";

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

function uploadBuffer(buf: Buffer): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: FOLDER,
        resource_type: "image",
        // Cloudinary generates the public_id, so a client filename can never
        // influence the stored path.
        unique_filename: true,
        use_filename: false,
        overwrite: false,
      },
      (err, result) => {
        if (err || !result) reject(err ?? new Error("Upload failed"));
        else resolve(result);
      },
    );
    stream.end(buf);
  });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!CONFIGURED) {
    return NextResponse.json(
      {
        error:
          "Image storage is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.",
      },
      { status: 503 },
    );
  }

  const form = await req.formData().catch(() => null);
  const files = form?.getAll("files").filter((f): f is File => f instanceof File) ?? [];
  if (!files.length) return NextResponse.json({ error: "No files uploaded." }, { status: 400 });

  const urls: string[] = [];
  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type || "unknown"}. Use JPG, PNG, WebP or AVIF.` },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: `"${file.name}" is larger than 5 MB.` }, { status: 400 });
    }
    try {
      const result = await uploadBuffer(Buffer.from(await file.arrayBuffer()));
      urls.push(result.secure_url);
    } catch {
      return NextResponse.json(
        { error: `Could not upload "${file.name}". Please try again.` },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ urls });
}
