import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import { signSession, SESSION_COOKIE } from "@/lib/jwt";
import {
  getClientIp,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from "@/lib/rateLimit";
import { logActivity } from "@/lib/audit";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }
  const { email, password } = parsed.data;
  const rateLimitKey = `${ip}:${email.toLowerCase().trim()}`;

  // 1. Check brute-force rate limit
  const limitCheck = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
  if (!limitCheck.allowed) {
    return NextResponse.json(
      { error: limitCheck.error },
      {
        status: 429,
        headers: {
          "Retry-After": String(limitCheck.retryAfterSeconds),
        },
      },
    );
  }

  // 2. Query user from DB
  let user;
  try {
    user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  } catch {
    return NextResponse.json(
      { error: "Database unavailable. Configure DATABASE_URL and run the seed." },
      { status: 503 },
    );
  }

  // 3. Verify password
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    const attempts = recordFailedAttempt(rateLimitKey);
    const remaining = Math.max(0, 5 - attempts);
    const warning =
      remaining > 0
        ? `Invalid email or password. (${remaining} attempt${remaining === 1 ? "" : "s"} remaining before lock)`
        : "Too many failed attempts. Account temporarily locked for 15 minutes.";

    // Log security audit event for failed attempt
    logActivity({
      userId: user?.id ?? null,
      userName: user?.name ?? "Unknown",
      userEmail: email,
      action: "LOGIN_FAILED",
      entity: "Auth",
      details: `Failed password attempt (Attempt ${attempts} from ${ip})`,
      ipAddress: ip,
    }).catch(() => {});

    return NextResponse.json({ error: warning }, { status: 401 });
  }

  // 4. Successful login: Clear rate limiter
  resetRateLimit(rateLimitKey);

  const token = await signSession({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } }).catch(() => {});

  // Log successful login
  logActivity({
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    action: "LOGIN_SUCCESS",
    entity: "Auth",
    details: `Admin user logged in successfully from ${ip}`,
    ipAddress: ip,
  }).catch(() => {});

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
