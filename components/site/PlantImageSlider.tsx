"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface PlantSlide {
  src: string;
  alt: string;
  tag: string;
  caption: string;
}

const PLANT_SLIDES: PlantSlide[] = [
  {
    src: "/img/facility/packaging-line.jpg",
    alt: "TG Agri Farms automated high-speed sachet packaging line at Ikorodu, Lagos",
    tag: "Retail Packaging",
    caption: "High-Speed Rotary Sachet Packaging Line",
  },
  {
    src: "/img/facility/manufacturing-image-4.jpg",
    alt: "TG Agri Farms industrial stainless steel ribbon blender and homogenous batching system",
    tag: "Homogenous Batching",
    caption: "Industrial SS Ribbon Blender & Conveyance",
  },
  {
    src: "/img/facility/manufacturing-image-6.jpg",
    alt: "TG Agri Farms closed-loop pneumatic cyclone conveyance and conical hoppers",
    tag: "Closed-Loop Conveyance",
    caption: "Pneumatic Cyclone Vacuum Separation & Hoppers",
  },
  {
    src: "/img/facility/packaging-vffs.jpg",
    alt: "TG Agri Farms continuous automated vertical form-fill-seal packaging unit",
    tag: "Continuous Pouching",
    caption: "Automated VFFS Packaging & Dosing Unit",
  },
];

export default function PlantImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const total = PLANT_SLIDES.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay every 4.8 seconds (pauses on hover or touch)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      goToNext();
    }, 4800);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      if (touchDeltaX < -40) {
        goToNext();
      } else if (touchDeltaX > 40) {
        goToPrev();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Keyboard navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrev();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  return (
    <div
      ref={sliderRef}
      className="plant-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Manufacturing & Operations Factory Image Gallery"
    >
      {/* Sliding Track */}
      <div
        className="plant-slider-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {PLANT_SLIDES.map((slide, idx) => (
          <div className="plant-slider-slide" key={slide.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="presence-img plant-slider-img"
              loading={idx === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Persistent Pill Badge: Top Left */}
      <span className="location-pill pill-ng">
        🇳🇬 Manufacturing &amp; Operations
      </span>

      {/* Dynamic Machine Caption Badge: Top Right */}
      <div className="plant-slider-stage-tag" aria-live="polite">
        <span className="plant-stage-dot" />
        <span>{PLANT_SLIDES[currentIndex].tag}</span>
      </div>

      {/* Prev Arrow Button */}
      <button
        type="button"
        className="plant-slider-nav plant-slider-nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          goToPrev();
        }}
        aria-label="Previous factory image"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next Arrow Button */}
      <button
        type="button"
        className="plant-slider-nav plant-slider-nav--next"
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        aria-label="Next factory image"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Bottom Bar: Dots & Counter */}
      <div className="plant-slider-bottom-bar">
        {/* Pagination Dots */}
        <div className="plant-slider-dots">
          {PLANT_SLIDES.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              className={`plant-slider-dot ${idx === currentIndex ? "is-active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}: ${slide.tag}`}
            />
          ))}
        </div>

        {/* Counter Badge */}
        <span className="plant-slider-counter">
          {currentIndex + 1} / {total}
        </span>
      </div>
    </div>
  );
}
