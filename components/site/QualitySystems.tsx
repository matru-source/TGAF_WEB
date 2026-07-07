import { QUALITY_SYSTEMS } from "@/lib/data";
import { Icon, type IconName } from "./icons";

export default function QualitySystems() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Quality systems</span>
          <h2>Food safety, built into every batch</h2>
          <p className="muted">
            Hygienic, automated processing with traceability from farm to fork - designed to meet the
            standards our customers and export partners demand.
          </p>
        </div>
        <div className="feature-grid">
          {QUALITY_SYSTEMS.map((q, i) => (
            <div className={`feature-card reveal ${i % 3 ? (i % 3 === 1 ? "d1" : "d2") : ""}`} key={q.title}>
              <div className="feature-icon"><Icon name={q.icon as IconName} size={24} /></div>
              <h3>{q.title}</h3>
              <p>{q.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
