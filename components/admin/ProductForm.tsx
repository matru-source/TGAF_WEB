"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTransparentImageUrl } from "@/lib/cloudinaryUtils";

export type ProductInitial = {
  id?: string;
  name?: string;
  slug?: string;
  segment?: "B2C" | "B2B";
  accent?: "CHILLI" | "TURMERIC" | "GINGER";
  tagline?: string | null;
  description?: string;
  image?: string | null;
  images?: string[];
  sizes?: string[];
  formats?: string[];
  costPositioning?: string | null;
  marketCategory?: string | null;
  colour?: string | null;
  asta?: string | null;
  scoville?: string | null;
  usage?: string | null;
  featured?: boolean;
  published?: boolean;
  order?: number;
};

const BUNDLED = [
  "/Product/hero-hot-peppe-studio.png",
  "/Product/hot-peppe-supa-pack.png",
  "/Product/hot-peppe-carton.png",
  "/Product/hot-peppe-supa-pack-carton.png",
  "/Product/atarodo-new.png",
  "/Product/atarodo-carton.png",
  "/Product/hero-cameroon-studio.png",
  "/Product/cameroon-carton.png",
  "/Product/ose-di-oku.png",
  "/Product/turmeric.png",
  "/Product/ginger.png",
];

export default function ProductForm({ initial = {} }: { initial?: ProductInitial }) {
  const router = useRouter();
  const editing = Boolean(initial.id);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [manualPath, setManualPath] = useState("");
  const [autoRemoveBg, setAutoRemoveBg] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Live state for interactive draft preview
  const [name, setName] = useState(initial.name || "");
  const [slug, setSlug] = useState(initial.slug || "");
  const [segment, setSegment] = useState(initial.segment || "B2C");
  const [accent, setAccent] = useState(initial.accent || "CHILLI");
  const [tagline, setTagline] = useState(initial.tagline || "");
  const [description, setDescription] = useState(initial.description || "");
  const [sizesInput, setSizesInput] = useState((initial.sizes || []).join(", "));
  const [formatsInput, setFormatsInput] = useState((initial.formats || []).join(", "));
  const [scoville, setScoville] = useState(initial.scoville || "");
  const [asta, setAsta] = useState(initial.asta || "");

  // The first entry is the cover image shown on cards; the rest fill the carousel.
  const [images, setImages] = useState<string[]>(() => {
    const initialList = [initial.image, ...(initial.images || [])].filter(Boolean) as string[];
    return [...new Set(initialList)];
  });

  const addImages = (paths: string[]) =>
    setImages((prev) => [...new Set([...prev, ...paths.filter(Boolean)])]);
  const removeImage = (src: string) => setImages((prev) => prev.filter((s) => s !== src));
  const moveImage = (from: number, to: number) =>
    setImages((prev) => {
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });

  const makeTransparent = (src: string) => {
    const transparentUrl = getTransparentImageUrl(src);
    setImages((prev) => prev.map((s) => (s === src ? transparentUrl : s)));
  };

  async function onUpload(files: FileList | null) {
    if (!files || !files.length) return;
    setError("");
    setUploading(true);
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("files", f));
    if (autoRemoveBg) {
      fd.append("removeBg", "true");
    }
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) setError(json.error || "Upload failed.");
      else addImages(json.urls as string[]);
    } catch {
      setError("Upload failed. Please try again.");
    }
    setUploading(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const splitList = (v: FormDataEntryValue | null) =>
      String(v || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const payload = {
      name: String(fd.get("name") || ""),
      slug: String(fd.get("slug") || ""),
      segment: String(fd.get("segment") || "B2C"),
      accent: String(fd.get("accent") || "CHILLI"),
      tagline: String(fd.get("tagline") || ""),
      description: String(fd.get("description") || ""),
      image: images[0] || "",
      images,
      sizes: splitList(fd.get("sizes")),
      formats: splitList(fd.get("formats")),
      costPositioning: String(fd.get("costPositioning") || ""),
      marketCategory: String(fd.get("marketCategory") || ""),
      colour: String(fd.get("colour") || ""),
      asta: String(fd.get("asta") || ""),
      scoville: String(fd.get("scoville") || ""),
      usage: String(fd.get("usage") || ""),
      featured: fd.get("featured") === "on",
      published: fd.get("published") === "on",
      order: Number(fd.get("order") || 0),
    };

    try {
      const res = await fetch(
        editing ? `/api/admin/products/${initial.id}` : "/api/admin/products",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Could not save the product.");
        setSaving(false);
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  }

  const accentColor =
    accent === "TURMERIC"
      ? "#D97706"
      : accent === "GINGER"
      ? "#B45309"
      : "#DC2626";

  return (
    <>
      <form className="aform" onSubmit={onSubmit}>
        {error && <div className="alert alert-err">{error}</div>}

        <div className="grid2">
          <div>
            <label htmlFor="name">Product name *</label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="slug">Slug * (lowercase, dashes)</label>
            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="hot-peppe-powder"
              required
            />
          </div>
        </div>

        <div className="grid3">
          <div>
            <label htmlFor="segment">Segment</label>
            <select
              id="segment"
              name="segment"
              value={segment}
              onChange={(e) => setSegment(e.target.value as "B2C" | "B2B")}
            >
              <option value="B2C">B2C (Consumer)</option>
              <option value="B2B">B2B (Bulk)</option>
            </select>
          </div>
          <div>
            <label htmlFor="accent">Spice / colour theme</label>
            <select
              id="accent"
              name="accent"
              value={accent}
              onChange={(e) => setAccent(e.target.value as "CHILLI" | "TURMERIC" | "GINGER")}
            >
              <option value="CHILLI">Chilli (red)</option>
              <option value="TURMERIC">Turmeric (gold)</option>
              <option value="GINGER">Ginger (tan)</option>
            </select>
          </div>
          <div>
            <label htmlFor="order">Display order</label>
            <input id="order" name="order" type="number" defaultValue={initial.order ?? 0} />
          </div>
        </div>

        <div>
          <label htmlFor="tagline">Card tagline</label>
          <input
            id="tagline"
            name="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Chilli · Premium staple"
          />
        </div>

        <div>
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid2">
          <div>
            <label htmlFor="sizes">Pack sizes (comma-separated)</label>
            <input
              id="sizes"
              name="sizes"
              value={sizesInput}
              onChange={(e) => setSizesInput(e.target.value)}
              placeholder="100 g, 50 g"
            />
          </div>
          <div>
            <label htmlFor="formats">B2B formats (comma-separated)</label>
            <input
              id="formats"
              name="formats"
              value={formatsInput}
              onChange={(e) => setFormatsInput(e.target.value)}
              placeholder="Powder, Whole, Crushed"
            />
          </div>
        </div>

        <div>
          <label htmlFor="imageUpload">Product images</label>
          <input
            id="imageUpload"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            disabled={uploading}
            onChange={(e) => {
              onUpload(e.target.files);
              e.target.value = "";
            }}
          />

          {/* Background Removal toggle for 3D pedestal transparency */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
              padding: "6px 10px",
              background: "#F3F4F6",
              borderRadius: "8px",
              fontSize: "0.85rem",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            <input
              type="checkbox"
              checked={autoRemoveBg}
              onChange={(e) => setAutoRemoveBg(e.target.checked)}
            />
            <span>
              ✨ <strong>Auto-Remove Background</strong> (Transparent cutout for 3D pedestal)
            </span>
          </label>

          <div className="help">
            {uploading
              ? "Uploading and processing image…"
              : "Upload one or more images (JPG, PNG, WebP, AVIF · max 5 MB each). The first image is the cover shown on cards; the rest slide in the product carousel."}
          </div>

          {images.length > 0 && (
            <div className="img-manager">
              {images.map((src, i) => (
                <div className="img-item" key={src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Image ${i + 1}`} />
                  {i === 0 && <span className="img-cover">Cover</span>}
                  <div className="img-tools">
                    <button
                      type="button"
                      onClick={() => moveImage(i, i - 1)}
                      disabled={i === 0}
                      aria-label="Move earlier"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(i, i + 1)}
                      disabled={i === images.length - 1}
                      aria-label="Move later"
                    >
                      →
                    </button>
                    {src.includes("cloudinary.com") && !src.includes("e_background_removal") && (
                      <button
                        type="button"
                        onClick={() => makeTransparent(src)}
                        title="Cutout / Make Transparent"
                        style={{ fontSize: "0.75rem", padding: "2px 4px" }}
                      >
                        ✨
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(src)}
                      aria-label="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input
              value={manualPath}
              onChange={(e) => setManualPath(e.target.value)}
              placeholder="…or paste an image path / URL"
            />
            <button
              type="button"
              className="abtn abtn-ghost"
              onClick={() => {
                if (manualPath.trim()) addImages([manualPath.trim()]);
                setManualPath("");
              }}
            >
              Add
            </button>
          </div>

          <div className="help">
            Bundled images:{" "}
            {BUNDLED.map((src) => (
              <button
                type="button"
                key={src}
                onClick={() => addImages([src])}
                style={{
                  color: "var(--chilli)",
                  fontWeight: 600,
                  marginRight: 8,
                  textDecoration: "underline",
                }}
              >
                {src.split("/").pop()}
              </button>
            ))}
          </div>
        </div>

        <fieldset style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 18 }}>
          <legend style={{ padding: "0 8px", color: "var(--muted)", fontSize: ".8rem", fontWeight: 700 }}>
            Pepper classification (optional)
          </legend>
          <div className="grid3">
            <div>
              <label htmlFor="costPositioning">Cost positioning</label>
              <input id="costPositioning" name="costPositioning" defaultValue={initial.costPositioning || ""} placeholder="Medium–High cost" />
            </div>
            <div>
              <label htmlFor="colour">Colour</label>
              <input id="colour" name="colour" defaultValue={initial.colour || ""} placeholder="Red" />
            </div>
            <div>
              <label htmlFor="asta">ASTA</label>
              <input
                id="asta"
                name="asta"
                value={asta}
                onChange={(e) => setAsta(e.target.value)}
                placeholder="40–55"
              />
            </div>
          </div>
          <div className="grid2" style={{ marginTop: 16 }}>
            <div>
              <label htmlFor="scoville">Scoville (SHU)</label>
              <input
                id="scoville"
                name="scoville"
                value={scoville}
                onChange={(e) => setScoville(e.target.value)}
                placeholder="55,000–60,000 SHU"
              />
            </div>
            <div>
              <label htmlFor="marketCategory">Market category</label>
              <input id="marketCategory" name="marketCategory" defaultValue={initial.marketCategory || ""} placeholder="Premium staple" />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label htmlFor="usage">Usage</label>
            <input id="usage" name="usage" defaultValue={initial.usage || ""} placeholder="Adds spice & flavour to all meals" />
          </div>
        </fieldset>

        <div className="grid2">
          <label className="check">
            <input type="checkbox" name="published" defaultChecked={initial.published ?? true} /> Published (visible on site)
          </label>
          <label className="check">
            <input type="checkbox" name="featured" defaultChecked={initial.featured ?? false} /> Featured (used in hero)
          </label>
        </div>

        <div className="actions" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button className="abtn abtn-primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : editing ? "Save changes" : "Create product"}
          </button>
          <button
            type="button"
            className="abtn abtn-ghost"
            onClick={() => setShowPreview(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <span>👁️</span> Preview Card
          </button>
          <a href="/admin/products" className="abtn abtn-ghost">Cancel</a>
        </div>
      </form>

      {/* DRAFT PREVIEW MODAL */}
      {showPreview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setShowPreview(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              maxWidth: "520px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid #E5E7EB",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #E5E7EB",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#F9FAFB",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "1.2rem" }}>👁️</span>
                <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827" }}>
                  Live Product Card Preview
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "999px",
                    background: accentColor,
                    color: "#ffffff",
                  }}
                >
                  {segment}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "#6B7280",
                }}
              >
                ✕
              </button>
            </div>

            {/* Simulated Product Card */}
            <div style={{ padding: "24px" }}>
              <div
                style={{
                  background: "#FAFAFA",
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                  padding: "24px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* 3D Pedestal Mockup / Image Container */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "220px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  {/* Subtle 3D shadow ellipse */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      width: "65%",
                      height: "20px",
                      background: "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 70%)",
                      borderRadius: "50%",
                    }}
                  />
                  {images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={images[0]}
                      alt={name || "Preview"}
                      style={{
                        maxHeight: "190px",
                        maxWidth: "85%",
                        objectFit: "contain",
                        position: "relative",
                        zIndex: 2,
                        filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.12))",
                      }}
                    />
                  ) : (
                    <div style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>No image uploaded yet</div>
                  )}
                </div>

                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: accentColor,
                    marginBottom: "4px",
                  }}
                >
                  {tagline || `${segment} Spice Selection`}
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.3rem", fontWeight: 700, color: "#111827" }}>
                  {name || "Untitled Product"}
                </h3>
                <p style={{ margin: "0 0 16px", fontSize: "0.85rem", color: "#4B5563", lineHeight: 1.5 }}>
                  {description || "Add a description to preview it here."}
                </p>

                {/* Badges / Specs */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
                  {scoville && (
                    <span style={{ fontSize: "0.72rem", padding: "3px 8px", background: "#FEE2E2", color: "#991B1B", borderRadius: "6px", fontWeight: 600 }}>
                      🔥 {scoville}
                    </span>
                  )}
                  {asta && (
                    <span style={{ fontSize: "0.72rem", padding: "3px 8px", background: "#FEF3C7", color: "#92400E", borderRadius: "6px", fontWeight: 600 }}>
                      ASTA {asta}
                    </span>
                  )}
                  {sizesInput && (
                    <span style={{ fontSize: "0.72rem", padding: "3px 8px", background: "#E0E7FF", color: "#3730A3", borderRadius: "6px", fontWeight: 600 }}>
                      📦 {sizesInput}
                    </span>
                  )}
                  {formatsInput && (
                    <span style={{ fontSize: "0.72rem", padding: "3px 8px", background: "#ECFDF5", color: "#065F46", borderRadius: "6px", fontWeight: 600 }}>
                      ⚙️ {formatsInput}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="abtn abtn-primary"
                  onClick={() => setShowPreview(false)}
                >
                  Back to Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
