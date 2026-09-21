"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const METRICS_CARDS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
      </svg>
    ),
    value: "2025",
    suffix: "",
    noComma: true,
    label: "Award Winner",
    desc: "Outstanding Indigenous Spice Brand of the Year",
    href: "/awards",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    value: "7",
    suffix: "+",
    label: "Accredited Certifications",
    desc: "NAFDAC, SON, Halal & FSSC 22000 compliant",
    href: "/quality",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    value: "15",
    suffix: "+",
    label: "Commercial SKUs",
    desc: "Sachets, rolls, pouches & institutional bags",
    href: "/products",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <line x1="9" y1="9" x2="9" y2="9.01" />
        <line x1="9" y1="13" x2="9" y2="13.01" />
        <line x1="9" y1="17" x2="9" y2="17.01" />
      </svg>
    ),
    value: "3000",
    suffix: " MT",
    label: "Annual Plant Capacity",
    desc: "Automated Ikorodu milling & sterilization mill",
    href: "/farm-to-fork",
  },
];

export default function TrustMetricsStrip() {
  return (
    <section className="quality-magical-section" aria-label="Why Choose Goodearth">
      <div className="container">
        {/* Section Header */}
        <div className="quality-magical-head">
          <span className="eyebrow-gold">WHY CHOOSE GOODEARTH</span>
          <h2>Certified Quality. Awarded Excellence. Built for Scale.</h2>
          <p className="lead-gold">
            From our 3,000 MT integrated processing facility to international certifications, we ensure purity, traceability, and sustainable growth at every step.
          </p>
        </div>

        {/* 4 Golden Bordered Cards */}
        <motion.div
          className="quality-cards-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, staggerChildren: 0.12 }}
        >
          {METRICS_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              className="quality-gold-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: "rgba(234, 179, 8, 0.6)" }}
            >
              <div className="card-gold-icon" aria-hidden="true">
                {card.icon}
              </div>
              <div className="card-gold-number">
                <span
                  className="n"
                  data-count={card.value}
                  data-suffix={card.suffix}
                  {...(card.noComma ? { "data-no-comma": "true" } : {})}
                >
                  {card.noComma ? card.value : Number(card.value).toLocaleString()}{card.suffix}
                </span>
              </div>
              <h3 className="card-gold-label">{card.label}</h3>
              <p className="card-gold-desc">{card.desc}</p>
              <Link href={card.href} className="card-gold-link">
                <span>Learn more</span>
                <span className="arr">→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
