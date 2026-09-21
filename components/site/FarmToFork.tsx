import JourneyTimeline from "./JourneyTimeline";
import PhotoCarousel from "./PhotoCarousel";

// Journey: farm gate through the mill to the market stall.
const JOURNEY_PHOTOS = [
  "/img/gallery/goodearth-facility-aerial.png",
  "/img/gallery/machine-12.jpg",
  "/img/gallery/market-01.jpg",
];

// The farming side of the story.
const FARM_PHOTOS = [
  "/img/photo-drying.jpg",
  "/img/photo-chilli-hand.jpg",
  "/img/photo-sundry.jpg",
];

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
            <PhotoCarousel
              images={JOURNEY_PHOTOS}
              alt="Goodearth peppe on its journey from our mill to Nigerian market stalls"
            />
            <figcaption>From our farms to the market stall — every step traceable.</figcaption>
          </figure>
        </div>

        <div className="facility">
          <div className="facility-media reveal">
            <PhotoCarousel
              images={FARM_PHOTOS}
              alt="Nigerian farmers handling sun-dried chilli for Goodearth"
            />
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
              <span>Grown by 50,000+ farmers</span>
              <span>10,000+ farmers trained</span>
              <span>100 farmer markets</span>
              <span>25 aggregators</span>
              <span>Fair-pricing agreements</span>
              <span>Full traceability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
