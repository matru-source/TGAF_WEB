import Link from "next/link";
import MarketsMap from "./MarketsMap";

export default function Markets({ withHead = true }: { withHead?: boolean }) {
  return (
    <section className="section">
      <div className="container">
        {withHead && (
          <div className="section-head reveal">
            <span className="eyebrow">Where to buy</span>
            <h2>Find Goodearth for market near you</h2>
            <p className="muted">
              Our spices move through 100+ markets across 17+ states. Here are some of the big ones where
              traders stock Goodearth.
            </p>
          </div>
        )}
        <div className="reveal">
          <MarketsMap />
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
