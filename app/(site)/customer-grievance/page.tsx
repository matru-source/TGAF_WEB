import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import CustomerGrievance from "@/components/site/CustomerGrievance";

export const metadata: Metadata = {
  title: "Customer Grievance & Reviews · Goodearth Foods",
  description:
    "Submit customer complaints, product reviews, and feedback directly to Goodearth Foods. Fast 24-hour turnaround, quality batch investigation, and consumer care.",
  keywords: [
    "Goodearth customer grievance",
    "Goodearth foods review",
    "hot peppe customer care",
    "atarodo feedback",
    "TG Agri Farms consumer care",
    "Nigerian spice reviews",
  ],
};

export default function CustomerGrievancePage() {
  return (
    <>
      <PageHero
        eyebrow="Consumer Care & Feedback"
        title={<>Customer Grievance &amp; Reviews</>}
        subtitle="We hold ourselves to the highest standards of purity, heat, and packaging integrity. Whether you have a complaint, feedback, or a product review, our consumer care team is ready to listen and resolve."
        crumb="Customer Grievance"
        tone="grievance"
      />
      <CustomerGrievance />
    </>
  );
}
