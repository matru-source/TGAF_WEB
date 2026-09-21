"use client";
import { useEffect, useRef, useState } from "react";
import { NIGERIA_VIEW_H, NIGERIA_DOTS, MARKET_PINS } from "@/lib/nigeriaMap";

export default function MarketsMap() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-cycle the highlighted market so labels "pop up" on their own (also on
  // touch devices with no hover). Pauses while the user is interacting.
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setActive((i) => (i + 1) % MARKET_PINS.length);
    }, 2000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const topPct = (y: number) => (y / NIGERIA_VIEW_H) * 100;

  return (
    <div className="markets-map-solo">
      <div
        className="dot-map"
        style={{ aspectRatio: `100 / ${NIGERIA_VIEW_H}` }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <svg className="dot-map-svg" viewBox={`0 0 100 ${NIGERIA_VIEW_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {NIGERIA_DOTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.62} className="dm-dot" />
          ))}
        </svg>

        {MARKET_PINS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            className={`dm-pin${i === active ? " is-active" : ""}${p.x < 20 ? " dm-pin-left" : ""}`}
            style={{ left: `${p.x}%`, top: `${topPct(p.y)}%` }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            aria-label={`${p.name}, ${p.place}`}
          >
            <span className="dm-dotpin" aria-hidden="true" />
            <span className="dm-label">
              <span className="dm-label-name">{p.name}</span>
              <span className="dm-label-place">{p.place}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
