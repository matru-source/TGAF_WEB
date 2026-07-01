import Link from "next/link";
import { accentClass, type UIProduct } from "@/lib/data";

const DELAY = ["", "d1", "d2"];

export default function FeaturedProducts({ products }: { products: UIProduct[] }) {
  const items = products.filter((p) => p.segment === "B2C").slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "none", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ maxWidth: "640px" }}>
            <span className="eyebrow">Our spices</span>
            <h2>Kitchen staples, ready for your pot</h2>
          </div>
          <Link href="/products" className="link-arrow">
            See the full range <span className="arr">→</span>
          </Link>
        </div>

        <div className="product-grid">
          {items.map((p, i) => {
            const a = accentClass(p.accent);
            return (
              <Link href={`/products/${p.slug}`} className={`pcard ${a.card} reveal ${DELAY[i % 3]}`} key={p.id}>
                <div className={`well ${a.well}`}>
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.name} loading="lazy" />
                  ) : (
                    <span className="nophoto">{p.name.charAt(0)}</span>
                  )}
                </div>
                {p.tagline && <span className="cat">{p.tagline}</span>}
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                {p.sizes.length > 0 && (
                  <div className="sizes">
                    {p.sizes.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                )}
                <span className="pcard-view">View product <span className="arr">→</span></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
