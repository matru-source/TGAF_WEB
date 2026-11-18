"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface GalleryItemData {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string | null;
  location: string | null;
  tag: string | null;
  order: number;
  published: boolean;
}

const CATEGORIES = [
  { key: "packaging", label: "Packaging & Facilities" },
  { key: "operational", label: "Operational Workforce" },
  { key: "leadership", label: "Leadership" },
  { key: "sourcing", label: "Sourcing & Harvest" },
  { key: "marketing", label: "Marketing & Distribution" },
];

export default function GalleryManager({ initialItems }: { initialItems: GalleryItemData[] }) {
  const [items, setItems] = useState<GalleryItemData[]>(initialItems);
  const [editingItem, setEditingItem] = useState<GalleryItemData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("packaging");
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [order, setOrder] = useState(0);
  const [published, setPublished] = useState(true);

  const openCreateModal = () => {
    setIsNew(true);
    setEditingItem(null);
    setTitle("");
    setCategory("packaging");
    setImage("");
    setCaption("");
    setLocation("");
    setTag("");
    setOrder(items.length);
    setPublished(true);
    setError("");
  };

  const openEditModal = (item: GalleryItemData) => {
    setIsNew(false);
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImage(item.image);
    setCaption(item.caption || "");
    setLocation(item.location || "");
    setTag(item.tag || "");
    setOrder(item.order);
    setPublished(item.published);
    setError("");
  };

  const closeModal = () => {
    setIsNew(false);
    setEditingItem(null);
    setError("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setImage(data.urls[0]);
      }
    } catch {
      setError("Network error while uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image.trim()) {
      setError("Title and Image are required.");
      return;
    }
    setLoading(true);
    setError("");

    const payload = {
      title,
      category,
      image,
      caption: caption || null,
      location: location || null,
      tag: tag || null,
      order: Number(order),
      published,
    };

    try {
      if (isNew) {
        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to create gallery item.");
        } else {
          setItems([data.item, ...items]);
          closeModal();
        }
      } else if (editingItem) {
        const res = await fetch(`/api/admin/gallery/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to update gallery item.");
        } else {
          setItems(items.map((it) => (it.id === editingItem.id ? data.item : it)));
          closeModal();
        }
      }
    } catch {
      setError("Error saving item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${itemTitle}"?`)) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter((it) => it.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Could not delete item.");
      }
    } catch {
      alert("Error deleting item.");
    }
  };

  const handleTogglePublish = async (item: GalleryItemData) => {
    try {
      const res = await fetch(`/api/admin/gallery/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      if (res.ok) {
        setItems(items.map((it) => (it.id === item.id ? { ...it, published: !it.published } : it)));
      }
    } catch {
      alert("Could not update publish state.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <p style={{ margin: 0, color: "var(--ink-2)", fontSize: "0.95rem" }}>
          Showing <strong>{items.length}</strong> gallery photos. Uploaded images appear on the public <code>/gallery</code> page.
        </p>
        <button onClick={openCreateModal} className="abtn abtn-primary">
          + Add New Photo
        </button>
      </div>

      {/* Gallery Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              opacity: item.published ? 1 : 0.65,
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "180px", background: "#111" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  background: "rgba(0,0,0,0.75)",
                  color: "#fff",
                  fontSize: "0.72rem",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {item.category}
              </span>
              {!item.published && (
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#EF4444",
                    color: "#fff",
                    fontSize: "0.72rem",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontWeight: 700,
                  }}
                >
                  HIDDEN
                </span>
              )}
            </div>

            <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
              <h4 style={{ margin: "0 0 6px 0", fontSize: "1rem", color: "var(--ink)" }}>{item.title}</h4>
              {item.caption && (
                <p style={{ margin: "0 0 12px 0", fontSize: "0.85rem", color: "#6B7280", lineHeight: 1.4, flex: 1 }}>
                  {item.caption.length > 90 ? item.caption.slice(0, 90) + "..." : item.caption}
                </p>
              )}
              {item.location && (
                <span style={{ fontSize: "0.78rem", color: "#9CA3AF", marginBottom: "14px" }}>
                  📍 {item.location}
                </span>
              )}

              <div style={{ display: "flex", gap: "8px", marginTop: "auto", borderTop: "1px solid #F3F4F6", paddingTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="abtn"
                  style={{ flex: 1, fontSize: "0.82rem", padding: "6px" }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleTogglePublish(item)}
                  className="abtn"
                  style={{ fontSize: "0.82rem", padding: "6px 10px" }}
                  title={item.published ? "Hide from website" : "Show on website"}
                >
                  {item.published ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.title)}
                  className="abtn"
                  style={{ color: "#DC2626", borderColor: "#FCA5A5", fontSize: "0.82rem", padding: "6px 10px" }}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isNew || editingItem) && (
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
              padding: "28px",
              width: "100%",
              maxWidth: "540px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "1.3rem" }}>
                {isNew ? "+ Add New Gallery Photo" : "Edit Gallery Photo"}
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
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Photo Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Packaging Line & Quality Depot"
                  required
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Category Filter
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Tag / Label
                  </label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. Modern Machinery"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
              </div>

              {/* Cloudinary Image Upload */}
              <div style={{ marginBottom: "16px", padding: "16px", background: "#F9FAFB", borderRadius: "10px", border: "1px dashed var(--line)" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Photo Image (Cloudinary) *
                </label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    style={{ fontSize: "0.85rem" }}
                  />
                  {uploading && <span style={{ fontSize: "0.82rem", color: "var(--chilli)" }}>Uploading...</span>}
                </div>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Or paste Cloudinary URL or local /img/gallery/... path"
                  required
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid var(--line)", fontSize: "0.85rem" }}
                />
                {image && (
                  <div style={{ marginTop: "10px", height: "120px", position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Caption / Description
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={2}
                  placeholder="Detailed description shown in the lightbox view..."
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Ikorodu Plant, Lagos"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
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
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                <input
                  type="checkbox"
                  id="pub-check"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                <label htmlFor="pub-check" style={{ fontSize: "0.9rem", fontWeight: 500, cursor: "pointer" }}>
                  Published (visible on public website)
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" onClick={closeModal} className="abtn">
                  Cancel
                </button>
                <button type="submit" disabled={loading || uploading} className="abtn abtn-primary">
                  {loading ? "Saving..." : isNew ? "Add Photo" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
