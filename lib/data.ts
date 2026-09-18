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
  images?: string[];
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
  website: "https://tgagrifarms.com",
  websiteLabel: "tgagrifarms.com",
  address: "KM 5, Itokin Road, Itamope, Ikorodu Expressway, Lagos, Nigeria",
};

// ---- Traction stats (editable via Settings) ----
export const DEFAULT_STATS: { key: string; value: number; suffix?: string; label: string }[] = [
  { key: "distributors", value: 250, label: "Distributors" },
  { key: "wholesalers", value: 2600, suffix: "+", label: "Wholesalers" },
  { key: "retailers", value: 12000, suffix: "+", label: "Retailers" },
  { key: "states", value: 17, suffix: "+", label: "States" },
  { key: "regions", value: 5, label: "Regions" },
  { key: "markets", value: 100, suffix: "+", label: "Farmer Markets" },
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
    id: "hot-peppe", slug: "hot-peppe-powder", name: "Hot Peppe Powder", segment: "B2C",
    accent: "chilli", tagline: "Chilli · Premium staple", image: "/Product/hero-hot-peppe-studio.png",
    images: [
      "/Product/hero-hot-peppe-studio.png",
      "/Product/hot-peppe-studio.jpg",
      "/Product/hot-peppe-supa-pack.jpg",
      "/Product/hot-peppe-carton.jpg",
    ],
    description: "Bright red, premium pepper powder to add spice and flavour to every meal.",
    sizes: ["100 g", "5 g", "Supa Pack"], formats: [], featured: true,
    costPositioning: "Medium–High cost", marketCategory: "Premium staple",
    colour: "Red", asta: "40–55", scoville: "55,000–60,000 SHU",
    usage: "Adds spice & flavour to all meals",
  },
  {
    id: "atarodo", slug: "atarodo-peppe-powder", name: "Atarodo Peppe Powder", segment: "B2C",
    accent: "chilli", tagline: "Chilli · Scotch bonnet", image: "/Product/hero-atarodo-studio.png",
    images: [
      "/Product/hero-atarodo-studio.png",
      "/Product/atarodo-studio.jpg",
      "/Product/atarodo-carton.jpg",
    ],
    description: "Dark-red scotch-bonnet style pepper - a mass-market staple for everyday heat.",
    sizes: ["8 g", "3 g", "Carton"], formats: [], featured: true,
    costPositioning: "Low–Medium cost", marketCategory: "Scotch-bonnet · mass-market staple",
    colour: "Dark red", asta: "50–60", scoville: "~60,000 SHU",
    usage: "Adds spice to all meals",
  },
  {
    id: "cameroon", slug: "cameroon-peppe-powder", name: "Cameroon Peppe Powder", segment: "B2C",
    accent: "chilli", tagline: "Chilli · Gourmet", image: "/Product/hero-cameroon-studio.png",
    images: [
      "/Product/hero-cameroon-studio.png",
      "/Product/cameroon-studio.jpg",
      "/Product/cameroon-carton.jpg",
    ],
    description: "Deep red, smoky and pungent - a gourmet, authentic powder for soups & noodles.",
    sizes: ["100 g", "50 g", "3 g"], formats: [], featured: true,
    costPositioning: "High cost", marketCategory: "Gourmet / authentic · premium niche",
    colour: "Deep red & brown", asta: "-", scoville: "~90,000 SHU",
    usage: "For soups & noodles",
  },
  {
    id: "ginger", slug: "ginger-powder", name: "Ginger Powder", segment: "B2C",
    accent: "ginger", tagline: "Ginger", image: "/Product/ginger.png",
    images: ["/Product/ginger.png"],
    description: "Aromatic, finely milled ginger that brings warmth and depth to soups and stews.",
    sizes: ["100 g"], formats: [],
  },
  {
    id: "turmeric", slug: "turmeric-powder", name: "Turmeric Powder", segment: "B2C",
    accent: "turmeric", tagline: "Turmeric", image: "/Product/turmeric.png",
    images: ["/Product/turmeric.png"],
    description: "Pure, golden turmeric - rich in colour and warmth for everyday Nigerian cooking.",
    sizes: ["100 g"], formats: [],
  },
];

