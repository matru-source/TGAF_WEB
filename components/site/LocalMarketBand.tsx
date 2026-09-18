"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MarketCarousel from "./MarketCarousel";

export default function LocalMarketBand() {
  const textVariants = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 60, damping: 15 } }
  };

  return (
    <section className="section market-band">
      <div className="container">
        <div className="market-grid">
          <motion.div 
            className="market-media"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <MarketCarousel />
          </motion.div>
          
          <motion.div 
            className="market-copy"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
          >
            <motion.span className="eyebrow" variants={textVariants}>From the market to your pot</motion.span>
            <motion.h2 variants={textVariants}>We dey your market - and your kitchen</motion.h2>
            <motion.p className="lead" variants={textVariants}>
              Goodearth is born for Naija cooking. You go find our peppe across <strong>100 farmer markets</strong> in{" "}
              <strong>17+ states</strong>, sold by the same traders wey sabi correct quality.
            </motion.p>
            <motion.ul className="market-points" variants={textVariants}>
              <li><strong>100 farmer markets</strong> &amp; 25 aggregators feeding the supply</li>
              <li><strong>12,000+ retailers</strong> and 2,600+ wholesalers stocking Goodearth across 17+ states</li>
              <li><strong>Grown by 50,000+ farmers</strong> with 10,000+ farmers trained on post-harvest handling</li>
            </motion.ul>
            <motion.div variants={textVariants}>
              <Link href="/presence" className="btn btn-primary">
                Find a market near you <span className="arr">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
