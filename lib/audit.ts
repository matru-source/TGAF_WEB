import "server-only";
import { prisma } from "./prisma";
import type { SessionPayload } from "./jwt";

export interface LogActivityParams {
  userId?: string | null;
  userName?: string;
  userEmail?: string;
  action:
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "LOGIN_SUCCESS"
    | "LOGIN_FAILED"
    | "SETTINGS_UPDATE"
    | "STATUS_CHANGE";
  entity:
    | "Product"
    | "TeamMember"
    | "Enquiry"
    | "Setting"
    | "Auth"
    | "Media"
    | "GalleryItem"
    | "CelebrationPost"
    | "B2BPartner";
  entityId?: string | null;
  details: string;
  ipAddress?: string | null;
}

/**
 * Record an administrative activity to the AuditLog table.
 * Fails gracefully (never crashes the calling request if DB is offline).
 */
export async function logActivity(params: LogActivityParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId || null,
        userName: params.userName || "System",
        userEmail: params.userEmail || "system@tgagrifarms.com",
        action: params.action,
        entity: params.entity,
        entityId: params.entityId || null,
        details: params.details,
        ipAddress: params.ipAddress || null,
      },
    });
  } catch (err) {
    // Audit logging is non-fatal; log to server console if DB write fails
    console.warn("[AuditLog Warning]", (err as Error)?.message || err);
  }
}

/**
 * Convenience helper to log an action using the current authenticated user session
 */
export async function logUserActivity(
  user: SessionPayload,
  action: LogActivityParams["action"],
  entity: LogActivityParams["entity"],
  entityId: string | null | undefined,
  details: string,
  ipAddress?: string | null,
): Promise<void> {
  return logActivity({
    userId: user.sub,
    userName: user.name,
    userEmail: user.email,
    action,
    entity,
    entityId: entityId || null,
    details,
    ipAddress,
  });
}
