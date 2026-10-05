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
    role: "Head of Marketing",
    credentials: "Marketing Head · Brand Growth",
    photo: "/img/team/fred-nze.jpg",
    bio: "With over 14 years of commercial marketing leadership, driving consumer brand visibility, distributor activations, retail execution, and nationwide campaign growth.",
  };

  return (
    <section className="section org-hierarchy-section" id="leadership-hierarchy">
      <div className="container">
        {/* Section Header */}
        <div className="section-head reveal center" style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="eyebrow center">Governance &amp; Operational Command</span>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", marginBottom: "12px" }}>Corporate Hierarchy</h2>
          <p className="lead center" style={{ maxWidth: "720px", margin: "0 auto", color: "var(--ink-2)" }}>
            Clear executive accountability steering strategic governance, sterile agro-industrial manufacturing, 
            disciplined financial control, and pan-Nigerian commercial distribution.
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
                    {deepak.bullets && deepak.bullets.length > 0 && (
                      <ul className="org-card-bullets">
                        {deepak.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    )}
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
                    {swatanter.bullets && swatanter.bullets.length > 0 && (
                      <ul className="org-card-bullets">
                        {swatanter.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>

            </div>
          </div>

          {/* Connector Stem: Tier 1 -> Tier 2 (3 Columns) */}
          <div className="org-tree-branch-connector" aria-hidden="true">
            <span className="org-branch-stem-down"></span>
            <div className="org-branch-crossbar">
              <span className="org-branch-node org-branch-node--left"></span>
              <span className="org-branch-node org-branch-node--mid"></span>
              <span className="org-branch-node org-branch-node--right"></span>
            </div>
          </div>

          {/* TIER 2: 3 Functional Heads - GM Sales, GM Factory, CFO */}
          <div className="org-tree-level org-tree-level--trio">
            <div className="org-level-tag org-level-tag--full">General Management &amp; Financial Control</div>
            <div className="org-trio-grid">

              {/* 1. GM Sales: Amit Gautam */}
              <div className="org-tree-col">
                <span className="org-col-drop-line" aria-hidden="true"></span>
                <article className="org-card org-card--functional org-card--active reveal d1">
                  <div className="org-card-badge org-card-badge--amber">
                    <span>GM Sales</span>
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
                <span className="org-col-drop-line" aria-hidden="true"></span>
                <article className="org-card org-card--functional org-card--blank reveal d2">
                  <div className="org-card-badge org-card-badge--grey">
                    <span>GM Factory</span>
                  </div>
                  <div className="org-card-compact-body">
                    <div className="org-avatar-monogram" aria-hidden="true">
                      <span>JR</span>
                    </div>
                    <div className="org-card-info">
                      <h3 className="org-card-name">{jagdeep.name}</h3>
                      <div className="org-card-role-title">{jagdeep.role}</div>
                      <div className="org-card-division">Ikorodu Processing Facility</div>
                      <div className="org-placeholder-note">
                        <span className="org-status-pulse"></span>
                        <span>Profile &amp; photo in progress</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              {/* 3. CFO: Yoganand Raj */}
              <div className="org-tree-col">
                <span className="org-col-drop-line" aria-hidden="true"></span>
                <article className="org-card org-card--functional org-card--blank reveal d3">
                  <div className="org-card-badge org-card-badge--grey">
                    <span>Chief Financial Officer</span>
                  </div>
                  <div className="org-card-compact-body">
                    <div className="org-avatar-monogram" aria-hidden="true">
                      <span>YR</span>
                    </div>
                    <div className="org-card-info">
                      <h3 className="org-card-name">{yoganand.name}</h3>
                      <div className="org-card-role-title">{yoganand.role}</div>
                      <div className="org-card-division">Finance, Audit &amp; Trade Capital</div>
                      <div className="org-placeholder-note">
                        <span className="org-status-pulse"></span>
                        <span>Profile &amp; photo in progress</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

            </div>
          </div>

          {/* Connector Stem: Tier 2 -> Tier 3 (2 Columns) */}
          <div className="org-tree-branch-connector org-tree-branch-connector--duo" aria-hidden="true">
            <span className="org-branch-stem-down"></span>
            <div className="org-branch-crossbar org-branch-crossbar--duo">
              <span className="org-branch-node org-branch-node--left"></span>
              <span className="org-branch-node org-branch-node--right"></span>
            </div>
          </div>

          {/* TIER 3: Stella & Fred Together (Marketing & Sales Coordination) */}
          <div className="org-tree-level org-tree-level--duo-bottom">
            <div className="org-level-tag">Commercial Operations &amp; Marketing Execution</div>
            <div className="org-duo-bottom-grid">
              
              {/* Stella Ikpe - Sales & Marketing Coordinator */}
              <div className="org-tree-col">
                <span className="org-col-drop-line" aria-hidden="true"></span>
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

              {/* Fred Nze - Head of Marketing */}
              <div className="org-tree-col">
                <span className="org-col-drop-line" aria-hidden="true"></span>
                <article className="org-card org-card--coord reveal d2">
                  <div className="org-card-badge org-card-badge--chilli">
                    <span>Head of Marketing</span>
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
      </div>
    </section>
  );
}
