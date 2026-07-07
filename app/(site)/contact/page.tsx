import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Contact from "@/components/site/Contact";
import ContactMap from "@/components/site/ContactMap";

export const metadata: Metadata = {
  title: "Contact · Goodearth Foods",
  description:
    "Get in touch with TG Agri Farms / Goodearth Foods - Ikorodu, Lagos. Enquiries for consumer, bulk, export and distribution partnerships.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={<>Make we talk business</>}
        subtitle="Whether you cook for a family, supply a nation or invest for the long term, we'd love to hear from you."
        crumb="Contact"
        tone="chilli"
      />
      <Contact />
      <ContactMap />
    </>
  );
}
