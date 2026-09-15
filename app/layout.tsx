import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Analytics from "@/components/site/Analytics";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  style: ["normal", "italic"],
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TG Agri Farms Ltd - Farm to Fork Spices, Nigeria",
  description:
    "Goodearth Foods by TG Agri Farms Ltd - premium farm-to-fork chilli, turmeric and ginger spices, processed in our world-class Ikorodu facility. Na Correct! Naija Peppe.",
  metadataBase: new URL("https://tgagrifarms.com"),
  openGraph: {
    title: "Goodearth Foods - Farm to Fork Spices, Nigeria",
    description:
      "Premium chilli, turmeric and ginger - grown by Nigerian hands, processed to world-class standards.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/icon.png?v=2", type: "image/png" },
    ],
    apple: "/apple-icon.png?v=2",
  },
};

export const viewport: Viewport = {
  themeColor: "#B5121B",
  width: 1200,
  initialScale: 0.1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
