// Shared types + static editorial content + product fallback data.
// DB-backed sections (products) fall back to these when the database is
// empty or unavailable, so the site always renders.

export type AccentKey = "chilli" | "turmeric" | "ginger";

export type UIProduct = {
  id: string;
  slug: string;
  name: string;
  segment: "B2C" | "B2B";
  accent: AccentKey;
  tagline?: string | null;
  description: string;
  image?: string | null;
  sizes: string[];
  formats: string[];
  costPositioning?: string | null;
  marketCategory?: string | null;
  colour?: string | null;
  asta?: string | null;
  scoville?: string | null;
  usage?: string | null;
  featured?: boolean;
};

export const accentClass = (a: AccentKey) => ({
  well: `well--${a}`,
  card: a === "turmeric" ? "t-turmeric" : a === "ginger" ? "t-ginger" : "",
});

// ---- Hero + brand ----
export const BRAND = {
  name: "goodearth",
  legal: "TG Agri Farms Ltd",
  tagline: "Peppe wey pass peppe.",
  email: "tgagrifarmsltd1@gmail.com",
  website: "https://goodearthagriventures.com",
  websiteLabel: "goodearthagriventures.com",
  address: "KM 5, Itokin Road, Itamope, Ikorodu Expressway, Lagos, Nigeria",
};

// ---- Traction stats (editable via Settings) ----
export const DEFAULT_STATS: { key: string; value: number; suffix?: string; label: string }[] = [
  { key: "distributors", value: 250, label: "Distributors" },
  { key: "wholesalers", value: 2600, suffix: "+", label: "Wholesalers" },
  { key: "retailers", value: 8700, suffix: "+", label: "Retailers" },
  { key: "states", value: 15, suffix: "+", label: "States" },
  { key: "regions", value: 5, label: "Regions" },
  { key: "markets", value: 170, suffix: "+", label: "Markets" },
];

// ---- Spice trio ----
export const SPICES: { key: AccentKey; tag: string; name: string; hex: string; body: string }[] = [
  {
    key: "chilli", tag: "Chilli · Peppe", name: "Chilli", hex: "#B5121B",
    body: "From mild Atarodo to fiery Cameroon Peppe - sun-dried, steam-sterilised and milled to keep its vivid red and bold heat.",
  },
  {
    key: "turmeric", tag: "Turmeric", name: "Turmeric", hex: "#E0A52E",
    body: "Golden, earthy and rich in colour. Carefully ground to retain its warm aroma and signature saffron-gold hue.",
  },
  {
    key: "ginger", tag: "Ginger", name: "Ginger", hex: "#C57A40",
    body: "Warm, pungent and aromatic. Sliced, kibbled or powdered for both home kitchens and industrial buyers.",
  },
];

// ---- B2C product fallback ----
export const FALLBACK_PRODUCTS: UIProduct[] = [
  {
    id: "turmeric", slug: "turmeric-powder", name: "Turmeric Powder", segment: "B2C",
    accent: "turmeric", tagline: "Turmeric", image: "/img/product-turmeric.png",
    description: "Pure, golden turmeric - rich in colour and warmth for everyday Nigerian cooking.",
    sizes: ["100 g"], formats: [],
  },
  {
    id: "ginger", slug: "ginger-powder", name: "Ginger Powder", segment: "B2C",
    accent: "ginger", tagline: "Ginger", image: "/img/product-ginger.png",
    description: "Aromatic, finely milled ginger that brings warmth and depth to soups and stews.",
    sizes: ["100 g"], formats: [],
  },
  {
    id: "hot-peppe", slug: "hot-peppe-powder", name: "Hot Peppe Powder", segment: "B2C",
    accent: "chilli", tagline: "Chilli · Premium staple", image: "/img/product-hot-peppe.png",
    description: "Bright red, premium pepper powder to add spice and flavour to every meal.",
    sizes: ["100 g", "5 g"], formats: [], featured: true,
    costPositioning: "Medium–High cost", marketCategory: "Premium staple",
    colour: "Red", asta: "40–55", scoville: "55,000–60,000 SHU",
    usage: "Adds spice & flavour to all meals",
  },
  {
    id: "atarodo", slug: "atarodo-peppe-powder", name: "Atarodo Peppe Powder", segment: "B2C",
    accent: "chilli", tagline: "Chilli · Scotch bonnet", image: "/img/product-atarodo.png",
    description: "Dark-red scotch-bonnet style pepper - a mass-market staple for everyday heat.",
    sizes: ["8 g", "3 g"], formats: [],
    costPositioning: "Low–Medium cost", marketCategory: "Scotch-bonnet · mass-market staple",
    colour: "Dark red", asta: "50–60", scoville: "~60,000 SHU",
    usage: "Adds spice to all meals",
  },
  {
    id: "cameroon", slug: "cameroon-peppe-powder", name: "Cameroon Peppe Powder", segment: "B2C",
    accent: "chilli", tagline: "Chilli · Gourmet", image: "/img/product-cameroon-peppe.png",
    description: "Deep red, smoky and pungent - a gourmet, authentic powder for soups & noodles.",
    sizes: ["100 g", "50 g", "3 g"], formats: [],
    costPositioning: "High cost", marketCategory: "Gourmet / authentic · premium niche",
    colour: "Deep red & brown", asta: "-", scoville: "~90,000 SHU",
    usage: "For soups & noodles",
  },
];

