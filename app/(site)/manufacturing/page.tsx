import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Manufacturing from "@/components/site/Manufacturing";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Manufacturing Facility · Goodearth Foods",
  description: "Our US$10M automated processing facility in Ikorodu - 20 MT/day capacity, steam sterilisation, hygienic automation and 2,000 MT storage.",
};

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title={<>World-class processing at Ikorodu</>}
        subtitle="A US$10M automated plant built around every food-safety norm, producing up to 20 MT of finished spice per day."
        crumb="Manufacturing"
        tone="green"
      />
      <Manufacturing />
      <CtaBand title="Interested in our capability?" text="Arrange a facility visit or request a technical spec sheet." ctaLabel="Get in touch" />
    </>
  );
}