// ---- Homepage hero showcase (auto-rotating pack shots) ----
export const HERO_SHOWCASE: string[] = [
  "/Product/hero-hot-peppe-studio.png",
  "/Product/hero-atarodo-studio.png",
  "/Product/hero-cameroon-studio.png",
];

// ---- B2B portfolio (static; formats per crop) ----
export const B2B_PORTFOLIO: {
  key: string; letter: string; accent: AccentKey; name: string; desc: string;
  forms: { label: string; image: string }[];
}[] = [
  {
    key: "chilli", letter: "C", accent: "chilli", name: "Chilli",
    desc: "High-VO chilli with the pungency and colour our customers specify.",
    forms: [
      { label: "Whole", image: "/img/b2b/chilli-whole.jpg" },
      { label: "Crushed", image: "/img/b2b/chilli-crushed.jpg" },
      { label: "Powder", image: "/img/b2b/chilli-powder.jpg" },
    ],
  },
  {
    key: "turmeric", letter: "T", accent: "turmeric", name: "Turmeric",
    desc: "Bright, colour-rich turmeric ground to retain natural aroma.",
    forms: [
      { label: "Sliced / Kibbled", image: "/img/b2b/turmeric-kibbled.jpg" },
      { label: "Powder", image: "/img/b2b/turmeric-powder.jpg" },
    ],
  },
  {
    key: "ginger", letter: "G", accent: "ginger", name: "Ginger",
    desc: "Aromatic ginger supplied in flexible industrial formats.",
    forms: [
      { label: "Sliced / Cut", image: "/img/b2b/ginger-sliced.jpg" },
      { label: "Powder", image: "/img/b2b/ginger-powder.jpg" },
    ],
  },
];

// ---- B2B customers (from company reference deck) ----
export const B2B_CUSTOMERS: { name: string; logo: string }[] = [
  { name: "Nestlé", logo: "/img/customers/nestle.png" },
  { name: "Freddy Hirsch", logo: "/img/customers/freddy-hirsch.png" },
  { name: "Minimie Noodles", logo: "/img/customers/minimie-noodles.png" },
  { name: "Olam", logo: "/img/customers/olam.png" },
  { name: "Unilever", logo: "/img/customers/unilever.png" },
  { name: "Chicken Republic", logo: "/img/customers/chicken-republic.png" },
];

// ---- Process steps ----
export const PROCESS_STEPS = [
  { title: "Cultivate & source", body: "We source chilli, turmeric and ginger varieties with the pungency and colour our customers require - supporting smallholder farmers to grow profitably." },
  { title: "Harvest & sun-dry", body: "Matured fruits are plucked and sun-dried to reduce moisture by ~85%, then registered, bagged and moved to our Kaduna warehouse." },
  { title: "Crush, process & sterilise", body: "At our Ikorodu mill, materials pass rigorous stages to remove foreign matter, then are crushed, kibbled, sliced, ground and steam-sterilised." },
  { title: "Pack & sell", body: "We package to spec, then sell to both businesses and consumers across Nigerian markets." },
];

export const FACILITY_KPIS = [
  { n: "$12M", l: "Invested in automated factory" },
  { n: "3,000 MT", l: "Annual plant capacity" },
  { n: "2,000 MT", l: "Warehousing capacity" },
  { n: "85%", l: "Moisture reduced via sun-dry" },
];
export const FACILITY_CAPS = ["Cleaning", "Grinding", "Blending", "Sieving", "Steam sterilisation", "Material handling", "Bulk storage"];

// ---- Impact ----
export const IMPACT_CARDS = [
  { n: "50,000", suffix: "+", count: 50000, title: "Smallholder farmers engaged", body: "Across direct sourcing, cultivation and aggregation networks." },
  { n: "10,000", suffix: "+", count: 10000, title: "Farmers trained on quality", body: "Structured post-harvest handling and food-safety practices." },
  { n: "95%", suffix: "", count: 0, title: "Nigerian staff", body: "Of total staff - youth and women included across functions." },
  { n: "Women-led", suffix: "", count: 0, title: "B2C micro-distribution", body: "Empowering women through micro-distributor sales, with reduced spoilage and stable food prices." },
];
export const IMPACT_TAGS = ["10,000+ farmers trained", "100 farmer markets", "25 aggregators", "Grown by 50,000+ farmers", "Fair-pricing agreements", "Reduced post-harvest losses", "Export diversification"];

