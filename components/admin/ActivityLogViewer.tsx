"use client";

import React, { useState, useMemo } from "react";

export interface LogEntry {
  id: string;
  createdAt: string | Date;
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  details: string | null;
  ipAddress: string | null;
}

const PAGE_SIZE = 20;

export default function ActivityLogViewer({ initialLogs }: { initialLogs: LogEntry[] }) {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [entityFilter, setEntityFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredLogs = useMemo(() => {
    return initialLogs.filter((log) => {
      if (actionFilter !== "ALL" && log.action !== actionFilter) return false;
      if (entityFilter !== "ALL" && log.entity !== entityFilter) return false;
      if (!search.trim()) return true;

      const q = search.toLowerCase().trim();
      return (
        (log.userName && log.userName.toLowerCase().includes(q)) ||
        (log.userEmail && log.userEmail.toLowerCase().includes(q)) ||
        log.action.toLowerCase().includes(q) ||
        log.entity.toLowerCase().includes(q) ||
        (log.details && log.details.toLowerCase().includes(q)) ||
        (log.ipAddress && log.ipAddress.toLowerCase().includes(q))
      );
    });
  }, [initialLogs, search, actionFilter, entityFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / PAGE_SIZE));
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredLogs.slice(start, start + PAGE_SIZE);
  }, [filteredLogs, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleActionChange = (val: string) => {
    setActionFilter(val);
    setCurrentPage(1);
  };

  const handleEntityChange = (val: string) => {
    setEntityFilter(val);
    setCurrentPage(1);
  };

  // Distinct entities in logs
  const entities = useMemo(() => {
    return Array.from(new Set(initialLogs.map((l) => l.entity))).filter(Boolean);
  }, [initialLogs]);

  return (
    <div>
      {/* Search and Filters Bar */}
      <div
        style={{
          background: "#fff",
          padding: "16px 20px",
          borderRadius: "12px",
          border: "1px solid var(--admin-line, #E5E7EB)",
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 260px" }}>
          <span style={{ fontSize: "1.1rem", color: "#6B7280" }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by user, action, detail, IP..."
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #D1D5DB",
              fontSize: "0.88rem",
            }}
          />
          {search && (
            <button
              onClick={() => handleSearchChange("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}
            >
              ✕
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <select
            value={actionFilter}
            onChange={(e) => handleActionChange(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #D1D5DB",
              fontSize: "0.85rem",
              background: "#fff",
            }}
          >
            <option value="ALL">All Actions</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
            <option value="LOGIN_SUCCESS">LOGIN_SUCCESS</option>
            <option value="LOGIN_FAILED">LOGIN_FAILED</option>
            <option value="STATUS_CHANGE">STATUS_CHANGE</option>
          </select>

          <select
            value={entityFilter}
            onChange={(e) => handleEntityChange(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #D1D5DB",
              fontSize: "0.85rem",
              background: "#fff",
            }}
          >
            <option value="ALL">All Entities</option>
            {entities.map((ent) => (
              <option key={ent} value={ent}>
                {ent}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="panel-card" style={{ padding: "0", overflow: "hidden" }}>
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--admin-line, #E5E7EB)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "0.92rem", color: "#374151" }}>
            Showing {paginatedLogs.length} of {filteredLogs.length} events
            {search && ` matching "${search}"`}
          </span>
          <span style={{ fontSize: "0.82rem", color: "#6B7280" }}>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {paginatedLogs.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "#6B7280" }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📜</div>
            <p style={{ margin: "0 0 4px", fontWeight: 600 }}>No activity records match your filter</p>
            <p style={{ margin: "0", fontSize: "0.85rem" }}>
              Try searching with different keywords or resetting filters.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              className="admin-table"
              style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}
            >
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
                {paginatedLogs.map((log) => (
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
                          letterSpacing: "0.03em",
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: "12px 18px", whiteSpace: "nowrap", fontWeight: 600, color: "#1F2937" }}>
                      {log.entity}
                    </td>
                    <td style={{ padding: "12px 18px", whiteSpace: "nowrap" }}>
                      <div style={{ fontWeight: 500, color: "#111827" }}>{log.userName || "System / Guest"}</div>
                      {log.userEmail && <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{log.userEmail}</div>}
                    </td>
                    <td style={{ padding: "12px 18px", color: "#4B5563", maxWidth: "320px", wordBreak: "break-word" }}>
                      {log.details || "-"}
                    </td>
                    <td style={{ padding: "12px 18px", whiteSpace: "nowrap", color: "#9CA3AF", fontSize: "0.78rem", fontFamily: "monospace" }}>
                      {log.ipAddress || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div
            style={{
              padding: "16px 20px",
              borderTop: "1px solid var(--admin-line, #E5E7EB)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#F9FAFB",
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="abtn abtn-ghost"
              style={{ padding: "6px 14px", fontSize: "0.85rem", opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              ◀ Previous
            </button>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#4B5563" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="abtn abtn-ghost"
              style={{ padding: "6px 14px", fontSize: "0.85rem", opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
