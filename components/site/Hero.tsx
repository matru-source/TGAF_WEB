import Link from "next/link";

export default function Hero({ featuredImage = "/img/product-hot-peppe.png" }: { featuredImage?: string }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow reveal">Farm to Fork · Spices of Nigeria</span>
            <h1 className="reveal d1">
              Na correct! <em>Naija peppe.</em>
            </h1>
            <p className="lead reveal d2">
              From the market to your pot - premium chilli, turmeric and ginger, grown by Nigerian hands
              and milled in our world-class Ikorodu facility. <strong>Peppe wey pass peppe.</strong>
            </p>
            <div className="hero-actions reveal d3">
              <Link href="/products" className="btn btn-primary">
                Explore our spices <span className="arr">→</span>
              </Link>
              <Link href="/presence" className="btn btn-ghost">
                Find us for market
              </Link>
            </div>
            <div className="hero-trust reveal d4">
              <span className="t-label">Certified by</span>
              <div className="t-list">
                <span className="chip">NAFDAC</span>
                <span className="chip">SON</span>
                <span className="chip">Halal</span>
                <span className="chip">FSSC 22000</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal d2">
            <div className="frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/photo-chilli-hand.jpg" alt="A handful of sun-dried Nigerian chilli peppers" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pack" src={featuredImage} alt="Goodearth featured product pack" />
            <div className="stat-card">
              <div className="n" data-count="350" data-suffix="+">
                0
              </div>
              <div className="l">Farmers supported</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