// ---- Presence ----
export const STATES = ["Ogun", "Ondo", "Ekiti", "Anambra", "Lagos", "Osun", "Imo", "Rivers", "Abia", "Edo", "Enugu", "Akwa Ibom", "Delta", "Oyo", "Kwara", "Kaduna", "Kano", "Abuja FCT"];

// ---- SWOT ----
export const SWOT = {
  s: ["Wide usage of our products", "Quality and hygienic product", "No major competitors with continuous supply in our category"],
  w: ["Inadequate transport & power affects production and distribution", "High loan interest rates", "Continuous sourcing of quality raw material", "Heavy reliance on middlemen"],
  o: ["Export potential to international markets", "Wide possibility of brand extensions"],
  t: ["Adverse weather & climate change affect productivity", "Impact on raw-material quality and prices"],
};

// ---- Team ----
export type UITeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  bullets?: string[];
  initials?: string | null;
  photo?: string | null;
};

export const TEAM: UITeamMember[] = [
  {
    id: "dc",
    initials: "DC",
    name: "Deepak Murli Chainani",
    role: "Managing Director",
    bio: "Appointed to the board of directors on 18th Dec 2017. He has more than 15 years of experience in various verticals of international markets and almost 10 years of experience in Nigerian markets.",
    bullets: [
      "Appointed to the board of directors on 18th Dec 2017.",
      "He has more than 15 years of experience in various verticals of international markets and almost 10 years of experience in Nigerian markets.",
    ],
    photo: "/img/team/deepak-portrait.jpg",
  },
  {
    id: "ss",
    initials: "SS",
    name: "Swatanter Saraswat",
    role: "Executive Director",
    bio: "Appointed as COO in June,2023 and to the board of directors in Nov 2024. He comes with more than 15 years of experience in FMCG sector majorly with African companies.",
    bullets: [
      "Appointed as COO in June,2023 and to the board of directors in Nov 2024.",
      "He comes with more than 15 years of experience in FMCG sector majorly with African companies.",
    ],
    photo: "/img/team/swatanter-saraswat.jpg",
  },
  {
    id: "ns",
    initials: "NS",
    name: "Narendranath Swain",
    role: "Finance Controller",
    bio: "Joined the Company in 2024. He is Qualified Chartered Accountant from India with more than Ten years of experience in Indian accounts, audit and finance with additional 7 years of experience as Finance controller in Nigerian companies.",
    bullets: [
      "Joined the Company in 2024.",
      "He is Qualified Chartered Accountant from India with more than Ten years of experience in Indian accounts, audit and finance with additional 7 years of experience as Finance controller in Nigerian companies.",
    ],
    photo: "/img/team/narendranath-swain.jpg",
  },
  {
    id: "fn",
    initials: "FN",
    name: "Fredrick Chidi Nze",
    role: "Sales Capability & Market Development",
    bio: "Joined the Company in 2023. He comes with more than 15 years of experience in FMCG sector majorly with African companies.",
    bullets: [
      "Joined the Company in 2023.",
      "He comes with more than 15 years of experience in FMCG sector majorly with African companies.",
    ],
    photo: "/img/team/fred-nze.jpg",
  },
];

export type ExpatLeader = {
  name: string;
  role: string;
  division: string;
  photo: string;
  badge: string;
  highlight: string;
  bio: string;
};

