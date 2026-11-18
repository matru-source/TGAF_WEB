"use client";

import React, { useState } from "react";

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

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState(0);
  const [published, setPublished] = useState(true);

  const openCreateModal = () => {
    setIsNew(true);
    setEditingPartner(null);
    setName("");
    setLogo("");
    setCategory("");
    setOrder(partners.length);
    setPublished(true);
    setError("");
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
  };

  const closeModal = () => {
    setIsNew(false);
    setEditingPartner(null);
    setError("");
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
        if (!res.ok) {
          setError(data.error || "Failed to add partner.");
        } else {
          setPartners([...partners, data.partner]);
          closeModal();
        }
      } else if (editingPartner) {
        const res = await fetch(`/api/admin/b2b/${editingPartner.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to update partner.");
        } else {
          setPartners(partners.map((it) => (it.id === editingPartner.id ? data.partner : it)));
          closeModal();
        }
      }
    } catch {
      setError("Error saving partner.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, partnerName: string) => {
    if (!confirm(`Are you sure you want to remove "${partnerName}"?`)) return;
    try {
      const res = await fetch(`/api/admin/b2b/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPartners(partners.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Could not delete partner.");
      }
    } catch {
      alert("Error deleting partner.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <p style={{ margin: 0, color: "var(--ink-2)", fontSize: "0.95rem" }}>
          Showing <strong>{partners.length}</strong> B2B corporate partners. Client logos appear on <code>/products#b2b</code>.
        </p>
        <button onClick={openCreateModal} className="abtn abtn-primary">
          + Add New Partner Logo
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px" }}>
        {partners.map((partner) => (
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
                style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "#6B7280" }}
              >
                ✕
              </button>
            </div>

            {error && (
              <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "0.88rem" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Partner / Brand Name *
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

              {/* Logo Cloudinary Upload */}
              <div style={{ marginBottom: "16px", padding: "14px", background: "#F9FAFB", borderRadius: "10px", border: "1px dashed var(--line)" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Brand Logo Image (Cloudinary) *
                </label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleLogoUpload}
                    disabled={uploading}
                    style={{ fontSize: "0.85rem" }}
                  />
                  {uploading && <span style={{ fontSize: "0.82rem", color: "var(--chilli)" }}>Uploading...</span>}
                </div>
                <input
                  type="text"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="Or paste Cloudinary URL"
                  required
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid var(--line)", fontSize: "0.85rem" }}
                />
                {logo && (
                  <div style={{ marginTop: "10px", height: "60px", display: "grid", placeItems: "center", background: "#fff", borderRadius: "6px", border: "1px solid #E5E7EB" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo} alt="Preview" style={{ maxHeight: "40px", maxWidth: "90%", objectFit: "contain" }} />
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Industry / Category (Optional)
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. FMCG Multi-national, QSR, Retail"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
                  <input
                    type="checkbox"
                    id="pub-partner-check"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                  <label htmlFor="pub-partner-check" style={{ marginLeft: "8px", fontSize: "0.88rem", fontWeight: 500, cursor: "pointer" }}>
                    Published
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" onClick={closeModal} className="abtn">
                  Cancel
                </button>
                <button type="submit" disabled={loading || uploading} className="abtn abtn-primary">
                  {loading ? "Saving..." : isNew ? "Add Partner" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
