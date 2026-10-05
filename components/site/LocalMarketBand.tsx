"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LocalMarketBand() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalMuted, setIsModalMuted] = useState(false);

  // Reference for in-page video & its card container
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // 1. IntersectionObserver: Start video on scroll, and RESTART from beginning when revisiting!
  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Scrolled to exact video section: restart from beginning and play
            video.currentTime = 0;
            const p = video.play();
            if (p !== undefined) {
              p.catch(() => {});
            }
          } else {
            // Scrolled away: pause
            video.pause();
          }
        });
      },
      {
        threshold: 0.35, // Trigger when 35% of the video section is visible
      }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Escape key listener to close full screen modal
  useEffect(() => {
    if (!isPlaying) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPlaying]);

  const openModal = () => {
    setIsPlaying(true);
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const closeModal = () => {
    setIsPlaying(false);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const toggleModalPlay = () => {
    const v = modalVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  return (
    <>
      <div className="story-magical-wrapper" id="our-story" aria-label="Our Farm to Kitchen Story">
        <div className="container">
          <div className="story-magical-grid">
            {/* Left Media Video Card */}
            <motion.div
              className="story-media-column"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                ref={cardRef}
                className="story-cinematic-card"
                onClick={openModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal();
                  }
                }}
                aria-label="View farm sun-drying video in full screen"
              >
                <video
                  ref={videoRef}
                  src="/video/farm-sun-drying-story.mp4"
                  poster="/img/farm-sun-drying-poster.jpg"
                  muted
                  loop
                  playsInline
                  className="story-cinematic-img"
                  style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
                />
                <div className="story-cinematic-scrim" />

                {/* Top Location Pill Badge */}
                <div className="story-floating-badge top-left">
                  <span className="badge-pin">📍</span>
                  <span>Northern Aggregation Hubs</span>
                </div>

                {/* Bottom Impact Floating Pill */}
                <div className="story-floating-pill bottom-left">
                  <div className="pill-dot" />
                  <span>100% Sun-Dried · Single-Origin Nigerian Peppers</span>
                </div>
              </div>

              {/* Caption Link Below Card */}
              <div className="story-media-caption">
                <button
                  type="button"
                  onClick={openModal}
                  className="story-caption-btn"
                >
                  <span>See how raw peppers are sorted &amp; sun-dried</span>
                  <span className="caption-arrow">→</span>
                </button>
              </div>
            </motion.div>

            {/* Right Editorial Story Copy */}
            <motion.div
              className="story-editorial-column"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Headline */}
              <h2 className="story-editorial-title">
                From Nigerian farms, <br />
                <span className="story-title-highlight">ready for your cooking pot.</span>
              </h2>

              {/* Lead Paragraph */}
              <p className="story-editorial-lead">
                Goodearth connects Nigeria&apos;s rich agricultural heritage directly to your kitchen. Partnering with 50,000+ local smallholders, we deliver 100% pure, sun-dried, and hygienically milled spices with uncompromising aroma, color, and culinary heat.
              </p>

              {/* Action Buttons & Certified Stamp */}
              <div className="story-action-row">
                <Link href="/about" className="btn btn-primary story-primary-btn">
                  <span>Read Our Full Story</span>
                  <span className="arr">→</span>
                </Link>

                {/* Flickering Smooth "Watch Video" Button */}
                <button
                  type="button"
                  onClick={openModal}
                  className="story-secondary-video-btn story-secondary-video-btn--flicker"
                  id="story-watch-video-btn"
                  aria-label="Watch full screen video"
                >
                  <span className="mini-play-icon">▶</span>
                  <span>Watch Video</span>
                </button>

                {/* Luxury Farm-to-Fork Origin Seal */}
                <div className="story-heritage-seal" aria-hidden="true">
                  <div className="seal-badge">
                    <div className="seal-star">★</div>
                    <div className="seal-text-wrap">
                      <span className="seal-heading">NIGERIAN GROWN</span>
                      <span className="seal-sub">100% Pure &amp; Traceable</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-Screen Video Theater (Zero Timeline, No Text Caption, Pure Full Screen) */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="fullscreen-video-theater"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
          >
            {/* Top Close Button */}
            <button
              type="button"
              className="fullscreen-video-close-btn"
              onClick={closeModal}
              aria-label="Close full screen video"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Fullscreen Video Canvas (click toggles play/pause) */}
            <div
              className="fullscreen-video-canvas"
              onClick={(e) => {
                e.stopPropagation();
                toggleModalPlay();
              }}
            >
              <video
                ref={modalVideoRef}
                src="/video/farm-sun-drying-story.mp4"
                poster="/img/farm-sun-drying-poster.jpg"
                autoPlay
                loop
                muted={isModalMuted}
                playsInline
                className="fullscreen-video-media"
              />

              {/* Sound Toggle Button */}
              <div className="fullscreen-video-controls" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="fullscreen-sound-pill"
                  onClick={() => setIsModalMuted(!isModalMuted)}
                  aria-label={isModalMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isModalMuted ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                      <span>Unmute</span>
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                      <span>Sound On</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