export const EXPAT_LEADERS: ExpatLeader[] = [
  {
    name: "Deepak Murli Chainani",
    role: "Managing Director",
    division: "Executive Leadership",
    photo: "/img/team/deepak-portrait.jpg",
    badge: "Singapore / Nigeria",
    highlight: "15+ Yrs International Trade & Agribusiness",
    bio: "Appointed to the board in Dec 2017. Brings 15+ years in international commodity markets and over 10 years steering agro-industrial manufacturing and supply chains across Nigeria.",
  },
  {
    name: "Swatanter Saraswat",
    role: "Executive Director & COO",
    division: "Plant Operations & Processing",
    photo: "/img/team/swatanter-saraswat.jpg",
    badge: "Operations & Engineering",
    highlight: "15+ Yrs African FMCG Manufacturing",
    bio: "Appointed COO in June 2023 and to the board in Nov 2024. Over 15 years leading automated FMCG manufacturing plants across Africa, championing technical precision, hygiene, and engineer mentoring.",
  },
  {
    name: "Narendranath Swain",
    role: "Finance Controller",
    division: "Corporate Governance & Audit",
    photo: "/img/team/narendranath-swain.jpg",
    badge: "Corporate Governance",
    highlight: "Chartered Accountant · 17+ Yrs Exp.",
    bio: "Qualified Chartered Accountant with 10+ years in Indian corporate finance and audit, plus 7+ years managing finance control, cost engineering, and statutory governance for Nigerian industrial leaders.",
  },
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
  { icon: "sprout", title: "100% Naija sourced", body: "Grown by 50,000+ local farmers across the country - no imports, pure home-grown goodness." },
  { icon: "shield", title: "Pure & hygienic", body: "Steam-sterilised and milled to lock in natural colour and aroma. Clean peppe, every time." },
  { icon: "wallet", title: "For every pocket", body: "From ₦-friendly 3 g sachets to bulk bags - Goodearth dey for everybody." },
  { icon: "users", title: "Trusted everywhere", body: "In 100+ farmer markets, 12,000+ retailers and kitchens across 17+ states." },
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
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/tg-agri-farms-ltd" },
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
  { key: "social", letter: "S", title: "Social", accent: "chilli", points: ["100% support to local farmers - no import dependence", "Grown by 50,000+ farmers, with 10,000+ trained on quality handling", "Women-led B2C micro-distribution; jobs for youth & women"] },
  { key: "governance", letter: "G", title: "Governance", accent: "turmeric", points: ["Food-safety systems & full farm-to-fork traceability", "Certified to national and international standards", "Fair-pricing agreements across 25 aggregators"] },
];

// ---- Quality systems ----
export const QUALITY_SYSTEMS: { icon: string; title: string; body: string }[] = [
  { icon: "shield", title: "Steam sterilisation", body: "High-VO spices are steam-sterilised for microbial safety while preserving natural colour and aroma." },
  { icon: "sprout", title: "Full traceability", body: "Every batch is registered and traceable from farm and aggregator through processing to pack." },
  { icon: "award", title: "FSSC 22000 aligned", body: "Food Safety System Certification-aligned processes across cleaning, grinding, blending and packing." },
  { icon: "shield", title: "In-line quality checks", body: "Foreign-matter removal, sieving and checks at each stage with minimal human intervention." },
  { icon: "award", title: "ASTA & Scoville profiling", body: "Colour and pungency profiling to meet customer and export specifications." },
  { icon: "sprout", title: "Hygienic automation", body: "A US$12M automated plant designed around every food-safety norm our customers demand." },
];

