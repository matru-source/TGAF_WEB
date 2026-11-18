import "server-only";
import { cache } from "react";
import { prisma } from "./prisma";
import {
  FALLBACK_PRODUCTS,
  DEFAULT_STATS,
  TEAM,
  GALLERY_ITEMS,
  B2B_CUSTOMERS,
  type UIProduct,
  type UITeamMember,
  type AccentKey,
  type GalleryItem,
} from "./data";
import { DISTRIBUTOR_CELEBRATION_POSTS, type CelebrationPost } from "./celebrationsData";

const accentToKey = (a: string): AccentKey =>
  a === "TURMERIC" ? "turmeric" : a === "GINGER" ? "ginger" : "chilli";

// Skip the database entirely when it's unconfigured or still the placeholder,
// so DB-backed pages never hang on an unreachable host.
const DB_URL = process.env.DATABASE_URL || "";
const DB_DISABLED = !DB_URL || /ep-example|user:password|change-me/i.test(DB_URL);

// Never let a slow/unreachable DB block rendering - fall back after `ms`.
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    p.catch(() => null),
    new Promise<null>((res) => setTimeout(() => res(null), ms)),
  ]);
}

const sanitizeImageSrc = (src?: string | null): string => {
  if (!src) return "";
  // Do not alter remote Cloudinary or external HTTPS URLs
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  // Always use transparent .png instead of .jpg for local bundled assets
  return src.replace(/\.jpe?g$/i, ".png");
};

const mapProduct = (p: {
  id: string; slug: string; name: string; segment: "B2C" | "B2B"; accent: string;
  tagline: string | null; description: string; image: string | null; images: string[]; sizes: string[]; formats: string[];
  costPositioning: string | null; marketCategory: string | null; colour: string | null;
  asta: string | null; scoville: string | null; usage: string | null; featured: boolean;
}): UIProduct => {
  const fb = FALLBACK_PRODUCTS.find((f) => f.slug === p.slug);
  const cleanImage = p.image || (fb?.image ? sanitizeImageSrc(fb.image) : null);
  const rawImages = (p.images && p.images.length > 0) ? p.images : (fb?.images ?? []);
  const cleanImages = rawImages
    .map(sanitizeImageSrc)
    .filter((img) => Boolean(img) && !img.includes("-studio.jpg"));

  return {
    id: p.id, slug: p.slug, name: p.name, segment: p.segment, accent: accentToKey(p.accent),
    tagline: p.tagline || fb?.tagline,
    description: p.description || fb?.description || "",
    image: cleanImage,
    images: cleanImages.length > 0 ? cleanImages : (cleanImage ? [cleanImage] : []),
    sizes: p.sizes && p.sizes.length > 0 ? p.sizes : (fb?.sizes ?? []),
    formats: p.formats && p.formats.length > 0 ? p.formats : (fb?.formats ?? []),
    costPositioning: p.costPositioning || fb?.costPositioning,
    marketCategory: p.marketCategory || fb?.marketCategory,
    colour: p.colour || fb?.colour,
    asta: p.asta || fb?.asta,
    scoville: p.scoville || fb?.scoville,
    usage: p.usage || fb?.usage,
    packaging: fb?.packaging,
    technicalSpecs: fb?.technicalSpecs,
    shelfLife: fb?.shelfLife,
    nutritionalTraits: fb?.nutritionalTraits,
    strengths: fb?.strengths,
    featured: p.featured,
  };
};

