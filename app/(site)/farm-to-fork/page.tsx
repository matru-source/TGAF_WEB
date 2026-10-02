import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import FarmToFork from "@/components/site/FarmToFork";

export const metadata: Metadata = {
  title: "Farm-to-Fork · Goodearth Foods",
  description: "Our farm-to-fork value chain - cultivation, sun-drying, processing, steam sterilisation and packing, fully traceable.",
};

export default function FarmToForkPage() {
  return (
    <>
      <PageHero
        eyebrow="Farm to fork"
        title={<>An integrated value chain</>}
        subtitle="We manage the whole journey - from smallholder farms to the markets and kitchens of Nigeria."
        crumb="Farm-to-Fork"
        tone="warm"
      />
      <FarmToFork />
    </>
  );
}
