import { TESTIMONIALS } from "@/lib/data";

const DELAY = ["", "d1", "d2", "d3"];

export default function Testimonials() {
  return (
    <section className="section section--cream2">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow center">Wetin people dey talk</span>
          <h2>Loved from the market to the kitchen</h2>
          <p className="muted">Real voices from the traders, cooks and partners who use Goodearth every day.</p>
        </div>
        <div className="tst-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure className={`tst reveal ${DELAY[i % 4]}`} key={t.name}>
              <div className={`tst-quote tq-${t.accent}`}>&ldquo;</div>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className={`tst-avatar tq-${t.accent}`}>{t.name.charAt(0)}</span>
                <span>
                  <span className="tst-name">{t.name}</span>
                  <span className="tst-role">{t.role} · {t.place}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
