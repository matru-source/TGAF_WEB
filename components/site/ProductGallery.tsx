"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 4000;

export default function ProductGallery({
  images,
  alt,
  wellClass = "",
}: {
  images: string[];
  alt: string;
  wellClass?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const count = images.length;

  // Scroll position is the single source of truth: arrows and autoplay scroll
  // the track, and `index` is derived back from it in onScroll. Driving the
  // scroll from an `index` effect instead makes the two fight mid-animation.
  const go = useCallback(
    (n: number) => {
      const el = trackRef.current;
      if (!el) return;
      const target = ((n % count) + count) % count;
      el.scrollTo({ left: el.clientWidth * target, behavior: "smooth" });
    },
    [count],
  );

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const current = Math.round(el.scrollLeft / el.clientWidth);
      const next = (current + 1) % count;
      el.scrollTo({ left: el.clientWidth * next, behavior: "smooth" });
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [count, paused]);

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  // Drag-to-scroll: touch devices pan natively, but a mouse has no way to
  // scroll a horizontal track, so wire pointer drags to scrollLeft.
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || count < 2) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!drag.current.active || !el) return;
    e.preventDefault();
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!drag.current.active || !el) return;
    drag.current.active = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    // Snap to whichever slide the drag landed nearest.
    go(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <div
      className={`gallery ${wellClass}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="gallery-track"
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {images.map((src, i) => (
          <div className="gallery-slide" key={src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={count > 1 ? `${alt} - view ${i + 1} of ${count}` : alt}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="gallery-arrow gallery-arrow--prev"
            onClick={() => go(index - 1)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="gallery-arrow gallery-arrow--next"
            onClick={() => go(index + 1)}
            aria-label="Next image"
          >
            ›
          </button>
          <div className="gallery-dots">
            {images.map((src, i) => (
              <button
                type="button"
                key={src}
                className={`gallery-dot ${i === index ? "is-active" : ""}`}
                onClick={() => go(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
