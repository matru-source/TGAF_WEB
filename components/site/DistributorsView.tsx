"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon, type IconName } from "./icons";
import {
  DISTRIBUTOR_METRICS,
  DISTRIBUTOR_HUBS,
  COMMERCIAL_PERSONS,
  DISTRIBUTOR_VOICES,
  PARTNERSHIP_BENEFITS,
  type DistributorHub,
} from "@/lib/distributorsData";

type TabKey = "champions" | "persons" | "voices" | "partner";
type RegionFilter = "All" | "South-West" | "South-East" | "North-West & North" | "South-South";

const REGIONS: RegionFilter[] = ["All", "South-West", "South-East", "North-West & North", "South-South"];

export default function DistributorsView() {
  const [activeTab, setActiveTab] = useState<TabKey>("champions");
  const [regionFilter, setRegionFilter] = useState<RegionFilter>("All");

  // Form states for "Become a Distributor"
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMsg, setFormMsg] = useState("");
  const [ticketRef, setTicketRef] = useState("");

  // Hash syncing with window location if navigated via anchor
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "") as TabKey;
      if (["champions", "persons", "voices", "partner"].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${key}`);
    }
  };

  const filteredHubs =
    regionFilter === "All"
      ? DISTRIBUTOR_HUBS
      : DISTRIBUTOR_HUBS.filter((h) => h.region === regionFilter);

  // Form submission handler
  async function handleDistributorSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    setFormMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") || "").trim();
    const businessName = String(fd.get("businessName") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const state = String(fd.get("state") || "").trim();
    const market = String(fd.get("market") || "").trim();
    const tier = String(fd.get("tier") || "Key Wholesale Distributor").trim();
    const projectedVolume = String(fd.get("projectedVolume") || "").trim();
    const experience = String(fd.get("experience") || "").trim();

    if (!name || !phone || !state) {
      setFormStatus("error");
      setFormMsg("Please complete your Full Name, Phone Number, and State.");
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const refCode = `DIST-${randomNum}`;

    const message = `DISTRIBUTOR APPLICATION REF: ${refCode}
Business / Trading Name: ${businessName || "Individual Distributor"}
Applicant Name: ${name}
Phone Number: ${phone}
Email Address: ${email || "Not provided"}
Operating State: ${state}
Primary Market / Location: ${market || "Not specified"}
Proposed Distribution Tier: ${tier}
Projected Monthly Volume: ${projectedVolume || "To be discussed"}

Distribution Experience & Infrastructure:
${experience || "Experienced in FMCG & foodstuff retail distribution."}`;

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "distributor-application",
          name,
          email: email || `distributor.${randomNum}@tgagrifarms.partner`,
          company: `${businessName || name} (${state})`.slice(0, 160),
          interest: `Distributor Tier: ${tier} · ${state}`.slice(0, 160),
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Could not submit application.");
      }

      setTicketRef(refCode);
      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("error");
      setFormMsg("Network error. Please try again or email our sales desk at Info@tgagrifarms.com.");
    }
  }

  return (
    <div className="distributors-page-wrap">
      {/* 1. Traction & Reach KPI Metrics Bar */}
      <section className="distributors-metrics-section">
        <div className="container">
          <div className="distributors-metrics-grid">
            {DISTRIBUTOR_METRICS.map((m) => (
              <div className="distributor-metric-card" key={m.label}>
                <div className="metric-val">{m.value}</div>
                <div className="metric-lbl">{m.label}</div>
                <div className="metric-sub">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Page Category Navigation Tabs */}
      <section className="distributors-tabs-section">
        <div className="container">
          <div className="distributors-nav-pills" role="tablist" aria-label="Distributor & Persons Showcase Tabs">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "champions"}
              className={`distributor-tab-btn ${activeTab === "champions" ? "active" : ""}`}
              onClick={() => handleTabChange("champions")}
            >
              <span className="tab-icon" aria-hidden="true">🏆</span>
              <span className="tab-title">Distributor Champions &amp; Hubs</span>
              <span className="tab-pill-badge">{DISTRIBUTOR_HUBS.length} Hubs</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "persons"}
              className={`distributor-tab-btn ${activeTab === "persons" ? "active" : ""}`}
              onClick={() => handleTabChange("persons")}
            >
              <span className="tab-icon" aria-hidden="true">👥</span>
              <span className="tab-title">Commercial &amp; Sales Persons</span>
              <span className="tab-pill-badge">{COMMERCIAL_PERSONS.length} Leaders</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "voices"}
              className={`distributor-tab-btn ${activeTab === "voices" ? "active" : ""}`}
              onClick={() => handleTabChange("voices")}
            >
              <span className="tab-icon" aria-hidden="true">💬</span>
              <span className="tab-title">Market Voices &amp; Traders</span>
              <span className="tab-pill-badge">Voices of Naija</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "partner"}
              className={`distributor-tab-btn ${activeTab === "partner" ? "active" : ""}`}
              onClick={() => handleTabChange("partner")}
            >
              <span className="tab-icon" aria-hidden="true">🤝</span>
              <span className="tab-title">Become a Distributor</span>
              <span className="tab-pill-badge tab-pill-badge--gold">Join Network</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Tab Contents */}
      <div className="container distributors-content-container">
        {/* ==================================================================== */}
        {/* TAB 1: DISTRIBUTOR CHAMPIONS & REGIONAL HUBS                         */}
        {/* ==================================================================== */}
        <div className={`distributors-tab-panel ${activeTab === "champions" ? "active" : "is-hidden"}`} role="tabpanel" aria-hidden={activeTab !== "champions"}>
            {/* Intro Header */}
            <div className="distributors-section-header">
              <div>
                <span className="eyebrow-accent">REGIONAL PILLARS</span>
                <h2>Nigeria&apos;s Foremost Spice Stockists &amp; Wholesale Hubs</h2>
                <p className="lead-muted">
                  From open-air market stalls to state-level commercial depots, meet the dedicated partners moving cartons of
                  Goodearth Hot Peppe, Atarodo, Cameroon Peppe, and Ose Di Oku across everyday communities.
                </p>
              </div>

              {/* Regional Zone Filters */}
              <div className="distributor-region-filters" role="group" aria-label="Region Filters">
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`region-filter-btn ${regionFilter === r ? "active" : ""}`}
                    onClick={() => setRegionFilter(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Hubs Grid */}
            <div className="distributor-hubs-grid">
              {filteredHubs.map((hub) => (
                <div className="distributor-hub-card" key={hub.id}>
                  <div className="hub-card-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={hub.image} alt={hub.marketHub} className="hub-card-img" loading="lazy" />
                    <span className="hub-tier-badge">{hub.tier}</span>
                    <span className="hub-status-badge">{hub.badge}</span>
                  </div>

                  <div className="hub-card-body">
                    <div className="hub-card-meta-top">
                      <span className="hub-location">
                        <Icon name="pin" size={14} />
                        {hub.city}, {hub.state}
                      </span>
                      <span className="hub-region-tag">{hub.region}</span>
                    </div>

                    <h3 className="hub-card-name">{hub.name}</h3>
                    <p className="hub-business-name">{hub.businessName}</p>

                    <div className="hub-market-bar">
                      <span className="hub-market-icon">🏪</span>
                      <span className="hub-market-text">{hub.marketHub}</span>
                    </div>

                    <p className="hub-card-highlight">{hub.highlight}</p>

                    <div className="hub-card-details">
                      <div className="hub-detail-item">
                        <span className="detail-k">Network Scale:</span>
                        <span className="detail-v">{hub.outletsServed}</span>
                      </div>
                      <div className="hub-detail-item">
                        <span className="detail-k">Key Lines:</span>
                        <span className="detail-v">{hub.specialization}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nationwide Map Callout Band */}
            <div className="distributor-reach-cta-box">
              <div className="reach-cta-copy">
                <h3>Looking for a Goodearth Distributor in Your City?</h3>
                <p>
                  Our spices are available in 100+ farmer markets across 17+ Nigerian states. Explore our interactive national
                  market locator map to find your nearest stockist.
                </p>
              </div>
              <Link href="/presence" className="btn btn-primary">
                Explore 17 States Presence Map <span className="arr">→</span>
              </Link>
            </div>
          </div>

        {/* ==================================================================== */}
        {/* TAB 2: COMMERCIAL LEADERSHIP & PERSONS                               */}
        {/* ==================================================================== */}
        <div className={`distributors-tab-panel ${activeTab === "persons" ? "active" : "is-hidden"}`} role="tabpanel" aria-hidden={activeTab !== "persons"}>
            {/* Intro Header */}
            <div className="distributors-section-header">
              <div>
                <span className="eyebrow-accent">THE PEOPLE BEHIND THE NETWORK</span>
                <h2>The Commercial Team Empowering Our Distributors</h2>
                <p className="lead-muted">
                  From factory dispatch logistics and trade capability mentoring to on-ground merchandising and regional
                  account management — celebrating the team dedicated to our trade partners&apos; growth.
                </p>
              </div>
            </div>

            {/* Commercial Persons Grid */}
            <div className="commercial-persons-grid">
              {COMMERCIAL_PERSONS.map((person) => (
                <div className="commercial-person-card" key={person.id}>
                  <div className="person-media-wrap">
                    {person.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={person.photo} alt={person.name} className="person-photo" loading="lazy" />
                    ) : (
                      <div className="person-photo-placeholder">
                        <span className="person-initials">{person.name.charAt(0)}</span>
                      </div>
                    )}
                    <span className="person-badge-pill">{person.badge}</span>
                  </div>

                  <div className="person-info-wrap">
                    <div className="person-head-row">
                      <div>
                        <h3 className="person-name">{person.name}</h3>
                        <div className="person-role-tag">{person.role}</div>
                      </div>
                      {person.credentials && (
                        <span className="person-credentials-tag">{person.credentials}</span>
                      )}
                    </div>

                    <div className="person-division-badge">
                      <span className="dot" />
                      <span>{person.division}</span>
                    </div>

                    <p className="person-focus-txt">
                      <strong>Core Focus:</strong> {person.focus}
                    </p>

                    <p className="person-bio-txt">{person.bio}</p>

                    <div className="person-contributions">
                      <div className="contrib-title">Key Trade &amp; Network Contributions:</div>
                      <ul>
                        {person.keyContributions.map((c, i) => (
                          <li key={i}>
                            <span className="contrib-check">✓</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Spotlight Card from Sales Capability */}
            <div className="commercial-quote-banner">
              <div className="quote-badge">Commercial Trade Philosophy</div>
              <blockquote className="quote-text">
                &ldquo;A food brand is only as strong as the distributors, market women, and retail partners who believe in it
                every single morning. At Goodearth, our job is not just to sell spice cartons to distributors — it is to ensure
                those cartons fly off the shelves into Nigerian kitchens with healthy margins and unwavering consumer trust.&rdquo;
              </blockquote>
              <div className="quote-author">
                <strong>Fred Nze</strong> · Head of Sales Capability &amp; Market Development, TG Agri Farms Ltd
              </div>
            </div>
          </div>

        {/* ==================================================================== */}
        {/* TAB 3: MARKET VOICES & AUTHENTIC STORIES                             */}
        {/* ==================================================================== */}
        <div className={`distributors-tab-panel ${activeTab === "voices" ? "active" : "is-hidden"}`} role="tabpanel" aria-hidden={activeTab !== "voices"}>
            {/* Intro Header */}
            <div className="distributors-section-header">
              <div>
                <span className="eyebrow-accent">AUTHENTIC TRADER VOICES</span>
                <h2>Straight from Nigeria&apos;s Busiest Market Stalls</h2>
                <p className="lead-muted">
                  Listen to the traders, wholesalers, and market leaders who stock Goodearth everyday in Mile 12, Onitsha Main
                  Market, Ariaria, Dawanau, Bodija, and Oil Mill.
                </p>
              </div>
            </div>

            {/* Voices Grid */}
            <div className="distributor-voices-grid">
              {DISTRIBUTOR_VOICES.map((v) => (
                <div className={`distributor-voice-card accent-${v.accent}`} key={v.id}>
                  <div className="voice-card-top">
                    <div className="voice-quote-mark">&ldquo;</div>
                    <span className="voice-tenure-tag">{v.tenure}</span>
                  </div>

                  <p className="voice-quote-text">{v.quote}</p>

                  <div className="voice-product-strip">
                    <span className="vps-label">Top Seller:</span>
                    <span className="vps-val">{v.favoriteProduct}</span>
                  </div>

                  <div className="voice-author-profile">
                    {v.image && (
                      <div className="voice-author-avatar">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={v.image} alt={v.name} />
                      </div>
                    )}
                    <div>
                      <h4 className="voice-name">{v.name}</h4>
                      <div className="voice-business">{v.businessName}</div>
                      <div className="voice-location">
                        <Icon name="pin" size={13} />
                        {v.market}, {v.state}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Market Photo Visual Archive Grid */}
            <div className="market-photo-showcase-box">
              <div className="mps-header">
                <h3>Life in the Market: Where Goodearth Meets Nigeria</h3>
                <p>Authentic visual captures from open-air spice stalls, wholesale depots, and bustling trading centers.</p>
              </div>

              <div className="mps-gallery-grid">
                <div className="mps-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/gallery/market-01.jpg" alt="Mile 12 open-air spice stall" loading="lazy" />
                  <div className="mps-caption">Mile 12 Market, Lagos · High-volume spice trading</div>
                </div>
                <div className="mps-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/gallery/market-09.jpg" alt="Market women stocking spices" loading="lazy" />
                  <div className="mps-caption">Bodija Market, Ibadan · Retail stockists displaying Goodearth</div>
                </div>
                <div className="mps-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/gallery/market-03.jpg" alt="Wholesale spice distribution depot" loading="lazy" />
                  <div className="mps-caption">Ariaria Market, Aba · Master carton commercial dispatch</div>
                </div>
                <div className="mps-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/gallery/market-10.jpg" alt="Open-air commodity hub" loading="lazy" />
                  <div className="mps-caption">Northern Gateway Depot · Direct farm-to-distributor links</div>
                </div>
              </div>
            </div>
          </div>

        {/* ==================================================================== */}
        {/* TAB 4: BECOME A DISTRIBUTOR & TRADE PARTNERSHIP                      */}
        {/* ==================================================================== */}
        <div className={`distributors-tab-panel ${activeTab === "partner" ? "active" : "is-hidden"}`} role="tabpanel" aria-hidden={activeTab !== "partner"}>
            {/* Intro Header */}
            <div className="distributors-section-header">
              <div>
                <span className="eyebrow-accent">TRADE PARTNERSHIP INCENTIVES</span>
                <h2>Why Partner with Goodearth &amp; TG Agri Farms?</h2>
                <p className="lead-muted">
                  We empower our trade partners with direct manufacturer pricing, protected territories, POS branding
                  materials, and rapid turnaround fulfillment backed by our 3,000 MT Ikorodu processing plant.
                </p>
              </div>
            </div>

            {/* Benefits 6-Grid */}
            <div className="distributor-benefits-grid">
              {PARTNERSHIP_BENEFITS.map((b) => (
                <div className="distributor-benefit-card" key={b.title}>
                  <div className="benefit-icon-box">
                    <Icon name={b.icon as IconName} size={26} />
                  </div>
                  <span className="benefit-highlight-pill">{b.highlight}</span>
                  <h3>{b.title}</h3>
                  <p>{b.description}</p>
                </div>
              ))}
            </div>

            {/* Three Distributor Tiers Explained */}
            <div className="distributor-tiers-box">
              <div className="tiers-head">
                <h3>Our Structured Distribution Tiers</h3>
                <p>Select the tier that aligns with your storage capacity, vehicle fleet, and retail network.</p>
              </div>

              <div className="tiers-grid">
                <div className="tier-card tier-card--mega">
                  <div className="tier-header">
                    <span className="tier-level">Tier 1</span>
                    <h4>Regional Super-Stockist</h4>
                  </div>
                  <div className="tier-vol">500+ Cartons / Month</div>
                  <ul className="tier-perks">
                    <li>✓ Highest factory-direct discount tier</li>
                    <li>✓ Dedicated commercial territory support</li>
                    <li>✓ Priority dispatch directly from Ikorodu plant</li>
                    <li>✓ Full POS branding &amp; promotional allowances</li>
                  </ul>
                </div>

                <div className="tier-card tier-card--key">
                  <div className="tier-header">
                    <span className="tier-level">Tier 2</span>
                    <h4>Key Wholesale Distributor</h4>
                  </div>
                  <div className="tier-vol">100 – 500 Cartons / Month</div>
                  <ul className="tier-perks">
                    <li>✓ Competitive wholesale margin structure</li>
                    <li>✓ Direct relationship with territory sales managers</li>
                    <li>✓ Access to marketing collaterals and store signages</li>
                    <li>✓ Bi-weekly inventory replenishment cycles</li>
                  </ul>
                </div>

                <div className="tier-card tier-card--market">
                  <div className="tier-header">
                    <span className="tier-level">Tier 3</span>
                    <h4>Market Stockist / Retail Hub</h4>
                  </div>
                  <div className="tier-vol">25 – 100 Cartons / Month</div>
                  <ul className="tier-perks">
                    <li>✓ Low barrier entry for open-air market vendors</li>
                    <li>✓ Merchandising aprons, posters &amp; product samples</li>
                    <li>✓ Rapid turnover with high consumer demand</li>
                    <li>✓ Regular field merchandising visits and support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Distributor Registration / Onboarding Form */}
            <div className="distributor-form-wrap" id="register-form">
              <div className="form-head">
                <span className="eyebrow-accent">DIRECT ONBOARDING DESK</span>
                <h2>Register Your Interest as a Goodearth Distributor</h2>
                <p>
                  Fill out the form below. Our Commercial Sales team will review your application and contact you within 24–48
                  business hours with distributor pricing schedules and territory availability.
                </p>
              </div>

              {formStatus === "success" ? (
                <div className="distributor-form-success">
                  <div className="success-icon-badge">✓</div>
                  <h3>Distributor Application Received!</h3>
                  <p className="success-ref">
                    Application Reference Ticket: <strong>#{ticketRef}</strong>
                  </p>
                  <p className="success-body">
                    Thank you for applying to partner with Goodearth Foods. Our commercial sales executive for your state has been
                    notified and will contact you via phone and email within 24 to 48 hours to complete your depot verification
                    and dispatch our trade price lists.
                  </p>
                  <div className="success-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setFormStatus("idle")}
                    >
                      Submit Another Application
                    </button>
                    <a href="mailto:Info@tgagrifarms.com" className="btn btn-primary btn-sm">
                      Email Sales Desk Directly →
                    </a>
                  </div>
                </div>
              ) : (
                <form className="distributor-register-form" onSubmit={handleDistributorSubmit}>
                  {formStatus === "error" && (
                    <div className="alert alert-err" style={{ marginBottom: "20px" }}>
                      {formMsg}
                    </div>
                  )}

                  <div className="form-grid-two">
                    <div className="field">
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" placeholder="e.g. Chief Emeka Okoye" required />
                    </div>
                    <div className="field">
                      <label htmlFor="businessName">Registered Business / Trading Name</label>
                      <input id="businessName" name="businessName" type="text" placeholder="e.g. Okoye Spices &amp; Foodstuffs Ltd" />
                    </div>
                  </div>

                  <div className="form-grid-two">
                    <div className="field">
                      <label htmlFor="phone">Phone Number (WhatsApp Active) *</label>
                      <input id="phone" name="phone" type="tel" placeholder="e.g. +234 803 123 4567" required />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" placeholder="e.g. info@yourbusiness.com" />
                    </div>
                  </div>

                  <div className="form-grid-three">
                    <div className="field">
                      <label htmlFor="state">State of Operation *</label>
                      <input id="state" name="state" type="text" placeholder="e.g. Lagos, Anambra, Kano" required />
                    </div>
                    <div className="field">
                      <label htmlFor="market">Primary Market / City *</label>
                      <input id="market" name="market" type="text" placeholder="e.g. Onitsha Main Market" required />
                    </div>
                    <div className="field">
                      <label htmlFor="tier">Desired Distribution Tier *</label>
                      <select id="tier" name="tier" defaultValue="Key Wholesale Distributor">
                        <option value="Regional Super-Stockist (500+ Cartons/Mo)">Tier 1: Regional Super-Stockist (500+ Cartons/Mo)</option>
                        <option value="Key Wholesale Distributor (100–500 Cartons/Mo)">Tier 2: Key Wholesale Distributor (100–500 Cartons/Mo)</option>
                        <option value="Market Stockist / Retail Hub (25–100 Cartons/Mo)">Tier 3: Market Stockist / Retail Hub (25–100 Cartons/Mo)</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="projectedVolume">Projected Monthly Off-Take (Cartons)</label>
                    <input id="projectedVolume" name="projectedVolume" type="text" placeholder="e.g. 200 cartons of Hot Peppe &amp; Cameroon Peppe" />
                  </div>

                  <div className="field">
                    <label htmlFor="experience">Current Distribution Facilities &amp; Experience</label>
                    <textarea
                      id="experience"
                      name="experience"
                      rows={3}
                      placeholder="Tell us briefly about your warehouse size, retail coverage, delivery vehicles, and current food distribution brands..."
                    />
                  </div>

                  <div className="form-submit-row">
                    <button type="submit" className="btn btn-primary" disabled={formStatus === "sending"}>
                      {formStatus === "sending" ? "Submitting Application..." : "Submit Distributor Application"} <span className="arr">→</span>
                    </button>
                    <span className="privacy-hint">
                      🔒 Your commercial details are protected and shared solely with our authorized territorial sales heads.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
