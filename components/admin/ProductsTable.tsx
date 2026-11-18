"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  segment: string;
  image: string | null;
  sizes: string[];
  formats: string[];
  published: boolean;
}

export default function ProductsTable({ initialProducts }: { initialProducts: ProductItem[] }) {
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      if (segmentFilter !== "ALL" && p.segment !== segmentFilter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase().trim();
      return (
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.segment.toLowerCase().includes(q) ||
        p.sizes.some((s) => s.toLowerCase().includes(q)) ||
        p.formats.some((f) => f.toLowerCase().includes(q))
      );
    });
  }, [initialProducts, search, segmentFilter]);

  return (
    <>
      {/* Search and Segment Filter */}
      <div
        style={{
          background: "#fff",
          padding: "14px 18px",
          borderRadius: "12px",
          border: "1px solid var(--line)",
          marginBottom: "18px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 240px" }}>
          <span style={{ fontSize: "1.1rem", color: "#6B7280" }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name, slug, sizes..."
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
              fontSize: "0.88rem",
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

        <div style={{ display: "flex", gap: "6px" }}>
          {["ALL", "B2C", "B2B"].map((seg) => (
            <button
              key={seg}
              type="button"
              onClick={() => setSegmentFilter(seg)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "1px solid",
                borderColor: segmentFilter === seg ? "var(--chilli)" : "#E5E7EB",
                background: segmentFilter === seg ? "var(--chilli)" : "#F9FAFB",
                color: segmentFilter === seg ? "#fff" : "#4B5563",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {seg === "ALL" ? "All Segments" : seg}
            </button>
          ))}
        </div>
      </div>

      <div className="panel">
        {filtered.length === 0 ? (
          <div className="empty" style={{ padding: "36px 16px", textAlign: "center" }}>
            {search ? `No products found matching "${search}".` : "No products found."}
          </div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}></th>
                <th>Name</th>
                <th>Segment</th>
                <th>Sizes / formats</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="thumb" src={p.image} alt="" />
                    ) : (
                      <div className="thumb" />
                    )}
                  </td>
                  <td>
                    <div className="name">{p.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: ".8rem" }}>/{p.slug}</div>
                  </td>
                  <td>
                    <span className={`badge-pill bp-${p.segment.toLowerCase()}`}>{p.segment}</span>
                  </td>
                  <td style={{ color: "var(--ink-2)", fontSize: ".85rem" }}>
                    {[...p.sizes, ...p.formats].join(", ") || "-"}
                  </td>
                  <td>
                    <span className={`badge-pill ${p.published ? "bp-on" : "bp-off"}`}>
                      {p.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions" style={{ justifyContent: "flex-end" }}>
                      <Link href={`/admin/products/${p.id}`} className="abtn abtn-ghost abtn-sm">
                        Edit
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
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
