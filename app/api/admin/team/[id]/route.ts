import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, assertAdmin } from "@/lib/auth";
import { teamMemberSchema, cleanTeamMember } from "@/lib/schemas";
import { logUserActivity } from "@/lib/audit";

export const runtime = "nodejs";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = teamMemberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  try {
    const updated = await prisma.teamMember.update({
      where: { id: params.id },
      data: cleanTeamMember(parsed.data),
    });

    logUserActivity(
      user,
      "UPDATE",
      "TeamMember",
      params.id,
      `Updated team member "${updated.name}" (${updated.role})`,
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not update team member." }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  // Enforce ADMIN-only deletion (RBAC)
  const auth = await assertAdmin();
  if ("errorResponse" in auth) return auth.errorResponse;
  const { user } = auth;

  try {
    const existing = await prisma.teamMember.findUnique({
      where: { id: params.id },
      select: { name: true },
    });

    await prisma.teamMember.delete({ where: { id: params.id } });

    logUserActivity(
      user,
      "DELETE",
      "TeamMember",
      params.id,
      `Deleted team member "${existing?.name || params.id}"`,
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete team member." }, { status: 400 });
  }
}
