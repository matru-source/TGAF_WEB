import JourneyTimeline from "./JourneyTimeline";

export default function FarmToFork() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">The journey</span>
          <h2>From seed in the soil to spice in your pot</h2>
          <p className="muted">
            A rigorous, traceable journey that protects natural colour, aroma and quality at every stage -
            the heart of our farm-to-fork model.
          </p>
        </div>

        <div className="journey-wrap">
          <JourneyTimeline />
          <figure className="journey-figure reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/photo-hero.jpg" alt="A Goodearth vendor selling premium peppe at a Nigerian market" />
            <figcaption>From our farms to the market stall — every step traceable.</figcaption>
          </figure>
        </div>

        <div className="facility">
          <div className="facility-media reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/photo-drying.jpg" alt="Sun-dried chilli at the Goodearth warehouse" />
          </div>
          <div className="reveal d1">
            <span className="eyebrow">Grown by Nigerian hands</span>
            <h2 style={{ margin: ".4rem 0 1rem" }}>Real farms, real farmers</h2>
            <p className="muted">
              We support smallholder farmers to grow chilli, turmeric and ginger profitably - cultivating
              varieties with the pungency and colour our customers require. Matured fruits are sun-dried to
              reduce moisture by ~85%, registered, and moved to our Kaduna warehouse before processing.
            </p>
            <div className="cap-list">
              <span>350+ farmers</span>
              <span>12 farmers&apos; markets</span>
              <span>7 aggregators</span>
              <span>Fair-pricing agreements</span>
              <span>Full traceability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
