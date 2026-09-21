import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

const schema = z.object({
  type: z.string().default("contact"),
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("A valid email is required"),
  company: z.string().max(160).optional().nullable(),
  interest: z.string().max(160).optional().nullable(),
  message: z.string().min(1, "Message is required").max(4000),
});

// Public: submit an enquiry / contact lead.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const d = parsed.data;
  try {
    const e = await prisma.enquiry.create({
      data: {
        type: d.type || "contact",
        name: d.name,
        email: d.email,
        company: d.company || null,
        interest: d.interest || null,
        message: d.message,
      },
    });
    return NextResponse.json({ ok: true, id: e.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not save your enquiry. Please try again or email us directly." },
      { status: 503 },
    );
  }
}

// Admin: list enquiries.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ items });
}