// ---- Downloads (brochures / certificates) ----
// `file` overrides the saved filename when the stored path isn't presentable.
export const DOWNLOADS: { title: string; desc: string; href: string; file?: string }[] = [
  { title: "Company Profile", desc: "Business overview, capability and long-term vision.", href: "/downloads/tg-agri-farms-company-profile.pdf" },
  { title: "Certifications Pack", desc: "NAFDAC, SON, Halal, US FDA, FSSC 22000 and more.", href: "/img/certs/Doc1.pdf", file: "tg-agri-farms-certifications.pdf" },
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
    title: "Ikorodu facility scales to 3,000 MT annual capacity",
    date: "2026-05-18", category: "Operations", image: "/img/photo-facility.jpg",
    excerpt: "Our automated processing plant reaches full stride with 3,000 MT annual plant capacity of finished spice.",
    body: [
      "Our US$12M automated processing facility in Ikorodu has reached full production stride, with an annual capacity of 3,000 metric tonnes of finished product.",
      "The line grinds chilli, turmeric, ginger and other spices, retaining natural aroma and colour through careful steam sterilisation, sieving and hygienic material handling.",
      "The investment cements TG Agri Farms as an integrated, farm-to-fork spice manufacturer built for scale and export.",
    ],
  },
  {
    slug: "10000-farmers-trained",
    title: "10,000+ farmers trained across 100 markets & 25 aggregators",
    date: "2026-03-02", category: "Community", image: "/img/photo-drying.jpg",
    excerpt: "Training across 100 farmer markets and 25 aggregators lifts quality and farmer incomes for 50,000+ growers.",
    body: [
      "We continue to invest in the farmers at the heart of our supply chain, with training programmes reaching more than 10,000 farmers and supporting over 50,000 growers nationwide.",
      "Fair-pricing agreements and modern post-harvest handling reduce losses and raise the quality of raw materials entering our mill.",
      "The programme strengthens rural economies while securing a reliable, high-quality supply of chilli, turmeric and ginger.",
    ],
  },
  {
    slug: "nationwide-market-reach",
    title: "Goodearth expands to 12,000+ retailers across 17+ states",
    date: "2026-01-15", category: "Growth", image: "/img/photo-market.jpg",
    excerpt: "From farm to shelf across all five geopolitical zones - 12,000+ retailers and 2,600+ wholesalers.",
    body: [
      "Our nationwide network now spans 17+ states and 100+ farmer markets, served by 250 distributors, 2,600+ wholesalers, and 12,000+ retailers.",
      "Women-led micro-distribution brings Goodearth spices to streets and kitchens across Nigeria.",
      "The reach reflects six years of building a robust, trusted consumer brand anchored by our US$12M Ikorodu facility.",
    ],
  },
];

// ---- Awards & National Recognition ----
export const AWARDS = [
  {
    id: "edge-award-2025",
    title: "Outstanding Indigenous Naija Spice of the Year",
    event: "13th Edition Marketing Edge Awards",
    theme: "Excellence Beyond Borders",
    year: "2025",
    date: "October 2025",
    location: "Lagos, Nigeria",
    brand: "Goodearth Hot Peppe",
    company: "TG Agri Farm / Goodearth Foods",
    presentedBy: "Hon. Adeniyi Adebayo (Chief of Staff to Ekiti State Governor)",
    receivedBy: [
      { name: "Swatanter Saraswat", role: "Chief Executive Officer, TG Agri Farm" },
      { name: "Nze Frederick Chidi", role: "Marketing Head, TG Agri Farm" },
      { name: "Abhishek Manitripathi", role: "Branch Head, TG Agri Farm" },
      { name: "Victoria Omaku", role: "Sales Coordinator, TG Agri Farm" },
    ],
    statement:
      "It validates years of meticulous planning, substantial investment, and an uncompromising dedication to producing world-class spices from Nigerian soil. The brand demonstrated an exceptional ability to stand out in a highly competitive category, proving that indigenous brands can achieve international standards while maintaining authentic local character.",
    summary:
      "Goodearth Hot Peppe from the stable of Goodearth Foods emerged as the winner of the coveted Indigenous Naija Spice of the Year category at the 13th edition of Marketing Edge Awards, affirming that Nigerian brands can compete at the highest standards when backed by world-class infrastructure and unwavering commitment to quality.",
    ceremonyPhoto: "/img/awards/award-ceremony-hd.png",
    pressFeatures: [
      {
        id: "thisday",
        publication: "THISDAY Newspaper",
        edition: "Monday, October 20, 2025",
        page: "Page 37 · News Xtra",
        headline: "Goodearth Hot Peppe Wins Indigenous Naija Spice Award",
        photoCaption:
          "L-R: Sales Coordinator, Victoria Omaku; Chief Executive Officer, TG Agri Farm, Swatanter Saraswat; Chief of Staff to Ekiti State Governor, Adeniyi Adebayo; Branch Head, TG Agri Farm, Abhishek Manitripathi; and Marketing Head, TG Agri Farm, Nze Frederick Chidi, at the 2025 Edge Award, where the company was recognised as Outstanding Indigenous Naija Spice of the Year in Lagos... recently",
        image: "/img/awards/award-thisday-newspaper.jpg",
        highlight:
          "The recognition not only distinguished Goodearth Hot Peppe from other brands in its category but sent ripples of excitement across Nigeria's food and spice industry.",
      },
      {
        id: "punch",
        publication: "THE PUNCH Newspaper",
        edition: "Friday, October 24, 2025",
        page: "Page 6 · Photo News",
        headline: "Naija Spice of the Year Award...",
        photoCaption:
          "L-R: Sales Coordinator, Victoria Omaku; Chief Executive Officer, TG Agri Farm, Swatanter Saraswat; Chief of Staff to Ekiti State Governor, Adeniyi Adebayo; Branch Head, TG Agri Farm, Abhishek Manitripathi; and Marketing Head, TG Agri Farm, Frederick Chidi, during the 2025 Edge Award, where the company was recognised as Outstanding Indigenous Naija Spice of the Year in Lagos... recently. Photo: TG Agri Farm",
        image: "/img/awards/award-punch-newspaper.jpg",
        highlight:
          "National photo news coverage spotlighting TG Agri Farm leadership receiving the 2025 Edge Award trophy on stage in Lagos.",
      },
    ],
  },
];