// ---- B2B portfolio (static; formats per crop) ----
export const B2B_PORTFOLIO: { key: string; letter: string; accent: AccentKey; name: string; desc: string; forms: string[] }[] = [
  { key: "chilli", letter: "C", accent: "chilli", name: "Chilli", desc: "High-VO chilli with the pungency and colour our customers specify.", forms: ["Powder", "Sliced / Kibbled", "Crushed"] },
  { key: "turmeric", letter: "T", accent: "turmeric", name: "Turmeric", desc: "Bright, colour-rich turmeric ground to retain natural aroma.", forms: ["Powder", "Sliced / Cut", "Whole"] },
  { key: "ginger", letter: "G", accent: "ginger", name: "Ginger", desc: "Aromatic ginger supplied in flexible industrial formats.", forms: ["Powder", "Whole", "Crushed"] },
];

// ---- Process steps ----
export const PROCESS_STEPS = [
  { title: "Cultivate & source", body: "We source chilli, turmeric and ginger varieties with the pungency and colour our customers require - supporting smallholder farmers to grow profitably." },
  { title: "Harvest & sun-dry", body: "Matured fruits are plucked and sun-dried to reduce moisture by ~85%, then registered, bagged and moved to our Kaduna warehouse." },
  { title: "Process & sterilise", body: "At our Ikorodu mill, materials pass rigorous stages to remove foreign matter, then are ground, steam-sterilised and packed to spec." },
  { title: "Crush, pack & sell", body: "We crush, kibble, slice, powder and package, then sell to both businesses and consumers across Nigerian markets." },
];

export const FACILITY_KPIS = [
  { n: "$10M", l: "Invested in automation" },
  { n: "20 MT", l: "Finished product / day" },
  { n: "2,000 MT", l: "Warehousing capacity" },
  { n: "85%", l: "Moisture reduced via sun-dry" },
];
export const FACILITY_CAPS = ["Cleaning", "Grinding", "Blending", "Sieving", "Steam sterilisation", "Material handling", "Bulk storage"];

// ---- Impact ----
export const IMPACT_CARDS = [
  { n: "10,000", suffix: "+", count: 10000, title: "Agricultural & processing jobs", body: "Across farming, processing and distribution networks." },
  { n: "700,000", suffix: "", count: 700000, title: "Man-days of agri employment", body: "Seasonal and year-round work for rural communities." },
  { n: "95%", suffix: "", count: 0, title: "Nigerian staff", body: "Of total staff - youth and women included across functions." },
  { n: "Women-led", suffix: "", count: 0, title: "B2C micro-distribution", body: "Empowering women through micro-distributor sales, with reduced spoilage and stable food prices." },
];
export const IMPACT_TAGS = ["350+ farmers trained", "12 farmers' markets", "7 aggregators", "300 processing & logistics jobs", "Fair-pricing agreements", "Reduced post-harvest losses", "Export diversification"];

