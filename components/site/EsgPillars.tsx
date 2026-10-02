import { ESG } from "@/lib/data";

const DELAY = ["", "d1", "d2"];

export default function EsgPillars() {
  return (
    <section className="section esg-pillars-wrap" id="esg-framework">
      {/* Floating golden/warm light particles */}
      <div className="ph-particles-wrap" aria-hidden="true">
        <span className="ph-particle p1" />
        <span className="ph-particle p2" />
        <span className="ph-particle p3" />
        <span className="ph-particle p4" />
        <span className="ph-particle p5" />
      </div>

      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow" style={{ color: "var(--chilli, #B5121B)" }}>ESG framework</span>
          <h2>Environmental, social &amp; governance</h2>
          <p className="muted" style={{ color: "#2B3C2F", maxWidth: "680px", hyphens: "none" }}>
            Sustainability is built into how we source, process and sell - creating value for farmers,
            communities and the environment.
          </p>
        </div>
        <div className="esg-grid">
          {ESG.map((p, i) => (
            <div className={`esg-card a-${p.accent} reveal ${DELAY[i]}`} key={p.key}>
              <div className="badge">
                <span className="k">{p.letter}</span>
                <h3>{p.title}</h3>
              </div>
              <ul>
                {p.points.map((pt) => {
                  const colonIdx = pt.indexOf(":");
                  if (colonIdx > 0) {
                    const label = pt.slice(0, colonIdx);
                    const desc = pt.slice(colonIdx + 1);
                    return (
                      <li key={pt}>
                        <strong>{label}:</strong>{desc}
                      </li>
                    );
                  }
                  return <li key={pt}>{pt}</li>;
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
