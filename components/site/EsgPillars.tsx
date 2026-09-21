import { ESG } from "@/lib/data";

const DELAY = ["", "d1", "d2"];

export default function EsgPillars() {
  return (
    <section className="section section--cream2">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">ESG framework</span>
          <h2>Environmental, social &amp; governance</h2>
          <p className="muted">
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
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
