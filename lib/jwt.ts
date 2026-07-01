import { SignJWT, jwtVerify } from "jose";

// Edge-safe session token helpers (used by middleware and route handlers).

export const SESSION_COOKIE = "ge_session";

export type SessionPayload = {
  sub: string; // user id
  email: string;
  name: string;
  role: "ADMIN" | "EDITOR";
};

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySession(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      sub: String(payload.sub),
      email: String(payload.email),
      name: String(payload.name),
      role: payload.role === "ADMIN" ? "ADMIN" : "EDITOR",
    };
  } catch {
    return null;
  }
}
