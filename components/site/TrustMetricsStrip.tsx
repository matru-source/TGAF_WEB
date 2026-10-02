"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface MetricCard {
  id: string;
  badge: string;
  icon: "trophy" | "shield" | "box" | "factory";
  number: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
  featured?: boolean;
}

const CARDS_DATA: MetricCard[] = [
  {
    id: "awards",
    badge: "NATIONAL RECOGNITION",
    icon: "trophy",
    number: "2025",
    title: "Edge Award Winner",
    description: "Outstanding Indigenous Naija Spice of the Year (13th Marketing Edge Awards)",
    linkText: "View Award & Press",
    href: "/awards",
  },
  {
    id: "certifications",
    badge: "REGULATORY TRUST",
    icon: "shield",
    number: "7+",
    title: "Accredited Certifications",
    description: "NAFDAC, SON, US FDA, Halal, FSSC 22000, MAN & NEPC standards",
    linkText: "View Accreditations",
    href: "/quality",
  },
  {
    id: "skus",
    badge: "MARKET PORTFOLIO",
    icon: "box",
    number: "15+",
    title: "Commercial SKUs",
    description: "15g retail sachets, family pouches & bulk institutional packs",
    linkText: "Explore Product Range",
    href: "/products",
    featured: true,
  },
  {
    id: "capacity",
    badge: "ANNUAL CAPACITY",
    icon: "factory",
    number: "3,000 MT",
    title: "Annual Plant Capacity",
    description: "US$12M automated milling & steam sterilization facility at Ikorodu",
    linkText: "Inspect Ikorodu Plant",
    href: "/farm-to-fork",
  },
];

function MetricIcon({ type }: { type: MetricCard["icon"] }) {
  switch (type) {
    case "trophy":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
          <path d="M6 4h12v6a6 6 0 0 1-12 0V4Z" />
        </svg>
      );
    case "shield":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "box":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case "factory":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4L2 20z" />
          <path d="M17 18h1" />
          <path d="M12 18h1" />
          <path d="M7 18h1" />
        </svg>
      );
  }
}

export default function TrustMetricsStrip() {
  return (
    <section className="quality-magical-section" aria-label="Why Choose Goodearth">
      <div className="container quality-container">
        {/* Section Header */}
        <div className="quality-magical-head">
          <span className="eyebrow-gold">WHY CHOOSE GOODEARTH</span>
          <h2>Certified Quality. Awarded Excellence. Built for Scale.</h2>
          <p className="lead-gold">
            From our 3,000 MT integrated processing facility to international certifications, we ensure purity, traceability, and sustainable growth at every step.
          </p>
        </div>

        {/* 4 Clean Editorial Metric Cards (Matching Image 1) */}
        <motion.div
          className="editorial-metrics-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {CARDS_DATA.map((card, i) => (
            <motion.div
              key={card.id}
              className={`editorial-metric-card ${card.featured ? "featured" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {/* Top Row: Pill Badge + Icon Container */}
              <div className="metric-card-top">
                <span className="metric-pill-badge">{card.badge}</span>
                <div className="metric-icon-box" aria-hidden="true">
                  <MetricIcon type={card.icon} />
                </div>
              </div>

              {/* Card Body: Number, Title, Description */}
              <div className="metric-card-body">
                <div className="metric-big-number">{card.number}</div>
                <h3 className="metric-card-title">{card.title}</h3>
                <p className="metric-card-desc">{card.description}</p>
              </div>

              {/* Bottom Action Link */}
              <div className="metric-card-bottom">
                <Link href={card.href} className="metric-action-link">
                  <span>{card.linkText}</span>
                  <span className="arr">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
