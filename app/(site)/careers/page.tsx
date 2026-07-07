import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Careers from "@/components/site/Careers";

export const metadata: Metadata = {
  title: "Careers · Goodearth Foods",
  description: "Build a career with purpose at TG Agri Farms - roles across manufacturing, quality, sales and supply chain.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>Come grow with us</>}
        subtitle="Purpose-driven, world-class work with real room for youth and women to build careers."
        crumb="Careers"
        tone="chilli"
      />
      <Careers />
    </>
  );
}
