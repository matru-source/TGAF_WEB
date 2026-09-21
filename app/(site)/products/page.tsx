import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Products from "@/components/site/Products";
import CtaBand from "@/components/site/CtaBand";
import { getProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products · Goodearth Foods",
  description:
    "Goodearth chilli, turmeric and ginger - consumer packs and bulk B2B formats. Hot Peppe, Atarodo and Cameroon Peppe powders.",
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <PageHero
        eyebrow="Our portfolio"
        title={<>Peppe, turmeric &amp; ginger for everybody</>}
        subtitle="A complete range across consumer packs and bulk formats - sabi quality from farm to pot."
        crumb="Products"
        tone="chilli"
      />
      <Products products={products} />
      <CtaBand title="Need bulk supply for your business?" ctaLabel="Request a quote" />
    </>
  );
}
