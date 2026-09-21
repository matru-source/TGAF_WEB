import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import AwardsView from "@/components/site/AwardsView";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Awards & Recognition · Goodearth Foods",
  description:
    "Goodearth Hot Peppe wins Outstanding Indigenous Naija Spice of the Year at the 13th Marketing Edge Awards 2025 - celebrated across THISDAY and THE PUNCH newspapers.",
};

export default function AwardsPage() {
  return (
    <>
      <PageHero
        eyebrow="National Recognition & Accolades"
        title={<>Honouring Indigenous Excellence</>}
        subtitle="Goodearth Hot Peppe recognised as the Outstanding Indigenous Naija Spice of the Year at the 13th Marketing Edge Awards."
        crumb="Awards"
        tone="warm"
      />
      <AwardsView />
      <CtaBand
        title="Partner with an award-winning indigenous brand"
        text="From smallholder farms to national acclaim - experience the highest standards of Nigerian spice processing."
        ctaLabel="Contact our team"
      />
    </>
  );
}
