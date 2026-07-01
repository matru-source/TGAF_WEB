import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import StatsStrip from "@/components/site/StatsStrip";
import LocalMarketBand from "@/components/site/LocalMarketBand";
import SpiceTrio from "@/components/site/SpiceTrio";
import FeaturedProducts from "@/components/site/FeaturedProducts";
import ValueProps from "@/components/site/ValueProps";
import Testimonials from "@/components/site/Testimonials";
import Markets from "@/components/site/Markets";
import CtaBand from "@/components/site/CtaBand";
import { getProducts, getStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, stats] = await Promise.all([getProducts(), getStats()]);
  const featured = products.find((p) => p.featured && p.image) ?? products.find((p) => p.image);

  return (
    <>
      <Hero featuredImage={featured?.image ?? "/img/product-hot-peppe.png"} />
      <Marquee />
      <StatsStrip stats={stats} />
      <LocalMarketBand />
      <SpiceTrio />
      <FeaturedProducts products={products} />
      <ValueProps />
      <Testimonials />
      <Markets />
      <CtaBand />
    </>
  );
}
