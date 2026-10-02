import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import StatsStrip from "@/components/site/StatsStrip";
import LocalMarketBand from "@/components/site/LocalMarketBand";
import ValueProps from "@/components/site/ValueProps";
import TrustMetricsStrip from "@/components/site/TrustMetricsStrip";
import Testimonials from "@/components/site/Testimonials";
import Markets from "@/components/site/Markets";
import CtaBand from "@/components/site/CtaBand";
import { getStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const stats = await getStats();

  return (
    <>
      <Hero />
      <Marquee />
      <section className="home-sec-2-wrap" aria-label="Our Traction and Farm Story">
        {/* Code-driven responsive background layers */}
        <div className="code-sec2-bg" aria-hidden="true">
          <div className="code-sec2-gradient" />
          <div className="code-sec2-sun-glow" />
          <div className="code-sec2-ambient-glow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/about-foliage-left.png?v=3"
            alt=""
            className="code-sec2-leaf-left"
            loading="eager"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/about-harvest-right.png?v=3"
            alt=""
            className="code-sec2-harvest-right"
            loading="eager"
          />
        </div>
        <StatsStrip stats={stats} />
        <LocalMarketBand />
      </section>
      <TrustMetricsStrip />
      <ValueProps />
      <Testimonials />
      <Markets withNote={false} />
      <CtaBand isHomeSec7={true} />
    </>
  );
}
