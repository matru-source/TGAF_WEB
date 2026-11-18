import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ActivityLogPage() {
  let logs: Awaited<ReturnType<typeof prisma.auditLog.findMany>> = [];
  let dbError = false;

  try {
    logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    dbError = true;
  }

  const getActionBadgeClass = (action: string) => {
    switch (action) {
      case "CREATE":
        return "badge-create";
      case "UPDATE":
      case "STATUS_CHANGE":
        return "badge-update";
      case "DELETE":
        return "badge-delete";
      case "LOGIN_SUCCESS":
        return "badge-login-ok";
      case "LOGIN_FAILED":
        return "badge-login-fail";
      case "SETTINGS_UPDATE":
        return "badge-settings";
      default:
        return "badge-default";
    }
  };

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

      <div className="panel-card" style={{ padding: "0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--admin-line, #E5E7EB)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "#374151" }}>
            Total Logged Events: {logs.length}
          </span>
          <span style={{ fontSize: "0.82rem", color: "#6B7280" }}>Showing recent 100 entries</span>
        </div>

        {logs.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "#6B7280" }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📜</div>
            <p style={{ margin: "0 0 4px", fontWeight: 600 }}>No activity records found</p>
            <p style={{ margin: "0", fontSize: "0.85rem" }}>
              Administrative actions such as logins, product edits, and deletions will be automatically logged here.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", textAlign: "left" }}>
                  <th style={{ padding: "12px 18px", fontWeight: 600, color: "#4B5563" }}>Timestamp</th>
                  <th style={{ padding: "12px 18px", fontWeight: 600, color: "#4B5563" }}>Action</th>
                  <th style={{ padding: "12px 18px", fontWeight: 600, color: "#4B5563" }}>Entity</th>
                  <th style={{ padding: "12px 18px", fontWeight: 600, color: "#4B5563" }}>User</th>
                  <th style={{ padding: "12px 18px", fontWeight: 600, color: "#4B5563" }}>Details</th>
                  <th style={{ padding: "12px 18px", fontWeight: 600, color: "#4B5563" }}>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "12px 18px", whiteSpace: "nowrap", color: "#6B7280", fontSize: "0.82rem" }}>
                      {new Date(log.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td style={{ padding: "12px 18px", whiteSpace: "nowrap" }}>
                      <span
                        className={`audit-badge ${getActionBadgeClass(log.action)}`}
                        style={{
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          display: "inline-block",
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: "12px 18px", fontWeight: 600, color: "#1F2937" }}>
                      {log.entity}
                    </td>
                    <td style={{ padding: "12px 18px", whiteSpace: "nowrap" }}>
                      <div style={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}>{log.userName}</div>
                      <div style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>{log.userEmail}</div>
                    </td>
                    <td style={{ padding: "12px 18px", color: "#4B5563", maxWidth: "340px", wordBreak: "break-word" }}>
                      {log.details}
                    </td>
                    <td style={{ padding: "12px 18px", color: "#6B7280", fontSize: "0.8rem", whiteSpace: "nowrap", fontFamily: "monospace" }}>
                      {log.ipAddress || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
