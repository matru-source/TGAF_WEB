import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Governance from "@/components/site/Governance";
import Team from "@/components/site/Team";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Leadership · Goodearth Foods",
  description: "Meet the board and management of TG Agri Farms - experienced leadership and governance built for banking and investor confidence.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership & governance"
        title={<>The people steering the company</>}
        subtitle="Experienced directors and management with decades of combined FMCG and agribusiness expertise."
        crumb="Leadership"
        tone="green"
      />
      <Governance />
      <Team />
      <CtaBand title="Want to meet the team?" ctaLabel="Contact us" />
    </>
  );
}
