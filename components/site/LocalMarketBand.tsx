import Link from "next/link";

export default function LocalMarketBand() {
  return (
    <section className="section market-band">
      <div className="container">
        <div className="market-grid">
          <div className="market-media reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/photo-market.jpg" alt="Goodearth Foods stall at a Nigerian market" />
            <div className="market-tag">
              <span className="dot" /> Live from the market
            </div>
          </div>
          <div className="market-copy reveal d1">
            <span className="eyebrow">From the market to your pot</span>
            <h2>We dey your market — and your kitchen</h2>
            <p className="lead">
              Goodearth is born for Naija cooking. You go find our peppe for over <strong>170 markets</strong> across
              the country, sold by the same traders wey sabi correct quality.
            </p>
            <ul className="market-points">
              <li><strong>12 farmers&apos; markets</strong> &amp; 7 aggregators feeding the supply</li>
              <li><strong>8,700+ retailers</strong> and 2,600+ wholesalers stocking Goodearth</li>
              <li><strong>Women-led</strong> micro-distribution bringing peppe to your street</li>
            </ul>
            <Link href="/presence" className="btn btn-primary">
              Find a market near you <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
