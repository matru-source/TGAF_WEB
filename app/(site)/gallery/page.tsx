import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import GalleryView from "@/components/site/GalleryView";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Visual Gallery & Operations · Goodearth Foods",
  description:
    "Explore Goodearth's authentic journey in pictures: from Nigerian outgrower farm communities and modern Ikorodu processing facilities to metropolitan Lagos transit campaigns and award-winning retail spices.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Authentic Visual Archive"
        title={<>Our Journey in Pictures</>}
        subtitle="From Nigerian outgrower fields and modern factory floors to bustling Lagos transit corridors and consumer kitchens nationwide."
        crumb="Gallery"
        tone="warm"
      />
      <GalleryView />
      <CtaBand
        title="Partner with an award-winning indigenous spice producer"
        text="From smallholder farming partnerships to high-capacity milling in Ikorodu — experience the finest standards in Nigerian spice processing."
        ctaLabel="Contact our team"
        ctaHref="/contact"
      />
    </>
  );
}
