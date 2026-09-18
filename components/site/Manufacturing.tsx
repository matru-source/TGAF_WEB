import { FACILITY_KPIS, FACILITY_CAPS } from "@/lib/data";
import FacilityCarousel from "./FacilityCarousel";
import { Icon } from "./icons";

const EQUIPMENT_MODULES = [
  {
    stage: "Retail Packaging",
    title: "High-Speed Rotary Sachet Packaging Line",
    description: "Multi-track rotary pouch filling and hermetic heat-sealing for 50g & 100g consumer sachets with zero manual contact.",
    image: "/img/facility/packaging-line.jpg",
    specs: ["Zero-Touch", "PLC Controlled", "Precision Dosing"],
  },
  {
    stage: "Milling & Pulverizing",
    title: "Low-Temperature Impact Pulverizer",
    description: "Multi-stage cool milling engineered to pulverize whole dried chilli and ginger while retaining delicate volatile oils (high-VO) and natural aroma.",
    image: "/img/facility/industrial-pulverizer.jpg",
    specs: ["VO Retention", "Fine Grinding", "Cool-Grind Tech"],
  },
  {
    stage: "Homogenous Batching",
    title: "Industrial SS Ribbon Blender",
    description: "Counter-flow helical ribbon agitators deliver homogenous particle distribution, consistent Scoville heat levels, and uniform color batching.",
    image: "/img/facility/ribbon-blender.jpg",
    specs: ["SS304 Food Grade", "Uniform Pungency", "Batch Mastery"],
  },
  {
    stage: "Closed-Loop Conveyance",
    title: "Pneumatic Cyclone Separator & Filtration",
    description: "Closed-loop negative pressure conveyance that separates fine spice particles under sealed vacuum, preventing environmental exposure.",
    image: "/img/facility/pneumatic-cyclone.jpg",
    specs: ["Vacuum Airflow", "Dust Extraction", "Contamination Free"],
  },
  {
    stage: "Continuous Pouching",
    title: "Automated VFFS Packaging Unit",
    description: "Continuous roll-fed vertical form-fill-seal machine featuring automated batch date-stamping and high-barrier pouch protection.",
    image: "/img/facility/packaging-vffs.jpg",
    specs: ["Roll-Fed VFFS", "Auto Date Coding", "Hermetic Seal"],
  },
  {
    stage: "B2B & Commercial Output",
    title: "Bulk Discharge & Bagging Station",
    description: "Heavy-duty discharge hopper and precision scale bagging system for 25kg & 50kg multi-wall commercial sacks for food manufacturers.",
    image: "/img/facility/bulk-bagging.jpg",
    specs: ["25kg & 50kg Sacks", "Commercial B2B", "Heavy-Duty"],
  },
];

export default function Manufacturing() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">World-class facility · Ikorodu</span>
          <h2>A US$12M automated processing plant</h2>
          <p className="muted">
            Built around every food-safety norm our customers demand, with 3,000 MT annual plant capacity of finished
            product. Grinding technology for high-VO spices retains natural aroma and colour.
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

        {/* Advanced Plant Machinery Section */}
        <div className="section-head reveal" style={{ marginTop: "clamp(52px, 6vw, 80px)", marginBottom: "clamp(24px, 3vw, 36px)" }}>
          <span className="eyebrow">Advanced Machinery</span>
          <h2>Industrial Processing &amp; Packaging Technology</h2>
          <p className="muted">
            Inside our Ikorodu plant: high-throughput, automated machinery engineered for microbial safety, volatile oil preservation, and hermetic packaging.
          </p>
        </div>

        <div className="equipment-grid reveal">
          {EQUIPMENT_MODULES.map((m, idx) => (
            <div className={`equipment-card reveal ${["", "d1", "d2"][idx % 3]}`} key={m.title}>
              <div className="equipment-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt={m.title} loading="lazy" />
                <span className="equipment-stage-tag">{m.stage}</span>
              </div>
              <div className="equipment-card-body">
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                <div className="equipment-spec-row">
                  {m.specs.map((spec) => (
                    <span className="equipment-spec-pill" key={spec}>
                      <Icon name="award" size={12} /> {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
