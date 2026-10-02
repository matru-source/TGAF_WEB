import { CERTS } from "@/lib/data";
import CertLogo from "./CertLogo";

const DELAY = ["", "d1", "d2", "d3"];

export default function Certifications() {
  return (
    <section className="section quality-cert-wrap" id="certifications">
      {/* Ambient atmospheric particles */}
      <div className="ph-particles-wrap" aria-hidden="true" style={{ opacity: 0.65 }}>
        <span className="ph-particle p1" />
        <span className="ph-particle p2" />
        <span className="ph-particle p3" />
        <span className="ph-particle p4" />
        <span className="ph-particle p5" />
      </div>

      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow center">Quality assurance</span>
          <p className="muted" style={{ marginTop: "0.85rem", fontSize: "1.04rem", lineHeight: 1.68 }}>
            Our processing facility and food-safety management systems are independently audited and accredited
            by leading Nigerian and global regulatory authorities to guarantee purity, compliance, and consumer trust.
          </p>
        </div>
        <div className="certs">
          {CERTS.map((c, i) => (
            <div className={`cert reveal ${DELAY[i % 4]}`} key={c.abbr}>
              <div className="cert-media">
                <CertLogo src={c.logo} abbr={c.abbr} full={c.full} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
