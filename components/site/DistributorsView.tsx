"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  DISTRIBUTOR_CELEBRATION_POSTS,
  type CelebrationPost,
  type CelebrationSlide,
} from "@/lib/celebrationsData";

interface Particle {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  angle: number;
  angularVelocity: number;
  color: string;
  shape: "rect" | "circle" | "ribbon";
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

function PostCarouselCard({
  post,
  onOpenModal,
  onTriggerPopper,
}: {
  post: CelebrationPost;
  onOpenModal: (slide: CelebrationSlide) => void;
  onTriggerPopper: () => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % post.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + post.slides.length) % post.slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  const activeSlideObj = post.slides[currentSlide];

  return (
    <article className="celebration-post-item" id={post.id}>
      {/* Post Metadata Header Bar */}
      <div className="celebration-post-meta-header">
        <div className="cpm-left">
          <span className="cpm-post-number">{post.postNumber}</span>
          <span className="cpm-badge">{post.badge}</span>
        </div>
        <div className="cpm-right">
          <span className="cpm-date">📅 {post.date}</span>
          <span className="cpm-region">{post.region}</span>
        </div>
      </div>

      {/* Unified Single Card: Carousel on Left + Texts beside on Right (Single Row) */}
      <div className="celebration-unified-card">
        <div className="celebration-card-row">
          {/* Left Column: Two Images in Interactive Carousel */}
          <div className="celebration-carousel-side">
            {/* Carousel Stage Box with Touch Swipe */}
            <div
              className="carousel-stage"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {post.slides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`carousel-slide-item ${currentSlide === idx ? "active" : ""}`}
                  aria-hidden={currentSlide !== idx}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="carousel-img"
                    loading="eager"
                    onClick={() => onOpenModal(slide)}
                    title="Click to view full image in high-resolution"
                  />
                </div>
              ))}

              {/* Desktop-only floating side arrows */}
              <button
                type="button"
                className="carousel-arrow prev desktop-arrow"
                onClick={prevSlide}
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                type="button"
                className="carousel-arrow next desktop-arrow"
                onClick={nextSlide}
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            {/* Bottom Controls Bar (Outside Image, clean mobile navigation) */}
            <div className="carousel-bottom-bar">
              <button
                type="button"
                className="carousel-nav-btn prev"
                onClick={prevSlide}
                aria-label="Previous image"
              >
                <span className="nav-arrow">‹</span> Prev
              </button>

              <div className="carousel-dots-wrap">
                <div className="carousel-dots">
                  {post.slides.map((slide, idx) => (
                    <button
                      key={`dot-${slide.id}`}
                      type="button"
                      className={`carousel-dot ${currentSlide === idx ? "is-active" : ""}`}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="carousel-counter">
                  {currentSlide + 1} / {post.slides.length}
                </div>
              </div>

              <button
                type="button"
                className="carousel-nav-btn next"
                onClick={nextSlide}
                aria-label="Next image"
              >
                Next <span className="nav-arrow">›</span>
              </button>
            </div>
          </div>

          {/* Right Column: Texts & Relatable Narrative beside Carousel in Single Row */}
          <div className="celebration-text-side">
            <div className="single-card-eyebrow">
              <span className="sc-icon">🎉</span>
              <span>{post.categoryLabel.toUpperCase()}</span>
            </div>

            <h2 className="single-card-name">{post.personName}</h2>
            <div className="single-card-role">{post.role}</div>

            <blockquote className="single-card-quote">
              &ldquo;{post.quote}&rdquo;
              <span className="quote-author">— {post.quoteAuthor}</span>
            </blockquote>

            {post.paragraphs.map((p, i) => (
              <p className="single-card-desc" key={i}>
                {i === 0 ? (
                  <>
                    Today, the Board, Leadership, and the entire Good Earth family joyously celebrate{" "}
                    <strong>{post.personName}</strong> on the special occasion of her birthday. As the visionary CEO of {post.company}, she represents the pinnacle of commercial excellence, dedication, and inspiring leadership across Nigeria&apos;s food distribution landscape.
                  </>
                ) : (
                  p
                )}
              </p>
            ))}

            {/* 4 Highlight Pills (hidden on mobile, visible on desktop) */}
            <div className="single-card-highlights">
              {post.highlights.map((h, i) => (
                <div className="highlight-pill" key={i}>
                  <span className="h-icon">{h.icon}</span>
                  <span className="h-text">{h.text}</span>
                </div>
              ))}
            </div>

            <div className="single-card-actions">
              <button
                type="button"
                className="celebration-popper-btn"
                onClick={onTriggerPopper}
                title="Pop celebration confetti"
              >
                <span className="popper-icon" aria-hidden="true">🎉</span>
                <span>Pop Confetti Again</span>
              </button>

              <button
                type="button"
                className="celebration-view-full-btn"
                onClick={() => onOpenModal(activeSlideObj)}
              >
                <span>🔍 View Full-Size Image</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DistributorsView() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [activeModalImg, setActiveModalImg] = useState<CelebrationSlide | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "birthday" | "milestone">("all");

  const colors = [
    "#C0262D", // Chilli Red
    "#F59E0B", // Festive Gold
    "#16A34A", // Earth Green
    "#EC4899", // Rose Pink
    "#8B5CF6", // Royal Purple
    "#3B82F6", // Sky Blue
    "#F97316", // Warm Amber
    "#FCD34D", // Sunlight Yellow
    "#E11D48", // Crimson
  ];

  // Paper Popper Confetti Blast (no text, pure festive paper particles)
  const triggerPopper = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const newParticles: Particle[] = [];
    const count = 180;

    // Left cannon (bursting up-right)
    for (let i = 0; i < count / 2; i++) {
      const angle = -Math.PI / 2 + (Math.random() * 0.7 - 0.15);
      const speed = Math.random() * 20 + 12;
      newParticles.push({
        x: width * 0.12,
        y: height * 0.95,
        w: Math.random() * 10 + 6,
        h: Math.random() * 14 + 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        angle: Math.random() * Math.PI * 2,
        angularVelocity: (Math.random() - 0.5) * 0.22,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.4 ? "rect" : Math.random() > 0.5 ? "circle" : "ribbon",
        opacity: 1,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.12 + 0.05,
      });
    }

    // Right cannon (bursting up-left)
    for (let i = 0; i < count / 2; i++) {
      const angle = -Math.PI / 2 - (Math.random() * 0.7 - 0.15);
      const speed = Math.random() * 20 + 12;
      newParticles.push({
        x: width * 0.88,
        y: height * 0.95,
        w: Math.random() * 10 + 6,
        h: Math.random() * 14 + 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        angle: Math.random() * Math.PI * 2,
        angularVelocity: (Math.random() - 0.5) * 0.22,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.4 ? "rect" : Math.random() > 0.5 ? "circle" : "ribbon",
        opacity: 1,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.12 + 0.05,
      });
    }

    particlesRef.current = newParticles;

    if (animIdRef.current) cancelAnimationFrame(animIdRef.current);

    const startTime = performance.now();

    const loop = (currentTime: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const elapsed = currentTime - startTime;
      ctx.clearRect(0, 0, width, height);

      const gravity = 0.44;
      const drag = 0.985;
      let activeCount = 0;

      for (const p of particlesRef.current) {
        p.vx *= drag;
        p.vy = p.vy * drag + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.angularVelocity;
        p.wobble += p.wobbleSpeed;

        if (elapsed > 3000) {
          p.opacity = Math.max(0, p.opacity - 0.018);
        }

        if (p.y < height + 60 && p.opacity > 0) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(Math.cos(p.wobble), 1);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === "ribbon") {
            ctx.fillRect(-p.w / 2, -p.h, p.w, p.h * 1.6);
          } else {
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          }

          ctx.restore();
        }
      }

      if (activeCount > 0 && elapsed < 6000) {
        animIdRef.current = requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animIdRef.current = requestAnimationFrame(loop);
  }, [colors]);

  useEffect(() => {
    // Fire celebratory confetti on page mount
    const timer = setTimeout(() => {
      triggerPopper();
    }, 250);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [triggerPopper]);

  const filteredPosts = DISTRIBUTOR_CELEBRATION_POSTS.filter((post) => {
    if (selectedFilter === "all") return true;
    return post.category === selectedFilter;
  });

  return (
    <div className="celebration-view-wrapper">
      {/* Paper Popper Confetti Animation (no text, pure festive paper particles) */}
      <canvas ref={canvasRef} className="celebration-confetti-canvas" aria-hidden="true" />

      <div className="container">
        {/* Celebration Navigation / Filter Bar */}
        <div className="celebration-feed-bar">
          <div className="celebration-filter-pills" role="tablist" aria-label="Celebration Categories">
            <button
              type="button"
              className={`celebration-filter-pill ${selectedFilter === "all" ? "active" : ""}`}
              onClick={() => setSelectedFilter("all")}
            >
              All Celebrations ({DISTRIBUTOR_CELEBRATION_POSTS.length})
            </button>
            <button
              type="button"
              className={`celebration-filter-pill ${selectedFilter === "birthday" ? "active" : ""}`}
              onClick={() => setSelectedFilter("birthday")}
            >
              🎂 Birthday Honors
            </button>
            <button
              type="button"
              className={`celebration-filter-pill ${selectedFilter === "milestone" ? "active" : ""}`}
              onClick={() => setSelectedFilter("milestone")}
            >
              🏆 Milestones &amp; Spotlights
            </button>
          </div>

          <div className="celebration-feed-actions">
            <button
              type="button"
              className="celebration-popper-top-btn"
              onClick={triggerPopper}
              title="Pop celebration confetti"
            >
              🎉 Pop Confetti
            </button>
          </div>
        </div>

        {/* Dynamic Celebration Posts Feed */}
        <div className="celebration-posts-feed">
          {filteredPosts.map((post) => (
            <PostCarouselCard
              key={post.id}
              post={post}
              onOpenModal={setActiveModalImg}
              onTriggerPopper={triggerPopper}
            />
          ))}
        </div>


        {/* Warm Dedication Tribute Banner */}
        <div className="celebration-dedication-banner">
          <div className="dedication-quote-mark" aria-hidden="true">&ldquo;</div>
          <p className="dedication-message">
            Partnership is the heartbeat of Good Earth. We honour the dedication, resilience, and business
            excellence of our distributor partners across all five geopolitical zones of Nigeria.
            Together, we nourish millions of lives and build a prosperous, sustainable agricultural future.
          </p>
          <div className="dedication-signature">
            <strong>The Board, Management &amp; Commercial Family</strong>
            <span>TG Agri Farms Ltd · Good Earth Foods</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      {activeModalImg && (
        <div
          className="celebration-modal-overlay"
          onClick={() => setActiveModalImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="celebration-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="celebration-modal-close"
              onClick={() => setActiveModalImg(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeModalImg.src} alt={activeModalImg.title} className="celebration-modal-image" />
            <div className="celebration-modal-caption">{activeModalImg.title}</div>
          </div>
        </div>
      )}
    </div>
  );
}