// ---- Gallery Data ----
export type GalleryCategory =
  | "all"
  | "facility"
  | "community"
  | "harvest"
  | "transit";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  image: string;
  caption: string;
  location?: string;
  aspect?: "portrait" | "landscape" | "wide";
  tag?: string;
}

export const GALLERY_CATEGORIES: { key: GalleryCategory; label: string }[] = [
  { key: "all", label: "All Imagery" },
  { key: "facility", label: "Factory & Workforce" },
  { key: "community", label: "Farm & Community" },
  { key: "harvest", label: "Harvest & Sourcing" },
  { key: "transit", label: "Transit & Market" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "facility-aerial",
    title: "Good Earth Agro-Processing Complex",
    category: "facility",
    categoryLabel: "Processing Facility",
    image: "/img/gallery/goodearth-facility-aerial.png",
    caption:
      "Aerial overview of the modern Good Earth agro-processing and spice milling facility located in Ikorodu, Lagos State.",
    location: "Ikorodu Expressway, Lagos State",
    aspect: "landscape",
    tag: "Facility Architecture",
  },
  {
    id: "workforce-group",
    title: "Ikorodu Plant Workforce & Production Team",
    category: "facility",
    categoryLabel: "Team & Workforce",
    image: "/img/gallery/ikorodu-workforce-group.jpg",
    caption:
      "The passionate operations, milling, and packaging workforce driving daily production of authentic Nigerian spices.",
    location: "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: "Workforce",
  },
  {
    id: "factory-staff",
    title: "Operations & Packaging Personnel",
    category: "facility",
    categoryLabel: "Team & Workforce",
    image: "/img/gallery/factory-staff-front.jpg",
    caption:
      "Factory floor technicians and packaging operators outside the main facility in branded company uniforms.",
    location: "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: "Operations",
  },
  {
    id: "plant-management",
    title: "Plant Management & Engineering Team",
    category: "facility",
    categoryLabel: "Leadership & Engineering",
    image: "/img/gallery/plant-management-team.jpg",
    caption:
      "Engineering leads and plant supervisors overseeing international milling precision, sanitation, and safety.",
    location: "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: "Engineering",
  },
  {
    id: "engineering-leadership",
    title: "Facility Operations & Technical Leadership",
    category: "facility",
    categoryLabel: "Leadership & Engineering",
    image: "/img/gallery/engineering-leadership.jpg",
    caption:
      "Production supervisors ensuring consistent particle granularity, aroma retention, and HACCP compliance.",
    location: "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: "Leadership",
  },
  {
    id: "operations-crew",
    title: "Operations & Logistics Crew",
    category: "facility",
    categoryLabel: "Operations & Logistics",
    image: "/img/gallery/operations-team-green.jpg",
    caption:
      "Logistics and handling coordinators in Good Earth signature green uniform apparel.",
    location: "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: "Logistics",
  },
  {
    id: "qa-team-yellow",
    title: "Quality Assurance & Retail Packaging Crew",
    category: "facility",
    categoryLabel: "Quality Assurance",
    image: "/img/gallery/qa-packaging-team-yellow.jpg",
    caption:
      "Production specialists sporting 'Na Correct Naija Peppe' yellow team apparel outside the facility grounds.",
    location: "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: "Quality Team",
  },
  {
    id: "farmer-elder-meeting",
    title: "Outgrower Farmer Dialogue & Community Council",
    category: "community",
    categoryLabel: "Community & Sourcing",
    image: "/img/gallery/farmer-elder-meeting.jpg",
    caption:
      "Company directors and field coordinators engaging in open stakeholder dialogue with rural farming elders under the village tree.",
    location: "Northern Agricultural Outgrower Belt",
    aspect: "landscape",
    tag: "Community Partnership",
  },
  {
    id: "farmer-riverbank",
    title: "Riverbank Farming Outgrower Community",
    category: "community",
    categoryLabel: "Community & Sourcing",
    image: "/img/gallery/farmer-community-riverbank.jpg",
    caption:
      "TG Agri Farm leadership alongside smallholder farmer families and rural outgrower partners along the riverbank agricultural basin.",
    location: "River Valley Farming Basin, Nigeria",
    aspect: "landscape",
    tag: "Outgrower Network",
  },
  {
    id: "community-outreach",
    title: "Rural Cooperative Empowerment & Outreach",
    category: "community",
    categoryLabel: "Community & Sourcing",
    image: "/img/gallery/outgrower-community-outreach.jpg",
    caption:
      "Direct village engagement and social welfare outreach with farming families and agricultural cooperatives.",
    location: "Rural Farming Cooperative, Nigeria",
    aspect: "landscape",
    tag: "Social Impact",
  },
  {
    id: "pepper-harvest-sundrying",
    title: "Chilli Harvest & Sun-Drying Procurement Depot",
    category: "harvest",
    categoryLabel: "Harvest & Sourcing",
    image: "/img/gallery/pepper-harvest-sundrying.png",
    caption:
      "Massive mounds of sun-dried red chillies undergoing grading and moisture verification by field procurement officers.",
    location: "Regional Spice Procurement Depot",
    aspect: "portrait",
    tag: "Harvest Depot",
  },
  {
    id: "transit-bus-rear",
    title: "Lagos Transit Campaign — Correct Peppe, Correct Taste",
    category: "transit",
    categoryLabel: "Transit & Market",
    image: "/img/gallery/lagos-transit-bus-rear.jpg",
    caption:
      "Good Earth full rear transit bus wrap on Ikorodu Road, Lagos, bringing authentic Naija spices to daily commuters.",
    location: "Ikorodu Road, Lagos (GPS Verified)",
    aspect: "portrait",
    tag: "Transit Wrap",
  },
  {
    id: "transit-bus-side",
    title: "Lagos Commuter Bus Full Side Wrap",
    category: "transit",
    categoryLabel: "Transit & Market",
    image: "/img/gallery/lagos-transit-bus-side.jpg",
    caption:
      "Full side wrap branding featuring Goodearth Hot Peppe and Cameroon Peppe across the Lagos transit corridor.",
    location: "Ikorodu Expressway, Lagos",
    aspect: "landscape",
    tag: "Commuter Bus",
  },
  {
    id: "transit-bus-road",
    title: "Transit Advertising Fleet along Ikorodu Corridor",
    category: "transit",
    categoryLabel: "Transit & Market",
    image: "/img/gallery/lagos-transit-bus-road.jpg",
    caption:
      "Good Earth transit campaign fleet in active commercial transit on the bustling Ikorodu highway arterial.",
    location: "Ikorodu Central Arterial, Lagos",
    aspect: "landscape",
    tag: "Fleet Presence",
  },
];


