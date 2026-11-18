export interface CelebrationSlide {
  id: string;
  src: string;
  alt: string;
  title: string;
  badge?: string;
}

export interface CelebrationPost {
  id: string;
  postNumber: string;
  category: "birthday" | "milestone" | "partner-spotlight";
  categoryLabel: string;
  date: string;
  badge: string;
  personName: string;
  role: string;
  company: string;
  region: string;
  quote: string;
  quoteAuthor: string;
  paragraphs: string[];
  highlights: { icon: string; text: string }[];
  slides: CelebrationSlide[];
  isFeatured?: boolean;
}

export const DISTRIBUTOR_CELEBRATION_POSTS: CelebrationPost[] = [
  {
    id: "madam-ifueko-ozigbo-birthday",
    postNumber: "POST #01",
    category: "birthday",
    categoryLabel: "Birthday Celebration Spotlight",
    date: "4th November 2026",
    badge: "🎉 Special Birthday Celebration",
    personName: "Madam Ifueko Mabel Ozigbo",
    role: "Chief Executive Officer, Osagiodagbon Ventures · Key Distribution Partner",
    company: "Osagiodagbon Ventures",
    region: "Edo State & South-South Trade Hub",
    quote: "Wishing you a joyful birthday and a year filled with good health, happiness, and continued success.",
    quoteAuthor: "Official Wishes from TG Agri Farms Ltd & Good Earth",
    paragraphs: [
      "Today, the Board, Leadership, and the entire Good Earth family joyously celebrate Madam Ifueko Mabel Ozigbo on the special occasion of her birthday. As the visionary CEO of Osagiodagbon Ventures, she represents the pinnacle of commercial excellence, dedication, and inspiring leadership across Nigeria's food distribution landscape.",
      "Through her trusted partnership, authentic Good Earth seasonings — Hot Peppe, Cameroon Peppe, Atarodo, and Ose Di Oku — reach countless wholesale hubs, retail markets, and family kitchens every day with unbroken reliability. We honour her steadfast vision, market stewardship, and treasured friendship.",
      "As you step into another prosperous year, we pray that your path continues to be illuminated with divine health, peaceful prosperity, and boundless commercial milestones. Happy Birthday!",
    ],
    highlights: [
      { icon: "🎂", text: "Celebration: 4th November" },
      { icon: "🏢", text: "Osagiodagbon Ventures" },
      { icon: "🌶️", text: "Good Earth Key Distributor" },
      { icon: "✨", text: "Health, Joy & Success" },
    ],
    slides: [
      {
        id: "portrait",
        badge: "4th November · Birthday Tribute",
        src: "/img/celebrations/madam-ifueko-ozigbo-birthday-portrait.jpg",
        alt: "Celebrating Madam Ifueko Mabel Ozigbo, CEO Osagiodagbon Ventures - 4th November Birthday Poster",
        title: "Madam Ifueko Mabel Ozigbo - 4th November Birthday Poster",
      },
      {
        id: "card",
        badge: "Official Birthday Felicitations",
        src: "/img/celebrations/madam-ifueko-ozigbo-birthday-card.jpg",
        alt: "Official Birthday Card from TG Agri Farms Ltd & Good Earth to Madam Ifueko Mabel Ozigbo",
        title: "Official Birthday Card - TG Agri Farms Ltd & Good Earth",
      },
    ],
    isFeatured: true,
  },
];
