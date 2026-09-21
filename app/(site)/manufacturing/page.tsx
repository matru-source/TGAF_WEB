import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Manufacturing from "@/components/site/Manufacturing";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Manufacturing Facility · Goodearth Foods",
  description: "Our US$12M automated processing facility in Ikorodu - 3,000 MT annual plant capacity, steam sterilisation, hygienic automation and 2,000 MT storage.",
};

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title={<>World-class processing at Ikorodu</>}
        subtitle="A US$12M automated plant built around every food-safety norm, with 3,000 MT annual plant capacity of finished spice."
        crumb="Manufacturing"
        tone="green"
      />
      <Manufacturing />
      <CtaBand title="Interested in our capability?" text="Arrange a facility visit or request a technical spec sheet." ctaLabel="Get in touch" />
    </>
  );
}
