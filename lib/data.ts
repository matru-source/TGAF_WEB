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
    id: "hot-peppe", slug: "hot-peppe-powder", name: "Hot Peppe", segment: "B2C",
    accent: "chilli", tagline: "Chilli · Premium staple", image: "/Product/hero-hot-peppe-studio.png",
    images: [
      "/Product/hero-hot-peppe-studio.png",
      "/Product/hot-peppe-studio.jpg",
      "/Product/hot-peppe-supa-pack.jpg",
      "/Product/hot-peppe-carton.jpg",
    ],
    description: "Rich red, premium grounded pepe to add bold heat, aroma and flavour to every meal.",
    sizes: ["100 g", "5 g", "Supa Pack"], formats: ["Grounded Pepe"], featured: true,
    marketCategory: "Premium staple",
    colour: "Rich red", asta: "40–55", scoville: "55,000–60,000 SHU",
    usage: "Adds spice & flavour to all meals",
  },
  {
    id: "atarodo", slug: "atarodo-peppe-powder", name: "Atarodo Peppe", segment: "B2C",
    accent: "chilli", tagline: "Chilli · Scotch bonnet", image: "/Product/hero-atarodo-studio.png",
    images: [
      "/Product/hero-atarodo-studio.png",
      "/Product/atarodo-studio.jpg",
      "/Product/atarodo-carton.jpg",
    ],
    description: "Dark-red scotch-bonnet style grounded pepe - a mass-market staple for everyday Nigerian heat.",
    sizes: ["8 g", "3 g", "Carton"], formats: ["Grounded Pepe"], featured: true,
    marketCategory: "Scotch-bonnet · mass-market staple",
    colour: "Dark red", asta: "50–60", scoville: "~60,000 SHU",
    usage: "Adds spice to all meals",
  },
  {
    id: "cameroon", slug: "cameroon-peppe-powder", name: "Cameroon Peppe", segment: "B2C",
    accent: "chilli", tagline: "Chilli · Gourmet", image: "/Product/hero-cameroon-studio.png",
    images: [
      "/Product/hero-cameroon-studio.png",
      "/Product/cameroon-studio.jpg",
      "/Product/cameroon-carton.jpg",
    ],
    description: "Deep red, smoky and pungent - a gourmet, authentic grounded pepe for soups, stews & noodles.",
    sizes: ["100 g", "50 g", "3 g"], formats: ["Smoked Grounded Pepe"], featured: true,
    marketCategory: "Gourmet / authentic · premium niche",
    colour: "Deep red & brown", asta: "-", scoville: "~90,000 SHU",
    usage: "For soups, stews & noodles",
  },
  {
    id: "ginger", slug: "ginger-powder", name: "Ginger", segment: "B2C",
    accent: "ginger", tagline: "Ginger", image: "/Product/ginger.png",
    images: ["/Product/ginger.png"],
    description: "Aromatic, finely grounded ginger that brings warmth and depth to soups, marinades and stews.",
    sizes: ["100 g"], formats: ["Grounded Ginger"],
  },
  {
    id: "turmeric", slug: "turmeric-powder", name: "Turmeric", segment: "B2C",
    accent: "turmeric", tagline: "Turmeric", image: "/Product/turmeric.png",
    images: ["/Product/turmeric.png"],
    description: "Pure, golden grounded turmeric - rich in colour and warmth for everyday cooking.",
    sizes: ["100 g"], formats: ["Grounded Turmeric"],
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
    role: "Executive Director & COO",
    bio: "Appointed COO in June 2023 and to the board of directors in Nov 2024. Over 15 years leading automated FMCG manufacturing plants across Africa.",
    bullets: [
      "Appointed COO in June 2023 and to the board of directors in Nov 2024.",
      "Over 15 years leading automated FMCG manufacturing plants across Africa.",
    ],
    photo: "/img/team/swatanter-saraswat.jpg",
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
  { 
    key: "environmental", 
    letter: "E", 
    title: "Environmental", 
    accent: "ginger", 
    points: [
      "Solar & Gas Powered: Clean energy replaces diesel at our modern Ikorodu processing plant",
      "Low-Waste Milling: Closed-loop cool-grind milling preventing post-harvest spice loss",
      "Sustainable Agriculture: Protecting soil vitality and natural essential oils"
    ] 
  },
  { 
    key: "social", 
    letter: "S", 
    title: "Social", 
    accent: "chilli", 
    points: [
      "100% support to Nigerian farmers - zero import dependence across our core spice supply chain",
      "Grown by 50,000+ local smallholders with 10,000+ trained on quality agricultural practices",
      "Women-led micro-distribution and packaging operations generating sustainable family livelihoods"
    ] 
  },
  { 
    key: "governance", 
    letter: "G", 
    title: "Governance", 
    accent: "turmeric", 
    points: [
      "Full seed-to-shelf traceability and rigorous batch-coded quality compliance",
      "Multi-standard certified excellence meeting NAFDAC, SON and global export benchmarks",
      "Transparent fair-pricing agreements guaranteeing financial stability for aggregators"
    ] 
  },
];

