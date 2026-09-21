import { GOVERNANCE } from "@/lib/data";

const DELAY = ["", "d1", "d2"];

export default function Governance() {
  return (
    <section className="section section--cream2">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Governance &amp; leadership</span>
          <h2>Trust you can bank on</h2>
          <p className="muted">
            Experienced leadership, financial discipline and transparent reporting that give bankers,
            investors and partners confidence for the long term.
          </p>
        </div>
        <div className="feature-grid">
          {GOVERNANCE.map((g, i) => (
            <div className={`feature-card reveal ${DELAY[i]}`} key={g.title}>
              <h3>{g.title}</h3>
              <p>{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
