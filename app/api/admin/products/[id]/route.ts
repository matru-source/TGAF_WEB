import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, assertAdmin } from "@/lib/auth";
import { productSchema, cleanProduct } from "@/lib/schemas";
import { logUserActivity } from "@/lib/audit";

export const runtime = "nodejs";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  try {
    const updated = await prisma.product.update({
      where: { id: params.id },
      data: cleanProduct(parsed.data),
    });

    logUserActivity(
      user,
      "UPDATE",
      "Product",
      params.id,
      `Updated product "${updated.name}" (${updated.slug})`,
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg =
      e && typeof e === "object" && "code" in e && (e as { code?: string }).code === "P2002"
        ? "A product with this slug already exists."
        : "Could not update product.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  // Enforce ADMIN-only deletion (RBAC)
  const auth = await assertAdmin();
  if ("errorResponse" in auth) return auth.errorResponse;
  const { user } = auth;

  try {
    const existing = await prisma.product.findUnique({
      where: { id: params.id },
      select: { name: true, slug: true },
    });

    await prisma.product.delete({ where: { id: params.id } });

    logUserActivity(
      user,
      "DELETE",
      "Product",
      params.id,
      `Deleted product "${existing?.name || params.id}"`,
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete product." }, { status: 400 });
  }
}
