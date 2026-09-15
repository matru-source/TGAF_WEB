"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  "/Product/hot-peppe-studio.jpg",
  "/Product/hot-peppe-supa-pack.jpg",
  "/Product/hot-peppe-carton.jpg",
  "/Product/atarodo-studio.jpg",
  "/Product/atarodo-carton.jpg",
  "/Product/cameroon-studio.jpg",
  "/Product/cameroon-carton.jpg",
  "/Product/turmeric.png",
  "/Product/ginger.png",
  "/Product/hot-pepe-1.jpeg",
  "/Product/Atarodo-1.jpeg",
  "/Product/Cameroon-1.jpeg",
];

export default function ProductForm({ initial = {} }: { initial?: ProductInitial }) {
  const router = useRouter();
  const editing = Boolean(initial.id);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [manualPath, setManualPath] = useState("");

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

  async function onUpload(files: FileList | null) {
    if (!files || !files.length) return;
    setError("");
    setUploading(true);
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("files", f));
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

  return (
    <form className="aform" onSubmit={onSubmit}>
      {error && <div className="alert alert-err">{error}</div>}

      <div className="grid2">
        <div>
          <label htmlFor="name">Product name *</label>
          <input id="name" name="name" defaultValue={initial.name} required />
        </div>
        <div>
          <label htmlFor="slug">Slug * (lowercase, dashes)</label>
          <input id="slug" name="slug" defaultValue={initial.slug} placeholder="hot-peppe-powder" required />
        </div>
      </div>

      <div className="grid3">
        <div>
          <label htmlFor="segment">Segment</label>
          <select id="segment" name="segment" defaultValue={initial.segment || "B2C"}>
            <option value="B2C">B2C (Consumer)</option>
            <option value="B2B">B2B (Bulk)</option>
          </select>
        </div>
        <div>
          <label htmlFor="accent">Spice / colour theme</label>
          <select id="accent" name="accent" defaultValue={initial.accent || "CHILLI"}>
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
        <input id="tagline" name="tagline" defaultValue={initial.tagline || ""} placeholder="Chilli · Premium staple" />
      </div>

      <div>
        <label htmlFor="description">Description *</label>
        <textarea id="description" name="description" defaultValue={initial.description} required />
      </div>

      <div className="grid2">
        <div>
          <label htmlFor="sizes">Pack sizes (comma-separated)</label>
          <input id="sizes" name="sizes" defaultValue={(initial.sizes || []).join(", ")} placeholder="100 g, 50 g" />
        </div>
        <div>
          <label htmlFor="formats">B2B formats (comma-separated)</label>
          <input id="formats" name="formats" defaultValue={(initial.formats || []).join(", ")} placeholder="Powder, Whole, Crushed" />
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
        <div className="help">
          {uploading ? "Uploading…" : "Upload one or more images (JPG, PNG, WebP, AVIF · max 5 MB each). The first image is the cover shown on cards; the rest slide in the product carousel."}
        </div>

        {images.length > 0 && (
          <div className="img-manager">
            {images.map((src, i) => (
              <div className="img-item" key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Image ${i + 1}`} />
                {i === 0 && <span className="img-cover">Cover</span>}
                <div className="img-tools">
                  <button type="button" onClick={() => moveImage(i, i - 1)} disabled={i === 0} aria-label="Move earlier">←</button>
                  <button type="button" onClick={() => moveImage(i, i + 1)} disabled={i === images.length - 1} aria-label="Move later">→</button>
                  <button type="button" onClick={() => removeImage(src)} aria-label="Remove image">✕</button>
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
              style={{ color: "var(--chilli)", fontWeight: 600, marginRight: 8, textDecoration: "underline" }}
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
            <input id="asta" name="asta" defaultValue={initial.asta || ""} placeholder="40–55" />
          </div>
        </div>
        <div className="grid2" style={{ marginTop: 16 }}>
          <div>
            <label htmlFor="scoville">Scoville (SHU)</label>
            <input id="scoville" name="scoville" defaultValue={initial.scoville || ""} placeholder="55,000–60,000 SHU" />
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

      <div className="actions">
        <button className="abtn abtn-primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : editing ? "Save changes" : "Create product"}
        </button>
        <a href="/admin/products" className="abtn abtn-ghost">Cancel</a>
      </div>
    </form>
  );
}
