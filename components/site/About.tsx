export default function About() {
  return (
    <section className="section" id="about">
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
            <p className="lead">
              Goodearth Agriventures is headquartered in Singapore and deeply committed to Africa&apos;s
              spice industry. We manage the entire value chain through farm-gate procurement across{" "}
              <strong>25 aggregators</strong> and <strong>100 farmer markets</strong>, grown by over{" "}
              <strong>50,000+ farmers</strong> and their families with <strong>10,000+ farmers trained</strong>.
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
            <span className="eyebrow center">Global Leadership · Local Roots</span>
            <h2>Singapore Corporate HQ &amp; Nigerian Processing</h2>
            <p className="lead center" style={{ maxWidth: "720px", margin: "0 auto" }}>
              Combining Singapore&apos;s strategic governance and international trade networks with Nigeria&apos;s rich agricultural heritage and automated processing capability.
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
                  Our US$12M automated milling plant in Ikorodu, Lagos has 3,000 MT annual capacity of steam-sterilised finished spice, supplied by our Kaduna aggregation network and 50,000+ local farmers.
                </p>
                <div className="presence-tags">
                  <span>US$12M Automated Plant</span>
                  <span>3,000 MT Annual Capacity</span>
                  <span>50,000+ Sourcing Farmers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