/** Published products from the DB; merges new fallback products and maintains canonical order. */
export const getProducts = cache(async function getProducts(): Promise<UIProduct[]> {
  if (DB_DISABLED) return FALLBACK_PRODUCTS;
  const rows = await withTimeout(
    prisma.product.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    2500,
  );
  if (!rows || !rows.length) return FALLBACK_PRODUCTS;

  const dbProducts = rows.map(mapProduct);
  const allMap = new Map<string, UIProduct>();

  for (const p of dbProducts) {
    const fb = FALLBACK_PRODUCTS.find((f) => f.slug === p.slug);
    if (fb) {
      allMap.set(p.slug, {
        ...fb,
        ...p,
        description: p.description || fb.description,
        sizes: p.sizes && p.sizes.length > 0 ? p.sizes : fb.sizes,
        formats: p.formats && p.formats.length > 0 ? p.formats : fb.formats,
        colour: p.colour || fb.colour,
        asta: p.asta || fb.asta,
        scoville: p.scoville || fb.scoville,
        usage: p.usage || fb.usage,
        marketCategory: p.marketCategory || fb.marketCategory,
        technicalSpecs: fb.technicalSpecs,
        shelfLife: fb.shelfLife,
        nutritionalTraits: fb.nutritionalTraits,
        strengths: fb.strengths,
        image: p.image || fb.image,
        images: (p.images && p.images.length > 0) ? p.images : fb.images,
      });
    } else {
      allMap.set(p.slug, p);
    }
  }

  // Include any new products in FALLBACK_PRODUCTS (e.g. Ose Di Oku) that are not yet in the DB
  for (const p of FALLBACK_PRODUCTS) {
    if (!allMap.has(p.slug)) {
      allMap.set(p.slug, p);
    }
  }

  // Order products according to the canonical sequence defined in FALLBACK_PRODUCTS
  const ordered: UIProduct[] = [];
  for (const fp of FALLBACK_PRODUCTS) {
    const item = allMap.get(fp.slug);
    if (item) {
      ordered.push(item);
      allMap.delete(fp.slug);
    }
  }
  for (const remaining of allMap.values()) {
    ordered.push(remaining);
  }
  return ordered;
});

const SLUG_ALIASES: Record<string, string> = {
  "hot-pepe-powder": "hot-peppe-powder",
  "hot-pepe": "hot-peppe-powder",
  "atarodo-powder": "atarodo-peppe-powder",
  "atarodo": "atarodo-peppe-powder",
  "cameroon-powder": "cameroon-peppe-powder",
  "cameroon": "cameroon-peppe-powder",
  "ginger": "ginger-powder",
  "turmeric": "turmeric-powder",
  "ose": "ose-di-oku",
  "ose-di-oku-hot-peppe": "ose-di-oku",
};

/** One product by slug; falls back to static data. Returns null if not found. */
export const getProductBySlug = cache(async function getProductBySlug(rawSlug: string): Promise<UIProduct | null> {
  const slug = SLUG_ALIASES[rawSlug] || rawSlug;
  if (!DB_DISABLED) {
    const p = await withTimeout(prisma.product.findUnique({ where: { slug } }), 2500);
    if (p) return mapProduct(p);
  }
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
});

/** Published leadership team members; falls back to static data if empty/unavailable. */
export async function getTeam(): Promise<UITeamMember[]> {
  if (DB_DISABLED) return TEAM;
  const rows = await withTimeout(
    prisma.teamMember.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    2500,
  );
  if (!rows || !rows.length) return TEAM;
  return rows.map((m) => {
    const fallback = TEAM.find(
      (t) =>
        t.id === m.id ||
        t.name.toLowerCase() === m.name.toLowerCase() ||
        (m.initials && m.initials.toUpperCase() === t.initials?.toUpperCase()) ||
        m.name.toLowerCase().includes(t.name.toLowerCase().split(" ")[0])
    );
    return {
      id: m.id,
      name: m.name,
      role: m.role,
      bio: m.bio,
      bullets: fallback?.bullets,
      initials: m.initials,
      photo: m.photo || fallback?.photo,
    };
  });
}

export type StatItem = { key: string; value: number; suffix?: string; label: string };

