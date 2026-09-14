import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import StatsStrip from "@/components/site/StatsStrip";
import LocalMarketBand from "@/components/site/LocalMarketBand";
import FeaturedProducts from "@/components/site/FeaturedProducts";
import ValueProps from "@/components/site/ValueProps";
import TrustMetricsStrip from "@/components/site/TrustMetricsStrip";
import Testimonials from "@/components/site/Testimonials";
import Markets from "@/components/site/Markets";
import CtaBand from "@/components/site/CtaBand";
import { getProducts, getStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, stats] = await Promise.all([getProducts(), getStats()]);

  return (
    <>
      <Hero />
      <Marquee />
      <StatsStrip stats={stats} />
      <LocalMarketBand />
      <FeaturedProducts products={products} />
      <TrustMetricsStrip />
      <ValueProps />
      <Testimonials />
      <Markets />
      <CtaBand />
    </>
  );
}
