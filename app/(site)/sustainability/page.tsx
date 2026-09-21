import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Impact from "@/components/site/Impact";
import EsgPillars from "@/components/site/EsgPillars";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Sustainability & ESG · Goodearth Foods",
  description: "Our ESG commitments - 10,000+ jobs, 700,000 man-days, women-led distribution, 100% support to local farmers and food-safety governance.",
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability & ESG"
        title={<>Growing spices, growing communities</>}
        subtitle="No dependence on imports - strengthening rural economies, farmers and Nigeria's food security."
        crumb="Sustainability"
        tone="green"
      />
      <Impact />
      <EsgPillars />
      <CtaBand title="Partner on impact" text="Support a supply chain that puts Nigerian farmers and families first." ctaLabel="Get involved" />
    </>
  );
}