/** Traction stats, with optional overrides stored in Settings (stat:<key> = number). */
export async function getStats(): Promise<StatItem[]> {
  if (DB_DISABLED) return DEFAULT_STATS;
  const settings = await withTimeout(
    prisma.setting.findMany({ where: { key: { startsWith: "stat:" } } }),
    2500,
  );
  if (!settings) return DEFAULT_STATS;
  const overrides = new Map(settings.map((s) => [s.key.replace("stat:", ""), Number(s.value)]));
  return DEFAULT_STATS.map((s) => ({
    ...s,
    value: overrides.has(s.key) && !Number.isNaN(overrides.get(s.key)!) ? overrides.get(s.key)! : s.value,
  }));
}

/** Published gallery photos from DB; falls back to static items if DB is unconfigured/empty. */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (DB_DISABLED) return GALLERY_ITEMS;
  const rows = await withTimeout(
    prisma.galleryItem.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { createdAt: "desc" }] }),
    2500,
  );
  if (!rows || !rows.length) return GALLERY_ITEMS;
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: (r.category as GalleryItem["category"]) || "packaging",
    categoryLabel: r.category.charAt(0).toUpperCase() + r.category.slice(1),
    image: r.image,
    caption: r.caption || "",
    location: r.location || "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: r.tag || undefined,
  }));
}

/** Published distributor celebration posts from DB; falls back to static posts. */
export async function getCelebrationPosts(): Promise<CelebrationPost[]> {
  if (DB_DISABLED) return DISTRIBUTOR_CELEBRATION_POSTS;
  const rows = await withTimeout(
    prisma.celebrationPost.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { createdAt: "desc" }] }),
    2500,
  );
  if (!rows || !rows.length) return DISTRIBUTOR_CELEBRATION_POSTS;

  return rows.map((r, idx) => {
    const rawParagraphs = r.bodyText ? r.bodyText.split("\n\n").map((p) => p.trim()).filter(Boolean) : [];
    const highlights = r.badges.map((b) => {
      const parts = b.split(" ");
      const icon = parts[0] || "✨";
      const text = parts.slice(1).join(" ") || b;
      return { icon, text };
    });

    const slides = r.images.map((img, sIdx) => ({
      id: `${r.id}-slide-${sIdx}`,
      src: img,
      alt: `${r.celebrantName} - ${r.company}`,
      title: `${r.celebrantName} - Slide ${sIdx + 1}`,
      badge: `${r.date} · Celebration`,
    }));

    return {
      id: r.slug,
      postNumber: `POST #${String(idx + 1).padStart(2, "0")}`,
      category: (r.category.toLowerCase() as CelebrationPost["category"]) || "birthday",
      categoryLabel: r.category === "BIRTHDAY" ? "Birthday Celebration Spotlight" : "Trade Honor Spotlight",
      date: r.date,
      badge: `🎉 ${r.date} Celebration`,
      personName: r.celebrantName,
      role: r.role,
      company: r.company,
      region: "Distribution Network",
      quote: r.quote || "",
      quoteAuthor: `Official Wishes from TG Agri Farms Ltd & Good Earth`,
      paragraphs: rawParagraphs.length > 0 ? rawParagraphs : [r.quote || ""],
      highlights: highlights.length > 0 ? highlights : [{ icon: "✨", text: r.company }],
      slides: slides.length > 0 ? slides : [
        {
          id: `${r.id}-placeholder`,
          src: "/img/celebrations/madam-ifueko-ozigbo-birthday-portrait.jpg",
          alt: r.celebrantName,
          title: r.celebrantName,
        },
      ],
      isFeatured: idx === 0,
    };
  });
}

/** Published B2B partner customer logos from DB; falls back to static logos. */
export async function getB2BPartners(): Promise<{ name: string; logo: string }[]> {
  if (DB_DISABLED) return B2B_CUSTOMERS;
  const rows = await withTimeout(
    prisma.b2BPartner.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { createdAt: "desc" }] }),
    2500,
  );
  if (!rows || !rows.length) return B2B_CUSTOMERS;
  return rows.map((r) => ({
    name: r.name,
    logo: r.logo,
  }));
}
