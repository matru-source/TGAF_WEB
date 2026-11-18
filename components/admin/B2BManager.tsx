"use client";

import React, { useState, useMemo } from "react";

export interface B2BPartnerData {
  id: string;
  name: string;
  logo: string;
  category: string | null;
  order: number;
  published: boolean;
}

export default function B2BManager({ initialPartners }: { initialPartners: B2BPartnerData[] }) {
  const [partners, setPartners] = useState<B2BPartnerData[]>(initialPartners);
  const [editingPartner, setEditingPartner] = useState<B2BPartnerData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewing, setPreviewing] = useState(false);

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState(0);
  const [published, setPublished] = useState(true);

  // Filtered partners
  const filteredPartners = useMemo(() => {
    if (!searchQuery.trim()) return partners;
    const q = searchQuery.toLowerCase().trim();
    return partners.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)),
    );
  }, [partners, searchQuery]);

  const openCreateModal = () => {
    setIsNew(true);
    setEditingPartner(null);
    setName("");
    setLogo("");
    setCategory("");
    setOrder(partners.length);
    setPublished(true);
    setError("");
    setPreviewing(false);
  };

  const openEditModal = (p: B2BPartnerData) => {
    setIsNew(false);
    setEditingPartner(p);
    setName(p.name);
    setLogo(p.logo);
    setCategory(p.category || "");
    setOrder(p.order);
    setPublished(p.published);
    setError("");
    setPreviewing(false);
  };

  const closeModal = () => {
    setIsNew(false);
    setEditingPartner(null);
    setError("");
    setPreviewing(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("files", files[0]);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
      } else if (data.urls && data.urls[0]) {
        setLogo(data.urls[0]);
      }
    } catch {
      setError("Network error uploading logo.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !logo.trim()) {
      setError("Partner Name and Logo are required.");
      return;
    }
    setLoading(true);
    setError("");

    const payload = {
      name,
      logo,
      category: category || null,
      order: Number(order),
      published,
    };

    try {
      if (isNew) {
        const res = await fetch("/api/admin/b2b", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create partner.");
        setPartners((prev) => [...prev, data.partner]);
      } else if (editingPartner) {
        const res = await fetch(`/api/admin/b2b/${editingPartner.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update partner.");
        setPartners((prev) => prev.map((p) => (p.id === editingPartner.id ? data.partner : p)));
      }
      closeModal();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving partner.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, partnerName: string) => {
    if (!confirm(`Are you sure you want to delete "${partnerName}"? Cloudinary logo will also be removed.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/b2b/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete partner.");
        return;
      }
      setPartners((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Network error while deleting partner.");
    }
  };

  return (
    <div>
      <div className="admin-head" style={{ marginBottom: "20px" }}>
        <div>
          <h1>B2B Enterprise Portfolio &amp; Client Logos</h1>
          <p>
            Manage industrial spice processing clients, seasonings manufacturers, and multinational FMCG logos displayed on /products#b2b.
          </p>
        </div>
        <button onClick={openCreateModal} className="abtn abtn-primary">
          + Add New Partner Logo
        </button>
      </div>

      {/* SEARCH BAR */}
      <div
        style={{
          background: "#fff",
          padding: "16px 20px",
          borderRadius: "12px",
          border: "1px solid var(--line)",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "1.1rem", color: "#6B7280" }}>🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search B2B partners by company name or manufacturing category..."
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            fontSize: "0.92rem",
            background: "transparent",
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}
          >
            ✕
          </button>
        )}
      </div>

      {filteredPartners.length === 0 ? (
        <div style={{ padding: "48px 24px", textAlign: "center", background: "#fff", borderRadius: "12px", border: "1px solid var(--line)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🏭</div>
          <p style={{ fontWeight: 600, color: "#374151", margin: "0 0 4px" }}>No partner logos found</p>
          <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: 0 }}>
            {searchQuery ? `No partner matched "${searchQuery}".` : "Upload your first B2B client logo."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px" }}>
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                opacity: partner.published ? 1 : 0.65,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#FAF9F5",
                  borderRadius: "10px",
                  padding: "12px",
                  marginBottom: "12px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  style={{ maxHeight: "50px", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "0.95rem", textAlign: "center", color: "var(--ink)" }}>
                {partner.name}
              </h4>
              {partner.category && (
                <span style={{ fontSize: "0.74rem", color: "#6B7280", marginBottom: "12px" }}>
                  {partner.category}
                </span>
              )}
              <div style={{ display: "flex", gap: "8px", width: "100%", marginTop: "auto", paddingTop: "10px", borderTop: "1px solid #F3F4F6" }}>
                <button
                  type="button"
                  onClick={() => openEditModal(partner)}
                  className="abtn"
                  style={{ flex: 1, fontSize: "0.8rem", padding: "5px" }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(partner.id, partner.name)}
                  className="abtn"
                  style={{ color: "#DC2626", borderColor: "#FCA5A5", fontSize: "0.8rem", padding: "5px 8px" }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {(isNew || editingPartner) && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "26px",
              width: "100%",
              maxWidth: "460px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem" }}>
                {isNew ? "+ Add Partner Logo" : "Edit Partner Logo"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#6B7280" }}
              >
                ✕
              </button>
            </div>

            {error && <div className="alert alert-err" style={{ marginBottom: "16px" }}>{error}</div>}

            <form onSubmit={handleSave}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Partner Enterprise Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nestlé Nigeria"
                  required
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Industry Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. FMCG Seasonings & Bouillon"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                />
              </div>

              {/* Logo Upload */}
              <div style={{ marginBottom: "14px", padding: "14px", background: "#F9FAFB", borderRadius: "10px", border: "1px dashed var(--line)" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Partner Logo (Cloudinary / PNG) *
                </label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleLogoUpload}
                    disabled={uploading}
                    style={{ fontSize: "0.82rem" }}
                  />
                  {uploading && <span style={{ fontSize: "0.8rem", color: "var(--chilli)" }}>Uploading...</span>}
                </div>
                <input
                  type="text"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="Or paste Cloudinary URL"
                  required
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid var(--line)", fontSize: "0.82rem" }}
                />

                {logo && (
                  <div style={{ marginTop: "10px", padding: "10px", background: "#FAF9F5", borderRadius: "8px", textAlign: "center" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo} alt="Preview" style={{ maxHeight: "40px", maxWidth: "100%", objectFit: "contain" }} />
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", paddingTop: "24px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                    />
                    Published
                  </label>
                </div>
              </div>

              {previewing && (
                <div style={{ marginBottom: "16px", padding: "12px", background: "#F3F4F6", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", marginBottom: "6px", textTransform: "uppercase" }}>
                    Logo Preview on /products#b2b
                  </div>
                  <div style={{ background: "#FAF9F5", padding: "16px", borderRadius: "8px", display: "inline-block", minWidth: "160px" }}>
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logo} alt={name} style={{ maxHeight: "45px", maxWidth: "140px", objectFit: "contain" }} />
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>No logo</span>
                    )}
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, marginTop: "6px" }}>{name || "Partner Name"}</div>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => setPreviewing(!previewing)}
                  className="abtn abtn-ghost"
                  style={{ fontSize: "0.85rem" }}
                >
                  👁️ {previewing ? "Hide" : "Preview"}
                </button>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="button" onClick={closeModal} className="abtn">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading || uploading} className="abtn abtn-primary">
                    {loading ? "Saving..." : isNew ? "Add Partner" : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
