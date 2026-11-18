import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logUserActivity } from "@/lib/audit";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Could not fetch gallery items." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || !body.title || !body.image) {
    return NextResponse.json({ error: "Title and Image are required." }, { status: 400 });
  }

  try {
    const item = await prisma.galleryItem.create({
      data: {
        title: String(body.title).trim(),
        category: String(body.category || "packaging").trim(),
        image: String(body.image).trim(),
        caption: body.caption ? String(body.caption).trim() : null,
        location: body.location ? String(body.location).trim() : null,
        tag: body.tag ? String(body.tag).trim() : null,
        order: Number(body.order || 0),
        published: body.published !== false,
      },
    });

    logUserActivity(
      user,
      "CREATE",
      "GalleryItem",
      item.id,
      `Created gallery item "${item.title}" (${item.category})`
    ).catch(() => {});

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return NextResponse.json({ error: "Could not create gallery item." }, { status: 500 });
  }
}
