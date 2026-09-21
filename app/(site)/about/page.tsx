import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import About from "@/components/site/About";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "About · Goodearth Foods",
  description:
    "Goodearth Agriventures / TG Agri Farms - managing the full farm-to-fork value chain for Nigeria's spice industry.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={<>Nigeria&apos;s integrated spice company</>}
        subtitle="We manage the whole journey - from smallholder farms to the markets and kitchens of Nigeria."
        crumb="About"
        tone="green"
      />
      <About />
      <CtaBand title="Partner with a team that knows the land" ctaLabel="Talk to us" />
    </>
  );
}
