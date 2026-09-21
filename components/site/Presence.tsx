import { STATES } from "@/lib/data";

export default function Presence() {
  return (
    <section className="section" id="presence">
      <div className="container">
        <div className="presence-grid">
          <div className="presence-copy reveal">
            <span className="eyebrow">Our presence</span>
            <h2>A nationwide reach across Nigeria</h2>
            <p className="muted" style={{ margin: "1rem 0 1.6rem" }}>
              From farm to processing to shelf - across all five geopolitical zones, with sales in 17+
              states and a dedicated nationwide workforce.
            </p>
            <ul className="states">
              {STATES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="presence-media reveal d1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/photo-market.jpg" alt="Goodearth Foods market stall in Nigeria" />
          </div>
        </div>
      </div>
    </section>
  );
}
