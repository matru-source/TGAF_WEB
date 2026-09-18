"use client";

import { useState } from "react";
import Link from "next/link";
import { AWARDS } from "@/lib/data";

export default function AwardsView() {
  const [activeModalImg, setActiveModalImg] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  const award = AWARDS[0];

  return (
    <>
      {/* Primary Award Spotlight */}
      <section className="section">
        <div className="container">
          <div className="award-spotlight">
            {/* Top Header */}
            <div className="award-header-center">
              <div className="award-laurel-badge">
                <span className="trophy-icon">🏆</span>
                <span>13th Marketing Edge Awards · 2025 Winner</span>
              </div>
              <h2 className="award-main-title">{award.title}</h2>
              <div className="award-sub-meta">
                <span className="award-recipient">Winner: <strong>{award.brand}</strong></span>
                <span className="sep">•</span>
                <span>{award.company}</span>
                <span className="sep">•</span>
                <span>Theme: <em>&ldquo;{award.theme}&rdquo;</em></span>
                <span className="sep">•</span>
                <span>{award.location}</span>
              </div>
            </div>

            {/* Ceremony Showcase Card (Full Panoramic Width - All 5 Individuals Fully Visible Uncropped) */}
            <div className="ceremony-showcase-card">
              <div className="ceremony-panoramic-frame">
                <div className="ceremony-img-box">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={award.ceremonyPhoto}
                    alt="TG Agri Farm leadership receiving the Outstanding Indigenous Naija Spice of the Year trophy"
                    className="ceremony-img-panoramic"
                  />
                  <div className="gold-winner-badge">
                    <span className="year">2025</span>
                    <span className="status">WINNER</span>
                  </div>
                </div>
              </div>

              <div className="ceremony-caption-bar">
                <div className="caption-tag">Trophy Presentation on Stage · Lagos</div>
                <div className="caption-roster">
                  <div className="roster-item presenter">
                    <span>Presented By:</span> <strong>{award.presentedBy}</strong>
                  </div>
                  {award.receivedBy.map((p) => (
                    <div className="roster-item" key={p.name}>
                      <strong>{p.name}</strong> · {p.role.replace(", TG Agri Farm", "")}
                    </div>
                  ))}
                </div>
              </div>

              <div className="ceremony-citation-strip">
                <div className="citation-kicker">
                  <span className="kicker-star">★</span>
                  <span>Jury Citation &amp; Industry Recognition</span>
                </div>
                <h3 style={{ fontSize: "1.35rem", fontFamily: "var(--serif)", color: "#FFFFFF", marginBottom: "12px" }}>
                  Setting the Benchmark for Indigenous Spice Excellence
                </h3>
                <blockquote className="citation-quote-box">
                  <p className="quote-body">&ldquo;{award.statement}&rdquo;</p>
                </blockquote>
                <div className="editorial-btn-row">
                  <a href="#press-coverage" className="btn btn-primary btn-sm">
                    Read Newspaper Press Scans ↓
                  </a>
                  <Link href="/products/hot-peppe-powder" className="btn btn-secondary btn-sm">
                    View Winning Product Specs →
                  </Link>
                </div>
              </div>
            </div>

            {/* Award Significance & Product Spotlight Grid */}
            <div className="award-story-grid">
              <div className="award-product-card">
                <div className="prod-badge">Winning Product</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Product/hot-peppe-studio.jpg"
                  alt="Goodearth Hot Peppe Powder retail pack"
                  className="award-prod-img"
                />
                <h3>Goodearth Hot Peppe</h3>
                <p className="prod-tagline">100% Naija Grown &amp; Milled</p>
                <Link href="/products/hot-peppe-powder" className="btn btn-primary btn-sm">
                  View Product Specs <span className="arr">→</span>
                </Link>
              </div>

              <div className="award-statement-card">
                <div className="criteria-header">
                  <span className="criteria-eyebrow">Evaluation Pillars</span>
                  <h3>Why Goodearth Hot Peppe Won</h3>
                </div>
                <div className="criteria-list">
                  <div className="criteria-item">
                    <div className="criteria-num">01</div>
                    <div className="criteria-text">
                      <strong>100% Indigenous Sourcing:</strong> Directly procured from Nigerian pepper farmers, supporting local agricultural outgrower livelihoods.
                    </div>
                  </div>
                  <div className="criteria-item">
                    <div className="criteria-num">02</div>
                    <div className="criteria-text">
                      <strong>Automated Processing Infrastructure:</strong> US$12M facility in Ikorodu with steam sterilization retaining natural volatile oils and vivid colour.
                    </div>
                  </div>
                  <div className="criteria-item">
                    <div className="criteria-num">03</div>
                    <div className="criteria-text">
                      <strong>Food-Safety Accreditations:</strong> Full compliance with NAFDAC, SON, US FDA, Halal, and FSSC 22000 manufacturing norms.
                    </div>
                  </div>
                  <div className="criteria-item">
                    <div className="criteria-num">04</div>
                    <div className="criteria-text">
                      <strong>Rapid Consumer &amp; Market Adoption:</strong> Over 250 distributors and 170+ open markets nationwide embracing Goodearth within 18 months.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Press Coverage Section */}
      <section className="section section--cream2" id="press-coverage">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow center">National Press Coverage</span>
            <h2>As Reported in Nigeria&apos;s Leading Dailies</h2>
            <p className="lead center" style={{ maxWidth: "720px", margin: "0 auto" }}>
              The victory was published in national editions of Nigeria&apos;s most respected newspapers. Click any clipping to view the high-resolution scanned page.
            </p>
          </div>

          <div className="press-columns">
            {award.pressFeatures.map((press) => (
              <article className="press-feature-box" key={press.id}>
                <div className="press-top-bar">
                  <div className="press-masthead">
                    <span className="newspaper-name">{press.publication}</span>
                    <span className="newspaper-date">{press.edition}</span>
                  </div>
                  <span className="newspaper-page-tag">{press.page}</span>
                </div>

                <div
                  className="newspaper-thumb-wrap"
                  onClick={() =>
                    setActiveModalImg({
                      src: press.image,
                      title: press.publication,
                      subtitle: `${press.edition} · ${press.page}`,
                    })
                  }
                  role="button"
                  tabIndex={0}
                  aria-label={`Open full newspaper page for ${press.publication}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveModalImg({
                        src: press.image,
                        title: press.publication,
                        subtitle: `${press.edition} · ${press.page}`,
                      });
                    }
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={press.image} alt={`${press.publication} clipping`} className="newspaper-thumb" />
                  <div className="zoom-hover-overlay">
                    <span className="zoom-btn">🔍 Click to View Full Page</span>
                  </div>
                </div>

                <div className="press-meta-content">
                  <h3 className="press-story-headline">&ldquo;{press.headline}&rdquo;</h3>
                  <p className="press-snippet">{press.highlight}</p>
                  <div className="press-caption-text">
                    <strong>Caption:</strong> {press.photoCaption}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow center">The Goodearth Advantage</span>
            <h2>Why This Award Matters to Nigeria</h2>
          </div>

          <div className="pillars-trio">
            <div className="pillar-item">
              <div className="pillar-num">01</div>
              <h3>50,000+ Smallholder Farmers</h3>
              <p>
                Every pack represents direct local procurement across 100 farmer markets and 25 aggregators, grown by 50,000+ farmers with 10,000+ trained — empowering local farming families without foreign crop imports.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-num">02</div>
              <h3>US$12M Automated Plant</h3>
              <p>
                Processed at our Ikorodu mill with state-of-the-art steam sterilisation, sieving, and hygienic material handling meeting the highest international benchmarks.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-num">03</div>
              <h3>Uncompromised Pungency</h3>
              <p>
                Preserving authentic heat, colour, and aroma that Nigerian kitchens trust every day — proving indigenous spices can lead the FMCG market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeModalImg && (
        <div className="press-modal-backdrop" onClick={() => setActiveModalImg(null)}>
          <div className="press-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div>
                <h4>{activeModalImg.title}</h4>
                <p>{activeModalImg.subtitle}</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveModalImg(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-scroll-area">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeModalImg.src} alt={activeModalImg.title} className="modal-image" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
