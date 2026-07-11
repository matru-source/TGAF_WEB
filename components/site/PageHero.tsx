export default function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = "green",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  tone?: "green" | "chilli" | "warm";
  /** @deprecated breadcrumb removed; kept optional so existing callers compile */
  crumb?: string;
}) {
  return (
    <section className={`page-hero ph-${tone}`}>
      <div className="container">
        <span className="eyebrow ph-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {subtitle && <p className="lead">{subtitle}</p>}
      </div>
    </section>
  );
}
