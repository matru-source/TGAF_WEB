"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LocalMarketBand() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  const textVariants = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  return (
    <section className="section market-band" ref={containerRef}>
      <div className="container">
        <div className="market-grid">
          <motion.div 
            className="market-media"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <motion.div style={{ y: imgY, height: "130%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/photo-market.jpg" alt="Goodearth Foods stall at a Nigerian market" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>
            
            <motion.div 
              className="market-tag"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
            >
              <span className="dot" /> Live from the market
            </motion.div>
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
              Goodearth is born for Naija cooking. You go find our peppe for over <strong>170 markets</strong> across
              the country, sold by the same traders wey sabi correct quality.
            </motion.p>
            <motion.ul className="market-points" variants={textVariants}>
              <li><strong>12 farmers&apos; markets</strong> &amp; 7 aggregators feeding the supply</li>
              <li><strong>8,700+ retailers</strong> and 2,600+ wholesalers stocking Goodearth</li>
              <li><strong>Women-led</strong> micro-distribution bringing peppe to your street</li>
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
