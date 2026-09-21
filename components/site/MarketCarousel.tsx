"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface MarketSlide {
  src: string;
  title: string;
  location: string;
  tag: string;
}

export const MARKET_SLIDES: MarketSlide[] = [
  // 1. Farm
  {
    src: "/img/gallery/farm-community-01.jpg",
    title: "Nigerian Outgrower Farming Communities",
    location: "River Valley Farming Basin · Nigeria",
    tag: "Farm Cultivation",
  },
  // 2. Factory Drone Shot
  {
    src: "/img/gallery/goodearth-facility-aerial.png",
    title: "Ikorodu Agro-Processing Complex & Mill",
    location: "Ikorodu · Lagos State",
    tag: "Factory Drone Shot",
  },
  // 3. Market
  {
    src: "/img/gallery/market-01.jpg",
    title: "Authentic Nigerian Open-Air Spice Stalls",
    location: "Mile 12 Market · Lagos",
    tag: "Market Distribution",
  },
  // 4. Farm (Harvest Yard)
  {
    src: "/img/gallery/farm-harvest-yard.png",
    title: "Chilli Harvest & Sun-Drying Procurement Yard",
    location: "Northern Spice Aggregation Depot",
    tag: "Harvest Sun-Drying",
  },
  // 5. Market (Wholesale & Retail Network)
  {
    src: "/img/gallery/market-03.jpg",
    title: "Wholesale Spice Depots & Neighborhood Retailers",
    location: "Bodija Market · Ibadan, Oyo",
    tag: "Local Market Trade",
  },
];

export default function MarketCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = MARKET_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotate every 4 seconds when not hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4000);
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
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const activeSlide = MARKET_SLIDES[current];

  return (
    <div
      className="market-carousel-wrap"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Revolving Nigerian Market Photos"
    >
      <div className="market-carousel-stage">
        {MARKET_SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.src}
              className={`market-slide ${isActive ? "active" : ""}`}
              aria-hidden={!isActive}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={`${slide.title} - ${slide.location}`}
                loading={idx < 2 ? "eager" : "lazy"}
              />
            </div>
          );
        })}

        {/* Top Badges: Dynamic Tag + Counter */}
        <div className="market-carousel-top">
          <div className="market-live-pill">
            <span className="dot" />
            <span>{activeSlide.tag}</span>
          </div>
          <div className="market-counter-pill">
            <span className="current-num">{String(current + 1).padStart(2, "0")}</span>
            <span className="sep">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          className="market-nav-arrow prev"
          onClick={prevSlide}
          aria-label="Previous market photo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="market-nav-arrow next"
          onClick={nextSlide}
          aria-label="Next market photo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Bottom Caption Overlay */}
        <div className="market-caption-bar">
          <div className="market-caption-info">
            <span className="market-location-badge">{activeSlide.location}</span>
            <p className="market-title-txt">{activeSlide.title}</p>
          </div>
          
          {/* Dot Indicators */}
          <div className="market-carousel-dots" role="tablist" aria-label="Market photo dots">
            {MARKET_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`market-dot ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to market photo ${i + 1}`}
                aria-selected={i === current}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
