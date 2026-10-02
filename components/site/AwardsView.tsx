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

            {/* Award Significance & Trophy Spotlight Grid */}
            <div className="award-story-grid">
              <div className="award-product-card award-trophy-card">
                <div className="prod-badge">Winning Award</div>
                <div className="award-trophy-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/img/awards/award.png"
                    alt="Nigeria's Leading Consulting Award presented to TG Agri Farms"
                    className="award-trophy-img"
                  />
                </div>
              </div>

              <div className="award-statement-card">
                <div className="criteria-header">
                  <span className="criteria-eyebrow">Evaluation Pillars</span>
                  <h3>The Winning Standard &amp; Industry Impact</h3>
                </div>
                <div className="criteria-boxes-grid">
                  <div className="criteria-box">
                    <div className="criteria-box-top">
                      <div className="criteria-box-icon criteria-icon--green">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 20h10" />
                          <path d="M12 20v-8" />
                          <path d="M12 12c0-4 4-7 8-7 0 4-3 8-8 8Z" />
                          <path d="M12 12c0-3-3-6-7-6 0 3.5 2.5 6 7 6Z" />
                        </svg>
                      </div>
                      <h4 className="criteria-box-title">100% Indigenous Sourcing</h4>
                    </div>
                    <p className="criteria-box-desc">
                      Direct smallholder farm procurement supporting sustainable Nigerian agriculture.
                    </p>
                  </div>

                  <div className="criteria-box">
                    <div className="criteria-box-top">
                      <div className="criteria-box-icon criteria-icon--chilli">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                      </div>
                      <h4 className="criteria-box-title">Automated Processing</h4>
                    </div>
                    <p className="criteria-box-desc">
                      Steam sterilisation at Ikorodu locking in natural volatile oils and vibrant colour.
                    </p>
                  </div>

                  <div className="criteria-box">
                    <div className="criteria-box-top">
                      <div className="criteria-box-icon criteria-icon--gold">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <h4 className="criteria-box-title">Certified Food Safety</h4>
                    </div>
                    <p className="criteria-box-desc">
                      Full accreditation across NAFDAC, SON, US FDA, Halal, and FSSC 22000.
                    </p>
                  </div>

                  <div className="criteria-box">
                    <div className="criteria-box-top">
                      <div className="criteria-box-icon criteria-icon--blue">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                          <path d="M2 12h20" />
                        </svg>
                      </div>
                      <h4 className="criteria-box-title">Pan-Nigeria Reach</h4>
                    </div>
                    <p className="criteria-box-desc">
                      250+ active distributors &amp; 100+ wholesale markets across 17+ states.
                    </p>
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
