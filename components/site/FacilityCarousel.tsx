"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface FacilitySlide {
  src: string;
  title: string;
  badge: string;
  desc: string;
  spec: string;
}

const FACILITY_SLIDES: FacilitySlide[] = [
  {
    src: "/img/facility/machine-01.jpg",
    title: "Automated Milling & Grinding Line",
    badge: "Milling Line",
    desc: "Swiss and German engineered cryogenic grinding technology built for high-VO spices, preserving delicate volatile oils, vibrant natural colour, and aroma.",
    spec: "20 MT / Day Capacity",
  },
  {
    src: "/img/facility/machine-02.jpg",
    title: "Sanitary Stainless Steel Piping & Fluid Beds",
    badge: "Hygienic Flow",
    desc: "Closed-loop food grade (SS304/316L) pneumatic transfer systems ensuring zero airborne foreign matter and seamless product transport.",
    spec: "Closed-Loop Sanitary",
  },
  {
    src: "/img/facility/machine-03.jpg",
    title: "High-Capacity Industrial Spice Pulverizers",
    badge: "Particle Sizing",
    desc: "Multi-stage impact pulverization providing uniform mesh sizes from coarse cracked chili flakes to ultra-fine culinary powders.",
    spec: "Custom Mesh Precision",
  },
  {
    src: "/img/facility/machine-04.jpg",
    title: "Automated Form-Fill-Seal Packaging Line",
    badge: "Packaging Automation",
    desc: "Continuous batch-to-pack packaging technology for 15g retail sachets and bulk institutional barrier pouches with zero manual contact.",
    spec: "Batch-to-Pack Speed",
  },
  {
    src: "/img/facility/machine-05.jpg",
    title: "Continuous Steam Sterilization Unit",
    badge: "Food Safety Norms",
    desc: "Automated dry-steam sterilization eliminating pathogens (Salmonella, E. coli) while retaining full pungency and oil content.",
    spec: "HACCP & NAFDAC Standard",
  },
  {
    src: "/img/facility/machine-06.jpg",
    title: "Heavy-Duty Intake & Pneumatic Conveyor System",
    badge: "Intake & Cleaning",
    desc: "Primary aspiration, de-stoning, and magnetic separation units screening whole dried chilies before precision grinding.",
    spec: "Multi-Stage Pre-Cleaning",
  },
  {
    src: "/img/facility/facility-aerial.jpg",
    title: "Ikorodu Agro-Processing Industrial Footprint",
    badge: "Aerial Plant View",
    desc: "US$10M facility footprint located in Ikorodu, Lagos State, featuring over 2,000 MT of dedicated leasehold raw material and finished goods warehousing.",
    spec: "2,000 MT Warehousing",
  },
];

export default function FacilityCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = FACILITY_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotate every 4.5 seconds when not hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const activeSlide = FACILITY_SLIDES[current];

  return (
    <div
      className="facility-showcase-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Ikorodu Facility Machinery Showcase"
    >
      {/* Main Showcase Stage */}
      <div className="facility-carousel-stage">
        {FACILITY_SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.src}
              className={`facility-slide ${isActive ? "active" : ""}`}
              aria-hidden={!isActive}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.title}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}

        {/* Top Floating Badges */}
        <div className="facility-carousel-top">
          <div className="facility-live-indicator">
            <span className="live-dot" />
            <span>Revolving Machinery Snaps</span>
          </div>
          <div className="facility-counter">
            <span>{String(current + 1).padStart(2, "0")}</span>
            <span className="divider">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          className="facility-nav-btn prev"
          onClick={prevSlide}
          aria-label="Previous machinery photo"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="facility-nav-btn next"
          onClick={nextSlide}
          aria-label="Next machinery photo"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Bottom Caption Overlay */}
        <div className="facility-caption-overlay">
          <div className="facility-caption-tags">
            <span className="facility-tag-badge">{activeSlide.badge}</span>
            <span className="facility-tag-spec">{activeSlide.spec}</span>
          </div>
          <h3 className="facility-caption-title">{activeSlide.title}</h3>
          <p className="facility-caption-desc">{activeSlide.desc}</p>

          {/* Dots Indicator */}
          <div className="facility-dots">
            {FACILITY_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`facility-dot ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Jump to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Miniature Thumbnails Selector Bar */}
      <div className="facility-thumbs-strip">
        {FACILITY_SLIDES.map((slide, idx) => {
          const isSelected = idx === current;
          return (
            <button
              key={slide.src}
              type="button"
              className={`facility-thumb-card ${isSelected ? "selected" : ""}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Select ${slide.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slide.src} alt="" aria-hidden="true" />
              <div className="thumb-label">
                <span className="thumb-num">0{idx + 1}</span>
                <span className="thumb-title">{slide.badge}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
