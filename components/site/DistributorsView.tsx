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

export default function DistributorsView() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [activeModalImg, setActiveModalImg] = useState<{ src: string; title: string } | null>(null);

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

  // Paper Popper Confetti Blast (no text, purely joyful fluttering paper particles)
  const triggerPopper = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const newParticles: Particle[] = [];
    const count = 180;

    // Left cannon (bursting up-right)
    for (let i = 0; i < count / 2; i++) {
      const angle = -Math.PI / 2 + (Math.random() * 0.7 - 0.15); // -75 to -35 deg
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
      const angle = -Math.PI / 2 - (Math.random() * 0.7 - 0.15); // -105 to -145 deg
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

  return (
    <div className="celebration-view-wrapper">
      {/* Paper Popper Confetti Animation (no text, pure paper particle burst) */}
      <canvas ref={canvasRef} className="celebration-confetti-canvas" aria-hidden="true" />

      <div className="container">
        {/* Celebration Header Bar */}
        <div className="celebration-top-bar">
          <div className="celebration-badge-pill">
            <span className="celebration-sparkle">🎉</span>
            <span>Distributor Birthday Celebration · 4th November</span>
          </div>

          <button
            type="button"
            className="celebration-popper-btn"
            onClick={triggerPopper}
            title="Pop celebration confetti"
          >
            <span className="popper-icon" aria-hidden="true">🎉</span>
            <span>Pop Confetti</span>
          </button>
        </div>

        {/* Two Celebration Images with Relatable Descriptions */}
        <div className="celebration-spotlight-grid">
          {/* Card 1: Portrait Celebration Poster */}
          <article className="celebration-showcase-card portrait-showcase">
            <div
              className="celebration-media-box"
              onClick={() =>
                setActiveModalImg({
                  src: "/img/celebrations/madam-ifueko-ozigbo-birthday-portrait.jpg",
                  title: "Celebrating Madam Ifueko Mabel Ozigbo - 4th Nov",
                })
              }
              title="Click to view full image"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveModalImg({
                    src: "/img/celebrations/madam-ifueko-ozigbo-birthday-portrait.jpg",
                    title: "Celebrating Madam Ifueko Mabel Ozigbo - 4th Nov",
                  });
                }
              }}
            >
              <div className="celebration-card-badge">4th November · Birthday Tribute</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/celebrations/madam-ifueko-ozigbo-birthday-portrait.jpg"
                alt="Celebrating Madam Ifueko Mabel Ozigbo, CEO Osagiodagbon Ventures - 4th November Birthday"
                className="celebration-card-image"
                loading="eager"
              />
              <span className="media-zoom-hint">🔍 Tap to enlarge</span>
            </div>

            <div className="celebration-card-content">
              <span className="celebration-eyebrow-tag">Key Distribution Partner</span>
              <h2 className="celebration-person-title">Madam Ifueko Mabel Ozigbo</h2>
              <div className="celebration-person-designation">
                Chief Executive Officer, Osagiodagbon Ventures
              </div>

              <p className="celebration-narrative">
                Today, the Board, Leadership, and the entire Good Earth family joyously celebrate{" "}
                <strong>Madam Ifueko Mabel Ozigbo</strong> on the special occasion of her birthday.
                As the CEO of Osagiodagbon Ventures, she embodies remarkable entrepreneurial grit,
                relentless dedication, and inspiring commercial leadership across the Nigerian spice
                distribution landscape.
              </p>

              <p className="celebration-narrative">
                Through her trusted partnership, authentic Good Earth seasonings — Hot Peppe, Cameroon Peppe,
                Atarodo, and Ose Di Oku — reach countless wholesale hubs, retail markets, and family
                kitchens every single day. We honour her steadfast vision, market stewardship, and valued friendship.
              </p>

              <div className="celebration-highlights-row">
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
              </div>
            </div>
          </article>

          {/* Card 2: Birthday Greeting Card */}
          <article className="celebration-showcase-card card-showcase">
            <div
              className="celebration-media-box"
              onClick={() =>
                setActiveModalImg({
                  src: "/img/celebrations/madam-ifueko-ozigbo-birthday-card.jpg",
                  title: "Happy Birthday Greetings from TG Agri Farms Ltd & Good Earth",
                })
              }
              title="Click to view full image"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveModalImg({
                    src: "/img/celebrations/madam-ifueko-ozigbo-birthday-card.jpg",
                    title: "Happy Birthday Greetings from TG Agri Farms Ltd & Good Earth",
                  });
                }
              }}
            >
              <div className="celebration-card-badge badge-gold">Official Birthday Card</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/celebrations/madam-ifueko-ozigbo-birthday-card.jpg"
                alt="Birthday Felicitations from TG Agri Farms Ltd & Good Earth to Madam Ifueko Mabel Ozigbo"
                className="celebration-card-image"
                loading="eager"
              />
              <span className="media-zoom-hint">🔍 Tap to enlarge</span>
            </div>

            <div className="celebration-card-content">
              <span className="celebration-eyebrow-tag tag-gold">Official Felicitations</span>
              <h2 className="celebration-person-title">Heartfelt Birthday Wishes</h2>
              <div className="celebration-person-designation">
                From All of Us at TG Agri Farms Ltd &amp; Good Earth
              </div>

              <blockquote className="celebration-quote-card">
                &ldquo;Wishing you a joyful birthday and a year filled with good health, happiness,
                and continued success.&rdquo;
              </blockquote>

              <p className="celebration-narrative">
                Our distributors are not merely business associates; they are the bedrock of our
                community and the vital bridge connecting Nigeria&apos;s farms to the nation&apos;s kitchens.
                Madam Ifueko&apos;s enduring energy and pursuit of excellence reflect the very core of what
                makes our distributor network thrive.
              </p>

              <p className="celebration-narrative">
                As you step into another prosperous year, we pray that your path continues to be illuminated
                with divine health, peaceful prosperity, and boundless commercial milestones. Happy Birthday!
              </p>

              <div className="celebration-highlights-row">
                <div className="highlight-pill">
                  <span className="h-icon">✨</span>
                  <span className="h-text">Good Health &amp; Happiness</span>
                </div>
                <div className="highlight-pill">
                  <span className="h-icon">🌱</span>
                  <span className="h-text">Growing Together</span>
                </div>
                <div className="highlight-pill">
                  <span className="h-icon">🤝</span>
                  <span className="h-text">TG Agri Farms Ltd Family</span>
                </div>
              </div>
            </div>
          </article>
        </div>

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
