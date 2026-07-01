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

const IMAGES = [
  "/img/product-hot-peppe.png",
  "/img/product-atarodo.png",
  "/img/product-cameroon-peppe.png",
  "/img/product-turmeric.png",
  "/img/product-ginger.png",
];

export default function ProductForm({ initial = {} }: { initial?: ProductInitial }) {
  const router = useRouter();
  const editing = Boolean(initial.id);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState(initial.image || "");

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
      image: String(fd.get("image") || ""),
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
        <label htmlFor="image">Image path or URL</label>
        <input id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/img/product-hot-peppe.png" />
        <div className="help">
          Bundled images:{" "}
          {IMAGES.map((src) => (
            <button
              type="button"
              key={src}
              onClick={() => setImage(src)}
              style={{ color: "var(--chilli)", fontWeight: 600, marginRight: 8, textDecoration: "underline" }}
            >
              {src.split("/").pop()}
            </button>
          ))}
        </div>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="preview" style={{ height: 90, marginTop: 10, objectFit: "contain", background: "var(--cream-2)", borderRadius: 10, padding: 6 }} />
        ) : null}
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
