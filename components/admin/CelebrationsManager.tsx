"use client";

import React, { useState } from "react";

export interface CelebrationPostData {
  id: string;
  slug: string;
  celebrantName: string;
  role: string;
  company: string;
  date: string;
  category: string;
  quote: string | null;
  bodyText: string | null;
  images: string[];
  badges: string[];
  order: number;
  published: boolean;
}

export default function CelebrationsManager({ initialPosts }: { initialPosts: CelebrationPostData[] }) {
  const [posts, setPosts] = useState<CelebrationPostData[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<CelebrationPostData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [celebrantName, setCelebrantName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("BIRTHDAY");
  const [quote, setQuote] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [badgesText, setBadgesText] = useState("");
  const [order, setOrder] = useState(0);
  const [published, setPublished] = useState(true);

  const openCreateModal = () => {
    setIsNew(true);
    setEditingPost(null);
    setCelebrantName("");
    setRole("");
    setCompany("");
    setDate("");
    setCategory("BIRTHDAY");
    setQuote("");
    setBodyText("");
    setImages([]);
    setBadgesText("🎂 Birthday Celebration\n🏢 Key Distributor Partner\n🌶️ Good Earth Distribution Hub");
    setOrder(posts.length);
    setPublished(true);
    setError("");
  };

  const openEditModal = (p: CelebrationPostData) => {
    setIsNew(false);
    setEditingPost(p);
    setCelebrantName(p.celebrantName);
    setRole(p.role);
    setCompany(p.company);
    setDate(p.date);
    setCategory(p.category);
    setQuote(p.quote || "");
    setBodyText(p.bodyText || "");
    setImages(p.images || []);
    setBadgesText((p.badges || []).join("\n"));
    setOrder(p.order);
    setPublished(p.published);
    setError("");
  };

  const closeModal = () => {
    setIsNew(false);
    setEditingPost(null);
    setError("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("files", f));
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
      } else if (data.urls) {
        setImages((prev) => [...prev, ...data.urls]);
      }
    } catch {
      setError("Network error uploading images.");
    } finally {
      setUploading(false);
    }
  };

  const removeImageAt = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!celebrantName.trim() || !company.trim()) {
      setError("Celebrant Name and Company are required.");
      return;
    }
    setLoading(true);
    setError("");

    const badges = badgesText
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);

    const payload = {
      celebrantName,
      role,
      company,
      date,
      category,
      quote: quote || null,
      bodyText: bodyText || null,
      images,
      badges,
      order: Number(order),
      published,
    };

    try {
      if (isNew) {
        const res = await fetch("/api/admin/celebrations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to create celebration post.");
        } else {
          setPosts([data.post, ...posts]);
          closeModal();
        }
      } else if (editingPost) {
        const res = await fetch(`/api/admin/celebrations/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to update celebration post.");
        } else {
          setPosts(posts.map((it) => (it.id === editingPost.id ? data.post : it)));
          closeModal();
        }
      }
    } catch {
      setError("Error saving celebration post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete celebration post for "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/celebrations/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Could not delete post.");
      }
    } catch {
      alert("Error deleting post.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <p style={{ margin: 0, color: "var(--ink-2)", fontSize: "0.95rem" }}>
          Showing <strong>{posts.length}</strong> distributor celebration posts. Posts appear dynamically on the <code>/distributors</code> &amp; <code>/celebrations</code> page.
        </p>
        <button onClick={openCreateModal} className="abtn abtn-primary">
          + Create New Celebration Post
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "14px",
              padding: "20px",
              display: "grid",
              gridTemplateColumns: "180px 1fr auto",
              gap: "24px",
              alignItems: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              opacity: post.published ? 1 : 0.65,
            }}
          >
            {/* Thumbnail Carousel Preview */}
            <div
              style={{
                width: "180px",
                height: "150px",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#F3F4F6",
                position: "relative",
              }}
            >
              {post.images && post.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.images[0]}
                  alt={post.celebrantName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ display: "grid", placeItems: "center", height: "100%", color: "#9CA3AF", fontSize: "0.82rem" }}>
                  No poster uploaded
                </div>
              )}
              {post.images && post.images.length > 1 && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "6px",
                    right: "6px",
                    background: "rgba(0,0,0,0.75)",
                    color: "#fff",
                    padding: "2px 7px",
                    borderRadius: "99px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  +{post.images.length - 1} slides
                </span>
              )}
            </div>

            {/* Post Info */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span
                  style={{
                    background: post.category === "BIRTHDAY" ? "#FEE2E2" : "#FEF3C7",
                    color: post.category === "BIRTHDAY" ? "#991B1B" : "#92400E",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  {post.category}
                </span>
                <span style={{ fontSize: "0.82rem", color: "#6B7280" }}>{post.date}</span>
                {!post.published && (
                  <span style={{ background: "#EF4444", color: "#fff", fontSize: "0.72rem", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>
                    HIDDEN
                  </span>
                )}
              </div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "1.2rem", color: "var(--ink)" }}>{post.celebrantName}</h3>
              <p style={{ margin: "0 0 8px 0", fontSize: "0.88rem", color: "var(--chilli)", fontWeight: 600 }}>
                {post.role || post.company}
              </p>
              {post.quote && (
                <blockquote style={{ margin: 0, fontSize: "0.86rem", color: "#4B5563", fontStyle: "italic", borderLeft: "3px solid var(--chilli)", paddingLeft: "10px" }}>
                  &ldquo;{post.quote}&rdquo;
                </blockquote>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button onClick={() => openEditModal(post)} className="abtn">
                Edit Post
              </button>
              <button
                onClick={() => handleDelete(post.id, post.celebrantName)}
                className="abtn"
                style={{ color: "#DC2626", borderColor: "#FCA5A5" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isNew || editingPost) && (
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
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "1.3rem" }}>
                {isNew ? "+ Create New Distributor Celebration" : "Edit Celebration Post"}
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Celebrant Name *
                  </label>
                  <input
                    type="text"
                    value={celebrantName}
                    onChange={(e) => setCelebrantName(e.target.value)}
                    placeholder="e.g. Alhaji Sani Bello"
                    required
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Company / Ventures *
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Bello Universal Farms Ltd"
                    required
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Celebration Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. 15th November 2026"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Celebration Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  >
                    <option value="BIRTHDAY">🎂 Birthday Celebration</option>
                    <option value="MILESTONE">🏆 Milestone Spotlight</option>
                    <option value="TRADE_HONORS">✨ Trade Honors</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Role / Designation
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Chief Executive Officer · Key Distribution Partner"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                />
              </div>

              {/* Multi-Image Cloudinary Carousel Upload */}
              <div style={{ marginBottom: "16px", padding: "16px", background: "#F9FAFB", borderRadius: "10px", border: "1px dashed var(--line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.88rem" }}>
                    Carousel Posters &amp; Greeting Cards (Cloudinary)
                  </label>
                  {uploading && <span style={{ fontSize: "0.82rem", color: "var(--chilli)" }}>Uploading...</span>}
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  style={{ fontSize: "0.85rem", marginBottom: "12px" }}
                />

                {images.length > 0 && (
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {images.map((img, i) => (
                      <div key={i} style={{ position: "relative", width: "80px", height: "100px", borderRadius: "8px", overflow: "hidden", border: "1px solid #E5E7EB" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`Slide ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <button
                          type="button"
                          onClick={() => removeImageAt(i)}
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            background: "rgba(0,0,0,0.7)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "10px",
                            cursor: "pointer",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Featured Felicitation Quote
                </label>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  rows={2}
                  placeholder="e.g. Wishing you a joyful birthday and a year filled with good health, happiness, and continued success."
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Tribute Body Text (Paragraphs)
                </label>
                <textarea
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  rows={4}
                  placeholder="Write the full dedication message. Separate paragraphs with empty lines..."
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Badges / Tags (One per line)
                </label>
                <textarea
                  value={badgesText}
                  onChange={(e) => setBadgesText(e.target.value)}
                  rows={3}
                  placeholder="🎂 Celebration: 4th November&#10;🏢 Osagiodagbon Ventures&#10;🌶️ Good Earth Key Distributor"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)", fontSize: "0.85rem" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                <input
                  type="checkbox"
                  id="pub-celeb-check"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                <label htmlFor="pub-celeb-check" style={{ fontSize: "0.9rem", fontWeight: 500, cursor: "pointer" }}>
                  Published (visible on website celebrations feed)
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" onClick={closeModal} className="abtn">
                  Cancel
                </button>
                <button type="submit" disabled={loading || uploading} className="abtn abtn-primary">
                  {loading ? "Saving..." : isNew ? "Create Post" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