// ---- Quality systems ----
export const QUALITY_SYSTEMS: { icon: string; title: string; body: string }[] = [
  { icon: "shield", title: "Steam sterilisation", body: "High-VO spices are steam-sterilised for microbial safety while preserving natural colour and aroma." },
  { icon: "sprout", title: "Full traceability", body: "Every batch is registered and traceable from farm and aggregator through processing to pack." },
  { icon: "award", title: "FSSC 22000 aligned", body: "Food Safety System Certification-aligned processes across cleaning, grinding, blending and packing." },
  { icon: "shield", title: "In-line quality checks", body: "Foreign-matter removal, sieving and checks at each stage with minimal human intervention." },
  { icon: "award", title: "ASTA & Scoville profiling", body: "Colour and pungency profiling to meet customer and export specifications." },
  { icon: "sprout", title: "Hygienic automation", body: "An advanced automated processing plant engineered around international food-safety standards." },
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
    date: "2026-05-18", category: "Operations", image: "/img/gallery/goodearth-facility-aerial.png",
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
  | "factory"
  | "farm"
  | "marketing";

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
  { key: "all", label: "All Photos" },
  { key: "factory", label: "Factory" },
  { key: "farm", label: "Farm" },
  { key: "marketing", label: "Marketing" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // ==================== FACTORY ====================
  {
    id: "facility-aerial-drone",
    title: "Good Earth Agro-Processing Complex",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/goodearth-facility-aerial.png",
    caption: "Aerial perspective of the modern Good Earth agro-processing and spice milling facility in Ikorodu, Lagos State.",
    location: "Ikorodu, Lagos State",
    aspect: "landscape",
    tag: "Plant Architecture",
  },
  {
    id: "facility-bco-layout",
    title: "Factory Architectural Plan & Blueprint",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/corporate-bco-overview.png",
    caption: "Master architectural layout and engineering blueprint for the US$12M Ikorodu agro-processing plant.",
    location: "Engineering Division, Lagos",
    aspect: "landscape",
    tag: "Engineering Blueprint",
  },
  {
    id: "plant-mgmt-team",
    title: "Expatriate Technical & Plant Management Team",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/team/expat-plant-team.jpg",
    caption: "Seasoned expatriate engineers and technical operations supervisors on-site at the Ikorodu facility.",
    location: "Ikorodu Plant, Lagos",
    aspect: "landscape",
    tag: "Technical Leadership",
  },
  {
    id: "plant-workforce-team",
    title: "Nigerian Operational Workforce & Production Staff",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/team-workforce.jpg",
    caption: "The passionate operations, milling, and packaging workforce driving round-the-clock spice production.",
    location: "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: "Operational Workforce",
  },
  {
    id: "factory-staff-front",
    title: "Operations & Packaging Personnel",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/factory-staff-front.jpg",
    caption: "Factory floor technicians and packaging operators outside the main facility in branded company uniforms.",
    location: "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: "Operations",
  },
  {
    id: "team-qa-yellow",
    title: "Quality Assurance & Production Crew",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/qa-packaging-team-yellow.jpg",
    caption: "Production specialists sporting 'Na Correct Naija Peppe' yellow apparel outside the facility grounds.",
    location: "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: "Quality Team",
  },
  {
    id: "team-ops-green",
    title: "Operations & Logistics Team",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/operations-team-green.jpg",
    caption: "Handling coordinators and operations personnel in Good Earth signature green uniform apparel.",
    location: "Ikorodu Facility, Lagos",
    aspect: "landscape",
    tag: "Logistics Team",
  },
  {
    id: "machine-pulverizer",
    title: "Industrial Impact Pulverizer & Pin Mill",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-11.jpg",
    caption: "Multi-stage cool-grind milling machine preserving volatile oils (high-VO) and natural spice aroma.",
    location: "Milling Hall, Ikorodu",
    aspect: "landscape",
    tag: "Grinding Mill",
  },
  {
    id: "machine-cyclone",
    title: "Pneumatic Cyclone Separator & Filtration",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-10.jpg",
    caption: "Closed-loop negative pressure conveyance separating fine spice particles under hygienic vacuum.",
    location: "Processing Hall, Ikorodu",
    aspect: "landscape",
    tag: "Cyclone Separator",
  },
  {
    id: "machine-ribbon-blender",
    title: "Stainless Steel Ribbon Blender",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-14.jpg",
    caption: "Heavy-duty helical ribbon agitators ensuring homogenous particle distribution and uniform heat levels.",
    location: "Blending Section, Ikorodu",
    aspect: "landscape",
    tag: "Ribbon Blender",
  },
  {
    id: "machine-vffs",
    title: "Continuous VFFS Automated Packaging Machine",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-08.jpg",
    caption: "Roll-fed vertical form-fill-seal unit with automated batch coding and nitrogen flushing capability.",
    location: "Packaging Hall, Ikorodu",
    aspect: "landscape",
    tag: "VFFS Packaging",
  },
  {
    id: "machine-grinder-mill",
    title: "Industrial Coarse Grinder & Feeding Mill",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-01.jpg",
    caption: "Primary intake grinder breaking whole dried chillies prior to fine micro-pulverization.",
    location: "Intake Station, Ikorodu",
    aspect: "landscape",
    tag: "Primary Milling",
  },
  {
    id: "machine-conveyor-unit",
    title: "Enclosed Screw Conveyor & Elevator System",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-05.jpg",
    caption: "Automated sanitary screw elevators transferring graded spices between processing modules.",
    location: "Milling Hall, Ikorodu",
    aspect: "landscape",
    tag: "Conveyor System",
  },
  {
    id: "machine-silo-chute",
    title: "Stainless Steel Holding Silo & Chute",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-13.jpg",
    caption: "Sanitary stainless steel storage silo for buffer holding of sterilised ground spices prior to packaging.",
    location: "Holding Bay, Ikorodu",
    aspect: "landscape",
    tag: "Storage Silo",
  },
  {
    id: "machine-multi-spout",
    title: "Multi-Spout Pouch Packaging Unit",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-16.jpg",
    caption: "High-output packaging machine delivering consistent weight and hermetic seal integrity.",
    location: "Packaging Hall, Ikorodu",
    aspect: "landscape",
    tag: "Pouch Packaging",
  },
  {
    id: "machine-powder-line",
    title: "Commercial Powder Packaging Station",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-15.jpg",
    caption: "Automated spice packaging station with integrated optical sensors and heat-sealing jaws.",
    location: "Packaging Hall, Ikorodu",
    aspect: "landscape",
    tag: "Packaging Line",
  },
  {
    id: "machine-secondary-mill",
    title: "Secondary Fine-Milling Pulverizer",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-06.jpg",
    caption: "Secondary grinding mill calibrated for fine spice powders to meet international culinary specifications.",
    location: "Milling Hall, Ikorodu",
    aspect: "landscape",
    tag: "Fine Grinding",
  },
  {
    id: "machine-feeder-hopper",
    title: "Stainless Steel Hopper & Feeding Station",
    category: "factory",
    categoryLabel: "Factory",
    image: "/img/gallery/machine-04.jpg",
    caption: "Heavy-duty food-grade hopper delivering controlled continuous feed to the primary processing line.",
    location: "Processing Hall, Ikorodu",
    aspect: "landscape",
    tag: "Feeding Hopper",
  },

  // ==================== FARM ====================
  {
    id: "farm-elder-meeting",
    title: "Outgrower Farmer Dialogue & Community Council",
    category: "farm",
    categoryLabel: "Farm",
    image: "/img/gallery/farm-community-02.jpg",
    caption: "Company leadership engaging in community consultation and fair-pricing agreements with village elders.",
    location: "Northern Agricultural Outgrower Belt",
    aspect: "landscape",
    tag: "Farmer Council",
  },
  {
    id: "farm-riverbank-gathering",
    title: "Riverbank Outgrower Farming Community",
    category: "farm",
    categoryLabel: "Farm",
    image: "/img/gallery/farm-community-01.jpg",
    caption: "TG Agri Farms field coordinators with smallholder farmer families along the riverbank agricultural basin.",
    location: "River Valley Farming Basin, Nigeria",
    aspect: "landscape",
    tag: "Outgrower Network",
  },
  {
    id: "farm-harvest-mountains",
    title: "Chilli Harvest & Sun-Drying Procurement Yard",
    category: "farm",
    categoryLabel: "Farm",
    image: "/img/gallery/farm-harvest-yard.png",
    caption: "Vast mountains of sun-dried red chillies undergoing grading and moisture testing at regional aggregation depots.",
    location: "Northern Spice Aggregation Depot",
    aspect: "portrait",
    tag: "Harvest Depot",
  },
  {
    id: "farm-chilli-fields",
    title: "Good Earth Outgrower Cultivation Fields",
    category: "farm",
    categoryLabel: "Farm",
    image: "/img/photo-chilli-farm.png",
    caption: "Lush green chilli plantations cultivated under Good Earth agronomy training and GAP standards.",
    location: "Kaduna Agricultural Belt, Nigeria",
    aspect: "landscape",
    tag: "Chilli Cultivation",
  },
  {
    id: "farm-nursery-seedlings",
    title: "Nursery Seedlings & Soil Propagation",
    category: "farm",
    categoryLabel: "Farm",
    image: "/img/photo-seedlings.png",
    caption: "High-yield disease-resistant chilli and ginger seedlings nurtured before distribution to outgrowers.",
    location: "Nursery Propagation Center",
    aspect: "landscape",
    tag: "Seedling Nursery",
  },
  {
    id: "farm-drying-beds",
    title: "Traditional Raised Sun-Drying Beds",
    category: "farm",
    categoryLabel: "Farm",
    image: "/img/photo-drying.jpg",
    caption: "Sun-drying freshly harvested chillies on raised mesh beds to reduce moisture naturally by ~85%.",
    location: "Outgrower Drying Station",
    aspect: "landscape",
    tag: "Natural Sun-Drying",
  },
  {
    id: "farm-chilli-hand",
    title: "Prime Quality Ripe Hot Chilli",
    category: "farm",
    categoryLabel: "Farm",
    image: "/img/photo-chilli-hand.jpg",
    caption: "Close-up of freshly picked premium bird's eye chilli exhibiting deep crimson color and natural gloss.",
    location: "Farm Gate Inspection",
    aspect: "landscape",
    tag: "Crop Quality",
  },
  {
    id: "farm-sundry-inspection",
    title: "Field Procurement Quality Inspection",
    category: "farm",
    categoryLabel: "Farm",
    image: "/img/photo-sundry.jpg",
    caption: "Field officers inspecting sun-dried chilli batches for moisture content before transport to Kaduna warehouse.",
    location: "Field Aggregation Center",
    aspect: "landscape",
    tag: "Field Quality Check",
  },
  {
    id: "farm-community-outreach",
    title: "Outgrower Farmer Community Outreach & Engagement",
    category: "farm",
    categoryLabel: "Farm",
    image: "/img/gallery/outgrower-community-outreach.jpg",
    caption: "Direct community engagement, input support, and fair-pricing transparency with rural spice cultivating households.",
    location: "Rural Farming Cluster, Nigeria",
    aspect: "landscape",
    tag: "Farmer Outreach",
  },

  // ==================== MARKETING ====================
  {
    id: "transit-brt-rear",
    title: "Lagos Transit Campaign — Correct Peppe Full Rear Wrap",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/transit-01.jpg",
    caption: "Good Earth full rear wrap on Lagos commuter BRT bus highlighting authentic Nigerian seasoning.",
    location: "Ikorodu Expressway, Lagos",
    aspect: "portrait",
    tag: "BRT Transit Wrap",
  },
  {
    id: "transit-brt-side-1",
    title: "Full Side Wrap Transit Bus — Goodearth Hot Peppe",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/transit-02.jpg",
    caption: "Large-format bus side wrap commercial campaign travelling daily commuter corridors across Lagos.",
    location: "Lagos Metropolitan Transit Route",
    aspect: "landscape",
    tag: "Transit Campaign",
  },
  {
    id: "transit-brt-side-2",
    title: "Metropolitan Commuter Transit Bus Fleet",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/transit-03.jpg",
    caption: "Good Earth branded transit fleet promoting authentic locally-sourced spices to millions of commuters.",
    location: "Ikorodu Road Arterial, Lagos",
    aspect: "landscape",
    tag: "Fleet Branding",
  },
  {
    id: "transit-brt-highway",
    title: "Highway Commuter Transit Billboard Bus",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/transit-04.jpg",
    caption: "High-impact mobile billboard transit advertising reaching consumers and retail shop owners across Lagos.",
    location: "Lagos Major Highway Corridor",
    aspect: "landscape",
    tag: "Mobile Billboard",
  },
  {
    id: "transit-brt-corridor",
    title: "Goodearth BRT Bus on Active Daily Route",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/transit-05.jpg",
    caption: "Daily transit bus operating between Ikorodu and Lagos Island carrying Good Earth branding.",
    location: "Ikorodu - CMS Transit Line",
    aspect: "landscape",
    tag: "Active Route",
  },
  {
    id: "transit-brt-roadside",
    title: "Commuter Bus Roadside Promotion",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/transit-06.jpg",
    caption: "Full wrap branding creating nationwide brand familiarity and consumer loyalty across Lagos State.",
    location: "Lagos Transit Corridor",
    aspect: "landscape",
    tag: "Brand Awareness",
  },
  {
    id: "market-stall-01",
    title: "Nigerian Open-Air Market Spice Stall",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-01.jpg",
    caption: "Bustling local market stall showcasing traditional woven baskets of premium red peppers and seasoning.",
    location: "Mile 12 Market, Lagos",
    aspect: "landscape",
    tag: "Open-Air Market",
  },
  {
    id: "market-bulk-03",
    title: "Wholesale Spice Distribution Stall",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-03.jpg",
    caption: "Bulk spice retailer servicing restaurants, caterers, and neighbourhood grocery kiosks.",
    location: "Bodija Market, Ibadan",
    aspect: "landscape",
    tag: "Wholesale Depot",
  },
  {
    id: "market-merchant-04",
    title: "Local Spice Merchant Display",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-04.jpg",
    caption: "Vibrant market stall with mounds of dried aromatic spices sourced from Northern Nigerian farms.",
    location: "Oja Oba Market, Osun State",
    aspect: "landscape",
    tag: "Spice Merchant",
  },
  {
    id: "market-depot-06",
    title: "Bustling Regional Spice Procurement Depot",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-06.jpg",
    caption: "Heavy market footfall and active trading of premium spices packaged for commercial kitchens.",
    location: "Kaduna Central Market",
    aspect: "landscape",
    tag: "Regional Market",
  },
  {
    id: "market-display-08",
    title: "Retail Vendor Peppe Display",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-08.jpg",
    caption: "Market trader inspecting spice consistency and vibrant natural red color at her market stand.",
    location: "Abuja Modern Market",
    aspect: "landscape",
    tag: "Retail Stall",
  },
  {
    id: "market-stand-12",
    title: "Market Vendor Stall in Active Trade",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-12.jpg",
    caption: "Nigerian market vendor recommending Good Earth pure ground spices to local families and cooks.",
    location: "Alaba Market, Lagos",
    aspect: "landscape",
    tag: "Local Trade",
  },
  {
    id: "award-excellence",
    title: "Marketing Edge Brand Excellence Recognition",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/award-01.jpg",
    caption: "National marketing and advertising industry award honoring Good Earth as an outstanding agro-food brand.",
    location: "Marketing Edge Awards, Lagos",
    aspect: "landscape",
    tag: "Brand Award",
  },
  {
    id: "award-press",
    title: "National FMCG Media & Press Acclaim",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/award-02.jpg",
    caption: "Media coverage highlighting Good Earth's contribution to import substitution and backward integration.",
    location: "National Press Feature",
    aspect: "landscape",
    tag: "Media Recognition",
  },
  {
    id: "prod-atarodo-pack",
    title: "Goodearth Pure Atarodo Retail Pack",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/prod-atarodo.jpg",
    caption: "Retail pack of 100% pure dried Scotch Bonnet (Atarodo) offering blazing fruity heat for soups and stews.",
    location: "Retail Distribution",
    aspect: "portrait",
    tag: "Retail Product",
  },
  {
    id: "prod-cameroon-pack",
    title: "Goodearth Cameroon Peppe Retail Pack",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/prod-cameroon-peppe.jpg",
    caption: "Smoked dark pepper with pungent earthy aroma, a staple in Nigerian cooking.",
    location: "Retail Distribution",
    aspect: "portrait",
    tag: "Retail Product",
  },
  {
    id: "prod-hot-peppe-pack",
    title: "Goodearth Hot Peppe Powder Retail Pack",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/prod-hot-peppe-powder.jpg",
    caption: "Everyday fine red pepper powder providing sharp, clean heat for Nigerian family meals.",
    location: "Retail Distribution",
    aspect: "portrait",
    tag: "Retail Product",
  },
  {
    id: "prod-supa-pack",
    title: "Goodearth Hot Peppe Supa Pack",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/prod-hot-peppe-powder-supa-pack.jpg",
    caption: "Value family pack designed for frequent home cooking and commercial caterers.",
    location: "Retail Distribution",
    aspect: "portrait",
    tag: "Supa Pack",
  },
  {
    id: "prod-carton-case",
    title: "Goodearth Master Distribution Cartons",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/prod-hot-peppe-powder-carton.jpg",
    caption: "Corrugated master shipping cases supplying over 12,000 retail stores and supermarkets nationwide.",
    location: "Wholesale Logistics",
    aspect: "portrait",
    tag: "Master Carton",
  },
  {
    id: "prod-atarodo-carton-case",
    title: "Goodearth Pure Atarodo Master Shipping Cartons",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/prod-atarodo-carton.jpg",
    caption: "Bulk packaged corrugated master cartons of Good Earth Pure Atarodo ready for nationwide transport.",
    location: "Central Warehouse, Lagos",
    aspect: "portrait",
    tag: "Wholesale Packaging",
  },
  {
    id: "prod-cameroon-carton-case",
    title: "Goodearth Cameroon Peppe Master Shipping Cartons",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/prod-cameroon-peppe-carton.jpg",
    caption: "Factory-sealed master distribution cartons of authentic smoked Cameroon Peppe for commercial wholesale.",
    location: "Central Warehouse, Lagos",
    aspect: "portrait",
    tag: "Wholesale Packaging",
  },
  {
    id: "prod-supa-carton-case",
    title: "Goodearth Hot Peppe Supa Pack Master Cartons",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/prod-hot-peppe-powder-supa-pack-carton.jpg",
    caption: "Commercial shipping boxes containing Good Earth Hot Peppe Supa Packs for supermarket chains.",
    location: "Logistics Fulfillment Center",
    aspect: "portrait",
    tag: "Wholesale Packaging",
  },
  {
    id: "transit-brt-fleet-lagos",
    title: "Lagos Highway Fleet Transit Advertising",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/transit-07.jpg",
    caption: "Good Earth branded transit buses connecting mainland residential hubs with commercial districts.",
    location: "Lagos Major Highway Corridor",
    aspect: "landscape",
    tag: "Transit Campaign",
  },
  {
    id: "transit-brt-rear-panel",
    title: "Metropolitan Commuter Bus Rear Display Panel",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/transit-08.jpg",
    caption: "High-visibility rear panel advertising driving brand recall across high-density vehicle traffic.",
    location: "Lagos Transit Corridor",
    aspect: "portrait",
    tag: "Transit Display",
  },
  {
    id: "market-pepper-baskets",
    title: "Traditional Market Pepper Basket Procurement",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-05.jpg",
    caption: "Freshly harvested and sun-dried chillies displayed in woven baskets at an indigenous open market.",
    location: "Traditional Produce Market",
    aspect: "landscape",
    tag: "Local Market",
  },
  {
    id: "market-spice-display",
    title: "Local Market Vendor Spice Packaging Display",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-07.jpg",
    caption: "Market stall showcasing packaged and bulk spice varieties for food vendors and everyday shoppers.",
    location: "Lagos Retail Market",
    aspect: "landscape",
    tag: "Market Display",
  },
  {
    id: "market-traders-stocking",
    title: "Nigerian Market Women Stocking Good Earth Spices",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-09.jpg",
    caption: "Market retail traders receiving fresh shipments of sealed Good Earth spice sachets and containers.",
    location: "Bodija Market, Ibadan",
    aspect: "landscape",
    tag: "Market Traders",
  },
  {
    id: "market-wholesale-depot",
    title: "Open-Air Spice Wholesale Depot & Stalls",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-10.jpg",
    caption: "High-volume commodity distribution hub where spices from Northern farms are distributed to retailers.",
    location: "Mile 12 Commercial Hub, Lagos",
    aspect: "landscape",
    tag: "Wholesale Hub",
  },
  {
    id: "market-trader-portrait",
    title: "Authentic Naija Market Spice Trader with Stock",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-11.jpg",
    caption: "Dedicated spice vendor serving local households with genuine, unadulterated Nigerian chilli.",
    location: "Ketu Produce Market, Lagos",
    aspect: "landscape",
    tag: "Market Vendor",
  },
  {
    id: "market-produce-stall",
    title: "Local Food Market Pepper Merchandising",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/market-13.jpg",
    caption: "Vibrant community marketplace connecting indigenous farm harvests with urban dining tables.",
    location: "Regional Food Market",
    aspect: "landscape",
    tag: "Community Market",
  },
  {
    id: "award-trophy-display",
    title: "Marketing Edge Winner Trophy Showcase",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/award-03.jpg",
    caption: "The coveted Edge Award trophy awarded to Good Earth as Outstanding Indigenous Naija Spice of the Year.",
    location: "Marketing Edge Awards, Lagos",
    aspect: "landscape",
    tag: "Industry Award",
  },
  {
    id: "award-certificate-display",
    title: "Marketing Edge 2025 Certificate of Recognition",
    category: "marketing",
    categoryLabel: "Marketing",
    image: "/img/gallery/award-04.jpg",
    caption: "Official certificate conferred by Marketing Edge honoring Good Earth's excellence in spice processing.",
    location: "Marketing Edge Awards, Lagos",
    aspect: "landscape",
    tag: "Award Certificate",
  },
];