// ---- Presence ----
export const STATES = ["Ogun", "Ondo", "Ekiti", "Anambra", "Lagos", "Osun", "Imo", "Rivers", "Abia", "Edo", "Enugu", "Akwa Ibom", "Delta", "Oyo", "Kwara"];

// ---- SWOT ----
export const SWOT = {
  s: ["Wide usage of our products", "Quality and hygienic product", "No major competitors with continuous supply in our category"],
  w: ["Inadequate transport & power affects production and distribution", "High loan interest rates", "Continuous sourcing of quality raw material", "Heavy reliance on middlemen"],
  o: ["Export potential to international markets", "Wide possibility of brand extensions"],
  t: ["Adverse weather & climate change affect productivity", "Impact on raw-material quality and prices"],
};

// ---- Team ----
export const TEAM = [
  { initials: "DC", name: "Deepak Murli Chainani", role: "Managing Director", bio: "Board member since 2017. 15+ years across international markets and ~10 years in Nigerian markets." },
  { initials: "SS", name: "Swatanter Saraswat", role: "Executive Director", bio: "COO since June 2023, board member since Nov 2024. 15+ years in FMCG, largely with African companies." },
  { initials: "NS", name: "Narendranath Swain", role: "Finance Controller", bio: "Chartered Accountant with 10+ years in Indian finance & audit, plus 7 years as finance controller in Nigeria." },
  { initials: "FN", name: "Fredrick Chidi Nze", role: "Sales Capability & Market Development", bio: "Joined 2023. 15+ years of FMCG experience, largely with African companies." },
];

// ---- Certifications ----
// `logo` points to a file in /public/img/certs/. If the file is missing the
// card falls back to a styled text badge (see components/site/CertLogo.tsx).
export const CERTS: { abbr: string; full: string; logo?: string }[] = [
  { abbr: "SON", full: "Standards Organisation of Nigeria", logo: "/img/certs/son.png" },
  { abbr: "NAFDAC", full: "Nat. Agency for Food & Drug Admin. & Control", logo: "/img/certs/nafdac.png" },
  { abbr: "Halal", full: "Halal Certification Authority", logo: "/img/certs/halal.png" },
  { abbr: "US FDA", full: "Food & Drug Administration", logo: "/img/certs/fda.png" },
  { abbr: "MAN", full: "Manufacturers Association of Nigeria", logo: "/img/certs/man.png" },
  { abbr: "NEPC", full: "Nigerian Export Promotion Council", logo: "/img/certs/nepc.png" },
  { abbr: "FSSC 22000", full: "Food Safety System Certification", logo: "/img/certs/fssc-22000.png" },
];

// ---- Value props (why Naija families trust us) ----
export const VALUE_PROPS: { icon: string; title: string; body: string }[] = [
  { icon: "sprout", title: "100% Naija sourced", body: "Grown by 350+ local farmers across the country - no imports, pure home-grown goodness." },
  { icon: "shield", title: "Pure & hygienic", body: "Steam-sterilised and milled to lock in natural colour and aroma. Clean peppe, every time." },
  { icon: "wallet", title: "For every pocket", body: "From ₦-friendly 3 g sachets to bulk bags - Goodearth dey for everybody." },
  { icon: "users", title: "Trusted everywhere", body: "In 170+ markets, 8,700+ retailers and kitchens across 15+ states." },
];

// ---- Local-market testimonials (local voices) ----
export const TESTIMONIALS: { quote: string; name: string; role: string; place: string; accent: AccentKey }[] = [
  { quote: "Goodearth peppe na correct one. My customers dey always come back for the colour and the sweet aroma.", name: "Mama Ngozi", role: "Pepper seller", place: "Mile 12 Market, Lagos", accent: "chilli" },
  { quote: "I use the turmeric for my rice and stew. E clean, e pure, and small quantity dey do plenty work.", name: "Aisha Bello", role: "Home cook", place: "Kano", accent: "turmeric" },
  { quote: "Consistent supply and fair price. Goodearth dey reliable - that's why I stock dem every week.", name: "Emeka Obi", role: "Distributor", place: "Aba, Abia", accent: "ginger" },
  { quote: "The Cameroon Peppe sweet pass! My soup no fit taste the same again without am.", name: "Blessing Eze", role: "Caterer", place: "Onitsha, Anambra", accent: "chilli" },
];

