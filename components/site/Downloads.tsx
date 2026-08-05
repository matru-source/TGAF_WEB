import { DOWNLOADS } from "@/lib/data";
import { Icon } from "./icons";

export default function Downloads() {
  return (
    <section className="section section--cream2">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Documents</span>
          <h2>Brochures &amp; certificates</h2>
          <p className="muted">Download our company profile, certifications and product catalogue.</p>
        </div>
        <div className="downloads-grid">
          {DOWNLOADS.map((d, i) => (
            <a className={`dl-card reveal ${i % 3 ? (i % 3 === 1 ? "d1" : "d2") : ""}`} href={d.href} target="_blank" rel="noopener noreferrer" key={d.title} download={d.file ?? ""}>
              <span className="dl-icon"><Icon name="download" size={20} /></span>
              <span>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <span className="dl-link">Download PDF →</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
