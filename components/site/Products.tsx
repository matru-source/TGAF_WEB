"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { B2B_PORTFOLIO, B2B_CUSTOMERS, type UIProduct } from "@/lib/data";
import {
  ProductPedestalCard,
  getProductTagline,
  getProductStageClass,
} from "@/components/site/FeaturedProducts";

export default function Products({ products }: { products: UIProduct[] }) {
  const [tab, setTab] = useState<"b2c" | "b2b">("b2c");
  const b2c = products.filter((p) => p.segment === "B2C");

  // Complete B2C range: Flagship Nigerian peppers + Ginger + Turmeric
  const items = [...b2c]
    .sort((a, b) => {
      const rank = (slug: string) =>
        slug.includes("hot-peppe")
          ? 0
          : slug.includes("atarodo")
          ? 1
          : slug.includes("cameroon")
          ? 2
          : slug.includes("ginger")
          ? 3
          : slug.includes("turmeric")
          ? 4
          : 9;
      return rank(a.slug) - rank(b.slug);
    });

  const b2cSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(b2cSectionRef, { amount: 0.2, once: false });

  const [isMobile, setIsMobile] = useState(false);
  const [activePopIndex, setActivePopIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Sync tab with URL hash if provided (#b2b or #b2c)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#b2b") setTab("b2b");
      else if (hash === "#b2c") setTab("b2c");
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop only: Trigger sequential pop-up wave when B2C tab is active & enters view
  useEffect(() => {
    if (isMobile || tab !== "b2c") return;
    if (!isInView) {
      setActivePopIndex(null);
      setIsAutoPlaying(false);
      return;
    }

    // Start auto wave across all 5 products: 1.2s per card
    setIsAutoPlaying(true);
    setActivePopIndex(0); // Card 1 (Hot Peppe) 0.0s - 1.2s

    const t1 = setTimeout(() => {
      setActivePopIndex(1); // Card 2 (Atarodo) 1.2s - 2.4s
    }, 1200);

    const t2 = setTimeout(() => {
      setActivePopIndex(2); // Card 3 (Cameroon) 2.4s - 3.6s
    }, 2400);

    const t3 = setTimeout(() => {
      setActivePopIndex(3); // Card 4 (Ginger) 3.6s - 4.8s
    }, 3600);

    const t4 = setTimeout(() => {
      setActivePopIndex(4); // Card 5 (Turmeric) 4.8s - 6.0s
    }, 4800);

    const t5 = setTimeout(() => {
      setActivePopIndex(null); // Return to rest
    }, 6000);

    const t6 = setTimeout(() => {
      setIsAutoPlaying(false); // Hover lock releases
    }, 6400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [isInView, isMobile, tab]);

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Our portfolio</span>
          <h2>Spices for every kitchen &amp; every business</h2>
          <p className="muted">
            A complete range across consumer packs and bulk B2B formats — chilli, turmeric and ginger in
            powder, whole, crushed, sliced and kibbled forms.
          </p>
        </div>

        <div className="tabs reveal" role="tablist" aria-label="Product portfolio">
          <button
            className={tab === "b2b" ? "active" : ""}
            role="tab"
            aria-selected={tab === "b2b"}
            onClick={() => setTab("b2b")}
          >
            Business (B2B)
          </button>
          <button
            className={tab === "b2c" ? "active" : ""}
            role="tab"
            aria-selected={tab === "b2c"}
            onClick={() => setTab("b2c")}
          >
            Consumer (B2C)
          </button>
        </div>

        {/* B2C */}
        <div className={`tab-panel${tab === "b2c" ? " active" : ""}`} role="tabpanel">
          {/* Exact Home Page View: Magical Showcase Canvas with 3D Pedestal Cards */}
          <div ref={b2cSectionRef} className="products-magical-section b2c-magical-showcase">
            <div className="container">
              {/* Section Header matching Home Page */}
              <div className="products-magical-head">
                <div>
                  <span className="eyebrow">OUR PRODUCTS</span>
                  <h2 style={{ marginBottom: 0 }}>Kitchen staples, ready for your cooking pot</h2>
                </div>
              </div>

              {/* Pedestal Cards Grid */}
              <motion.div
                className={`pedestal-grid--5 ${isAutoPlaying ? "is-auto-playing" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, staggerChildren: 0.15 }}
              >
                {items.map((prod, index) => (
                  <ProductPedestalCard
                    key={prod.id}
                    product={prod}
                    tagline={getProductTagline(prod.slug)}
                    stageClass={getProductStageClass(prod.slug)}
                    isAutoPopped={activePopIndex === index}
                    isAutoPlaying={isAutoPlaying}
                    isMobile={isMobile}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Brand Extensions & Partnership Strip */}
          <div
            className="reveal"
            style={{
              marginTop: "clamp(24px, 3.5vw, 40px)",
              marginBottom: "clamp(36px, 4.5vw, 56px)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                background: "linear-gradient(135deg, rgba(251, 240, 212, 0.45) 0%, #FFFFFF 100%)",
                border: "1.5px dashed rgba(224, 165, 46, 0.4)",
                borderRadius: "20px",
                padding: "24px 32px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ maxWidth: "680px" }}>
                <span
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "var(--turmeric-deep)",
                    display: "inline-block",
                  }}
                >
                  More on the way
                </span>
                <h3 style={{ marginTop: "6px", marginBottom: "6px", fontSize: "1.25rem" }}>
                  Brand extensions &amp; custom retail blends
                </h3>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--ink-2)" }}>
                  Our category leadership and supply reliability open wide possibilities for new blends, private
                  labels, and custom retail formats.
                </p>
              </div>
              <Link href="/contact" className="btn btn-ghost" style={{ flexShrink: 0 }}>
                Enquire about partnerships <span className="arr">→</span>
              </Link>
            </div>
          </div>

        </div>

        {/* B2B */}
        <div className={`tab-panel${tab === "b2b" ? " active" : ""}`} role="tabpanel">
          <div className="b2b-showcase">
            <div className="b2b-products reveal">
              <h3 className="b2b-col-title">Our B2B products</h3>
              <div className="b2b-rows">
                {B2B_PORTFOLIO.map((c) => (
                  <div className={`b2b-row b2b-row--${c.accent}`} key={c.key}>
                    <div className="b2b-row-label">{c.name}</div>
                    <div className="b2b-forms">
                      {c.forms.map((f) => (
                        <div className="b2b-form" key={f.label}>
                          <span className="b2b-form-photo">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={f.image} alt={`${c.name} - ${f.label}`} loading="lazy" />
                          </span>
                          <span className="b2b-form-label">{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="b2b-customers reveal d1">
              <h3 className="b2b-col-title">Trusted B2B Partners</h3>
              <div className="b2b-partner-grid">
                {B2B_CUSTOMERS.map((cu) => (
                  <div className="b2b-partner-card" key={cu.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cu.logo} alt={cu.name} loading="lazy" />
                    <span className="b2b-partner-name">{cu.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="muted reveal" style={{ marginTop: "26px", maxWidth: "60ch" }}>
            We also grind coriander, mixed spices and condiments to specification. Bulk supply is backed by
            leasehold warehousing capacity of up to 2,000 MT.
          </p>
        </div>
      </div>
    </section>
  );
}
