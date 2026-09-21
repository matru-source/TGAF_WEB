import { z } from "zod";

const optStr = z.string().trim().optional().nullable();

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes only"),
  segment: z.enum(["B2C", "B2B"]),
  accent: z.enum(["CHILLI", "TURMERIC", "GINGER"]),
  tagline: optStr,
  description: z.string().min(1, "Description is required"),
  image: optStr,
  images: z.array(z.string().trim().min(1)).default([]),
  sizes: z.array(z.string().trim().min(1)).default([]),
  formats: z.array(z.string().trim().min(1)).default([]),
  costPositioning: optStr,
  marketCategory: optStr,
  colour: optStr,
  asta: optStr,
  scoville: optStr,
  usage: optStr,
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.coerce.number().int().default(0),
  categoryId: optStr,
});

export type ProductInput = z.infer<typeof productSchema>;

export const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(1, "Bio is required"),
  photo: optStr,
  initials: optStr,
  order: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;

/** Normalise a team member for DB writes, deriving initials from the name if blank. */
export function cleanTeamMember(input: TeamMemberInput) {
  const n = (v?: string | null) => (v && v.trim() !== "" ? v.trim() : null);
  const name = input.name.trim();
  const derived = name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return {
    name,
    role: input.role.trim(),
    bio: input.bio.trim(),
    photo: n(input.photo),
    initials: n(input.initials)?.toUpperCase() ?? derived,
    order: input.order,
    published: input.published,
  };
}

/** Normalise optional empty strings to null for DB writes. */
export function cleanProduct(input: ProductInput) {
  const n = (v?: string | null) => (v && v.trim() !== "" ? v.trim() : null);
  return {
    name: input.name.trim(),
    slug: input.slug.trim(),
    segment: input.segment,
    accent: input.accent,
    tagline: n(input.tagline),
    description: input.description.trim(),
    image: n(input.image),
    images: input.images.filter(Boolean),
    sizes: input.sizes.filter(Boolean),
    formats: input.formats.filter(Boolean),
    costPositioning: n(input.costPositioning),
    marketCategory: n(input.marketCategory),
    colour: n(input.colour),
    asta: n(input.asta),
    scoville: n(input.scoville),
    usage: n(input.usage),
    featured: input.featured,
    published: input.published,
    order: input.order,
    categoryId: n(input.categoryId),
  };
}
