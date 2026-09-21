"use client";

import { useState } from "react";
import Link from "next/link";
import MarketsMap from "./MarketsMap";

export default function Markets({
  withHead = true,
  withNote = true,
}: {
  withHead?: boolean;
  withNote?: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="markets-magical-section">
      <div className="container">
        {withHead && (
          <div className="markets-magical-head">
            <span className="eyebrow-accent">- WHERE TO BUY</span>
            <h2>Find Goodearth for market near you</h2>
            <p className="lead-muted">
              Our spices are available across 100+ markets in 17+ states. Find a retailer or distributor near you.
            </p>

            {/* Search Bar matching mockup */}
            <div className="market-search-bar">
              <span className="search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                type="text"
                placeholder="Enter your city or state (e.g., Lagos, Kano, Rivers...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="market-search-input"
                aria-label="Search city or market"
              />
              <button type="button" className="market-search-btn">
                Search
              </button>
            </div>
          </div>
        )}

        <div className="markets-map-stage-wrap">
          <MarketsMap />

          {/* Handwritten Script Accent */}
          <div className="map-script-accent" aria-hidden="true">
            <span className="map-script-txt">Global reach, Local impact.</span>
            <span className="map-script-curl">〰️</span>
          </div>
        </div>

        {withNote && (
          <div className="markets-note">
            <p>Be a trader wey carry correct peppe?</p>
            <Link href="/contact" className="btn btn-ghost">
              Become a distributor <span className="arr">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
