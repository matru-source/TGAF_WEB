export default function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = "green",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  tone?: "green" | "chilli" | "warm" | "awards";
  /** @deprecated breadcrumb removed; kept optional so existing callers compile */
  crumb?: string;
}) {
  return (
    <section className={`page-hero ph-${tone}`}>
      {/* Atmospheric lighting and depth layers */}
      <div className="ph-code-bg" aria-hidden="true">
        {/* Soft diagonal sunbeam wash */}
        <div className="ph-sun-wash" />

        {/* Ambient volumetric depth glow */}
        <div className="ph-ambient-glow" />

        {/* Floating golden/warm spice particles */}
        <div className="ph-particles-wrap">
          <span className="ph-particle p1" />
          <span className="ph-particle p2" />
          <span className="ph-particle p3" />
          <span className="ph-particle p4" />
          <span className="ph-particle p5" />
        </div>
      </div>

      <div className="container">
        <div className="ph-content">
          <span className="eyebrow ph-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {subtitle && <p className="lead">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
