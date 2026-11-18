import { prisma } from "@/lib/prisma";
import ActivityLogViewer from "@/components/admin/ActivityLogViewer";

export const dynamic = "force-dynamic";

export default async function ActivityLogPage() {
  let logs: Awaited<ReturnType<typeof prisma.auditLog.findMany>> = [];
  let dbError = false;

  try {
    logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  } catch {
    dbError = true;
  }

  // Format dates as strings for client component serialization
  const serializedLogs = logs.map((l) => ({
    ...l,
    createdAt: l.createdAt.toISOString(),
  }));

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Audit Trail & Activity Logs</h1>
          <p>Chronological record of administrator logins, creations, updates, and deletions.</p>
        </div>
      </div>

      {dbError && (
        <div className="alert alert-err" style={{ marginBottom: "20px" }}>
          Database is currently unreachable. Activity logs will appear here once the database is active.
        </div>
      )}

      <ActivityLogViewer initialLogs={serializedLogs} />
    </>
  );
}
