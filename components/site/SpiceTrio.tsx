import { SPICES } from "@/lib/data";

const DELAY = ["", "d1", "d2"];

export default function SpiceTrio() {
  return (
    <section className="section section--cream2">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow center">Three signature spices</span>
          <h2>Colour, heat &amp; aroma - in their purest form</h2>
          <p className="muted">
            Every Goodearth product begins with one of three crops, grown by smallholder farmers and
            processed to lock in natural colour and aroma.
          </p>
        </div>
        <div className="trio">
          {SPICES.map((s, i) => (
            <article className={`spice spice--${s.key} reveal ${DELAY[i]}`} key={s.key}>
              <span className="hex">{s.hex}</span>
              <span className="tag">{s.tag}</span>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
