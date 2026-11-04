export interface DistributorMetric {
  value: string;
  label: string;
  sub: string;
}

export interface DistributorHub {
  id: string;
  name: string;
  businessName: string;
  city: string;
  state: string;
  region: "South-West" | "South-East" | "North-West & North" | "South-South" | "North-Central";
  marketHub: string;
  tier: "Super Stockist" | "Key Wholesale Distributor" | "Regional Mega Hub";
  outletsServed: string;
  specialization: string;
  image: string;
  highlight: string;
  badge: string;
}

export interface CommercialPerson {
  id: string;
  name: string;
  role: string;
  division: string;
  credentials?: string;
  photo: string | null;
  initials?: string;
  focus: string;
  bio: string;
  badge: string;
  keyContributions: string[];
}

export interface DistributorVoice {
  id: string;
  name: string;
  businessName: string;
  role: string;
  market: string;
  state: string;
  quote: string;
  accent: "chilli" | "turmeric" | "ginger";
  favoriteProduct: string;
  tenure: string;
  image?: string;
}

export interface PartnershipBenefit {
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

export const DISTRIBUTOR_METRICS: DistributorMetric[] = [
  { value: "250+", label: "Key Distributors", sub: "Super-stockists & tier-1 trade partners" },
  { value: "2,600+", label: "Wholesale Depots", sub: "Supplying bulk sachets & commercial cartons" },
  { value: "12,000+", label: "Retail Stockists", sub: "Market women, provision stores & supermarkets" },
  { value: "100+", label: "Farmer Markets", sub: "Direct trade presence in major regional hubs" },
  { value: "17+", label: "States Covered", sub: "Reaching all 5 geopolitical zones nationwide" },
  { value: "3,000 MT", label: "Factory Capacity", sub: "Continuous sterile supply from Ikorodu, Lagos" },
];

export const DISTRIBUTOR_HUBS: DistributorHub[] = [
  {
    id: "lagos-alaba",
    name: "Chief Oladipo Distribution Ltd",
    businessName: "Oladipo Mega Foods & Spices",
    city: "Alaba / Ketu",
    state: "Lagos State",
    region: "South-West",
    marketHub: "Alaba International & Ketu Produce Market",
    tier: "Regional Mega Hub",
    outletsServed: "180+ Neighbourhood Kiosks & Retailers",
    specialization: "Hot Peppe (5g & 100g) · Supa Pack · Turmeric",
    image: "/img/gallery/market-01.jpg",
    highlight: "Primary transit logistics link moving over 600 cartons monthly across Lagos Mainland and commercial retail avenues.",
    badge: "Top Volume Partner",
  },
  {
    id: "lagos-mile12",
    name: "Alhaja Kudirat & Sons Foodstuffs",
    businessName: "Kudirat Spice Ventures",
    city: "Mile 12 Commercial Axis",
    state: "Lagos State",
    region: "South-West",
    marketHub: "Mile 12 Mega Wholesale Market",
    tier: "Super Stockist",
    outletsServed: "120+ Open-Air Market Pepper Stalls",
    specialization: "Hot Peppe Powder · Pure Atarodo · Master Cartons",
    image: "/img/gallery/market-10.jpg",
    highlight: "Serving wholesale traders, restaurant suppliers, and street food caterers in Nigeria's busiest foodstuffs hub.",
    badge: "Market Pillar",
  },
  {
    id: "onitsha-central",
    name: "Chief Emeka Eze Distribution Network",
    businessName: "Eze & Brothers Commercial Spices",
    city: "Onitsha",
    state: "Anambra State",
    region: "South-East",
    marketHub: "Onitsha Main Market & Relief Market",
    tier: "Regional Mega Hub",
    outletsServed: "240+ Sub-Distributors across South-East",
    specialization: "Ose Di Oku · Cameroon Peppe · Hot Peppe",
    image: "/img/gallery/market-06.jpg",
    highlight: "Leading the distribution of indigenous blends across Anambra, Imo, and Enugu with dedicated warehouse capacity.",
    badge: "Eastern Flagship Hub",
  },
  {
    id: "aba-ariaria",
    name: "Obi & Associates Wholesale Mart",
    businessName: "Obi Agro-Spice Logistics",
    city: "Aba",
    state: "Abia State",
    region: "South-East",
    marketHub: "Ariaria International Market",
    tier: "Super Stockist",
    outletsServed: "150+ Wholesalers & Commercial Caterers",
    specialization: "Cameroon Peppe · Ginger Powder · Master Cartons",
    image: "/img/gallery/market-03.jpg",
    highlight: "High-volume distributor fueling commercial catering, hotel kitchens, and micro-retailers throughout Abia and surrounding trade routes.",
    badge: "High Growth Partner",
  },
  {
    id: "kano-dawanau",
    name: "Danjuma Agro-Allied Distributorship",
    businessName: "Alhaji Danjuma Commercial Depot",
    city: "Kano Central",
    state: "Kano State",
    region: "North-West & North",
    marketHub: "Dawanau Grain & Spice Market",
    tier: "Regional Mega Hub",
    outletsServed: "210+ Northern Retail Outlets & Aggregators",
    specialization: "Ginger · Turmeric · Hot Peppe Sacks & Cartons",
    image: "/img/gallery/market-04.jpg",
    highlight: "Strategic Northern gateway distributor linking wholesale commodity channels and cross-regional spice networks.",
    badge: "Northern Star Partner",
  },
  {
    id: "ibadan-bodija",
    name: "Adeleke Foods & Spice Logistics",
    businessName: "Adeleke Premium Distribution",
    city: "Ibadan",
    state: "Oyo State",
    region: "South-West",
    marketHub: "Bodija Market & Dugbe Commercial Hub",
    tier: "Super Stockist",
    outletsServed: "135+ Supermarkets & Market Vendors",
    specialization: "Full Consumer Range · 100g Pouches & 8g Sachets",
    image: "/img/gallery/market-09.jpg",
    highlight: "Empowering hundreds of market women and neighbourhood stores across Oyo, Osun, and Ogun states.",
    badge: "Women-Trader Champion",
  },
  {
    id: "ph-oilmill",
    name: "Garden City Food Distribution Hub",
    businessName: "Garden City Spices & Seasoning Ltd",
    city: "Port Harcourt",
    state: "Rivers State",
    region: "South-South",
    marketHub: "Oil Mill Market & Mile 1 Market",
    tier: "Super Stockist",
    outletsServed: "160+ Restaurants, Hotels & Retail Kiosks",
    specialization: "Cameroon Peppe · Ose Di Oku · Hot Peppe Supa Pack",
    image: "/img/gallery/market-08.jpg",
    highlight: "Supplying the vibrant Niger Delta hospitality sector, industrial kitchens, and regional supermarket chains.",
    badge: "Hospitality & Retail Pioneer",
  },
  {
    id: "kaduna-central",
    name: "Northern Prime Agro Distributors",
    businessName: "Prime Spices Commercial Hub",
    city: "Kaduna Central",
    state: "Kaduna State",
    region: "North-West & North",
    marketHub: "Kaduna Central Market & Sheikh Abubakar Gumi Market",
    tier: "Key Wholesale Distributor",
    outletsServed: "95+ Wholesale Stalls & Institutional Buyers",
    specialization: "Ginger Powder · Turmeric · Hot Peppe",
    image: "/img/gallery/market-12.jpg",
    highlight: "Anchoring consumer distribution in Kaduna and coordinating with outgrower farm aggregation hubs.",
    badge: "Agro-Trade Link",
  },
  {
    id: "asaba-ogbogonogo",
    name: "Delta Prime Food Distribution",
    businessName: "Delta Spice Network",
    city: "Asaba",
    state: "Delta State",
    region: "South-South",
    marketHub: "Ogbogonogo Modern Market & Warri Main Market",
    tier: "Key Wholesale Distributor",
    outletsServed: "110+ Retail Outlets & Street Food Vendors",
    specialization: "Hot Peppe · Pure Atarodo · Cameroon Peppe",
    image: "/img/gallery/market-07.jpg",
    highlight: "Rapidly expanding retail reach across the Niger River trade corridor with exceptional fulfillment speed.",
    badge: "Fast-Track Partner",
  },
  {
    id: "benin-oba",
    name: "Edo Heritage Wholesale Network",
    businessName: "Oba Spice Commercial Ventures",
    city: "Benin City",
    state: "Edo State",
    region: "South-South",
    marketHub: "Oba Market & New Benin Market",
    tier: "Key Wholesale Distributor",
    outletsServed: "85+ Local Grocers & Native Soup Caterers",
    specialization: "Ose Di Oku · Hot Peppe · Atarodo",
    image: "/img/gallery/market-13.jpg",
    highlight: "Supplying iconic Edo culinary establishments and open-air food vendors with 100% pure Nigerian chilli.",
    badge: "Heritage Supporter",
  },
];

export const COMMERCIAL_PERSONS: CommercialPerson[] = [
  {
    id: "fred-nze",
    name: "Fred Nze",
    role: "Sales Capability & Market Development",
    division: "Commercial & Trade Capability",
    credentials: "14+ Yrs Commercial FMCG Leadership",
    photo: "/img/team/fred-nze.jpg",
    badge: "Trade Capability Leader",
    focus: "Distributor growth, retail capability, nationwide promotional drives & supermarket activations.",
    bio: "With over 14 years of commercial marketing and trade leadership across Nigeria, Fred leads on-the-ground distributor capability, partner profitability coaching, and point-of-sale visibility campaigns.",
    keyContributions: [
      "Architected the 250+ distributor partner support programme.",
      "Spearheaded nationwide retail activations and supermarket merchandising.",
      "Championed trade education for open-air market women and retail stockists.",
    ],
  },
  {
    id: "amit-gautam",
    name: "Amit Gautam",
    role: "General Manager - Sales",
    division: "National Commercial Sales",
    credentials: "MBA · Durham Business School, UK",
    photo: "/img/team/amit-gautam.jpg",
    badge: "National Sales Head",
    focus: "National sales strategy, Key Distributor accounts, P&L management & multi-zone expansion.",
    bio: "Bringing 22 years of multinational FMCG food leadership across India and Nigeria, Amit oversees nationwide commercial sales operations, ensuring trade partners receive competitive margins and sustained volume growth.",
    keyContributions: [
      "Expanded distribution footprint across 17+ states and all 5 geopolitical zones.",
      "Instituted structured trade credit and stock turnaround policies for distributors.",
      "Scaled wholesale volume for Hot Peppe, Cameroon, and Ose Di Oku.",
    ],
  },
  {
    id: "stella-ikpe",
    name: "Stella Ikpe",
    role: "Sales and Marketing Coordinator",
    division: "Distributor Operations & Market Coordination",
    credentials: "B.Sc. Marketing · Commercial Execution",
    photo: "/img/team/stella-ikpe.jpg",
    badge: "Operations Coordinator",
    focus: "Distributor order processing, depot stock levels, field intelligence & retail partner liaison.",
    bio: "With over 15 years in commercial sales execution, Stella manages everyday order logistics between the Ikorodu manufacturing plant and regional super-stockists, eliminating delivery bottlenecks.",
    keyContributions: [
      "Oversees 24-hour turnaround for distributor order dispatch.",
      "Manages real-time inventory monitoring across 100+ farmer market depots.",
      "Acts as direct operational point of contact for regional wholesale partners.",
    ],
  },
  {
    id: "swatanter-saraswat",
    name: "Swatanter Saraswat",
    role: "CEO & Executive Director",
    division: "Executive & Manufacturing Leadership",
    credentials: "15+ Yrs African FMCG Manufacturing",
    photo: "/img/team/swatanter-saraswat.jpg",
    badge: "Executive Leadership",
    focus: "Manufacturing reliability, sterile steam processing & zero-backorder supply to distributors.",
    bio: "Leading automated plant operations at our US$12M Ikorodu facility, Swatanter ensures that every carton shipped to our distributors adheres to rigorous NAFDAC, SON, and FSSC 22000 quality benchmarks.",
    keyContributions: [
      "Guarantees 3,000 MT annual production capacity to prevent distributor stock-outs.",
      "Engineered automated cool-grind milling for high volatile oil (VO) retention.",
      "Mentors plant and field logistics teams to uphold food safety standards.",
    ],
  },
  {
    id: "deepak-chainani",
    name: "Deepak Chainani",
    role: "Managing Director",
    division: "Board & Strategic Partnerships",
    credentials: "15+ Yrs International Agribusiness",
    photo: "/img/team/deepak-portrait.jpg",
    badge: "Strategic Vision",
    focus: "Long-term trade alliances, capital investment, backward integration & partner sustainability.",
    bio: "Steering TG Agri Farms and Good Earth Foods with over 15 years in international trade and Nigerian agro-industrial manufacturing, Deepak ensures that distributor partners share in the company's long-term prosperity.",
    keyContributions: [
      "Championed the integration of 50,000+ Nigerian farmers into the national supply chain.",
      "Fosters financial governance and banking relationships that support commercial scale.",
      "Drives the vision of making Good Earth Nigeria's No. 1 culinary cooking partner.",
    ],
  },
  {
    id: "field-operations",
    name: "Nationwide Field Sales & Merchandising Squad",
    role: "Field Execution & Territory Support",
    division: "Regional Ground Operations",
    credentials: "100+ Dedicated Trade & Sales Staff",
    photo: "/img/team-workforce.jpg",
    badge: "On-Ground Champions",
    focus: "Daily market visits, POS display installation, van sales & localized trader assistance.",
    bio: "Our energetic team of over 100 field sales officers, merchandisers, and van delivery operators traverse 100+ farmer markets and retail strips every single day to support our stockists with product placement.",
    keyContributions: [
      "Conduct in-market roadshows, tastings, and retailer sampling activations.",
      "Ensure fresh stock rotation, shelf prominence, and promotional material display.",
      "Provide real-time market feedback to improve packaging and product offerings.",
    ],
  },
];

export const DISTRIBUTOR_VOICES: DistributorVoice[] = [
  {
    id: "voice-1",
    name: "Mama Ngozi",
    businessName: "Ngozi Provisions & Spices",
    role: "Premier Pepper Seller & Wholesaler",
    market: "Mile 12 Market",
    state: "Lagos State",
    quote: "Goodearth peppe na correct one. My customers dey always come back for the bright colour, the true heat, and the sweet aroma. Supply dey steady every week without fail!",
    accent: "chilli",
    favoriteProduct: "Hot Peppe Powder (100g & 5g)",
    tenure: "Partner since 2021",
    image: "/img/gallery/market-01.jpg",
  },
  {
    id: "voice-2",
    name: "Emeka Obi",
    businessName: "Obi Commercial Distributorship",
    role: "Key Regional Distributor",
    market: "Ariaria International Market",
    state: "Aba, Abia State",
    quote: "Consistent supply and fair factory pricing. Goodearth dey 100% reliable - that is why I stock over 400 cartons every week. The Supa Pack is an absolute favorite for caterers.",
    accent: "ginger",
    favoriteProduct: "Hot Peppe Supa Pack & Ginger",
    tenure: "Partner since 2020",
    image: "/img/gallery/market-03.jpg",
  },
  {
    id: "voice-3",
    name: "Chief Jude Okonkwo",
    businessName: "Okonkwo Agro-Commodities",
    role: "Super Stockist",
    market: "Onitsha Main Market",
    state: "Anambra State",
    quote: "When Ose Di Oku entered the South-East market, our retail demand skyrocketed. It has the authentic native aroma of pure Nigerian peppers. Customers now specifically ask for Goodearth by name.",
    accent: "chilli",
    favoriteProduct: "Ose Di Oku (8g) & Cameroon Peppe",
    tenure: "Partner since 2022",
    image: "/img/gallery/market-06.jpg",
  },
  {
    id: "voice-4",
    name: "Blessing Eze",
    businessName: "Blessing Food & Catering Supplies",
    role: "Wholesale Partner & Caterer",
    market: "Oil Mill Market",
    state: "Port Harcourt, Rivers State",
    quote: "The Cameroon Peppe sweet pass! It gives pepper soup and native stews that deep smoky aroma without sand or stone. TG Agri Farms delivers clean, hygienic spices that protect our reputation.",
    accent: "chilli",
    favoriteProduct: "Cameroon Peppe Powder",
    tenure: "Partner since 2022",
    image: "/img/gallery/market-08.jpg",
  },
  {
    id: "voice-5",
    name: "Alhaji Danladi Musa",
    businessName: "Dawanau Spice Depot",
    role: "Central Northern Stockist",
    market: "Dawanau Market",
    state: "Kano State",
    quote: "Working directly with the factory gives us peace of mind. Their dispatch is prompt, packaging is sealed against moisture, and the turmeric and ginger retain their natural volatile oils. Pure quality.",
    accent: "turmeric",
    favoriteProduct: "Turmeric Powder & Ground Ginger",
    tenure: "Partner since 2021",
    image: "/img/gallery/market-04.jpg",
  },
  {
    id: "voice-6",
    name: "Alhaja Sherifat Adeleke",
    businessName: "Adeleke Wholesale Stalls",
    role: "Market Women Leader & Stockist",
    market: "Bodija Market",
    state: "Ibadan, Oyo State",
    quote: "Goodearth supports market women with promotional banners and aprons. The 8g Atarodo and 5g Hot Peppe move faster than any other pepper brand on our shelves. God bless the company!",
    accent: "chilli",
    favoriteProduct: "Atarodo Peppe Powder (8g)",
    tenure: "Partner since 2023",
    image: "/img/gallery/market-09.jpg",
  },
];

export const PARTNERSHIP_BENEFITS: PartnershipBenefit[] = [
  {
    icon: "wallet",
    title: "Attractive Factory-Direct Margins",
    description: "Benefit from structured distributor price tiers, bulk rebate incentives, and healthy profit margins designed for sustainable business growth.",
    highlight: "High ROI & Volume Rebates",
  },
  {
    icon: "shield",
    title: "Zero-Downtime Supply Reliability",
    description: "Our 3,000 MT automated Ikorodu plant and 2,000 MT warehousing guarantee continuous product availability with zero seasonal stock-outs.",
    highlight: "100% Stock Reliability",
  },
  {
    icon: "award",
    title: "Certified Award-Winning Quality",
    description: "Sell with total confidence. NAFDAC, SON, Halal, US FDA accredited and crowned Outstanding Indigenous Naija Spice of the Year.",
    highlight: "High Consumer Trust",
  },
  {
    icon: "users",
    title: "Dedicated Field & Marketing Support",
    description: "Receive branded store signages, market umbrellas, display racks, promotional aprons, and local van merchandising support in your territory.",
    highlight: "On-Ground Trade Support",
  },
  {
    icon: "sprout",
    title: "100% Pure Nigerian Sourced",
    description: "No artificial dyes, no fillers, no adulteration. High-VO spices steam-sterilised for safety while locking in natural colour, aroma, and fiery heat.",
    highlight: "Purity You Can Defend",
  },
  {
    icon: "pin",
    title: "Territory Growth Protection",
    description: "Super-stockists and key wholesale partners enjoy territorial support, lead forwarding, and regional exclusivity considerations in primary market zones.",
    highlight: "Protected Trade Zones",
  },
];

