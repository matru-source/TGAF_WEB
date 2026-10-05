import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import About from "@/components/site/About";

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
        title={<>Nigeria&apos;s Integrated Spice Manufacturer</>}
        subtitle="Managing the entire journey from local smallholder farms to commercial markets and family kitchens."
        crumb="About"
        tone="about"
      />
      <About />
    </>
  );
}
