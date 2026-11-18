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
    const partner = await prisma.b2BPartner.update({
      where: { id: params.id },
      data: {
        name: body.name !== undefined ? String(body.name).trim() : undefined,
        logo: body.logo !== undefined ? String(body.logo).trim() : undefined,
        category: body.category !== undefined ? (body.category ? String(body.category).trim() : null) : undefined,
        order: body.order !== undefined ? Number(body.order) : undefined,
        published: body.published !== undefined ? Boolean(body.published) : undefined,
      },
    });

    logUserActivity(
      user,
      "UPDATE",
      "B2BPartner",
      partner.id,
      `Updated B2B partner "${partner.name}"`
    ).catch(() => {});

    return NextResponse.json({ ok: true, partner });
  } catch (error) {
    return NextResponse.json({ error: "Could not update B2B partner." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await assertAdmin();
  if ("errorResponse" in auth) return auth.errorResponse;
  const { user } = auth;

  try {
    const existing = await prisma.b2BPartner.findUnique({
      where: { id: params.id },
      select: { name: true },
    });

    await prisma.b2BPartner.delete({ where: { id: params.id } });

    logUserActivity(
      user,
      "DELETE",
      "B2BPartner",
      params.id,
      `Deleted B2B partner "${existing?.name || params.id}"`
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Could not delete B2B partner." }, { status: 500 });
  }
}
