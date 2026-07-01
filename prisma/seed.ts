import { PrismaClient, type Accent, type Segment } from "@prisma/client";
import bcrypt from "bcryptjs";
import { FALLBACK_PRODUCTS } from "../lib/data";

const prisma = new PrismaClient();

const accentEnum = (a: string): Accent =>
  a === "turmeric" ? "TURMERIC" : a === "ginger" ? "GINGER" : "CHILLI";

async function main() {
  // ---- Admin user ----
  const email = process.env.ADMIN_EMAIL ?? "admin@goodearthfoods.com";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe!2026";
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN" },
    create: { email, name: "Administrator", passwordHash, role: "ADMIN" },
  });
  console.log(`✓ Admin user ready: ${email}`);

  // ---- Categories ----
  const categories = [
    { name: "Chilli", slug: "chilli", order: 0, description: "Pepper / chilli range." },
    { name: "Turmeric", slug: "turmeric", order: 1, description: "Golden turmeric." },
    { name: "Ginger", slug: "ginger", order: 2, description: "Warm, aromatic ginger." },
  ];
  const catMap = new Map<string, string>();
  for (const c of categories) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, order: c.order, description: c.description },
      create: c,
    });
    catMap.set(c.slug, row.id);
  }
  console.log(`✓ ${categories.length} categories ready`);

  // ---- Products ----
  let order = 0;
  for (const p of FALLBACK_PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        segment: p.segment as Segment,
        accent: accentEnum(p.accent),
        categoryId: catMap.get(p.accent) ?? null,
        tagline: p.tagline ?? null,
        description: p.description,
        image: p.image ?? null,
        sizes: p.sizes,
        formats: p.formats,
        costPositioning: p.costPositioning ?? null,
        marketCategory: p.marketCategory ?? null,
        colour: p.colour ?? null,
        asta: p.asta ?? null,
        scoville: p.scoville ?? null,
        usage: p.usage ?? null,
        featured: p.featured ?? false,
        published: true,
        order: order++,
      },
    });
  }
  console.log(`✓ ${FALLBACK_PRODUCTS.length} products ready`);

  // ---- Default settings (traction stats) ----
  const stats: Record<string, string> = {
    "stat:distributors": "250",
    "stat:wholesalers": "2600",
    "stat:retailers": "8700",
    "stat:states": "15",
    "stat:regions": "5",
    "stat:markets": "170",
  };
  for (const [key, value] of Object.entries(stats)) {
    await prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  console.log(`✓ settings ready`);
}

main()
  .then(() => console.log("Seed complete."))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
