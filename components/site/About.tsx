export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        {/* Main Story Grid */}
        <div className="about-grid">
          <div className="about-media reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/photo-drying.jpg" alt="Bags of dried chilli at the Goodearth warehouse" />
            <div className="badge">
              <div className="n">6 yrs</div>
              <div className="l">Building Nigeria&apos;s spice supply chain</div>
            </div>
          </div>
          <div className="about-copy reveal d1">
            <span className="eyebrow">About us</span>
            <h2>We manage the whole journey - farm to fork.</h2>
            <p className="lead">
              Goodearth Agriventures is headquartered in Singapore and deeply committed to Africa&apos;s
              spice industry. We manage the entire value chain through farm-gate procurement across{" "}
              <strong>7 aggregators</strong> and <strong>12 farmers&apos; markets</strong>, supporting almost{" "}
              <strong>350+ farmers</strong> and their families.
            </p>
            <p style={{ marginTop: "1rem", color: "var(--ink-2)" }}>
              Our Ikorodu processing plant ensures strict food safety and traceability throughout the
              supply chain. Beyond products, our mission enriches farmers&apos; lives and communities while
              serving customers sustainably.
            </p>

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

        {/* Dual Presence: Singapore HQ & Nigeria Plant */}
        <div className="dual-presence-section reveal">
          <div className="section-head center" style={{ marginTop: "clamp(48px, 6vw, 84px)" }}>
            <span className="eyebrow center">Global Strength · Local Roots</span>
            <h2>Our Dual Presence</h2>
            <p className="lead center" style={{ maxWidth: "720px", margin: "0 auto" }}>
              Combining Singapore&apos;s world-class corporate governance with Nigeria&apos;s rich agricultural heritage and automated processing capability.
            </p>
          </div>

          <div className="dual-grid">
            {/* Card 1: Singapore HQ */}
            <div className="presence-card">
              <div className="presence-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/singapore-hq.jpg"
                  alt="Singapore modern corporate financial district skyline"
                  className="presence-img"
                />
                <span className="location-pill">🇸🇬 Global Corporate HQ</span>
              </div>
              <div className="presence-body">
                <span className="entity-sub">Goodearth Agriventures Pte. Ltd.</span>
                <h3>Singapore Headquarters</h3>
                <p>
                  Provides international strategic leadership, trade finance governance, and export market connections — ensuring our enterprise operates on proven global standards.
                </p>
                <div className="presence-tags">
                  <span>International Governance</span>
                  <span>Strategic Trade</span>
                  <span>Export Expansion</span>
                </div>
              </div>
            </div>

            {/* Card 2: Nigeria Plant */}
            <div className="presence-card">
              <div className="presence-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/photo-facility.jpg"
                  alt="TG Agri Farms automated stainless-steel processing facility at Ikorodu, Lagos"
                  className="presence-img"
                />
                <span className="location-pill pill-ng">🇳🇬 Manufacturing &amp; Operations</span>
              </div>
              <div className="presence-body">
                <span className="entity-sub">TG Agri Farms Ltd</span>
                <h3>Ikorodu Plant &amp; Farm Network</h3>
                <p>
                  Our US$10M automated milling plant in Ikorodu, Lagos produces 20 MT/day of steam-sterilised finished spice, supplied by our Kaduna aggregation network and 350+ local farmers.
                </p>
                <div className="presence-tags">
                  <span>US$10M Automated Mill</span>
                  <span>20 MT / Day Capacity</span>
                  <span>350+ Sourcing Farmers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
