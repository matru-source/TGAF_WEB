import { SWOT } from "@/lib/data";

const BLOCKS: { k: keyof typeof SWOT; cls: string; letter: string; label: string }[] = [
  { k: "s", cls: "s", letter: "S", label: "Strengths" },
  { k: "w", cls: "w", letter: "W", label: "Weaknesses" },
  { k: "o", cls: "o", letter: "O", label: "Opportunities" },
  { k: "t", cls: "t", letter: "T", label: "Threats" },
];

export default function MarketOverview() {
  return (
    <section className="section section--cream2">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Market overview</span>
          <h2>Why Goodearth leads - and what we&apos;re solving</h2>
          <p className="muted">
            Wide product usage, quality &amp; hygiene, and continuous supply in a category with no major
            competitor - addressing real gaps in Nigeria&apos;s spice market.
          </p>
        </div>
        <div className="swot-grid">
          {BLOCKS.map((b, i) => (
            <div className={`swot ${b.cls} reveal ${i % 2 ? "d1" : ""}`} key={b.k}>
              <div className="h">
                <span className="k">{b.letter}</span>
                <span className="n">{b.label}</span>
              </div>
              <ul>
                {SWOT[b.k].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
