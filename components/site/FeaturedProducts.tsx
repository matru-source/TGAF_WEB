"use client";

import Link from "next/link";
import { accentClass, type UIProduct } from "@/lib/data";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 80, damping: 15 }
  }
};

export default function FeaturedProducts({ products }: { products: UIProduct[] }) {
  // Always showcase Goodearth's 3 flagship Nigerian Pepper powders on the homepage
  const items = [...products.filter((p) => p.segment === "B2C")]
    .sort((a, b) => {
      const rank = (slug: string) =>
        slug.includes("hot-peppe") ? 0 : slug.includes("atarodo") ? 1 : slug.includes("cameroon") ? 2 : 9;
      return rank(a.slug) - rank(b.slug);
    })
    .slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "none", flexWrap: "wrap", gap: "16px" }}
        >
          <div style={{ maxWidth: "640px" }}>
            <span className="eyebrow">Our spices</span>
            <h2>Kitchen staples, ready for your pot</h2>
          </div>
          <Link href="/products" className="link-arrow">
            See the full range <span className="arr">→</span>
          </Link>
        </motion.div>

        <motion.div
          className="product-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {items.map((p) => {
            const a = accentClass(p.accent);
            return (
              <motion.div variants={cardVariants} key={p.id} style={{ height: "100%", display: "flex" }}>
                <Link href={`/products/${p.slug}`} className={`pcard ${a.card}`}>
                  <div className={`well ${a.well}`}>
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        loading="lazy" 
                      />
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
