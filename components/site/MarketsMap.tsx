"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { NIGERIA_VIEW_H, NIGERIA_DOTS, MARKET_PINS } from "@/lib/nigeriaMap";

export default function MarketsMap({ searchTerm = "" }: { searchTerm?: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Filter pins based on user search term
  const filteredPins = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return MARKET_PINS;
    return MARKET_PINS.filter(
      (p) =>
        p.state.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.place.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  // Sync active index when search changes
  useEffect(() => {
    if (filteredPins.length > 0) {
      setActive(0);
    }
  }, [filteredPins]);

  // Auto-cycle the highlighted market so labels pop up on their own
  useEffect(() => {
    if (paused || filteredPins.length <= 1) return;
    timer.current = setInterval(() => {
      setActive((i) => (i + 1) % filteredPins.length);
    }, 2400);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, filteredPins.length]);

  const topPct = (y: number) => (y / NIGERIA_VIEW_H) * 100;
  const activePin = filteredPins[active] || filteredPins[0];

  // The 17 distribution states matching Image 2 (excluding farm hub)
  const presenceStates = MARKET_PINS.filter((p) => !p.isHub);
  const farmHub = MARKET_PINS.find((p) => p.isHub);

  return (
    <div className="markets-presence-layout">
      {/* Our Presence 17 States List (matching Image 2) */}
      <aside className="markets-presence-sidebar">
        <div className="presence-sidebar-head">
          <h3 className="presence-sidebar-title">Our Presence</h3>
          <span className="presence-sidebar-sub">17 States Nationwide</span>
        </div>

        <div className="presence-states-list" role="list">
          {presenceStates.map((p) => {
            const isMatch = filteredPins.some((fp) => fp.state === p.state);
            const isSelected = activePin?.state === p.state;

            return (
              <button
                key={p.state}
                type="button"
                className={`presence-state-item${isSelected ? " is-active" : ""}${!isMatch ? " is-dimmed" : ""}`}
                onClick={() => {
                  const idxInFiltered = filteredPins.findIndex((fp) => fp.state === p.state);
                  if (idxInFiltered !== -1) {
                    setActive(idxInFiltered);
                  }
                  setPaused(true);
                }}
                onMouseEnter={() => {
                  const idxInFiltered = filteredPins.findIndex((fp) => fp.state === p.state);
                  if (idxInFiltered !== -1) {
                    setActive(idxInFiltered);
                  }
                  setPaused(true);
                }}
                onMouseLeave={() => setPaused(false)}
                aria-label={`State ${p.number}: ${p.state}`}
              >
                <span className="presence-state-num">{p.number}.</span>
                <span className="presence-state-name">{p.state}</span>
                <span className="presence-state-arr" aria-hidden="true">→</span>
              </button>
            );
          })}
        </div>

        {farmHub && (
          <button
            type="button"
            className={`presence-hub-item${activePin?.isHub ? " is-active" : ""}`}
            onClick={() => {
              const idxInFiltered = filteredPins.findIndex((fp) => fp.isHub);
              if (idxInFiltered !== -1) {
                setActive(idxInFiltered);
              }
              setPaused(true);
            }}
            onMouseEnter={() => {
              const idxInFiltered = filteredPins.findIndex((fp) => fp.isHub);
              if (idxInFiltered !== -1) {
                setActive(idxInFiltered);
              }
              setPaused(true);
            }}
            onMouseLeave={() => setPaused(false)}
            aria-label="Kaduna Farm Aggregation Hub"
          >
            <span className="presence-hub-icon" aria-hidden="true">🌾</span>
            <div>
              <strong>Kaduna Sourcing Hub</strong>
              <span>50,000+ Sourcing Farmers</span>
            </div>
          </button>
        )}
      </aside>

      {/* Dotted Map of Nigeria with all 17 State Pins */}
      <div
        className="dot-map"
        style={{ aspectRatio: `100 / ${NIGERIA_VIEW_H}` }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <svg
          className="dot-map-svg"
          viewBox={`0 0 100 ${NIGERIA_VIEW_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {NIGERIA_DOTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.62} className="dm-dot" />
          ))}
        </svg>

        {filteredPins.map((p, i) => {
          const isCurrent = i === active;
          return (
            <button
              key={p.state || p.name}
              type="button"
              className={`dm-pin${isCurrent ? " is-active" : ""}${p.x < 18 ? " dm-pin-left" : ""}${p.x > 80 ? " dm-pin-right" : ""}${p.isHub ? " dm-pin-hub" : ""}`}
              style={{ left: `${p.x}%`, top: `${topPct(p.y)}%` }}
              onMouseEnter={() => {
                setActive(i);
                setPaused(true);
              }}
              onFocus={() => {
                setActive(i);
                setPaused(true);
              }}
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              aria-label={`${p.state}: ${p.name}, ${p.place}`}
            >
              <span className="dm-dotpin" aria-hidden="true" />
              <span className="dm-label">
                <span className="dm-label-state">
                  {p.isHub ? "🌾 Sourcing Hub" : `📍 ${p.number ? `${p.number}. ` : ""}${p.state}`}
                </span>
                <span className="dm-label-name">{p.name}</span>
                <span className="dm-label-place">{p.place}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
