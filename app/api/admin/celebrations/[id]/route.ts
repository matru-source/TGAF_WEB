import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, assertAdmin } from "@/lib/auth";
import { logUserActivity } from "@/lib/audit";
import { deleteCloudinaryAssets } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid data." }, { status: 400 });

  try {
    const existing = await prisma.celebrationPost.findUnique({
      where: { id: params.id },
      select: { images: true },
    });

    const post = await prisma.celebrationPost.update({
      where: { id: params.id },
      data: {
        celebrantName: body.celebrantName !== undefined ? String(body.celebrantName).trim() : undefined,
        role: body.role !== undefined ? String(body.role).trim() : undefined,
        company: body.company !== undefined ? String(body.company).trim() : undefined,
        date: body.date !== undefined ? String(body.date).trim() : undefined,
        category: body.category !== undefined ? String(body.category).trim().toUpperCase() : undefined,
        quote: body.quote !== undefined ? (body.quote ? String(body.quote).trim() : null) : undefined,
        bodyText: body.bodyText !== undefined ? (body.bodyText ? String(body.bodyText).trim() : null) : undefined,
        images: body.images !== undefined ? (Array.isArray(body.images) ? body.images.filter(Boolean) : []) : undefined,
        badges: body.badges !== undefined ? (Array.isArray(body.badges) ? body.badges.filter(Boolean) : []) : undefined,
        order: body.order !== undefined ? Number(body.order) : undefined,
        published: body.published !== undefined ? Boolean(body.published) : undefined,
      },
    });

    // Cleanup removed images from Cloudinary
    if (existing?.images && Array.isArray(existing.images)) {
      const currentImages = new Set(post.images || []);
      const removed = existing.images.filter((img) => !currentImages.has(img));
      if (removed.length > 0) {
        deleteCloudinaryAssets(removed).catch(() => {});
      }
    }

    logUserActivity(
      user,
      "UPDATE",
      "CelebrationPost",
      post.id,
      `Updated celebration post for "${post.celebrantName}"`
    ).catch(() => {});

    return NextResponse.json({ ok: true, post });
  } catch (error) {
    return NextResponse.json({ error: "Could not update celebration post." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await assertAdmin();
  if ("errorResponse" in auth) return auth.errorResponse;
  const { user } = auth;

  try {
    const existing = await prisma.celebrationPost.findUnique({
      where: { id: params.id },
      select: { celebrantName: true, images: true },
    });

    await prisma.celebrationPost.delete({ where: { id: params.id } });

    // Cleanup all images from Cloudinary
    if (existing?.images && Array.isArray(existing.images)) {
      deleteCloudinaryAssets(existing.images).catch(() => {});
    }

    logUserActivity(
      user,
      "DELETE",
      "CelebrationPost",
      params.id,
      `Deleted celebration post for "${existing?.celebrantName || params.id}"`
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Could not delete celebration post." }, { status: 500 });
  }
}
