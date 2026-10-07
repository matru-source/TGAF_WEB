import JourneyTimeline from "./JourneyTimeline";
import PhotoCarousel from "./PhotoCarousel";

// The farming side of the story.
const FARM_PHOTOS = [
  "/img/photo-drying.jpg",
  "/img/photo-chilli-hand.jpg",
  "/img/farm-to-fork/photo-sundry-harvest.jpg",
];

export default function FarmToFork() {
  return (
    <section className="section farm-to-fork-wrap" id="journey">
      {/* Floating golden/warm light particles */}
      <div className="ph-particles-wrap" aria-hidden="true">
        <span className="ph-particle p1" />
        <span className="ph-particle p2" />
        <span className="ph-particle p3" />
        <span className="ph-particle p4" />
        <span className="ph-particle p5" />
      </div>

      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow" style={{ color: "var(--chilli, #B5121B)" }}>The journey</span>
          <h2>From seed in the soil to spice in your cooking pot</h2>
          <p className="farm-lead" style={{ color: "#2F3E33", maxWidth: "740px", margin: "0 0 1rem", hyphens: "none" }}>
            A rigorous, traceable journey that protects natural colour, aroma and quality at every stage -
            the heart of our farm-to-fork model.
          </p>
        </div>

        <JourneyTimeline />

        <div className="facility">
          <div className="facility-media reveal">
            <div className="journey-carousel-card">
              <PhotoCarousel
                images={FARM_PHOTOS}
                alt="Nigerian farmers handling sun-dried chilli for Goodearth"
              />
            </div>
          </div>
          <div className="reveal d1 facility-info-card">
            <span className="eyebrow" style={{ color: "var(--chilli, #B5121B)" }}>Grown by Nigerian hands</span>
            <h2 style={{ margin: ".4rem 0 1rem" }}>Real farms, real farmers</h2>
            <p className="farm-text" style={{ color: "#2F3E33" }}>
              We support smallholder farmers to grow chilli, turmeric and ginger profitably - cultivating
              varieties with the pungency and colour our customers require. Matured fruits are sun-dried to
              reduce moisture by ~85%, registered, and moved to our Kaduna warehouse before processing.
            </p>
            <div className="cap-list">
              <span>Grown by 50,000+ farmers</span>
              <span>20,000+ farmers &amp; employees trained</span>
              <span>60,000+ livelihoods created</span>
              <span>Fair-pricing agreements</span>
              <span>Reduced post-harvest losses</span>
              <span>Full traceability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
