import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import DistributorsView from "@/components/site/DistributorsView";

export const metadata: Metadata = {
  title: "Distributor Celebrations & Trade Honors · Goodearth Foods",
  description:
    "Celebrating our nationwide distributor partners, trade champions, birthdays, and inspiring milestones across Nigeria — honours from TG Agri Farms Ltd and Good Earth.",
  keywords: [
    "Goodearth distributor celebrations",
    "distributor trade honours",
    "Madam Ifueko Mabel Ozigbo",
    "Osagiodagbon Ventures",
    "Goodearth distributors Nigeria",
    "TG Agri Farms partner milestones",
  ],
};

export default function DistributorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nationwide Trade Network · Partner Honors & Milestones"
        title={<>Distributor Celebrations &amp; Trade Honors</>}
        subtitle="Honouring the birthdays, achievements, regional milestones, and inspiring stories of our valued nationwide distributor partners who bring Good Earth spices from our Ikorodu factory to millions of Nigerian tables."
        crumb="Celebrations"
        tone="distributors"
      />
      <DistributorsView />
    </>
  );
}
