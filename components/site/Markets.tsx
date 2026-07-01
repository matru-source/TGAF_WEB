import Link from "next/link";
import { MARKETS } from "@/lib/data";
import { Icon } from "./icons";

export default function Markets({ withHead = true }: { withHead?: boolean }) {
  return (
    <section className="section">
      <div className="container">
        {withHead && (
          <div className="section-head reveal">
            <span className="eyebrow">Where to buy</span>
            <h2>Find Goodearth for market near you</h2>
            <p className="muted">
              Our spices move through 170+ markets across 15+ states. Here are some of the big ones where
              traders stock Goodearth.
            </p>
          </div>
        )}
        <div className="markets-grid">
          {MARKETS.map((m, i) => (
            <div className={`market-chip reveal ${i % 3 ? (i % 3 === 1 ? "d1" : "d2") : ""}`} key={m.name}>
              <span className="mc-pin" aria-hidden="true"><Icon name="pin" size={18} /></span>
              <span>
                <span className="mc-name">{m.name}</span>
                <span className="mc-place">{m.place}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="markets-note reveal">
          <p>Be a trader wey carry correct peppe?</p>
          <Link href="/contact" className="btn btn-ghost">
            Become a distributor <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
