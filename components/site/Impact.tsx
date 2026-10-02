import { IMPACT_CARDS, IMPACT_TAGS } from "@/lib/data";

const DELAY = ["", "d1", "d2", "d3"];

export default function Impact() {
  return (
    <section className="section impact-section-wrap" id="impact">
      {/* Floating golden/warm light particles */}
      <div className="ph-particles-wrap" aria-hidden="true">
        <span className="ph-particle p1" />
        <span className="ph-particle p2" />
        <span className="ph-particle p3" />
        <span className="ph-particle p4" />
        <span className="ph-particle p5" />
      </div>

      <div className="container">
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

        {/* Community & Ground Impact Photo Showcase */}
        <div className="community-showcase reveal">
          <div className="community-header">
            <span className="eyebrow" style={{ color: "var(--chilli, #B5121B)" }}>Grassroots Engagement</span>
            <h3>Communities at the Heart of Good Earth</h3>
            <p>From village townhalls and elder dialogues to rural farming family partnerships across Nigeria.</p>
          </div>

          <div className="community-collage">
            <div className="collage-card collage-card--wide">
              <div className="collage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/community/community-elder-dialogue.webp"
                  alt="Good Earth leadership in dialogue with community elder and villagers"
                  className="collage-img"
                  loading="lazy"
                />
              </div>
              <div className="collage-overlay">
                <h4>Grassroots Elder Dialogue</h4>
                <p>In-depth consultation with village leadership on sustainable farming and fair trade.</p>
              </div>
            </div>

            <div className="collage-card collage-card--narrow">
              <div className="collage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/community/community-townhall.webp"
                  alt="Community townhall dialogue with village elders and farmers under tree shade"
                  className="collage-img"
                  loading="lazy"
                />
              </div>
              <div className="collage-overlay">
                <h4>Farmer Townhalls</h4>
                <p>Direct engagement with community elders on fair pricing and agricultural best practices.</p>
              </div>
            </div>

            <div className="collage-card collage-card--narrow">
              <div className="collage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/community/community-hot-peppe.webp"
                  alt="Farming families and community members gathering with Good Earth leadership"
                  className="collage-img"
                  loading="lazy"
                />
              </div>
              <div className="collage-overlay">
                <h4>Empowering Families</h4>
                <p>Long-term livelihood partnerships with smallholder farmers, women, and youth.</p>
              </div>
            </div>

            <div className="collage-card collage-card--wide">
              <div className="collage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/community/community-riverside.webp"
                  alt="Good Earth leadership team on the ground with local agricultural community"
                  className="collage-img"
                  loading="lazy"
                />
              </div>
              <div className="collage-overlay">
                <h4>Grassroots Presence</h4>
                <p>Connecting Nigerian domestic agriculture directly to modern spice processing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
