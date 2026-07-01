import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = "green",
  crumb,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  tone?: "green" | "chilli" | "warm";
  crumb: string;
}) {
  return (
    <section className={`page-hero ph-${tone}`}>
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <span className="eyebrow ph-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {subtitle && <p className="lead">{subtitle}</p>}
      </div>
    </section>
  );
}