// ---- Where to buy / markets (local market feel) ----
export const MARKETS: { name: string; place: string }[] = [
  { name: "Mile 12 Market", place: "Lagos" },
  { name: "Oyingbo Market", place: "Lagos" },
  { name: "Onitsha Main Market", place: "Anambra" },
  { name: "Ariaria International Market", place: "Aba, Abia" },
  { name: "Aba Main Market", place: "Abia" },
  { name: "Ogbete Main Market", place: "Enugu" },
  { name: "Oba Market", place: "Benin, Edo" },
  { name: "Wuse Market", place: "Abuja" },
];

// short pidgin-flavoured marquee of staples
export const MARQUEE = [
  "Hot Peppe", "Atarodo", "Cameroon Peppe", "Turmeric", "Ginger",
  "Na correct peppe", "Farm to fork", "Peppe wey pass peppe", "100% Naija",
];

// ---- Contacts ----
export const CONTACTS = [
  { name: "Deepak Chainani", role: "Director", phone: "+65 9115 4069", tel: "+6591154069" },
  { name: "Swatanter Saraswat", role: "Director", phone: "+234 904 044 3851", tel: "+2349040443851" },
  { name: "Narendranath Swain", role: "Finance Controller", phone: "+234 902 213 8277", tel: "+2349022138277" },
  { name: "Neha Agarwal", role: "Trade & Banking Manager", phone: "+234 912 445 4389", tel: "+2349124454389" },
];

// ---- WhatsApp + socials ----
export const WHATSAPP = { display: "+234 904 044 3851", href: "https://wa.me/2349040443851" };
export const SOCIALS: { name: string; icon: string; href: string }[] = [
  { name: "LinkedIn", icon: "linkedin", href: "#" },
  { name: "Facebook", icon: "facebook", href: "#" },
  { name: "Instagram", icon: "instagram", href: "#" },
  { name: "X", icon: "twitter", href: "#" },
];

// ---- Leadership / governance (for bankers & investors) ----
export const GOVERNANCE = [
  { title: "Board oversight", body: "An experienced board provides strategic direction and governance across finance, operations and market development." },
  { title: "Financial discipline", body: "Qualified finance leadership, audited accounts and transparent reporting - built for banking and investor confidence." },
  { title: "Proven management", body: "Decades of combined FMCG and agribusiness experience across international and Nigerian markets." },
];

// ---- ESG pillars ----
export const ESG: { key: string; letter: string; title: string; accent: AccentKey; points: string[] }[] = [
  { key: "environmental", letter: "E", title: "Environmental", accent: "ginger", points: ["Reduced post-harvest losses through modern drying, grinding & packaging", "Efficient, low-waste automated processing at Ikorodu", "Sourcing that protects natural colour and aroma"] },
  { key: "social", letter: "S", title: "Social", accent: "chilli", points: ["100% support to local farmers - no import dependence", "350+ farmers trained on post-harvest handling & quality", "Women-led B2C micro-distribution; jobs for youth & women"] },
  { key: "governance", letter: "G", title: "Governance", accent: "turmeric", points: ["Food-safety systems & full farm-to-fork traceability", "Certified to national and international standards", "Fair-pricing agreements and transparent supply chains"] },
];

// ---- Quality systems ----
export const QUALITY_SYSTEMS: { icon: string; title: string; body: string }[] = [
  { icon: "shield", title: "Steam sterilisation", body: "High-VO spices are steam-sterilised for microbial safety while preserving natural colour and aroma." },
  { icon: "sprout", title: "Full traceability", body: "Every batch is registered and traceable from farm and aggregator through processing to pack." },
  { icon: "award", title: "FSSC 22000 aligned", body: "Food Safety System Certification-aligned processes across cleaning, grinding, blending and packing." },
  { icon: "shield", title: "In-line quality checks", body: "Foreign-matter removal, sieving and checks at each stage with minimal human intervention." },
  { icon: "award", title: "ASTA & Scoville profiling", body: "Colour and pungency profiling to meet customer and export specifications." },
  { icon: "sprout", title: "Hygienic automation", body: "A US$10M automated plant designed around every food-safety norm our customers demand." },
];

