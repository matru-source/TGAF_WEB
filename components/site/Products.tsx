"use client";
import { useState } from "react";
import Link from "next/link";
import { B2B_PORTFOLIO, B2B_CUSTOMERS, accentClass, type UIProduct } from "@/lib/data";

function pillClass(cost?: string | null) {
  const c = (cost || "").toLowerCase();
  if (c.startsWith("low")) return "pill--hi";
  if (c.startsWith("medium")) return "pill--mid";
  return "pill--prem";
}

export default function Products({ products }: { products: UIProduct[] }) {
  const [tab, setTab] = useState<"b2c" | "b2b">("b2b");
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
            className={tab === "b2b" ? "active" : ""}
            role="tab"
            aria-selected={tab === "b2b"}
            onClick={() => setTab("b2b")}
          >
            Business (B2B)
          </button>
          <button
            className={tab === "b2c" ? "active" : ""}
            role="tab"
            aria-selected={tab === "b2c"}
            onClick={() => setTab("b2c")}
          >
            Consumer (B2C)
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

          <div style={{ marginTop: "clamp(32px,4.5vw,56px)" }} className="reveal">
            <h3 style={{ marginBottom: "8px" }}>Consolidated Packaging &amp; Product Specifications</h3>
            <p className="muted" style={{ marginBottom: "22px" }}>
              Standard pack weights, sachet counts, carton rolls, and culinary heat metrics across our retail range.
            </p>
            <div className="table-wrap">
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Pack Weights</th>
                    <th>Packaging &amp; Carton Rolls</th>
                    <th>Category</th>
                    <th>Heat &amp; Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {b2c.map((p) => {
                    const packagingRolls = p.slug.includes("atarodo")
                      ? "10 sachets/roll · 100 rolls/carton"
                      : p.slug.includes("cameroon")
                      ? "10 sachets/roll · Stand-up retail pouches"
                      : p.slug.includes("hot-peppe")
                      ? "10 sachets/roll · 100 rolls/carton · Supa Pack"
                      : "Multi-layer barrier pouches · Export bags";

                    return (
                      <tr key={p.id}>
                        <td className="prod">
                          <Link href={`/products/${p.slug}`} style={{ color: "var(--chilli)", fontWeight: 700 }}>
                            {p.name}
                          </Link>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {p.sizes.map((s) => (
                              <span key={s} className="pdp-size" style={{ fontSize: "0.76rem" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>{packagingRolls}</td>
                        <td>{p.marketCategory || p.tagline}</td>
                        <td>
                          {[p.colour, p.asta && p.asta !== "-" ? `ASTA ${p.asta}` : null, p.scoville, p.usage]
                            .filter(Boolean)
                            .join(" · ")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* B2B */}
        <div className={`tab-panel${tab === "b2b" ? " active" : ""}`} role="tabpanel">
          <div className="b2b-showcase">
            <div className="b2b-products reveal">
              <h3 className="b2b-col-title">Our B2B products</h3>
              <div className="b2b-rows">
                {B2B_PORTFOLIO.map((c) => (
                  <div className={`b2b-row b2b-row--${c.accent}`} key={c.key}>
                    <div className="b2b-row-label">{c.name}</div>
                    <div className="b2b-forms">
                      {c.forms.map((f) => (
                        <div className="b2b-form" key={f.label}>
                          <span className="b2b-form-photo">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={f.image} alt={`${c.name} - ${f.label}`} loading="lazy" />
                          </span>
                          <span className="b2b-form-label">{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="b2b-customers reveal d1">
              <h3 className="b2b-col-title">Trusted B2B Partners</h3>
              <div className="b2b-partner-grid">
                {B2B_CUSTOMERS.map((cu) => (
                  <div className="b2b-partner-card" key={cu.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cu.logo} alt={cu.name} loading="lazy" />
                    <span className="b2b-partner-name">{cu.name}</span>
                  </div>
                ))}
              </div>
            </div>
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
