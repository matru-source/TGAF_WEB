import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Manufacturing from "@/components/site/Manufacturing";

export const metadata: Metadata = {
  title: "Manufacturing Facility · Goodearth Foods",
  description: "Our world-class automated processing facility in Ikorodu - 3,000 MT annual plant capacity, steam sterilisation, hygienic automation and 2,000 MT storage.",
};

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title={<>World-class processing at Ikorodu</>}
        subtitle="An advanced automated plant built around every food-safety norm, with 3,000 MT annual plant capacity of finished spice."
        crumb="Manufacturing"
        tone="manufacturing"
      />
      <Manufacturing />
    </>
  );
}
