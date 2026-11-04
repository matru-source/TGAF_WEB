import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import DistributorsView from "@/components/site/DistributorsView";

export const metadata: Metadata = {
  title: "Our Distributors & Trade Champions · Goodearth Foods",
  description:
    "Celebrating the 250+ key distributors, 2,600+ wholesalers, 12,000+ retailers, and commercial leadership team powering Goodearth spices across Nigeria.",
  keywords: [
    "Goodearth distributors",
    "Goodearth foods wholesale",
    "hot peppe distributor Nigeria",
    "spice distributors Lagos Onitsha Kano Aba",
    "become Goodearth distributor",
    "TG Agri Farms trade partners",
  ],
};

export default function DistributorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nationwide Trade Champions · Goodearth Network"
        title={<>Celebrating Our Distributors &amp; Trade Champions</>}
        subtitle="Honouring the 250+ key distributors, 2,600+ wholesalers, 12,000+ market women, and dedicated commercial leaders bringing Goodearth spices from our Ikorodu factory to millions of Nigerian dining tables."
        crumb="Distributors"
        tone="distributors"
      />
      <DistributorsView />
    </>
  );
}
