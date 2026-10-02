"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

function AnimatedCounter({ to = 350, suffix = "+", duration = 1.8 }: { to?: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * to));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step);
    }, 600);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [to, duration]);

  return <>{count}{suffix}</>;
}

const PACK_METAS = [
  { name: "Atarodo", tag: "100% Pure Pepper" },
  { name: "Hot Peppe", tag: "Signature Blend" },
  { name: "Cameroon Peppe", tag: "Smoked Fiery Heat" },
];

export default function Hero({ packs = HERO_SHOWCASE }: { packs?: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  // Desktop track scroll progress (widescreen)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Mobile visual freeze scroll progress
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileTrackRef,
    offset: ["start start", "end end"],
  });

  // Desktop Pack 0 (Atarodo: starts Center -> curves down-right along arc -> exits by 0.46)
  const x0 = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.46, 1.0], ["0%", "0%", "26%", "50%", "50%"]);
  const y0 = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.46, 1.0], ["0%", "0%", "12%", "28%", "28%"]);
  const rotate0 = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.46, 1.0], [-2, -2, 18, 32, 32]);
  const scale0 = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.46, 1.0], [1.0, 1.0, 0.84, 0.68, 0.68]);
  const opacity0 = useTransform(scrollYProgress, [0, 0.08, 0.26, 0.44, 1.0], [1, 1, 0.7, 0, 0]);
  const display0 = useTransform(opacity0, (v) => (v <= 0.005 ? "none" : "block"));
  const zIndex0 = useTransform(scrollYProgress, (v) => (v < 0.26 ? 5 : 2));

  // Desktop Pack 1 (Hot Peppe: curves up from lower-left arc -> Center at 0.50 -> curves down-right arc -> exits by 0.92)
  const x1 = useTransform(
    scrollYProgress,
    [0, 0.08, 0.28, 0.48, 0.54, 0.74, 0.92, 1.0],
    ["-50%", "-50%", "-26%", "0%", "0%", "26%", "50%", "50%"]
  );
  const y1 = useTransform(
    scrollYProgress,
    [0, 0.08, 0.28, 0.48, 0.54, 0.74, 0.92, 1.0],
    ["28%", "28%", "12%", "0%", "0%", "12%", "28%", "28%"]
  );
  const rotate1 = useTransform(
    scrollYProgress,
    [0, 0.08, 0.28, 0.48, 0.54, 0.74, 0.92, 1.0],
    [-32, -32, -18, -2, -2, 18, 32, 32]
  );
  const scale1 = useTransform(
    scrollYProgress,
    [0, 0.08, 0.28, 0.48, 0.54, 0.74, 0.92, 1.0],
    [0.68, 0.68, 0.84, 1.0, 1.0, 0.84, 0.68, 0.68]
  );
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18, 0.44, 0.56, 0.76, 0.90, 1.0],
    [0, 0, 0.6, 1, 1, 0.7, 0, 0]
  );
  const display1 = useTransform(opacity1, (v) => (v <= 0.005 ? "none" : "block"));
  const zIndex1 = useTransform(scrollYProgress, (v) => (v >= 0.26 && v < 0.72 ? 5 : 3));

  // Desktop Pack 2 (Cameroon Peppe: starts hidden lower-left -> curves up along arc -> Center at 0.92 -> holds at 1.0)
  const x2 = useTransform(
    scrollYProgress,
    [0, 0.48, 0.54, 0.74, 0.92, 1.0],
    ["-50%", "-50%", "-45%", "-26%", "0%", "0%"]
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 0.48, 0.54, 0.74, 0.92, 1.0],
    ["28%", "28%", "24%", "12%", "0%", "0%"]
  );
  const rotate2 = useTransform(
    scrollYProgress,
    [0, 0.48, 0.54, 0.74, 0.92, 1.0],
    [-32, -32, -28, -18, -2, -2]
  );
  const scale2 = useTransform(
    scrollYProgress,
    [0, 0.48, 0.54, 0.74, 0.92, 1.0],
    [0.68, 0.68, 0.72, 0.84, 1.0, 1.0]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0, 0.48, 0.56, 0.72, 0.90, 1.0],
    [0, 0, 0.4, 0.8, 1, 1]
  );
  const display2 = useTransform(opacity2, (v) => (v <= 0.005 ? "none" : "block"));
  const zIndex2 = useTransform(scrollYProgress, (v) => (v >= 0.72 ? 5 : 3));

  // Mobile Scroll Transforms:
  // Pack 0 (Atarodo): starts visible in left spotlight -> curves down-right and exits by 0.38
  const mx0 = useTransform(mobileScrollProgress, [0, 0.12, 0.38, 1.0], ["0%", "0%", "36%", "36%"]);
  const my0 = useTransform(mobileScrollProgress, [0, 0.12, 0.38, 1.0], ["0%", "0%", "24%", "24%"]);
  const mRotate0 = useTransform(mobileScrollProgress, [0, 0.12, 0.38, 1.0], [-2, -2, 22, 22]);
  const mScale0 = useTransform(mobileScrollProgress, [0, 0.12, 0.38, 1.0], [1.0, 1.0, 0.72, 0.72]);
  const mOpacity0 = useTransform(mobileScrollProgress, [0, 0.12, 0.36, 0.40, 1.0], [1, 1, 0.2, 0, 0]);
  const mDisplay0 = useTransform(mOpacity0, (v) => (v <= 0.005 ? "none" : "block"));
  const mZIndex0 = useTransform(mobileScrollProgress, (v) => (v < 0.30 ? 6 : 2));

  // Pack 1 (Hot Peppe): curves in from lower-left (0.10->0.38) -> holds (0.38->0.58) -> curves down-right and exits (0.58->0.78)
  const mx1 = useTransform(
    mobileScrollProgress,
    [0, 0.10, 0.36, 0.58, 0.78, 1.0],
    ["-36%", "-36%", "0%", "0%", "36%", "36%"]
  );
  const my1 = useTransform(
    mobileScrollProgress,
    [0, 0.10, 0.36, 0.58, 0.78, 1.0],
    ["24%", "24%", "0%", "0%", "24%", "24%"]
  );
  const mRotate1 = useTransform(
    mobileScrollProgress,
    [0, 0.10, 0.36, 0.58, 0.78, 1.0],
    [-22, -22, -2, -2, 22, 22]
  );
  const mScale1 = useTransform(
    mobileScrollProgress,
    [0, 0.10, 0.36, 0.58, 0.78, 1.0],
    [0.72, 0.72, 1.0, 1.0, 0.72, 0.72]
  );
  const mOpacity1 = useTransform(
    mobileScrollProgress,
    [0, 0.10, 0.32, 0.60, 0.76, 0.80, 1.0],
    [0, 0, 1, 1, 0.2, 0, 0]
  );
  const mDisplay1 = useTransform(mOpacity1, (v) => (v <= 0.005 ? "none" : "block"));
  const mZIndex1 = useTransform(mobileScrollProgress, (v) => (v >= 0.30 && v < 0.72 ? 6 : 3));

  // Pack 2 (Cameroon Peppe): curves in from lower-left (0.52->0.76) -> HOLDS firmly in place (0.76->1.0)
  const mx2 = useTransform(
    mobileScrollProgress,
    [0, 0.52, 0.76, 1.0],
    ["-36%", "-36%", "0%", "0%"]
  );
  const my2 = useTransform(
    mobileScrollProgress,
    [0, 0.52, 0.76, 1.0],
    ["24%", "24%", "0%", "0%"]
  );
  const mRotate2 = useTransform(
    mobileScrollProgress,
    [0, 0.52, 0.76, 1.0],
    [-22, -22, -2, -2]
  );
  const mScale2 = useTransform(
    mobileScrollProgress,
    [0, 0.52, 0.76, 1.0],
    [0.72, 0.72, 1.0, 1.0]
  );
  const mOpacity2 = useTransform(
    mobileScrollProgress,
    [0, 0.52, 0.74, 1.0],
    [0, 0, 1, 1]
  );
  const mDisplay2 = useTransform(mOpacity2, (v) => (v <= 0.005 ? "none" : "block"));
  const mZIndex2 = useTransform(mobileScrollProgress, (v) => (v >= 0.70 ? 6 : 3));

  const [desktopActivePack, setDesktopActivePack] = useState(0);
  const [mobileActivePack, setMobileActivePack] = useState(0);

  // Desktop active pack change
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v < 0.28) setDesktopActivePack(0);
      else if (v < 0.72) setDesktopActivePack(1);
      else setDesktopActivePack(2);
    });
  }, [scrollYProgress]);

  // Mobile active pack change
  useEffect(() => {
    return mobileScrollProgress.on("change", (v) => {
      if (v < 0.35) setMobileActivePack(0);
      else if (v < 0.70) setMobileActivePack(1);
      else setMobileActivePack(2);
    });
  }, [mobileScrollProgress]);

  const scrollToRatio = (ratio: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const trackTop = rect.top + scrollTop;
    const scrollableDistance = trackRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: trackTop + scrollableDistance * ratio,
      behavior: "smooth",
    });
  };

  const desktopPackStyles = [
    { x: x0, y: y0, rotate: rotate0, scale: scale0, opacity: opacity0, display: display0, zIndex: zIndex0 },
    { x: x1, y: y1, rotate: rotate1, scale: scale1, opacity: opacity1, display: display1, zIndex: zIndex1 },
    { x: x2, y: y2, rotate: rotate2, scale: scale2, opacity: opacity2, display: display2, zIndex: zIndex2 },
  ];

  const mobilePackStyles = [
    { x: mx0, y: my0, rotate: mRotate0, scale: mScale0, opacity: mOpacity0, display: mDisplay0, zIndex: mZIndex0 },
    { x: mx1, y: my1, rotate: mRotate1, scale: mScale1, opacity: mOpacity1, display: mDisplay1, zIndex: mZIndex1 },
    { x: mx2, y: my2, rotate: mRotate2, scale: mScale2, opacity: mOpacity2, display: mDisplay2, zIndex: mZIndex2 },
  ];

  const packTargets = [0, 0.50, 0.95];

  return (
    <div className="hero-section-wrapper">
      <div className="hero-scroll-track" ref={trackRef}>
        <section className="hero hero-sticky">
          {/* Authentic Pepper Farm Background */}
          <div className="hero-farm-backdrop" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/hero-farm-bg.jpg"
              alt="Lush Nigerian Pepper Farm Landscape"
              className="hero-farm-bg-img"
            />
            <div className="hero-farm-wash" />
          </div>

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
                  From our farms to your kitchen — pure, vibrant chilli, turmeric and ginger, cultivated by Nigerian farmers
                  and steam-sterilised at our world-class Ikorodu facility. <strong>Peppe wey pass peppe.</strong>
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
                    Find a market near you
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

              {/* Desktop Visual: 100% untouched layout on PC (hidden on mobile) */}
              <div className="hero-desktop-visual">
                <motion.div
                  className="hero-visual"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <motion.div className="frame">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/img/photo-farmers-harvest.jpg" alt="Nigerian farmers harvesting fresh red chilli peppers in the field" />
                  </motion.div>

                  <motion.div
                    className="harvest-basket-layer"
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 25, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/img/hero-chili-plant-poster.png"
                      className="harvest-basket-video"
                      aria-label="Fresh harvest chilies and pepper plant swaying in the breeze"
                    >
                      <source src="/video/hero-chili-plant.webm" type="video/webm" />
                      <source src="/video/hero-chili-plant.mp4" type="video/mp4" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/img/hero-chili-plant-poster.png"
                        alt="Fresh harvest chillies and spices"
                        className="harvest-basket-img"
                      />
                    </video>
                  </motion.div>



                  {/* Scroll-Driven Half-Circle Pack Carousel */}
                  <div className="hero-arc-stage">
                    {PACK_METAS.map((meta, idx) => (
                      <motion.div
                        key={meta.name}
                        className={`arc-pack arc-pack-${idx} ${desktopActivePack === idx ? "is-active" : ""}`}
                        style={desktopPackStyles[idx]}
                        onClick={() => {
                          scrollToRatio(packTargets[idx]);
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={packs[idx] || HERO_SHOWCASE[idx]}
                          alt={meta.name}
                          className="pack-img"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                  >
                    <div className="n">
                      <AnimatedCounter to={350} suffix="+" duration={1.8} />
                    </div>
                    <div className="l">Farmers supported</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Sticky Freeze Stage: Full-Screen Couples Photo + Video on Right + Scroll-Driven Packs on Left */}
      <div className="hero-mobile-stage" ref={mobileTrackRef}>
        <div className="hero-mobile-sticky">
          {/* Full Screen Couples Photo Background */}
          <div className="hero-mobile-bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/photo-farmers-harvest.jpg"
              alt="Nigerian farming couple harvesting fresh red chilli peppers in the field"
              className="hero-mobile-bg-img"
            />
            <div className="hero-mobile-vignette" />
          </div>

          {/* Spice Pack Badge Indicator */}
          <div className="mobile-pack-indicator">
            <span className="mobile-pack-name">{PACK_METAS[mobileActivePack].name}</span>
            <span className="mobile-pack-dot">·</span>
            <span className="mobile-pack-tag">{PACK_METAS[mobileActivePack].tag}</span>
          </div>

          {/* Fresh Harvest Chili Pepper Plant Video on the Right */}
          <div className="hero-mobile-video-wrap" aria-hidden="true">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hero-mobile-video"
              aria-label="Fresh chili pepper plant swaying in breeze"
            >
              <source src="/video/hero-mobile-plant.webm" type="video/webm" />
              <source src="/video/hero-mobile-plant.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Seamless bottom & left foliage blend overlay */}
          <div className="hero-mobile-blend-overlay" aria-hidden="true" />

          {/* Scroll-Driven Animated Spice Packs on the Left */}
          <div className="hero-mobile-packs-wrap">
            {PACK_METAS.map((meta, idx) => (
              <motion.div
                key={`mobile-pack-${meta.name}`}
                className={`mobile-arc-pack mobile-arc-pack-${idx} ${mobileActivePack === idx ? "is-active" : ""}`}
                style={mobilePackStyles[idx]}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={packs[idx] || HERO_SHOWCASE[idx]}
                  alt={meta.name}
                  className="mobile-pack-img"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
