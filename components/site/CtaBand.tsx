"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CtaBand({
  title = "Join our hands to grow together",
  text = "Whether you are a retailer, distributor, or a partner — let’s bring authentic Nigerian flavours to more kitchens around the world.",
  ctaLabel = "Partner With Us",
  ctaHref = "/contact",
  isHomeSec7 = false,
  showTraderBar = false,
}: {
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  isHomeSec7?: boolean;
  showTraderBar?: boolean;
}) {
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      className={`cta-magical-section ${isHomeSec7 ? "home-sec-7-wrap" : ""}`}
      ref={bandRef}
      aria-label="Join our hands to grow together"
    >
      <div className="container">
        {(showTraderBar || isHomeSec7) && (
          <div className="markets-note home-sec-7-trader-bar">
            <p>Be a trader wey carry correct peppe?</p>
            <Link href="/contact" className="btn btn-ghost">
              Become a distributor <span className="arr">→</span>
            </Link>
          </div>
        )}

        <div className="cta-magical-banner">
          {/* Background Image of Farmer & Chili Harvest with Parallax Zoom */}
          <motion.div
            className="cta-bg-image-stage"
            style={{ scale: bgScale }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/home-sec-7-box.png"
              alt="Nigerian chili pepper harvest with hands holding fresh red peppers"
              className="cta-bg-img"
            />
            <div className="cta-bg-gradient" />
          </motion.div>

          {/* Banner Content Grid */}
          <div className="cta-magical-content">
            <div className="cta-left-copy">
              <h2>{title}</h2>
              <p>{text}</p>
              <Link href={ctaHref} className="btn-cta-magical">
                <span>{ctaLabel}</span>
                <span className="arr">→</span>
              </Link>
            </div>

            {/* Right Value Pills */}
            <div className="cta-right-pills">
              <div className="cta-pill">
                <span className="pill-icon">🌾</span>
                <span className="pill-lbl">Sustainable farming</span>
              </div>
              <div className="cta-pill">
                <span className="pill-icon">🤝</span>
                <span className="pill-lbl">Stronger communities</span>
              </div>
              <div className="cta-pill">
                <span className="pill-icon">🛡️</span>
                <span className="pill-lbl">A healthier tomorrow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
