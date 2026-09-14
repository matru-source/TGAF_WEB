import { FACILITY_KPIS, FACILITY_CAPS } from "@/lib/data";
import FacilityCarousel from "./FacilityCarousel";

const MODULES = [
  { t: "Steam steriliser", d: "Microbial safety for high-VO spices while preserving natural colour and aroma." },
  { t: "Packaging machines", d: "Batch-to-pack with minimal human intervention for hygiene and consistency." },
  { t: "Silos & storage", d: "Leasehold warehousing capacity of up to 2,000 MT for reliable supply." },
];

export default function Manufacturing() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">World-class facility · Ikorodu</span>
          <h2>A US$10M automated processing plant</h2>
          <p className="muted">
            Built around every food-safety norm our customers demand, with capacity for 20 MT of finished
            product per day. Grinding technology for high-VO spices retains natural aroma and colour.
          </p>
        </div>

        <div className="reveal" style={{ marginBottom: "clamp(24px, 3vw, 36px)" }}>
          <FacilityCarousel />
        </div>

        <div className="kpi-grid reveal">
          {FACILITY_KPIS.map((k) => (
            <div className="kpi-box" key={k.l}>
              <div className="n">{k.n}</div>
              <div className="l">{k.l}</div>
            </div>
          ))}
        </div>

        <div className="cap-list reveal" style={{ marginTop: "24px" }}>
          {FACILITY_CAPS.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>

        <div className="feature-grid reveal" style={{ marginTop: "clamp(28px,4vw,44px)" }}>
          {MODULES.map((m) => (
            <div className="feature-card" key={m.t}>
              <h3>{m.t}</h3>
              <p>{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
