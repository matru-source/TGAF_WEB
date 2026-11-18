import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logUserActivity } from "@/lib/audit";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const partners = await prisma.b2BPartner.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ partners });
  } catch (error) {
    return NextResponse.json({ error: "Could not fetch B2B partners." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.logo) {
    return NextResponse.json({ error: "Partner name and Logo URL are required." }, { status: 400 });
  }

  try {
    const partner = await prisma.b2BPartner.create({
      data: {
        name: String(body.name).trim(),
        logo: String(body.logo).trim(),
        category: body.category ? String(body.category).trim() : null,
        order: Number(body.order || 0),
        published: body.published !== false,
      },
    });

    logUserActivity(
      user,
      "CREATE",
      "B2BPartner",
      partner.id,
      `Added B2B partner "${partner.name}"`
    ).catch(() => {});

    return NextResponse.json({ ok: true, partner });
  } catch (error) {
    return NextResponse.json({ error: "Could not create B2B partner." }, { status: 500 });
  }
}
