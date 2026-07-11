import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NEWS } from "@/lib/data";
import { Icon } from "@/components/site/icons";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const n = NEWS.find((x) => x.slug === params.slug);
  return n
    ? { title: `${n.title} · Goodearth Foods`, description: n.excerpt }
    : { title: "News · Goodearth Foods" };
}

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export default function NewsArticle({ params }: { params: { slug: string } }) {
  const n = NEWS.find((x) => x.slug === params.slug);
  if (!n) notFound();

  return (
    <>
      <section className="page-hero ph-green">
        <div className="container">
          <span className="eyebrow">
            {n.category} · {fmt(n.date)}
          </span>
          <h1>{n.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="news-article">
            <div className="cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={n.image} alt={n.title} />
            </div>
            {n.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <Link href="/news" className="link-arrow" style={{ marginTop: "10px" }}>
              <span className="arr" style={{ transform: "rotate(180deg)" }}>→</span> Back to news
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
