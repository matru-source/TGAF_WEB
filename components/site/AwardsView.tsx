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

            {/* Stage Ceremony Banner */}
            <div className="ceremony-showcase">
              <div className="ceremony-img-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={award.ceremonyPhoto}
                  alt="TG Agri Farm leadership receiving the Outstanding Indigenous Naija Spice of the Year trophy"
                  className="ceremony-img"
                />
                <div className="gold-winner-tag">
                  <span className="year">2025</span>
                  <span className="status">WINNER</span>
                </div>
              </div>

              {/* Roster & Caption */}
              <div className="ceremony-caption-bar">
                <div className="caption-title">Trophy Presentation on Stage in Lagos:</div>
                <div className="caption-roster">
                  <span className="roster-item presenter">
                    <strong>Presented by:</strong> {award.presentedBy}
                  </span>
                  {award.receivedBy.map((p) => (
                    <span className="roster-item" key={p.name}>
                      <strong>{p.name}</strong> ({p.role.replace(", TG Agri Farm", "")})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Award Significance & Product Spotlight Grid */}
            <div className="award-story-grid">
              <div className="award-product-card">
                <div className="prod-badge">Winning Product</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Product/hot-pepe-1.jpeg"
                  alt="Goodearth Hot Peppe Powder retail pack"
                  className="award-prod-img"
                />
                <h3>Goodearth Hot Peppe</h3>
                <p className="prod-tagline">100% Naija Grown &amp; Milled</p>
                <Link href="/products/hot-pepe-powder" className="btn btn-primary btn-sm">
                  View Product Specs <span className="arr">→</span>
                </Link>
              </div>

              <div className="award-statement-card">
                <div className="statement-quote-mark">&ldquo;</div>
                <blockquote className="statement-quote">
                  {award.statement}
                </blockquote>
                <div className="statement-footer">
                  <div className="author-org">Official Statement · TG Agri Farm / Goodearth Foods</div>
                  <div className="author-summary">{award.summary}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Press Coverage Section */}
      <section className="section section--cream2">
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
              <h3>350+ Smallholder Farmers</h3>
              <p>
                Every pack represents direct local procurement across 12 farmers&apos; markets and 7 aggregators — empowering local farming families without foreign crop imports.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-num">02</div>
              <h3>US$10M Automated Plant</h3>
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

      {/* Scoped Styling */}
      <style jsx>{`
        .award-spotlight {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          padding: clamp(28px, 4vw, 56px);
          box-shadow: var(--shadow-md);
        }

        .award-header-center {
          text-align: center;
          max-width: 920px;
          margin: 0 auto 36px auto;
        }

        .award-laurel-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fdf5e2;
          color: #926207;
          border: 1px solid #e9c878;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 6px 18px;
          border-radius: 999px;
          margin-bottom: 16px;
        }

        .trophy-icon {
          font-size: 1.1rem;
        }

        .award-main-title {
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          line-height: 1.12;
          color: var(--ink);
          margin-bottom: 14px;
        }

        .award-sub-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 8px 12px;
          font-size: 0.92rem;
          color: var(--ink-2);
        }

        .award-recipient strong {
          color: var(--chilli);
        }

        .sep {
          color: var(--line-strong);
        }

        /* Ceremony Frame */
        .ceremony-showcase {
          background: #191410;
          border-radius: var(--radius);
          border: 1px solid #3d332a;
          overflow: hidden;
          margin-bottom: 36px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
        }

        .ceremony-img-frame {
          position: relative;
          width: 100%;
          background: #110e0c;
        }

        .ceremony-img {
          width: 100%;
          height: auto;
          max-height: 460px;
          object-fit: cover;
          display: block;
        }

        .gold-winner-tag {
          position: absolute;
          top: 18px;
          right: 18px;
          background: linear-gradient(135deg, #ffd768 0%, #d49514 100%);
          color: #1a1205;
          padding: 8px 16px;
          border-radius: 999px;
          font-weight: 800;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }

        .gold-winner-tag .year {
          font-size: 1rem;
          line-height: 1;
        }

        .gold-winner-tag .status {
          font-size: 0.65rem;
          letter-spacing: 0.14em;
        }

        .ceremony-caption-bar {
          padding: 16px 24px;
          background: #241d17;
          border-top: 1px solid #3d332a;
          color: #e2dbd1;
        }

        .caption-title {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #d4a552;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .caption-roster {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 12px;
        }

        .roster-item {
          font-size: 0.82rem;
          color: #cfc6b8;
          background: rgba(255, 255, 255, 0.06);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .roster-item.presenter {
          background: rgba(212, 149, 20, 0.15);
          color: #f7d58a;
          border-color: rgba(212, 149, 20, 0.35);
        }

        .roster-item strong {
          color: #ffffff;
        }

        /* Story Grid */
        .award-story-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: clamp(20px, 3vw, 40px);
          align-items: stretch;
        }

        @media (max-width: 860px) {
          .award-story-grid {
            grid-template-columns: 1fr;
          }
        }

        .award-product-card {
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .prod-badge {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--chilli);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .award-prod-img {
          width: 140px;
          height: 140px;
          object-fit: contain;
          border-radius: 12px;
          margin-bottom: 12px;
          filter: drop-shadow(0 6px 14px rgba(33, 28, 22, 0.15));
        }

        .award-product-card h3 {
          font-size: 1.15rem;
          margin-bottom: 4px;
        }

        .prod-tagline {
          font-size: 0.82rem;
          color: var(--muted);
          margin-bottom: 16px;
        }

        .btn-sm {
          padding: 8px 18px;
          font-size: 0.84rem;
        }

        .award-statement-card {
          background: var(--cream-2);
          border: 1px solid var(--line);
          border-left: 4px solid var(--gold);
          border-radius: 0 var(--radius) var(--radius) 0;
          padding: clamp(24px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .statement-quote-mark {
          font-family: var(--serif);
          font-size: 3.5rem;
          line-height: 0.6;
          color: var(--gold);
          margin-bottom: 8px;
        }

        .statement-quote {
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(1.05rem, 1.4vw, 1.25rem);
          line-height: 1.55;
          color: var(--ink);
          margin-bottom: 16px;
        }

        .author-org {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--chilli);
          margin-bottom: 4px;
        }

        .author-summary {
          font-size: 0.88rem;
          color: var(--ink-2);
          line-height: 1.5;
        }

        /* Press Columns */
        .press-columns {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(24px, 3.5vw, 40px);
          margin-top: 40px;
        }

        @media (max-width: 860px) {
          .press-columns {
            grid-template-columns: 1fr;
          }
        }

        .press-feature-box {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }

        .press-feature-box:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .press-top-bar {
          background: var(--cream);
          padding: 16px 22px;
          border-bottom: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .newspaper-name {
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--ink);
          display: block;
        }

        .newspaper-date {
          font-size: 0.78rem;
          color: var(--muted);
        }

        .newspaper-page-tag {
          font-size: 0.76rem;
          font-weight: 600;
          background: var(--paper);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid var(--line);
          color: var(--ink-2);
        }

        .newspaper-thumb-wrap {
          position: relative;
          cursor: pointer;
          background: #ede6d8;
          max-height: 480px;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
        }

        .newspaper-thumb {
          width: 100%;
          display: block;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.4s var(--ease);
        }

        .newspaper-thumb-wrap:hover .newspaper-thumb {
          transform: scale(1.02);
        }

        .zoom-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(33, 28, 22, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s var(--ease);
        }

        .zoom-btn {
          background: var(--chilli);
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.86rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
        }

        .newspaper-thumb-wrap:hover .zoom-hover-overlay {
          opacity: 1;
        }

        .press-meta-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .press-story-headline {
          font-family: var(--serif);
          font-size: 1.35rem;
          line-height: 1.25;
          margin-bottom: 10px;
          color: var(--ink);
        }

        .press-snippet {
          font-size: 0.92rem;
          color: var(--ink-2);
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .press-caption-text {
          font-size: 0.8rem;
          color: var(--muted);
          line-height: 1.45;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }

        /* Pillars Trio */
        .pillars-trio {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 2.5vw, 32px);
          margin-top: 36px;
        }

        @media (max-width: 768px) {
          .pillars-trio {
            grid-template-columns: 1fr;
          }
        }

        .pillar-item {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 28px;
          box-shadow: var(--shadow-sm);
        }

        .pillar-num {
          font-family: var(--serif);
          font-size: 2.2rem;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 12px;
        }

        .pillar-item h3 {
          font-size: 1.15rem;
          margin-bottom: 8px;
        }

        .pillar-item p {
          font-size: 0.9rem;
          color: var(--ink-2);
          line-height: 1.55;
        }

        /* Modal */
        .press-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(16, 12, 8, 0.85);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .press-modal-window {
          background: var(--paper);
          border-radius: var(--radius-lg);
          max-width: 920px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }

        .modal-top {
          padding: 18px 24px;
          background: var(--cream);
          border-bottom: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-top h4 {
          font-size: 1.15rem;
          margin: 0;
        }

        .modal-top p {
          font-size: 0.82rem;
          color: var(--muted);
          margin: 2px 0 0 0;
        }

        .modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--cream-2);
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
        }

        .modal-close-btn:hover {
          background: var(--chilli);
          color: #ffffff;
        }

        .modal-scroll-area {
          overflow-y: auto;
          padding: 24px;
          display: flex;
          justify-content: center;
          background: #241e19;
        }

        .modal-image {
          max-width: 100%;
          height: auto;
          display: block;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
}
