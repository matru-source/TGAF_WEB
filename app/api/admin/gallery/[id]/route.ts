import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, assertAdmin } from "@/lib/auth";
import { logUserActivity } from "@/lib/audit";

export const runtime = "nodejs";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid data." }, { status: 400 });

  try {
    const item = await prisma.galleryItem.update({
      where: { id: params.id },
      data: {
        title: body.title !== undefined ? String(body.title).trim() : undefined,
        category: body.category !== undefined ? String(body.category).trim() : undefined,
        image: body.image !== undefined ? String(body.image).trim() : undefined,
        caption: body.caption !== undefined ? (body.caption ? String(body.caption).trim() : null) : undefined,
        location: body.location !== undefined ? (body.location ? String(body.location).trim() : null) : undefined,
        tag: body.tag !== undefined ? (body.tag ? String(body.tag).trim() : null) : undefined,
        order: body.order !== undefined ? Number(body.order) : undefined,
        published: body.published !== undefined ? Boolean(body.published) : undefined,
      },
    });

    logUserActivity(
      user,
      "UPDATE",
      "GalleryItem",
      item.id,
      `Updated gallery item "${item.title}"`
    ).catch(() => {});

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return NextResponse.json({ error: "Could not update gallery item." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await assertAdmin();
  if ("errorResponse" in auth) return auth.errorResponse;
  const { user } = auth;

  try {
    const existing = await prisma.galleryItem.findUnique({
      where: { id: params.id },
      select: { title: true },
    });

    await prisma.galleryItem.delete({ where: { id: params.id } });

    logUserActivity(
      user,
      "DELETE",
      "GalleryItem",
      params.id,
      `Deleted gallery item "${existing?.title || params.id}"`
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Could not delete gallery item." }, { status: 500 });
  }
}
