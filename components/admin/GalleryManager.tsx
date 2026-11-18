"use client";

import React, { useState, useMemo } from "react";

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
  { key: "all", label: "All Categories" },
  { key: "packaging", label: "Packaging & Facilities" },
  { key: "operational", label: "Operational Workforce" },
  { key: "leadership", label: "Leadership" },
  { key: "sourcing", label: "Sourcing & Harvest" },
  { key: "marketing", label: "Marketing & Distribution" },
];

const PAGE_SIZE = 20;

export default function GalleryManager({ initialItems }: { initialItems: GalleryItemData[] }) {
  const [items, setItems] = useState<GalleryItemData[]>(initialItems);
  const [editingItem, setEditingItem] = useState<GalleryItemData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewing, setPreviewing] = useState(false);

  // Search & Filter & Pagination states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("packaging");
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [order, setOrder] = useState(0);
  const [published, setPublished] = useState(true);

  // Filtered & Paginated items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.caption && item.caption.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.tag && item.tag.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, categoryFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setCategoryFilter(val);
    setCurrentPage(1);
  };

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
    setPreviewing(false);
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
    setPreviewing(false);
  };

  const closeModal = () => {
    setIsNew(false);
    setEditingItem(null);
    setError("");
    setPreviewing(false);
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
        if (!res.ok) throw new Error(data.error || "Failed to create photo item.");
        setItems((prev) => [...prev, data.item]);
      } else if (editingItem) {
        const res = await fetch(`/api/admin/gallery/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update photo item.");
        setItems((prev) => prev.map((item) => (item.id === editingItem.id ? data.item : item)));
      }
      closeModal();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving photo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: GalleryItemData) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"? This will also remove the photo from Cloudinary.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/gallery/${item.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete item.");
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch {
      alert("Network error while deleting item.");
    }
  };

  const handleTogglePublish = async (item: GalleryItemData) => {
    try {
      const res = await fetch(`/api/admin/gallery/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status.");
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, published: !item.published } : i)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error updating status.");
    }
  };

  return (
    <div>
      <div className="admin-head" style={{ marginBottom: "20px" }}>
        <div>
          <h1>Industrial Photo Gallery</h1>
          <p>Manage processing factory, workforce, harvest, and distribution photos displayed on the /gallery page.</p>
        </div>
        <button onClick={openCreateModal} className="abtn abtn-primary">
          + Add New Photo
        </button>
      </div>

      {/* SEARCH & FILTER CONTROLS */}
      <div
        style={{
          background: "#fff",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid var(--line)",
          marginBottom: "24px",
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Search Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 260px" }}>
          <span style={{ fontSize: "1.1rem", color: "#6B7280" }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by title, location, tag, caption..."
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
              fontSize: "0.88rem",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleCategoryChange(cat.key)}
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid",
                borderColor: categoryFilter === cat.key ? "var(--chilli, #b91c1c)" : "#E5E7EB",
                background: categoryFilter === cat.key ? "var(--chilli, #b91c1c)" : "#F9FAFB",
                color: categoryFilter === cat.key ? "#fff" : "#4B5563",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: "16px", fontSize: "0.85rem", color: "#6B7280", display: "flex", justifyContent: "space-between" }}>
        <span>
          Showing <strong>{paginatedItems.length}</strong> of <strong>{filteredItems.length}</strong> photos
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      {/* Gallery Cards Grid */}
      {paginatedItems.length === 0 ? (
        <div style={{ padding: "48px 24px", textAlign: "center", background: "#fff", borderRadius: "12px", border: "1px solid var(--line)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📷</div>
          <p style={{ fontWeight: 600, color: "#374151", margin: "0 0 4px" }}>No photos found</p>
          <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: 0 }}>
            {searchQuery ? "Try clearing your search query or choosing another category." : "Add your first photo to get started."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {paginatedItems.map((item) => (
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

              <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ margin: "0 0 6px", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  {item.title}
                </h3>
                {item.location && (
                  <div style={{ fontSize: "0.78rem", color: "var(--ink-2)", marginBottom: "6px" }}>
                    📍 {item.location}
                  </div>
                )}
                {item.tag && (
                  <div style={{ fontSize: "0.75rem", color: "var(--chilli)", fontWeight: 600, marginBottom: "8px" }}>
                    🏷️ {item.tag}
                  </div>
                )}
                {item.caption && (
                  <p
                    style={{
                      margin: "0 0 12px",
                      fontSize: "0.82rem",
                      color: "var(--ink-2)",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.caption}
                  </p>
                )}

                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--line)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => handleTogglePublish(item)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: item.published ? "#10B981" : "#6B7280",
                    }}
                  >
                    {item.published ? "● Visible" : "○ Hidden"}
                  </button>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => openEditModal(item)}
                      className="abtn abtn-sm abtn-ghost"
                      style={{ padding: "4px 8px", fontSize: "0.78rem" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="abtn abtn-sm abtn-danger"
                      style={{ padding: "4px 8px", fontSize: "0.78rem" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
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
          <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#374151" }}>
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

      {/* CREATE / EDIT MODAL */}
      {(isNew || editingItem) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
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
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
                {isNew ? "Add Industrial Photo" : "Edit Photo Details"}
              </h2>
              <button
                onClick={closeModal}
                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--ink-2)" }}
              >
                ✕
              </button>
            </div>

            {error && <div className="alert alert-err" style={{ marginBottom: "16px" }}>{error}</div>}

            <form onSubmit={handleSave}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Photo Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern Spice Grinding Line"
                  required
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  >
                    {CATEGORIES.filter((c) => c.key !== "all").map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Highlight Tag
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

              {/* DRAFT PREVIEW CARD IN MODAL */}
              {previewing && (
                <div style={{ marginBottom: "20px", padding: "16px", background: "#F3F4F6", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#6B7280", marginBottom: "10px", textTransform: "uppercase" }}>
                    Card Preview on /gallery
                  </div>
                  <div style={{ background: "#fff", borderRadius: "10px", overflow: "hidden", border: "1px solid #E5E7EB", maxWidth: "300px" }}>
                    <div style={{ height: "160px", background: "#111", position: "relative" }}>
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", color: "#6B7280", fontSize: "0.8rem" }}>
                          No image
                        </div>
                      )}
                      <span style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.75)", color: "#fff", fontSize: "0.68rem", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase" }}>
                        {category}
                      </span>
                    </div>
                    <div style={{ padding: "12px" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "4px" }}>{title || "Untitled Photo"}</div>
                      {location && <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>📍 {location}</div>}
                      {tag && <div style={{ fontSize: "0.72rem", color: "var(--chilli)", fontWeight: 600 }}>🏷️ {tag}</div>}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => setPreviewing(!previewing)}
                  className="abtn abtn-ghost"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  👁️ {previewing ? "Hide Preview" : "Preview Card"}
                </button>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="button" onClick={closeModal} className="abtn">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading || uploading} className="abtn abtn-primary">
                    {loading ? "Saving..." : isNew ? "Add Photo" : "Save Changes"}
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
