import "server-only";
import { prisma } from "./prisma";
import {
  FALLBACK_PRODUCTS,
  DEFAULT_STATS,
  TEAM,
  type UIProduct,
  type UITeamMember,
  type AccentKey,
} from "./data";

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

const mapProduct = (p: {
  id: string; slug: string; name: string; segment: "B2C" | "B2B"; accent: string;
  tagline: string | null; description: string; image: string | null; images: string[]; sizes: string[]; formats: string[];
  costPositioning: string | null; marketCategory: string | null; colour: string | null;
  asta: string | null; scoville: string | null; usage: string | null; featured: boolean;
}): UIProduct => ({
  id: p.id, slug: p.slug, name: p.name, segment: p.segment, accent: accentToKey(p.accent),
  tagline: p.tagline, description: p.description, image: p.image, images: p.images, sizes: p.sizes, formats: p.formats,
  costPositioning: p.costPositioning, marketCategory: p.marketCategory, colour: p.colour,
  asta: p.asta, scoville: p.scoville, usage: p.usage, featured: p.featured,
});

/** Published products from the DB; falls back to static data if empty/unavailable. */
export async function getProducts(): Promise<UIProduct[]> {
  if (DB_DISABLED) return FALLBACK_PRODUCTS;
  const rows = await withTimeout(
    prisma.product.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    2500,
  );
  if (!rows || !rows.length) return FALLBACK_PRODUCTS;
  return rows.map(mapProduct);
}

const SLUG_ALIASES: Record<string, string> = {
  "hot-pepe-powder": "hot-peppe-powder",
  "hot-pepe": "hot-peppe-powder",
  "atarodo-powder": "atarodo-peppe-powder",
  "atarodo": "atarodo-peppe-powder",
  "cameroon-powder": "cameroon-peppe-powder",
  "cameroon": "cameroon-peppe-powder",
};

/** One product by slug; falls back to static data. Returns null if not found. */
export async function getProductBySlug(rawSlug: string): Promise<UIProduct | null> {
  const slug = SLUG_ALIASES[rawSlug] || rawSlug;
  if (!DB_DISABLED) {
    const p = await withTimeout(prisma.product.findUnique({ where: { slug } }), 2500);
    if (p) return mapProduct(p);
  }
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

/** Published leadership team members; falls back to static data if empty/unavailable. */
export async function getTeam(): Promise<UITeamMember[]> {
  if (DB_DISABLED) return TEAM;
  const rows = await withTimeout(
    prisma.teamMember.findMany({ where: { published: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    2500,
  );
  if (!rows || !rows.length) return TEAM;
  return rows.map((m) => {
    const fallback = TEAM.find((t) => t.id === m.id || t.name.toLowerCase() === m.name.toLowerCase());
    return {
      id: m.id,
      name: m.name,
      role: m.role,
      bio: m.bio,
      bullets: fallback?.bullets,
      initials: m.initials,
      photo: fallback?.photo || m.photo,
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
