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
  const items = products.filter((p) => p.segment === "B2C").slice(0, 3);

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
              <motion.div variants={cardVariants} key={p.id}>
                <Link href={`/products/${p.slug}`} className={`pcard ${a.card}`}>
                  <motion.div
                    className={`well ${a.well}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <motion.img 
                        src={p.image} 
                        alt={p.name} 
                        loading="lazy" 
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      />
                    ) : (
                      <span className="nophoto">{p.name.charAt(0)}</span>
                    )}
                  </motion.div>
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
