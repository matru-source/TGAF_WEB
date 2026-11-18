"use client";

import React, { useState, useMemo } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [previewing, setPreviewing] = useState(false);

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

  // Filtered posts
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase().trim();
    return posts.filter(
      (p) =>
        p.celebrantName.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.quote && p.quote.toLowerCase().includes(q)) ||
        (p.bodyText && p.bodyText.toLowerCase().includes(q)),
    );
  }, [posts, searchQuery]);

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
    setBadgesText("");
    setOrder(posts.length);
    setPublished(true);
    setError("");
    setPreviewing(false);
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
    setPreviewing(false);
  };

  const closeModal = () => {
    setIsNew(false);
    setEditingPost(null);
    setError("");
    setPreviewing(false);
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
      setError("Network error while uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const removeImageAt = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
        if (!res.ok) throw new Error(data.error || "Failed to create celebration post.");
        setPosts((prev) => [data.post, ...prev]);
      } else if (editingPost) {
        const res = await fetch(`/api/admin/celebrations/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update celebration post.");
        setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? data.post : p)));
      }
      closeModal();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (p: CelebrationPostData) => {
    if (!confirm(`Are you sure you want to delete celebration for "${p.celebrantName}"? Cloudinary poster photos will also be deleted.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/celebrations/${p.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete post.");
        return;
      }
      setPosts((prev) => prev.filter((item) => item.id !== p.id));
    } catch {
      alert("Network error while deleting post.");
    }
  };

  const handleTogglePublish = async (p: CelebrationPostData) => {
    try {
      const res = await fetch(`/api/admin/celebrations/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !p.published }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status.");
      setPosts((prev) => prev.map((item) => (item.id === p.id ? { ...item, published: !item.published } : item)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error updating status.");
    }
  };

  return (
    <div>
      <div className="admin-head" style={{ marginBottom: "20px" }}>
        <div>
          <h1>Distributor Celebrations &amp; Felicitation Feed</h1>
          <p>
            Publish honorary birthday wishes, milestone achievements, and partnership awards for key nationwide distributors on /distributors.
          </p>
        </div>
        <button onClick={openCreateModal} className="abtn abtn-primary">
          + New Celebration Post
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
          placeholder="Search by celebrant name, company, role, or congratulations text..."
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

      {filteredPosts.length === 0 ? (
        <div style={{ padding: "48px 24px", textAlign: "center", background: "#fff", borderRadius: "12px", border: "1px solid var(--line)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🎉</div>
          <p style={{ fontWeight: 600, color: "#374151", margin: "0 0 4px" }}>No celebration posts found</p>
          <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: 0 }}>
            {searchQuery ? `No posts matched "${searchQuery}".` : "Publish your first distributor celebration tribute."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                padding: "24px",
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "24px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                opacity: post.published ? 1 : 0.7,
              }}
            >
              {/* Image Preview / Poster */}
              <div style={{ borderRadius: "12px", overflow: "hidden", background: "#111", height: "220px", position: "relative" }}>
                {post.images && post.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.images[0]} alt={post.celebrantName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF", fontSize: "0.8rem" }}>
                    No Poster
                  </div>
                )}
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    background: "rgba(0,0,0,0.75)",
                    color: "#fff",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {post.category}
                </span>
                {!post.published && (
                  <span
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      background: "#EF4444",
                      color: "#fff",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    HIDDEN
                  </span>
                )}
              </div>

              {/* Post Details */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h2 style={{ margin: "0 0 4px", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)" }}>
                      {post.celebrantName}
                    </h2>
                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--chilli)" }}>
                      {post.role} · {post.company}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--ink-2)", fontWeight: 500 }}>
                    📅 {post.date}
                  </div>
                </div>

                {post.quote && (
                  <blockquote
                    style={{
                      margin: "8px 0 12px",
                      padding: "10px 14px",
                      borderLeft: "3px solid var(--chilli)",
                      background: "#F9FAFB",
                      borderRadius: "0 8px 8px 0",
                      fontStyle: "italic",
                      fontSize: "0.88rem",
                      color: "var(--ink-2)",
                    }}
                  >
                    &ldquo;{post.quote}&rdquo;
                  </blockquote>
                )}

                {post.bodyText && (
                  <p
                    style={{
                      margin: "0 0 12px",
                      fontSize: "0.85rem",
                      color: "var(--ink-2)",
                      lineHeight: "1.5",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.bodyText}
                  </p>
                )}

                {/* Badges */}
                {post.badges && post.badges.length > 0 && (
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                    {post.badges.map((b, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "0.75rem",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: "#EEF2FF",
                          color: "#3730A3",
                          fontWeight: 500,
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions Footer */}
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
                    onClick={() => handleTogglePublish(post)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: post.published ? "#10B981" : "#6B7280",
                    }}
                  >
                    {post.published ? "● Visible on Website" : "○ Hidden from Public"}
                  </button>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => openEditModal(post)} className="abtn abtn-ghost abtn-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(post)} className="abtn abtn-danger abtn-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT CELEBRATION MODAL */}
      {(isNew || editingPost) && (
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
              maxWidth: "680px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
                {isNew ? "Create Distributor Celebration Post" : "Edit Celebration Tribute"}
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Celebrant Full Name *
                  </label>
                  <input
                    type="text"
                    value={celebrantName}
                    onChange={(e) => setCelebrantName(e.target.value)}
                    placeholder="e.g. Madam Ifueko Mabel Ozigbo"
                    required
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Managing Director & CEO"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Distributor Enterprise / Company *
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Osagiodagbon Ventures Limited"
                    required
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                    Celebration Date / Event
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. 4th November 2026"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
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
                    <option value="ANNIVERSARY">🥂 Business Milestone</option>
                    <option value="EXCELLENCE">🏆 Sales Excellence Award</option>
                    <option value="EXPANSION">🚀 Territory Expansion</option>
                  </select>
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

              {/* Multi-Image Upload */}
              <div style={{ marginBottom: "14px", padding: "14px", background: "#F9FAFB", borderRadius: "10px", border: "1px dashed var(--line)" }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.88rem", marginBottom: "6px" }}>
                  Celebration Poster Images (Cloudinary)
                </label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploading}
                    style={{ fontSize: "0.85rem" }}
                  />
                  {uploading && <span style={{ fontSize: "0.82rem", color: "var(--chilli)" }}>Uploading...</span>}
                </div>

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

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
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

              {/* DRAFT PREVIEW CARD IN MODAL */}
              {previewing && (
                <div style={{ marginBottom: "20px", padding: "16px", background: "#F3F4F6", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#6B7280", marginBottom: "10px", textTransform: "uppercase" }}>
                    Celebration Feed Card Preview
                  </div>
                  <div style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #E5E7EB", padding: "16px", display: "flex", gap: "16px" }}>
                    <div style={{ width: "100px", height: "130px", background: "#111", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                      {images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={images[0]} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF", fontSize: "0.7rem" }}>
                          No poster
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--chilli)", textTransform: "uppercase" }}>{category}</div>
                      <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{celebrantName || "Celebrant Name"}</div>
                      <div style={{ fontSize: "0.82rem", color: "#6B7280", marginBottom: "6px" }}>{role} · {company}</div>
                      {quote && <div style={{ fontSize: "0.8rem", fontStyle: "italic", color: "#4B5563" }}>&ldquo;{quote}&rdquo;</div>}
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
                  👁️ {previewing ? "Hide Preview" : "Preview Post"}
                </button>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="button" onClick={closeModal} className="abtn">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading || uploading} className="abtn abtn-primary">
                    {loading ? "Saving..." : isNew ? "Create Post" : "Save Changes"}
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
