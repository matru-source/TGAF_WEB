"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import DeleteTeamMemberButton from "@/components/admin/DeleteTeamMemberButton";

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  credentials?: string | null;
  initials?: string | null;
  photo: string | null;
  order: number;
  published: boolean;
}

export default function TeamTable({ initialMembers }: { initialMembers: TeamMemberItem[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return initialMembers;
    const q = search.toLowerCase().trim();
    return initialMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        (m.bio && m.bio.toLowerCase().includes(q)) ||
        (m.credentials && m.credentials.toLowerCase().includes(q)),
    );
  }, [initialMembers, search]);

  return (
    <>
      <div
        style={{
          background: "#fff",
          padding: "14px 18px",
          borderRadius: "12px",
          border: "1px solid var(--line)",
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "1.1rem", color: "#6B7280" }}>🔍</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search team by name, title, or bio..."
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: "0.92rem",
            background: "transparent",
          }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}
          >
            ✕
          </button>
        )}
      </div>

      <div className="panel">
        {filtered.length === 0 ? (
          <div className="empty" style={{ padding: "36px 16px", textAlign: "center" }}>
            {search ? `No team member found matching "${search}".` : "No team members yet."}
          </div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}></th>
                <th>Name</th>
                <th>Role</th>
                <th>Order</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="thumb" src={m.photo} alt="" />
                    ) : (
                      <div className="thumb avatar-thumb">
                        {m.initials ||
                          m.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="name">{m.name}</div>
                    {m.credentials ? (
                      <div style={{ color: "var(--muted)", fontSize: ".8rem" }}>{m.credentials}</div>
                    ) : m.bio ? (
                      <div
                        style={{
                          color: "var(--muted)",
                          fontSize: ".8rem",
                          maxWidth: "260px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.bio}
                      </div>
                    ) : null}
                  </td>
                  <td style={{ color: "var(--ink-2)" }}>{m.role}</td>
                  <td>{m.order}</td>
                  <td>
                    <span className={`badge-pill ${m.published ? "bp-on" : "bp-off"}`}>
                      {m.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions" style={{ justifyContent: "flex-end" }}>
                      <Link href={`/admin/team/${m.id}`} className="abtn abtn-ghost abtn-sm">
                        Edit
                      </Link>
                      <DeleteTeamMemberButton id={m.id} name={m.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
