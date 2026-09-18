"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { HERO_SHOWCASE } from "@/lib/data";

function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={`${delay}-${i}`}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: delay + i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
          style={{ display: "inline-block" }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero({ packs = HERO_SHOWCASE }: { packs?: string[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityOut = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [pack, setPack] = useState(0);
  useEffect(() => {
    if (packs.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setPack((i) => (i + 1) % packs.length), 4000);
    return () => clearInterval(t);
  }, [packs.length]);

  return (
    <section className="hero" ref={containerRef}>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Farm to Fork · Spices of Nigeria
            </motion.span>
            <h1>
              <Words text="Na correct!" delay={0.2} />{" "}
              <em>
                <Words text="Naija peppe." delay={0.5} />
              </em>
            </h1>
            <motion.p
              className="lead"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              From the market to your pot - premium chilli, turmeric and ginger, grown by Nigerian hands
              and milled in our world-class Ikorodu facility. <strong>Peppe wey pass peppe.</strong>
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Link href="/products" className="btn btn-primary">
                Explore our spices <span className="arr">→</span>
              </Link>
              <Link href="/presence" className="btn btn-ghost">
                Find us for market
              </Link>
            </motion.div>
            <motion.div
              className="hero-trust"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <span className="t-label">Certified by</span>
              <div className="t-list">
                {["NAFDAC", "SON", "Halal", "FSSC 22000"].map((cert, i) => (
                  <motion.span
                    key={cert}
                    className="chip"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.3 + i * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, backgroundColor: "var(--chilli-soft)", color: "var(--chilli-deep)" }}
                  >
                    {cert}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ opacity: opacityOut }}
          >
            <motion.div className="frame" style={{ y: imageY }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/photo-farmers-harvest.jpg" alt="Nigerian farmers harvesting fresh red chilli peppers in the field" />
            </motion.div>
            <AnimatePresence mode="wait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                key={packs[pack]}
                className="pack"
                src={packs[pack]}
                alt="Goodearth featured product pack"
                initial={{ opacity: 0, y: 40, rotate: -8 }}
                animate={{ opacity: 1, y: 0, rotate: -3.5 }}
                exit={{ opacity: 0, y: -30, rotate: 6 }}
                transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
                whileHover={{ scale: 1.06, rotate: 0 }}
              />
            </AnimatePresence>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="n" data-count="350" data-suffix="+">
                0
              </div>
              <div className="l">Farmers supported</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
