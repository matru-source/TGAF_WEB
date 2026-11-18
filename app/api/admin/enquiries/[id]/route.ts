import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, assertAdmin } from "@/lib/auth";
import { logUserActivity } from "@/lib/audit";

export const runtime = "nodejs";

const schema = z.object({ status: z.enum(["NEW", "IN_PROGRESS", "CLOSED"]) });

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  try {
    await prisma.enquiry.update({ where: { id: params.id }, data: { status: parsed.data.status } });

    logUserActivity(
      user,
      "STATUS_CHANGE",
      "Enquiry",
      params.id,
      `Changed enquiry status to ${parsed.data.status}`,
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not update enquiry." }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  // Enforce ADMIN-only deletion (RBAC)
  const auth = await assertAdmin();
  if ("errorResponse" in auth) return auth.errorResponse;
  const { user } = auth;

  try {
    await prisma.enquiry.delete({ where: { id: params.id } });

    logUserActivity(
      user,
      "DELETE",
      "Enquiry",
      params.id,
      `Deleted customer enquiry record (${params.id})`,
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete enquiry." }, { status: 400 });
  }
}
