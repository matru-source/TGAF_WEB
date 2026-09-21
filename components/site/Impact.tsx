import { IMPACT_CARDS, IMPACT_TAGS } from "@/lib/data";

const DELAY = ["", "d1", "d2", "d3"];

export default function Impact() {
  return (
    <section className="section section--ink" id="impact">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow center">Impact &amp; sustainability</span>
          <h2>Growing spices, growing communities</h2>
          <p style={{ color: "#C7C2B4" }}>
            No dependence on imports. 100% support to local farmers - strengthening rural economies and
            Nigeria&apos;s food security.
          </p>
        </div>

        <div className="impact-grid">
          {IMPACT_CARDS.map((c, i) => (
            <div className={`impact-card reveal ${DELAY[i]}`} key={c.title}>
              <div className="n" {...(c.count ? { "data-count": c.count, "data-suffix": c.suffix } : {})}>
                {c.count ? "0" : c.n}
              </div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>

        <div className="impact-tags reveal">
          {IMPACT_TAGS.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
