"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

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

interface Slide {
  id: string;
  badge: string;
  src: string;
  alt: string;
  title: string;
}

const SLIDES: Slide[] = [
  {
    id: "portrait",
    badge: "4th November · Birthday Tribute",
    src: "/img/celebrations/madam-ifueko-ozigbo-birthday-portrait.jpg",
    alt: "Celebrating Madam Ifueko Mabel Ozigbo, CEO Osagiodagbon Ventures - 4th November Birthday Poster",
    title: "Madam Ifueko Mabel Ozigbo - 4th November Birthday Poster",
  },
  {
    id: "card",
    badge: "Official Birthday Felicitations",
    src: "/img/celebrations/madam-ifueko-ozigbo-birthday-card.jpg",
    alt: "Official Birthday Card from TG Agri Farms Ltd & Good Earth to Madam Ifueko Mabel Ozigbo",
    title: "Official Birthday Card - TG Agri Farms Ltd & Good Earth",
  },
];

export default function DistributorsView() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeModalImg, setActiveModalImg] = useState<{ src: string; title: string } | null>(null);
  const touchStartXRef = useRef<number | null>(null);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
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

  return (
    <div className="celebration-view-wrapper">
      {/* Paper Popper Confetti Animation (no text, pure festive paper particles) */}
      <canvas ref={canvasRef} className="celebration-confetti-canvas" aria-hidden="true" />

      <div className="container">
        {/* Single Showcase Card: Carousel on Left + Texts beside on Right (Single Row) */}
        <section className="celebration-unified-card">
          <div className="celebration-card-row">
            {/* Left Column: Two Images in Interactive Carousel */}
            <div className="celebration-carousel-side">
              {/* Carousel Stage Box with Touch Swipe */}
              <div
                className="carousel-stage"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {SLIDES.map((slide, idx) => (
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
                      onClick={() =>
                        setActiveModalImg({
                          src: slide.src,
                          title: slide.title,
                        })
                      }
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
                    {SLIDES.map((slide, idx) => (
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
                    {currentSlide + 1} / {SLIDES.length}
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
                <span>DISTRIBUTOR CELEBRATION · 4TH NOVEMBER</span>
              </div>

              <h2 className="single-card-name">Madam Ifueko Mabel Ozigbo</h2>
              <div className="single-card-role">
                Chief Executive Officer, Osagiodagbon Ventures · Key Distribution Partner
              </div>

              <blockquote className="single-card-quote">
                &ldquo;Wishing you a joyful birthday and a year filled with good health, happiness,
                and continued success.&rdquo;
                <span className="quote-author">— Official Wishes from TG Agri Farms Ltd &amp; Good Earth</span>
              </blockquote>

              <p className="single-card-desc">
                Today, the Board, Leadership, and the entire Good Earth family joyously celebrate{" "}
                <strong>Madam Ifueko Mabel Ozigbo</strong> on the special occasion of her birthday.
                As the visionary CEO of Osagiodagbon Ventures, she represents the pinnacle of commercial
                excellence, dedication, and inspiring leadership across Nigeria&apos;s food distribution landscape.
              </p>

              <p className="single-card-desc">
                Through her trusted partnership, authentic Good Earth seasonings — Hot Peppe, Cameroon Peppe,
                Atarodo, and Ose Di Oku — reach countless wholesale hubs, retail markets, and family
                kitchens every day with unbroken reliability. We honour her steadfast vision, market stewardship,
                and treasured friendship.
              </p>

              <div className="single-card-highlights">
                <div className="highlight-pill">
                  <span className="h-icon">🎂</span>
                  <span className="h-text">Celebration: 4th November</span>
                </div>
                <div className="highlight-pill">
                  <span className="h-icon">🏢</span>
                  <span className="h-text">Osagiodagbon Ventures</span>
                </div>
                <div className="highlight-pill">
                  <span className="h-icon">🌶️</span>
                  <span className="h-text">Good Earth Key Distributor</span>
                </div>
                <div className="highlight-pill">
                  <span className="h-icon">✨</span>
                  <span className="h-text">Health, Joy &amp; Success</span>
                </div>
              </div>

              <div className="single-card-actions">
                <button
                  type="button"
                  className="celebration-popper-btn"
                  onClick={triggerPopper}
                  title="Pop celebration confetti"
                >
                  <span className="popper-icon" aria-hidden="true">🎉</span>
                  <span>Pop Confetti Again</span>
                </button>

                <button
                  type="button"
                  className="celebration-view-full-btn"
                  onClick={() =>
                    setActiveModalImg({
                      src: SLIDES[currentSlide].src,
                      title: SLIDES[currentSlide].title,
                    })
                  }
                >
                  <span>🔍 View Full-Size Image</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Warm Dedication Tribute Banner */}
        <div className="celebration-dedication-banner">
          <div className="dedication-quote-mark" aria-hidden="true">&ldquo;</div>
          <p className="dedication-message">
            Partnership is the heartbeat of Good Earth. On this blessed day, we celebrate the passion,
            leadership, and exemplary entrepreneurial spirit of Madam Ifueko Mabel Ozigbo. Thank you for
            bringing authentic Nigerian spice to dinner tables across the country.
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
