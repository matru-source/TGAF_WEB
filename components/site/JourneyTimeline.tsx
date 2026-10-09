"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/lib/data";

/**
 * Pinned Single-Slide Farm-to-Fork Journey.
 *
 * 1. Background & Slide are frozen in viewport while user scrolls.
 * 2. All 5 steps (01 to 05) are displayed simultaneously in a single screen view.
 * 3. Sub-texts are kept to a single concise line.
 * 4. User scrolling drives the vertical timeline progress rail, activating steps 01..05
 *    one by one and seamlessly switching the corresponding authentic image on the right.
 */
export default function JourneyTimeline() {
  const pinTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    const track = pinTrackRef.current;
    if (!track) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const pinTop = 80;
      const stage = track.querySelector<HTMLElement>(".journey-pinned-stage");
      const stageHeight = stage?.offsetHeight || (vh - pinTop);
      const pinnedDistance = rect.height - stageHeight;

      if (pinnedDistance <= 0) {
        setFillPercent(100);
        setActiveIndex(4);
        return;
      }

      // Exactly when track.top reaches pinTop (80px), the stage pins in the viewport.
      // Progress runs from 0.0 at pin start to 1.0 when the track bottom meets stage bottom.
      const scrolled = pinTop - rect.top;
      const rawProgress = scrolled / pinnedDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Continuous rail fill: 0% at top to 100% at bottom
      setFillPercent(progress * 100);

      // Determine active step (5 segments: 0..4)
      const stepIdx = Math.min(4, Math.floor(progress * 5));
      setActiveIndex(stepIdx);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const jumpToStep = (index: number) => {
    setActiveIndex(index);
    const track = pinTrackRef.current;
    if (!track) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const pinTop = 80;
    const stage = track.querySelector<HTMLElement>(".journey-pinned-stage");
    const stageHeight = stage?.offsetHeight || (vh - pinTop);
    const pinnedDistance = track.offsetHeight - stageHeight;
    if (pinnedDistance > 50) {
      const targetProgress = (index + 0.5) / 5;
      const trackDocTop = window.scrollY + track.getBoundingClientRect().top;
      const targetScrollY = trackDocTop - pinTop + targetProgress * pinnedDistance;
      window.scrollTo({ top: Math.max(0, targetScrollY), behavior: "smooth" });
    }
  };

  const activeStep = PROCESS_STEPS[activeIndex] || PROCESS_STEPS[0];

  return (
    <div className="journey-pin-track" ref={pinTrackRef}>
      {/* Pinned Viewport Container (Freezes background and content in place) */}
      <div className="journey-pinned-stage">
        <div className="journey-slide-grid">
          {/* Left Column: All 5 Steps visible in single view */}
          <div className="journey-steps-col">
            <div className="journey-rail-track" aria-hidden="true">
              <span
                className="journey-rail-fill"
                style={{ height: `${fillPercent}%` }}
              />
            </div>

            <ol className="journey-steps-list">
              {PROCESS_STEPS.map((s, i) => {
                const isActive = i === activeIndex;
                const isPassed = i < activeIndex;

                return (
                  <li
                    key={s.step}
                    className={`j-step ${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`}
                    onClick={() => jumpToStep(i)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${s.step}: ${s.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        jumpToStep(i);
                      }
                    }}
                  >
                    <div className="j-node" aria-hidden="true">
                      <span className="j-num">{s.step}</span>
                    </div>

                    <div className="j-text">
                      <div className="j-header-row">
                        <span className="j-tag">{s.tag}</span>
                        <h3 className="j-title">{s.title}</h3>
                      </div>
                      <p className="j-desc">{s.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right Column: Synchronized Visual Showcase Image Card */}
          <figure className="journey-media-col">
            <div className="journey-media-card">
              {/* Top live badge */}
              <div className="j-card-badge-row">
                <span className="j-card-chip">Step {activeStep.step} of 05</span>
                <span className="j-card-step-tag">{activeStep.tag}</span>
              </div>

              {/* Cross-fading image view */}
              <div className="j-image-stage">
                {PROCESS_STEPS.map((s, idx) => (
                  <div
                    key={s.step}
                    className={`j-image-slide ${idx === activeIndex ? "is-active" : ""}`}
                    aria-hidden={idx !== activeIndex}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      className="j-img"
                      loading={idx <= 1 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>

              {/* Synchronized dynamic caption */}
              <figcaption className="j-caption">
                {activeStep.caption}
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
}