// ---- Downloads (brochures / certificates) ----
export const DOWNLOADS = [
  { title: "Company Profile", desc: "Business overview, capability and long-term vision.", href: "/downloads/tg-agri-farms-company-profile.pdf" },
  { title: "Certifications Pack", desc: "NAFDAC, SON, Halal, US FDA, FSSC 22000 and more.", href: "/downloads/tg-agri-farms-certifications.pdf" },
  { title: "Product Catalogue", desc: "B2C consumer packs and B2B bulk formats.", href: "/downloads/tg-agri-farms-product-catalogue.pdf" },
];

// ---- Careers ----
export const CAREER_VALUES: { icon: string; title: string; body: string }[] = [
  { icon: "sprout", title: "Purpose-driven", body: "Work that uplifts Nigerian farmers, families and communities." },
  { icon: "shield", title: "Quality first", body: "World-class, hygienic manufacturing you can be proud of." },
  { icon: "users", title: "Grow with us", body: "A scaling company with real room for youth and women to build careers." },
];
export const JOB_OPENINGS: { title: string; dept: string; location: string; type: string }[] = [
  { title: "Production Supervisor", dept: "Manufacturing", location: "Ikorodu, Lagos", type: "Full-time" },
  { title: "Quality Assurance Officer", dept: "Quality", location: "Ikorodu, Lagos", type: "Full-time" },
  { title: "Field Sales Executive", dept: "Sales", location: "Lagos / South-East", type: "Full-time" },
  { title: "Procurement / Aggregation Officer", dept: "Supply Chain", location: "Kaduna", type: "Full-time" },
];

// ---- News & media ----
export const NEWS: {
  slug: string; title: string; date: string; category: string; excerpt: string; image: string; body: string[];
}[] = [
  {
    slug: "ikorodu-facility-scales-up",
    title: "Ikorodu facility scales up to 20 MT/day",
    date: "2026-05-18", category: "Operations", image: "/img/photo-facility.jpg",
    excerpt: "Our automated processing plant reaches full stride, producing up to 20 metric tonnes of finished spice per day.",
    body: [
      "Our US$10M automated processing facility in Ikorodu has reached full production stride, with a capacity of 20 metric tonnes of finished product per day.",
      "The line grinds chilli, turmeric, ginger and other spices, retaining natural aroma and colour through careful steam sterilisation, sieving and hygienic material handling.",
      "The investment cements TG Agri Farms as an integrated, farm-to-fork spice manufacturer built for scale and export.",
    ],
  },
  {
    slug: "350-farmers-trained",
    title: "350+ farmers trained on post-harvest quality",
    date: "2026-03-02", category: "Community", image: "/img/photo-drying.jpg",
    excerpt: "Training across 12 farmers' markets and 7 aggregators lifts quality and farmer incomes.",
    body: [
      "We continue to invest in the farmers at the heart of our supply chain, with training programmes reaching more than 350 farmers.",
      "Fair-pricing agreements and modern post-harvest handling reduce losses and raise the quality of raw materials entering our mill.",
      "The programme strengthens rural economies while securing a reliable, high-quality supply of chilli, turmeric and ginger.",
    ],
  },
  {
    slug: "nationwide-market-reach",
    title: "Goodearth now in 170+ markets nationwide",
    date: "2026-01-15", category: "Growth", image: "/img/photo-market.jpg",
    excerpt: "From farm to shelf across all five geopolitical zones - 8,700+ retailers and 2,600+ wholesalers.",
    body: [
      "Our nationwide network now spans 15+ states and 170+ markets, served by 250 distributors and 2,600+ wholesalers.",
      "Women-led micro-distribution brings Goodearth spices to streets and kitchens across Nigeria.",
      "The reach reflects six years of building a robust, trusted consumer brand anchored by our Ikorodu facility.",
    ],
  },
];

