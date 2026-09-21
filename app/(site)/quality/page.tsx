import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Certifications from "@/components/site/Certifications";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Quality & Certifications · Goodearth Foods",
  description: "Food-safety systems, steam sterilisation, full traceability and certifications - NAFDAC, SON, Halal, US FDA, FSSC 22000 and more.",
};

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & certifications"
        title={<>Certified, hygienic, traceable</>}
        subtitle="Food safety and traceability are built into every batch - verified by national and international standards."
        crumb="Quality"
        tone="warm"
      />
      <Certifications />
      <CtaBand title="Exporting or sourcing at scale?" text="Request our certifications pack and technical specifications." ctaLabel="Request documents" />
    </>
  );
}
