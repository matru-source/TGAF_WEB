export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
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
              Goodearth Agriventures is headquartered in Singapore but deeply committed to Africa&apos;s
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
      </div>
    </section>
  );
}
