"use client";
import { useState } from "react";
import Link from "next/link";
import { B2B_PORTFOLIO, accentClass, type UIProduct } from "@/lib/data";

function pillClass(cost?: string | null) {
  const c = (cost || "").toLowerCase();
  if (c.startsWith("low")) return "pill--hi";
  if (c.startsWith("medium")) return "pill--mid";
  return "pill--prem";
}

export default function Products({ products }: { products: UIProduct[] }) {
  const [tab, setTab] = useState<"b2c" | "b2b">("b2c");
  const b2c = products.filter((p) => p.segment === "B2C");
  const classified = b2c.filter((p) => p.costPositioning || p.scoville);
  const delays = ["", "d1", "d2"];

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Our portfolio</span>
          <h2>Spices for every kitchen &amp; every business</h2>
          <p className="muted">
            A complete range across consumer packs and bulk B2B formats - chilli, turmeric and ginger in
            powder, whole, crushed, sliced and kibbled forms.
          </p>
        </div>

        <div className="tabs reveal" role="tablist" aria-label="Product portfolio">
          <button
            className={tab === "b2c" ? "active" : ""}
            role="tab"
            aria-selected={tab === "b2c"}
            onClick={() => setTab("b2c")}
          >
            Consumer (B2C)
          </button>
          <button
            className={tab === "b2b" ? "active" : ""}
            role="tab"
            aria-selected={tab === "b2b"}
            onClick={() => setTab("b2b")}
          >
            Business (B2B)
          </button>
        </div>

        {/* B2C */}
        <div className={`tab-panel${tab === "b2c" ? " active" : ""}`} role="tabpanel">
          <div className="product-grid">
            {b2c.map((p, i) => {
              const a = accentClass(p.accent);
              return (
                <Link href={`/products/${p.slug}`} className={`pcard ${a.card} reveal ${delays[i % 3]}`} key={p.id}>
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

            <article
              className="pcard t-turmeric reveal d2"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: "linear-gradient(160deg,var(--turmeric-soft),#fff)",
                borderStyle: "dashed",
              }}
            >
              <span className="cat">More on the way</span>
              <h3 style={{ marginTop: ".4rem" }}>Brand extensions &amp; blends</h3>
              <p>
                Our category leadership and supply reliability open wide possibilities for new blends and
                formats.
              </p>
              <Link href="/contact" className="link-arrow" style={{ marginTop: "14px" }}>
                Enquire about partnerships <span className="arr">→</span>
              </Link>
            </article>
          </div>

          {classified.length > 0 && (
            <div style={{ marginTop: "clamp(30px,4vw,52px)" }} className="reveal">
              <h3 style={{ marginBottom: "6px" }}>Pepper classification</h3>
              <p className="muted" style={{ marginBottom: "22px" }}>
                Cost positioning, market category and characteristics across our chilli range.
              </p>
              <div className="table-wrap">
                <table className="spec-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Positioning</th>
                      <th>Category</th>
                      <th>Colour &amp; characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classified.map((p) => (
                      <tr key={p.id}>
                        <td className="prod">{p.name}</td>
                        <td>
                          {p.costPositioning && (
                            <span className={`pill ${pillClass(p.costPositioning)}`}>{p.costPositioning}</span>
                          )}
                        </td>
                        <td>{p.marketCategory}</td>
                        <td>
                          {[p.colour, p.asta && p.asta !== "-" ? `ASTA ${p.asta}` : null, p.scoville, p.usage]
                            .filter(Boolean)
                            .join(" · ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* B2B */}
        <div className={`tab-panel${tab === "b2b" ? " active" : ""}`} role="tabpanel">
          <div className="b2b-grid">
            {B2B_PORTFOLIO.map((c, i) => (
              <article className={`b2b-card c${i + 1} reveal ${delays[i % 3]}`} key={c.key}>
                <div className="ico">{c.letter}</div>
                <h3>{c.name}</h3>
                <p className="muted">{c.desc}</p>
                <div className="forms">
                  {c.forms.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="muted reveal" style={{ marginTop: "26px", maxWidth: "60ch" }}>
            We also grind coriander, mixed spices and condiments to specification. Bulk supply is backed by
            leasehold warehousing capacity of up to 2,000 MT.
          </p>
        </div>
      </div>
    </section>
  );
}
