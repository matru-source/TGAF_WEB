import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Presence from "@/components/site/Presence";
import Markets from "@/components/site/Markets";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Markets & Presence · Goodearth Foods",
  description:
    "Goodearth reaches 100+ farmer markets across 17+ Nigerian states and all five geopolitical zones. Find a market near you.",
};

export default function PresencePage() {
  return (
    <>
      <PageHero
        eyebrow="Markets & presence"
        title={<>We dey your market</>}
        subtitle="From farm to processing to shelf - across all five geopolitical zones, 17+ states and 100+ farmer markets."
        crumb="Markets"
        tone="warm"
      />
      <Presence />
      <Markets />
      <CtaBand title="Carry correct peppe for your market" text="Join 250 distributors and 2,600+ wholesalers already moving Goodearth." ctaLabel="Become a distributor" />
    </>
  );
}
