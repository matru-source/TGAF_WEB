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
