import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import Analytics from "@/components/site/Analytics";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Goodearth Foods · TG Agri Farms Ltd - Farm to Fork Spices, Nigeria",
  description:
    "Goodearth Foods by TG Agri Farms Ltd - premium farm-to-fork chilli, turmeric and ginger spices, processed in our world-class Ikorodu facility. Na Correct! Naija Peppe.",
  metadataBase: new URL("https://goodearthagriventures.com"),
  openGraph: {
    title: "Goodearth Foods - Farm to Fork Spices, Nigeria",
    description:
      "Premium chilli, turmeric and ginger - grown by Nigerian hands, processed to world-class standards.",
    type: "website",
  },
  // Favicon is served automatically from app/icon.png (and app/apple-icon.png).
};

export const viewport: Viewport = {
  themeColor: "#B5121B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
