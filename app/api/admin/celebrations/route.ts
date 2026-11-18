import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logUserActivity } from "@/lib/audit";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const posts = await prisma.celebrationPost.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: "Could not fetch celebrations." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || !body.celebrantName || !body.company) {
    return NextResponse.json({ error: "Celebrant Name and Company are required." }, { status: 400 });
  }

  const rawSlug = body.slug || body.celebrantName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const slug = `${rawSlug}-${Date.now().toString().slice(-4)}`;

  try {
    const post = await prisma.celebrationPost.create({
      data: {
        slug,
        celebrantName: String(body.celebrantName).trim(),
        role: String(body.role || "").trim(),
        company: String(body.company).trim(),
        date: String(body.date || "").trim(),
        category: String(body.category || "BIRTHDAY").trim().toUpperCase(),
        quote: body.quote ? String(body.quote).trim() : null,
        bodyText: body.bodyText ? String(body.bodyText).trim() : null,
        images: Array.isArray(body.images) ? body.images.filter(Boolean) : [],
        badges: Array.isArray(body.badges) ? body.badges.filter(Boolean) : [],
        order: Number(body.order || 0),
        published: body.published !== false,
      },
    });

    logUserActivity(
      user,
      "CREATE",
      "CelebrationPost",
      post.id,
      `Created celebration post for "${post.celebrantName}" (${post.company})`
    ).catch(() => {});

    return NextResponse.json({ ok: true, post });
  } catch (error) {
    return NextResponse.json({ error: "Could not create celebration post." }, { status: 500 });
  }
}
