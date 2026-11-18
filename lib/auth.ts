import "server-only";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession, type SessionPayload } from "./jwt";

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/** Read the current admin session from the request cookies (server components / routes). */
export async function getCurrentUser(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

/**
 * Check if the user is authorized for specific granular actions.
 * - ADMIN: full access across all modules.
 * - EDITOR: can create/update products & team, but CANNOT delete records or modify system settings.
 */
export function canUserPerform(
  user: SessionPayload | null,
  action: "create" | "update" | "delete" | "manage_settings",
): boolean {
  if (!user) return false;
  if (user.role === "ADMIN") return true;

  // EDITOR permissions:
  if (action === "create" || action === "update") return true;
  return false; // Cannot delete or manage settings
}

/**
 * Helper for API routes to enforce ADMIN-only operations.
 * Returns null if allowed, or a 401/403 NextResponse if unauthorized.
 */
export async function assertAdmin(): Promise<{ user: SessionPayload } | { errorResponse: NextResponse }> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      errorResponse: NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 }),
    };
  }

  if (user.role !== "ADMIN") {
    return {
      errorResponse: NextResponse.json(
        {
          error:
            "Forbidden: You have 'Editor' privileges. Only system Administrators can delete records or modify site settings.",
        },
        { status: 403 },
      ),
    };
  }

  return { user };
}
