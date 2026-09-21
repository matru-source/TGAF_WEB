import Link from "next/link";
import { NEWS } from "@/lib/data";
import { Icon } from "./icons";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const DELAY = ["", "d1", "d2"];

export default function NewsList() {
  return (
    <section className="section">
      <div className="container">
        <div className="news-grid">
          {NEWS.map((n, i) => (
            <Link href={`/news/${n.slug}`} className={`news-card reveal ${DELAY[i % 3]}`} key={n.slug}>
              <div className="thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.image} alt={n.title} loading="lazy" />
              </div>
              <div className="body">
                <div className="news-meta">
                  <span className="news-cat">{n.category}</span>
                  <span><Icon name="calendar" size={13} /> {fmt(n.date)}</span>
                </div>
                <h3>{n.title}</h3>
                <p>{n.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
