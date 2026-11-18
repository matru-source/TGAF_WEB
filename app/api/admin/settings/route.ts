import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/auth";
import { logUserActivity } from "@/lib/audit";

export const runtime = "nodejs";

const schema = z.object({
  settings: z.record(z.string(), z.string()),
});

export async function POST(req: Request) {
  // Enforce ADMIN-only settings modification (RBAC)
  const auth = await assertAdmin();
  if ("errorResponse" in auth) return auth.errorResponse;
  const { user } = auth;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  try {
    const entries = Object.entries(parsed.data.settings);
    await prisma.$transaction(
      entries.map(([key, value]) =>
        prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } }),
      ),
    );

    logUserActivity(
      user,
      "SETTINGS_UPDATE",
      "Setting",
      null,
      `Updated ${entries.length} site settings keys (${entries.map(([k]) => k).join(", ")})`,
    ).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save settings." }, { status: 503 });
  }
}
