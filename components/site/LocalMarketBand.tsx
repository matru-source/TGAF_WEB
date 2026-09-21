"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LocalMarketBand() {
  const [isPlaying, setIsPlaying] = useState(false);

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
                className="story-cinematic-card"
                onClick={() => setIsPlaying(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsPlaying(true);
                  }
                }}
                aria-label="Play Farm-to-Kitchen Video Story"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/photo-drying.jpg"
                  alt="Nigerian farmers sun-drying fresh red peppers under northern sunshine"
                  className="story-cinematic-img"
                  loading="lazy"
                />
                <div className="story-cinematic-scrim" />

                {/* Top Location Pill Badge */}
                <div className="story-floating-badge top-left">
                  <span className="badge-pin">📍</span>
                  <span>Northern Aggregation Hubs</span>
                </div>

                {/* Central Play Trigger Button */}
                <div className="story-play-trigger">
                  <div className="story-play-pulse-ring" />
                  <div className="story-play-btn-circle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  </div>
                  <span className="story-play-label">Watch Field Story (1:45)</span>
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
                  onClick={() => setIsPlaying(true)}
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
                <span className="story-title-highlight">ready for your pot.</span>
              </h2>

              {/* Lead Paragraph */}
              <p className="story-editorial-lead">
                Goodearth is more than just spices — it’s a commitment to Nigerian agriculture. We partner directly with verified farming communities across northern Nigeria to bring 100% pure, sun-dried, and hygienically milled peppers directly from fertile fields to kitchens nationwide and worldwide.
              </p>

              {/* Action Buttons & Certified Stamp */}
              <div className="story-action-row">
                <Link href="/about" className="btn btn-primary story-primary-btn">
                  <span>Read Our Full Story</span>
                  <span className="arr">→</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="story-secondary-video-btn"
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

      {/* Farm Video Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPlaying(false)}
          >
            <motion.div
              className="video-modal-dialog"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setIsPlaying(false)}
                aria-label="Close story video"
              >
                ✕
              </button>
              <div className="video-aspect">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/gallery/pepper-harvest-sundrying.png"
                  alt="Chilli drying in northern depot"
                  className="video-placeholder-media"
                />
                <div className="video-modal-caption">
                  <h3>From Outgrower Farms to Market Stalls</h3>
                  <p>Over 50,000 farmers supported across northern and south-western aggregation hubs.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
