import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import NewsList from "@/components/site/NewsList";

export const metadata: Metadata = {
  title: "News & Media · Goodearth Foods",
  description: "Latest news and updates from TG Agri Farms - operations, community and growth.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & media"
        title={<>What&apos;s happening at Goodearth</>}
        subtitle="Updates from our farms, facility and markets across Nigeria."
        crumb="News"
        tone="green"
      />
      <NewsList />
    </>
  );
}
