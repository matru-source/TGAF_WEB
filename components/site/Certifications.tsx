import { CERTS } from "@/lib/data";
import CertLogo from "./CertLogo";

const DELAY = ["", "d1", "d2", "d3"];

export default function Certifications() {
  return (
    <section className="section section--cream2">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow center">Quality assurance</span>
          <h2>Certified &amp; trusted</h2>
          <p className="muted">
            Food safety and traceability are built into every batch - verified by national and
            international standards.
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
