import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/queries";
import { accentClass } from "@/lib/data";
import ProductGallery from "@/components/site/ProductGallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProductBySlug(params.slug);
  if (!p) return { title: "Product · Goodearth Foods" };
  return { title: `${p.name} · Goodearth Foods`, description: p.description };
}

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const all = await getProducts();
  const related = all.filter((p) => p.segment === "B2C" && p.slug !== product.slug).slice(0, 3);
  const a = accentClass(product.accent);
  const gallery = [...new Set([product.image, ...(product.images ?? [])].filter(Boolean) as string[])];
  const specs = [
    ["Colour", product.colour],
    ["ASTA", product.asta && product.asta !== "-" ? product.asta : null],
    ["Scoville", product.scoville],
    ["Category", product.marketCategory],
    ["Best for", product.usage],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <>
      <section className="pdp">
        <div className="container">
          <div className="pdp-grid">
            {gallery.length > 0 ? (
              <ProductGallery images={gallery} alt={product.name} wellClass={a.well} />
            ) : (
              <div className={`pdp-media ${a.well}`}>
                <span className="nophoto">{product.name.charAt(0)}</span>
              </div>
            )}

            <div className="pdp-info">
              {product.tagline && <span className="eyebrow">{product.tagline}</span>}
              <h1>{product.name}</h1>
              <p className="lead">{product.description}</p>

              <div className="pdp-meta">
                <span className={`badge-pill bp-${product.segment.toLowerCase()}`}>{product.segment}</span>
                {product.sizes.map((s) => (
                  <span className="pdp-size" key={s}>{s}</span>
                ))}
                {product.formats.map((f) => (
                  <span className="pdp-size" key={f}>{f}</span>
                ))}
              </div>

              {specs.length > 0 && (
                <dl className="pdp-specs">
                  {specs.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="pdp-actions">
                <Link href="/contact" className="btn btn-primary">
                  Enquire about this product <span className="arr">→</span>
                </Link>
                <Link href="/products" className="btn btn-ghost">
                  Back to all products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--cream2">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">More from the range</span>
              <h2>You fit like these too</h2>
            </div>
            <div className="product-grid">
              {related.map((p, i) => {
                const ra = accentClass(p.accent);
                return (
                  <Link href={`/products/${p.slug}`} className={`pcard ${ra.card} reveal ${i % 3 ? (i % 3 === 1 ? "d1" : "d2") : ""}`} key={p.id}>
                    <div className={`well ${ra.well}`}>
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
                    <span className="pcard-view">View product <span className="arr">→</span></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
