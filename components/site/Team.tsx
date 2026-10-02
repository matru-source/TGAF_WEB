import { getTeam } from "@/lib/queries";

export default async function Team() {
  const allTeam = await getTeam();

  // Tier 1: Directors (Deepak Murli Chainani & Swatanter Saraswat)
  const directors = allTeam.filter(
    (m) =>
      m.name.toLowerCase().includes("deepak") ||
      m.name.toLowerCase().includes("swatanter") ||
      m.role.toLowerCase().includes("director"),
  );

  return (
    <section className="section leadership-team-section">
      <div className="container">
        {/* Tier 1: Board of Directors */}
        <div className="leadership-team-head reveal center" style={{ textAlign: "center", marginBottom: "32px" }}>
          <span className="eyebrow center">Governance &amp; Strategy</span>
          <h2 className="leadership-team-title">Board of Directors</h2>
          <p className="lead center" style={{ maxWidth: "680px", margin: "0 auto" }}>
            Steering corporate governance, international trade expansion, and high-precision agro-industrial manufacturing.
          </p>
        </div>

        <div className="directors-pyramid-grid">
          {directors.map((m, i) => (
            <article className={`director-card reveal ${i === 0 ? "d1" : "d2"}`} key={m.id}>
              <div className="director-card-inner">
                <span className="director-gold-badge">Director</span>
                {m.photo ? (
                  <div className="director-photo-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.photo} alt={m.name} loading="lazy" />
                  </div>
                ) : (
                  <div className="avatar" style={{ margin: "0 auto 18px", width: "120px", height: "120px", borderRadius: "50%", background: "var(--farm)", display: "grid", placeItems: "center", color: "#fff", fontSize: "1.8rem" }}>{m.initials}</div>
                )}
                <div className="director-info">
                  <h3>{m.name}</h3>
                  <div className="director-role">{m.role}</div>
                  <p className="director-bio">{m.bio}</p>
                  {m.bullets && m.bullets.length > 0 && (
                    <ul className="director-bullets" style={{ marginTop: "14px", listStyle: "disc", paddingLeft: "20px", textAlign: "left" }}>
                      {m.bullets.map((b, idx) => (
                        <li key={idx} style={{ fontSize: "0.9rem", color: "var(--ink-2)", marginBottom: "6px" }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Tier 2: Executive Management */}
        <div className="leadership-subhead reveal center" style={{ textAlign: "center", marginTop: "clamp(48px, 6vw, 72px)", marginBottom: "28px" }}>
          <span className="eyebrow center">Operational Command</span>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Executive Leadership Team</h3>
          <p className="muted center" style={{ maxWidth: "620px", margin: "0 auto" }}>
            Driving continuous processing throughput, supply-chain logistics, and pan-Nigerian commercial expansion.
          </p>
        </div>

        <div className="exec-pyramid-grid">
          <div className="exec-card reveal d1">
            <div className="exec-avatar-badge">CEO</div>
            <h4>Chief Executive Officer</h4>
            <span className="exec-dept">Executive Office</span>
            <p>Directing holistic corporate strategy, stakeholder relations, and West African market expansion.</p>
          </div>
          <div className="exec-card reveal d2">
            <div className="exec-avatar-badge">GM</div>
            <h4>General Manager</h4>
            <span className="exec-dept">Plant &amp; Facility</span>
            <p>Overseeing 3,000 MT milling throughput, plant uptime, and automation reliability at Ikorodu.</p>
          </div>
          <div className="exec-card reveal d3">
            <div className="exec-avatar-badge">CFO</div>
            <h4>Chief Financial Officer</h4>
            <span className="exec-dept">Finance &amp; Audit</span>
            <p>Guiding financial discipline, statutory audit compliance, and trade capital governance.</p>
          </div>
          <div className="exec-card reveal d4">
            <div className="exec-avatar-badge">HEAD</div>
            <h4>Head of Commercial Sales</h4>
            <span className="exec-dept">Sales &amp; Distribution</span>
            <p>Expanding 250+ distributor networks, supermarket retail listings, and bulk export partnerships.</p>
          </div>
        </div>

        {/* Tier 3: Operations & Local Leadership */}
        <div className="leadership-subhead reveal center" style={{ textAlign: "center", marginTop: "clamp(44px, 5vw, 68px)", marginBottom: "24px" }}>
          <span className="eyebrow center">Frontline Leadership</span>
          <h3 style={{ fontSize: "1.6rem", marginBottom: "8px" }}>Customer Service &amp; Local Operations</h3>
        </div>

        <div className="ops-team-grid">
          <div className="ops-card reveal d1">
            <div className="ops-avatar-init">ST</div>
            <h4>Customer Care &amp; Grievance Management</h4>
            <span className="ops-role">Sales Coordination &amp; Service</span>
            <p>Managing responsive wholesale customer communication, distributor order fulfillment, and trade support.</p>
          </div>
          <div className="ops-card reveal d2">
            <div className="ops-avatar-init">OPS</div>
            <h4>Floor Operations &amp; Production Crew</h4>
            <span className="ops-role">Ikorodu Processing Division</span>
            <p>200+ trained Nigerian technicians and operators maintaining sterile clean-room processing around the clock.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
