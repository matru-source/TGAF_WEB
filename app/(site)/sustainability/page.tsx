import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Impact from "@/components/site/Impact";
import EsgPillars from "@/components/site/EsgPillars";

export const metadata: Metadata = {
  title: "Sustainability & ESG · Goodearth Foods",
  description: "Our ESG commitments - 60,000+ jobs and livelihoods created, 20,000+ trained, 100% support to local farmers and food-safety governance.",
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
      <div className="sustainability-unified-canvas">
        <Impact />
        <EsgPillars />
      </div>
    </>
  );
}
