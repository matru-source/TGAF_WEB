import { getTeam } from "@/lib/queries";
import { TEAM } from "@/lib/data";

export default async function Team() {
  const members = (await getTeam()) || TEAM;

  const deepak = members.find((m) => m.id === "dc" || m.name.toLowerCase().includes("deepak")) || TEAM[0];
  const swatanter = members.find((m) => m.id === "ss" || m.name.toLowerCase().includes("swatanter")) || TEAM[1];
  const jagdeep = members.find((m) => m.id === "jr" || m.name.toLowerCase().includes("jagdeep")) || TEAM[2];
  const amit = members.find((m) => m.id === "ag" || m.name.toLowerCase().includes("amit")) || TEAM[3];
  const yoganand = members.find((m) => m.id === "yr" || m.name.toLowerCase().includes("yoganand")) || TEAM[4];
  const stella = members.find((m) => m.id === "si" || m.name.toLowerCase().includes("stella")) || TEAM[5];
  const fred = members.find((m) => m.id === "fn" || m.name.toLowerCase().includes("fred")) || TEAM[6] || {
    id: "fn",
    name: "Fred Nze",
    role: "Sales Capability & Market Development",
    credentials: "Sales Capability · Market Development",
    photo: "/img/team/fred-nze.jpg",
    bio: "With over 14 years of commercial marketing leadership, driving consumer brand visibility, distributor activations, retail execution, and nationwide campaign growth.",
  };

  // Any additional team members added in the admin portal (8th, 9th member, etc.)
  const coreIds = new Set([deepak.id, swatanter.id, jagdeep.id, amit.id, yoganand.id, stella.id, fred.id]);
  const coreNames = ["deepak", "swatanter", "jagdeep", "amit", "yoganand", "stella", "fred"];
  const additionalMembers = members.filter(
    (m) =>
      !coreIds.has(m.id) &&
      !coreNames.some((name) => m.name.toLowerCase().includes(name))
  );

  return (
    <section className="section org-hierarchy-section" id="leadership-hierarchy">
      <div className="container">
        {/* Section Header */}
        <div className="section-head reveal center" style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="eyebrow center">Governance &amp; Operational Command</span>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", marginBottom: "12px" }}>Corporate Hierarchy</h2>
          <p
            className="lead center"
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              color: "var(--ink-2)",
              textAlign: "center",
              lineHeight: "1.65",
            }}
          >
            Clear executive leadership and operational accountability steering strategic corporate governance,
            modern agro-industrial spice processing, disciplined financial control, and pan-Nigerian commercial
            distribution.
          </p>
        </div>

        {/* The Organogram Hierarchy Tree */}
        <div className="org-tree-wrapper">
          
          {/* TIER 1: Deepak & Swatanter Together (Board & Executive Directors) */}
          <div className="org-tree-level org-tree-level--duo">
            <div className="org-level-tag">Board of Directors &amp; Executive Leadership</div>
            <div className="org-duo-grid">
              
              {/* Deepak Chainani - Managing Director */}
              <article className="org-card org-card--executive reveal">
                <div className="org-card-badge org-card-badge--blue">
                  <span>Managing Director</span>
                </div>
                <div className="org-card-grid">
                  {deepak.photo && (
                    <div className="org-card-photo-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={deepak.photo} alt={deepak.name} loading="lazy" />
                    </div>
                  )}
                  <div className="org-card-info">
                    <h3 className="org-card-name">{deepak.name}</h3>
                    <div className="org-card-role-title">{deepak.role}</div>
                    <div className="org-card-division">Board of Directors</div>
                    {deepak.bio && <p className="org-card-bio">{deepak.bio}</p>}
                  </div>
                </div>
              </article>

              {/* Swatanter Saraswat - CEO & Director */}
              <article className="org-card org-card--executive reveal d1">
                <div className="org-card-badge org-card-badge--slate">
                  <span>Chief Executive Officer &amp; Director</span>
                </div>
                <div className="org-card-grid">
                  {swatanter.photo && (
                    <div className="org-card-photo-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={swatanter.photo} alt={swatanter.name} loading="lazy" />
                    </div>
                  )}
                  <div className="org-card-info">
                    <h3 className="org-card-name">{swatanter.name}</h3>
                    <div className="org-card-role-title">{swatanter.role}</div>
                    <div className="org-card-division">Executive Management &amp; Board</div>
                    {swatanter.bio && <p className="org-card-bio">{swatanter.bio}</p>}
                  </div>
                </div>
              </article>

            </div>
          </div>

          {/* TIER 2: 3 Functional Heads - GM Sales, GM Factory, CFO */}
          <div className="org-tree-level org-tree-level--trio">
            <div className="org-level-tag org-level-tag--full">General Management &amp; Financial Control</div>
            <div className="org-trio-grid">

              {/* 1. GM Sales: Amit Gautam */}
              <div className="org-tree-col">
                <article className="org-card org-card--functional org-card--active reveal d1">
                  <div className="org-card-badge org-card-badge--amber">
                    <span>General Manager-Sales</span>
                  </div>
                  <div className="org-card-compact-body">
                    {amit.photo ? (
                      <div className="org-card-photo-wrap org-card-photo-wrap--compact">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={amit.photo} alt={amit.name} loading="lazy" />
                      </div>
                    ) : (
                      <div className="org-avatar-monogram"><span>AG</span></div>
                    )}
                    <div className="org-card-info">
                      <h3 className="org-card-name">{amit.name}</h3>
                      <div className="org-card-role-title">{amit.role}</div>
                      {amit.credentials && (
                        <div className="org-credential-badge">{amit.credentials}</div>
                      )}
                      {amit.bio && <p className="org-card-bio org-card-bio--tight">{amit.bio}</p>}
                    </div>
                  </div>
                </article>
              </div>

              {/* 2. GM Factory: Jagdeep Rana */}
              <div className="org-tree-col">
                <article className="org-card org-card--functional org-card--blank reveal d2">
                  <div className="org-card-badge org-card-badge--grey">
                    <span>General Manager- Factory</span>
                  </div>
                  <div className="org-card-compact-body">
                    {jagdeep.photo ? (
                      <div className="org-card-photo-wrap org-card-photo-wrap--compact">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={jagdeep.photo} alt={jagdeep.name} loading="lazy" />
                      </div>
                    ) : (
                      <div className="org-avatar-monogram" aria-hidden="true">
                        <span>JR</span>
                      </div>
                    )}
                    <div className="org-card-info">
                      <h3 className="org-card-name">{jagdeep.name}</h3>
                      <div className="org-card-role-title">{jagdeep.role}</div>
                      <div className="org-card-division">Ikorodu Processing Facility</div>
                      {jagdeep.bio ? (
                        <p className="org-card-bio org-card-bio--tight">{jagdeep.bio}</p>
                      ) : (
                        <div className="org-placeholder-note">
                          <span className="org-status-pulse"></span>
                          <span>Profile &amp; photo in progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </div>

              {/* 3. CFO: Yoganand Raj */}
              <div className="org-tree-col">
                <article className="org-card org-card--functional org-card--blank reveal d3">
                  <div className="org-card-badge org-card-badge--grey">
                    <span>Chief Financial Officer</span>
                  </div>
                  <div className="org-card-compact-body">
                    {yoganand.photo ? (
                      <div className="org-card-photo-wrap org-card-photo-wrap--compact">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={yoganand.photo} alt={yoganand.name} loading="lazy" />
                      </div>
                    ) : (
                      <div className="org-avatar-monogram" aria-hidden="true">
                        <span>YR</span>
                      </div>
                    )}
                    <div className="org-card-info">
                      <h3 className="org-card-name">{yoganand.name}</h3>
                      <div className="org-card-role-title">{yoganand.role}</div>
                      <div className="org-card-division">Finance, Audit &amp; Trade Capital</div>
                      {yoganand.bio ? (
                        <p className="org-card-bio org-card-bio--tight">{yoganand.bio}</p>
                      ) : (
                        <div className="org-placeholder-note">
                          <span className="org-status-pulse"></span>
                          <span>Profile &amp; photo in progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </div>

            </div>
          </div>

          {/* TIER 3: Stella & Fred Together (Marketing & Sales Coordination) */}
          <div className="org-tree-level org-tree-level--duo-bottom">
            <div className="org-level-tag">Commercial Operations &amp; Marketing Execution</div>
            <div className="org-duo-bottom-grid">
              
              {/* Stella Ikpe - Sales & Marketing Coordinator */}
              <div className="org-tree-col">
                <article className="org-card org-card--coord reveal d1">
                  <div className="org-card-badge org-card-badge--green">
                    <span>Sales &amp; Marketing Coordinator</span>
                  </div>
                  <div className="org-card-compact-body">
                    {stella.photo ? (
                      <div className="org-card-photo-wrap org-card-photo-wrap--compact">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={stella.photo} alt={stella.name} loading="lazy" />
                      </div>
                    ) : (
                      <div className="org-avatar-monogram"><span>SI</span></div>
                    )}
                    <div className="org-card-info">
                      <h3 className="org-card-name">{stella.name}</h3>
                      <div className="org-card-role-title">{stella.role}</div>
                      {stella.credentials && (
                        <div className="org-credential-badge">{stella.credentials}</div>
                      )}
                      {stella.bio && <p className="org-card-bio org-card-bio--tight">{stella.bio}</p>}
                    </div>
                  </div>
                </article>
              </div>

              {/* Fred Nze - Sales Capability & Market Development */}
              <div className="org-tree-col">
                <article className="org-card org-card--coord reveal d2">
                  <div className="org-card-badge org-card-badge--chilli">
                    <span>Sales Capability &amp; Market Development</span>
                  </div>
                  <div className="org-card-compact-body">
                    {fred.photo ? (
                      <div className="org-card-photo-wrap org-card-photo-wrap--compact">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={fred.photo} alt={fred.name} loading="lazy" />
                      </div>
                    ) : (
                      <div className="org-avatar-monogram"><span>FN</span></div>
                    )}
                    <div className="org-card-info">
                      <h3 className="org-card-name">{fred.name}</h3>
                      <div className="org-card-role-title">{fred.role}</div>
                      {fred.credentials && (
                        <div className="org-credential-badge">{fred.credentials}</div>
                      )}
                      {fred.bio && <p className="org-card-bio org-card-bio--tight">{fred.bio}</p>}
                    </div>
                  </div>
                </article>
              </div>

            </div>
          </div>

        </div>

        {/* Additional Team Members: Operations & Management Team */}
        {additionalMembers.length > 0 && (
          <div className="additional-team-section" style={{ marginTop: "72px" }}>
            <div className="section-head reveal center" style={{ textAlign: "center", marginBottom: "40px" }}>
              <span className="eyebrow center" style={{ color: "var(--chilli, #b91c1c)" }}>Key Personnel</span>
              <h3 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", marginBottom: "8px", fontWeight: 700 }}>
                Operations &amp; Management Team
              </h3>
              <p style={{ maxWidth: "600px", margin: "0 auto", color: "var(--ink-2)", fontSize: "0.95rem" }}>
                Experienced technical, quality, and commercial leaders executing daily factory processing, supply chain logistics, and client excellence.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
                maxWidth: "1100px",
                margin: "0 auto",
              }}
            >
              {additionalMembers.map((m, idx) => (
                <article
                  key={m.id || idx}
                  className="org-card org-card--functional reveal"
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid var(--line, #E5E7EB)",
                    padding: "24px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    {m.photo ? (
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          flexShrink: 0,
                          border: "2px solid #E5E7EB",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.photo}
                          alt={m.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "50%",
                          background: "#F3F4F6",
                          color: "#4B5563",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "1.2rem",
                          flexShrink: 0,
                          border: "2px solid #E5E7EB",
                        }}
                      >
                        {m.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 style={{ margin: "0 0 4px", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink, #111827)" }}>
                        {m.name}
                      </h4>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--chilli, #b91c1c)" }}>
                        {m.role}
                      </div>
                      {m.credentials && (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6B7280",
                            marginTop: "2px",
                          }}
                        >
                          {m.credentials}
                        </div>
                      )}
                    </div>
                  </div>
                  {m.bio && (
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-2, #4B5563)", lineHeight: "1.6" }}>
                      {m.bio}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
