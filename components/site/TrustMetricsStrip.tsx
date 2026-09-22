"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface OrbitNote {
  text: string;
  arrow: "down-right" | "right" | "up-right" | "down-left" | "left" | "up-left";
}

interface MetricCard {
  id: string;
  number: string;
  titleLine1: string;
  titleLine2: string;
  href: string;
  leftNotes: OrbitNote[];
  rightNotes: OrbitNote[];
}

const CARDS_DATA: MetricCard[] = [
  {
    id: "awards",
    number: "2025",
    titleLine1: "Award",
    titleLine2: "Winner",
    href: "/awards",
    leftNotes: [
      { text: "Indigenous\nBrand", arrow: "down-right" },
      { text: "Industry\nChoice", arrow: "right" },
      { text: "Best\nQuality", arrow: "up-right" },
    ],
    rightNotes: [
      { text: "Naija\nPride", arrow: "down-left" },
      { text: "Pure\nSpices", arrow: "left" },
      { text: "Nationwide\nStandard", arrow: "up-left" },
    ],
  },
  {
    id: "certifications",
    number: "7+",
    titleLine1: "Accredited",
    titleLine2: "Certifications",
    href: "/quality",
    leftNotes: [
      { text: "NAFDAC\nCompliant", arrow: "down-right" },
      { text: "SON\nCertified", arrow: "right" },
      { text: "Halal\nApproved", arrow: "up-right" },
    ],
    rightNotes: [
      { text: "FSSC\nStandards", arrow: "down-left" },
      { text: "Global\nQuality", arrow: "left" },
      { text: "Trusted\nWorldwide", arrow: "up-left" },
    ],
  },
  {
    id: "skus",
    number: "15+",
    titleLine1: "Commercial",
    titleLine2: "SKUs",
    href: "/products",
    leftNotes: [
      { text: "₦-Friendly\nPacks", arrow: "down-right" },
      { text: "Pocket\nSachets", arrow: "right" },
      { text: "Catering\nPouches", arrow: "up-right" },
    ],
    rightNotes: [
      { text: "15+\nRolls", arrow: "down-left" },
      { text: "Market\nGiants", arrow: "left" },
      { text: "Bulk\nBags", arrow: "up-left" },
    ],
  },
  {
    id: "capacity",
    number: "3,000 MT",
    titleLine1: "Annual Plant",
    titleLine2: "Capacity",
    href: "/farm-to-fork",
    leftNotes: [
      { text: "Ikorodu\nFacility", arrow: "down-right" },
      { text: "Automated\nMilling", arrow: "right" },
      { text: "Zero\nWaste", arrow: "up-right" },
    ],
    rightNotes: [
      { text: "Steam\nSterilized", arrow: "down-left" },
      { text: "Quality\nAssured", arrow: "left" },
      { text: "Built For\nScale", arrow: "up-left" },
    ],
  },
];

function OrbitArrow({ type }: { type: OrbitNote["arrow"] }) {
  switch (type) {
    case "down-right":
      return (
        <svg width="18" height="13" viewBox="0 0 28 20" fill="none" className="orbit-arrow">
          <path d="M3 3 C 15 3, 20 8, 22 15" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <polyline points="17 11 22 16 25 10" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "right":
      return (
        <svg width="18" height="12" viewBox="0 0 28 18" fill="none" className="orbit-arrow">
          <path d="M3 5 C 14 3, 19 7, 23 11" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <polyline points="18 8 23 11 20 15" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "up-right":
      return (
        <svg width="18" height="13" viewBox="0 0 28 20" fill="none" className="orbit-arrow">
          <path d="M3 17 C 15 17, 20 12, 22 5" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <polyline points="17 9 22 4 25 10" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "down-left":
      return (
        <svg width="18" height="13" viewBox="0 0 28 20" fill="none" className="orbit-arrow">
          <path d="M25 3 C 13 3, 8 8, 6 15" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <polyline points="11 11 6 16 3 10" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "left":
      return (
        <svg width="18" height="12" viewBox="0 0 28 18" fill="none" className="orbit-arrow">
          <path d="M25 5 C 14 3, 9 7, 5 11" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <polyline points="10 8 5 11 8 15" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "up-left":
      return (
        <svg width="18" height="13" viewBox="0 0 28 20" fill="none" className="orbit-arrow">
          <path d="M25 17 C 13 17, 8 12, 6 5" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <polyline points="11 9 6 4 3 10" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function LeafDoodle({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`orbit-leaf-sketch ${className}`} aria-hidden="true">
      <path
        d="M4 14 C 4 6, 14 2, 20 2 C 20 8, 16 18, 10 20 C 6 20, 4 18, 4 14 Z"
        stroke="#A3E635"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 14 C 10 12, 14 8, 20 2"
        stroke="#A3E635"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
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

        {/* 4 In A Single Row: Holographic Emerald Glass Cards */}
        <motion.div
          className="holographic-cards-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {CARDS_DATA.map((card, i) => (
            <motion.div
              key={card.id}
              className="holographic-glass-card"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.015 }}
            >
              {/* Floating Leaf Doodles */}
              <div className="floating-leaf-slot slot-top">
                <LeafDoodle />
              </div>
              <div className="floating-leaf-slot slot-mid-left">
                <LeafDoodle />
              </div>
              <div className="floating-leaf-slot slot-bot-left">
                <LeafDoodle />
              </div>
              <div className="floating-leaf-slot slot-mid-right">
                <LeafDoodle />
              </div>
              <div className="floating-leaf-slot slot-bot-right">
                <LeafDoodle />
              </div>

              {/* Main Stage Grid: Left Orbit Column | Center Sunburst Hub | Right Orbit Column */}
              <div className="holographic-inner-stage">
                {/* Left Orbit Notes */}
                <div className="orbit-col orbit-col-left">
                  {card.leftNotes.map((note) => (
                    <div key={note.text} className="orbit-item item-left">
                      <div className="orbit-float-wrap">
                        <span className="orbit-text">{note.text}</span>
                        <OrbitArrow type={note.arrow} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Central Sunburst Hub */}
                <div className="orbit-center-hub">
                  {/* Luminous Brush Number */}
                  <div className="hub-glowing-number">
                    {card.number}
                  </div>

                  {/* Serif Title */}
                  <h3 className="hub-title">
                    <span>{card.titleLine1}</span>
                    <span>{card.titleLine2}</span>
                  </h3>

                  {/* Double Stroke Underline Flourish */}
                  <svg width="92" height="8" viewBox="0 0 110 9" fill="none" className="hub-flourish-svg" aria-hidden="true">
                    <path d="M3 3 C 35 1, 75 1, 107 3" stroke="#84CC16" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M12 7 C 40 5, 72 5, 98 7" stroke="#84CC16" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </div>

                {/* Right Orbit Notes */}
                <div className="orbit-col orbit-col-right">
                  {card.rightNotes.map((note) => (
                    <div key={note.text} className="orbit-item item-right">
                      <div className="orbit-float-wrap">
                        <OrbitArrow type={note.arrow} />
                        <span className="orbit-text">{note.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Centered Capsule CTA */}
              <div className="holographic-bottom-cta">
                <Link href={card.href} className="holographic-pill-btn">
                  <span>Learn more</span>
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

