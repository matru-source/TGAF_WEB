import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import DistributorsView from "@/components/site/DistributorsView";

export const metadata: Metadata = {
  title: "Celebrations · Goodearth Foods",
  description:
    "Celebrating Madam Ifueko Mabel Ozigbo, CEO of Osagiodagbon Ventures, on her birthday — warm felicitations and gratitude from all of us at TG Agri Farms Ltd and Good Earth.",
  keywords: [
    "Goodearth celebrations",
    "Madam Ifueko Mabel Ozigbo",
    "Osagiodagbon Ventures",
    "Goodearth distributors",
    "TG Agri Farms celebration",
    "distributor spotlight",
  ],
};

export default function DistributorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Special Celebration · 4th November"
        title={<>Celebrating Madam Ifueko Mabel Ozigbo</>}
        subtitle="Warmest birthday felicitations to the CEO of Osagiodagbon Ventures and our esteemed key distribution partner — wishing you joy, sound health, and continued success from all of us at TG Agri Farms Ltd."
        crumb="Celebrations"
        tone="distributors"
      />
      <DistributorsView />
    </>
  );
}
