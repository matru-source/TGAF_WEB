"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
} from "@/lib/data";

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const activeItem = selectedIdx !== null ? filteredItems[selectedIdx] : null;

  const handleOpenLightbox = (index: number) => {
    setSelectedIdx(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedIdx(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [selectedIdx, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  }, [selectedIdx, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIdx === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIdx, handleCloseLightbox, handlePrev, handleNext]);

  // Count items per category
  const getCategoryCount = (key: GalleryCategory) => {
    if (key === "all") return GALLERY_ITEMS.length;
    return GALLERY_ITEMS.filter((item) => item.category === key).length;
  };

  return (
    <div className="gallery-section">
      <div className="container">
        {/* Category Filters */}
        <div className="gallery-filter-bar" role="tablist" aria-label="Gallery Categories">
          {GALLERY_CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat.key);
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setSelectedIdx(null);
                }}
                className={`gallery-filter-btn${isActive ? " active" : ""}`}
              >
                <span>{cat.label}</span>
                <span className="gallery-filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Counter Info Bar */}
        <div className="gallery-info-strip">
          <p className="gallery-count-label">
            Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? "visual capture" : "visual captures"}
          </p>
          <span className="gallery-hint">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Click any image for full-screen inspection
          </span>
        </div>

        {/* Image Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, idx) => (
            <article
              key={item.id}
              className={`gallery-card${item.aspect === "portrait" ? " gallery-card--portrait" : ""}`}
              onClick={() => handleOpenLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenLightbox(idx);
                }
              }}
              aria-label={`View photo: ${item.title}`}
            >
              <div className="gallery-card-media">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="gallery-card-img"
                  loading="lazy"
                />
                <div className="gallery-card-overlay">
                  <div className="gallery-overlay-icon" title="Expand photo">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>
                </div>
                {item.tag && <span className="gallery-card-badge">{item.tag}</span>}
              </div>

              <div className="gallery-card-content">
                {item.location && (
                  <div className="gallery-card-location">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{item.location}</span>
                  </div>
                )}
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-card-caption">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && selectedIdx !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={handleCloseLightbox}
        >
          <div className="gallery-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            {/* Top Bar */}
            <div className="gallery-lightbox-header">
              <div className="gallery-lightbox-meta">
                <span className="gallery-lightbox-pill">{activeItem.categoryLabel}</span>
                <span className="gallery-lightbox-index">
                  {selectedIdx + 1} of {filteredItems.length}
                </span>
              </div>
              <button
                className="gallery-lightbox-close"
                onClick={handleCloseLightbox}
                aria-label="Close modal"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Stage / Image Area */}
            <div className="gallery-lightbox-stage">
              <button
                className="gallery-lightbox-nav prev"
                onClick={handlePrev}
                aria-label="Previous photograph"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="gallery-lightbox-media">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="gallery-lightbox-img"
                  priority
                  sizes="90vw"
                />
              </div>

              <button
                className="gallery-lightbox-nav next"
                onClick={handleNext}
                aria-label="Next photograph"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="gallery-lightbox-footer">
              <div className="gallery-lightbox-details">
                <h2 className="gallery-lightbox-title">{activeItem.title}</h2>
                <p className="gallery-lightbox-desc">{activeItem.caption}</p>
                {activeItem.location && (
                  <div className="gallery-lightbox-loc">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{activeItem.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
