"use client";

import { useState, useEffect, useCallback } from "react";
import { TESTIMONIALS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-cycle every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const activeTestimonial = TESTIMONIALS[current];

  return (
    <section className="testimonials-magical-section">
      <div className="container">
        {/* Header with Handwritten Script Accent */}
        <div className="testimonials-magical-head">
          <div className="head-copy">
            <span className="eyebrow center">WHY PEOPLE. REAL IMPACT.</span>
            <h2>Loved from the market to the kitchen</h2>
            <p className="muted">Hear from our customers, partners, and traders across Nigeria.</p>
          </div>

          {/* Floating Handwritten Script */}
          <div className="tst-script-accent" aria-hidden="true">
            <span className="script-cursive">Taste the Difference</span>
            <span className="script-arc">〰️</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="tst-carousel-wrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            className="tst-arrow-btn prev"
            onClick={prevSlide}
            aria-label="Previous customer story"
          >
            ‹
          </button>

          {/* Active Card Card */}
          <div className="tst-card-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.name}
                className="tst-magical-card"
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {/* 5-Star Rating */}
                <div className="tst-stars" aria-label="5 star rating">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i} className="star-gold">
                      {star}
                    </span>
                  ))}
                </div>

                <blockquote className="tst-quote-text">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </blockquote>

                <div className="tst-author-bar">
                  <span className={`tst-avatar-badge tq-${activeTestimonial.accent}`}>
                    {activeTestimonial.name.charAt(0)}
                  </span>
                  <div className="tst-author-details">
                    <span className="tst-author-name">{activeTestimonial.name}</span>
                    <span className="tst-author-location">
                      {activeTestimonial.role} · {activeTestimonial.place}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="tst-arrow-btn next"
            onClick={nextSlide}
            aria-label="Next customer story"
          >
            ›
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="tst-dots-row" role="tablist" aria-label="Customer review dots">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`tst-dot${idx === current ? " is-active" : ""}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to customer review ${idx + 1}`}
              aria-selected={idx === current}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
