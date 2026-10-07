export default function About() {
  return (
    <>
      <section className="section about-code-bg-wrap" id="about">
      {/* Code-driven responsive background layers */}
      <div className="code-sec2-bg" aria-hidden="true">
        <div className="code-sec2-gradient" />
        <div className="code-sec2-sun-glow" />
        <div className="code-sec2-ambient-glow" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/about-foliage-left.png?v=3"
          alt=""
          className="code-sec2-leaf-left"
          loading="eager"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/about-harvest-right.png?v=3"
          alt=""
          className="code-sec2-harvest-right"
          loading="eager"
        />
      </div>
      <div className="container">
        {/* Main Story Grid */}
        <div className="about-grid">
          <div className="about-media reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/factory-overview.png" alt="Good Earth automated processing factory complex at Ikorodu, Lagos" />
            <div className="badge">
              <div className="n">6 yrs</div>
              <div className="l">Building Nigeria&apos;s spice supply chain</div>
            </div>
          </div>
          <div className="about-copy reveal d1">
            <span className="eyebrow">About us</span>
            <h2>We manage the whole journey - farm to fork.</h2>
            <div className="about-narrative-copy">
              <p>
                Goodearth is headquartered in Singapore and deeply committed to Africa&apos;s
                spice industry. We manage the entire value chain through farm-gate procurement across{" "}
                25 aggregators and 100 farmer markets, grown by over{" "}
                50,000+ farmers and their families with 10,000+ farmers trained.
              </p>
              <p>
                Our Ikorodu processing plant ensures strict food safety and traceability throughout the
                supply chain. Beyond products, our mission enriches farmers&apos; lives and communities while
                serving customers sustainably.
              </p>
            </div>

            <div className="mv">
              <div className="card">
                <h4>Our Mission</h4>
                <p>
                  To deliver high-quality, locally-sourced products that drive economic growth and
                  community prosperity - keeping the aroma and colour of spices in their most natural,
                  hygienic form and making them available across Nigeria at a fair cost.
                </p>
              </div>
              <div className="card">
                <h4>Our Vision</h4>
                <p>To be the No.1 cooking partner for all Nigerian families.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Section 2: Dual Presence with dedicated Global Trade Corridor background */}
    <section className="section dual-presence-wrap" id="global-operations">
      <div className="dual-presence-bg" aria-hidden="true">
        {/* Ambient Spotlights */}
        <div className="dp-spotlight dp-spotlight-sg" />
        <div className="dp-spotlight dp-spotlight-ng" />

        {/* Global Trade Network Vector Map */}
        <svg
          className="dp-trade-network-svg"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="dp-dot-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="rgba(6, 78, 59, 0.08)" />
            </pattern>
            <linearGradient id="dp-arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#064E3B" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#B5121B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#dp-dot-grid)" />

          {/* Curved Trade Arc connecting Singapore to Nigeria */}
          <path
            d="M 380 220 C 560 70, 880 70, 1060 220"
            stroke="url(#dp-arc-gradient)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="dp-arc-path"
          />

          {/* Singapore Hub Pin */}
          <g transform="translate(380, 220)">
            <circle r="22" fill="rgba(6, 78, 59, 0.06)" />
            <circle r="12" fill="rgba(6, 78, 59, 0.14)" />
            <circle r="5" fill="#064E3B" />
            <circle r="8" fill="none" stroke="#064E3B" strokeWidth="1.5" opacity="0.6" className="dp-ping-circle" />
          </g>

          {/* Nigeria Hub Pin */}
          <g transform="translate(1060, 220)">
            <circle r="22" fill="rgba(181, 18, 27, 0.06)" />
            <circle r="12" fill="rgba(181, 18, 27, 0.14)" />
            <circle r="5" fill="#B5121B" />
            <circle r="8" fill="none" stroke="#B5121B" strokeWidth="1.5" opacity="0.6" className="dp-ping-circle" />
          </g>
        </svg>

        {/* Global Route Corridor Pill */}
        <div className="dp-route-badge">
          <span className="dp-route-dot sg" />
          <span>Singapore HQ</span>
          <span className="dp-route-arrow">⇄</span>
          <span className="dp-route-dot ng" />
          <span>Nigeria Operations</span>
          <span className="dp-route-sub">· Global Trade &amp; Processing Corridor</span>
        </div>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-head center">
          <span className="eyebrow center">Two Global Hubs · One Unified Standard</span>
          <h2>Singapore Corporate HQ &amp; Nigerian Processing</h2>
          <p className="lead center" style={{ maxWidth: "720px", margin: "0 auto" }}>
            Combining Singapore&apos;s strategic governance and international trade networks with Nigeria&apos;s rich agricultural heritage and automated processing capability.
          </p>
        </div>

        <div className="dual-grid">
          {/* Card 1: Singapore HQ */}
          <div className="presence-card card-sg">
            <div className="presence-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/singapore-hq.jpg"
                alt="Singapore modern corporate financial district skyline"
                className="presence-img"
              />
              <span className="location-pill pill-sg">🇸🇬 Global Corporate HQ</span>
            </div>
            <div className="presence-body">
              <span className="entity-sub">Goodearth Agriventures Pte. Ltd.</span>
              <h3>Singapore Headquarters</h3>
              <p>
                Drives strategic leadership, trade finance, and export market governance on proven global standards.
              </p>
              <div className="presence-tags">
                <span className="ptag"><span className="ptag-icon">🌐</span> International Governance</span>
                <span className="ptag"><span className="ptag-icon">📊</span> Strategic Trade Finance</span>
                <span className="ptag"><span className="ptag-icon">🚢</span> Global Market Connections</span>
              </div>
            </div>
          </div>

          {/* Card 2: Nigeria Plant */}
          <div className="presence-card card-ng">
            <div className="presence-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/facility/packaging-line.jpg"
                alt="TG Agri Farms automated high-speed sachet packaging line at Ikorodu, Lagos"
                className="presence-img"
              />
              <span className="location-pill pill-ng">🇳🇬 Manufacturing &amp; Operations</span>
            </div>
            <div className="presence-body">
              <span className="entity-sub">TG Agri Farms Ltd</span>
              <h3>Ikorodu Plant &amp; Farm Network</h3>
              <p>
                Automated spice processing plant in Lagos, powered directly by our regional outgrower farming network.
              </p>
              <div className="presence-tags">
                <span className="ptag"><span className="ptag-icon">🏭</span> US$12M Automated Plant</span>
                <span className="ptag"><span className="ptag-icon">⚡</span> 3,000 MT Annual Capacity</span>
                <span className="ptag"><span className="ptag-icon">🌾</span> 50,000+ Sourcing Farmers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
}
