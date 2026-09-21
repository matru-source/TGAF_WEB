import Link from "next/link";

export default function CtaBand({
  title = "Join our hands to grow together",
  text = "Whether you cook for a family or supply a nation, Goodearth is your farm-to-fork spice partner.",
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
}: {
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="cta-band reveal">
          <h2>{title}</h2>
          <p>{text}</p>
          <Link href={ctaHref} className="btn btn-light">
            {ctaLabel} <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
