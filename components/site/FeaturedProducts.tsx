"use client";

import Link from "next/link";
import { type UIProduct } from "@/lib/data";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

function ProductPedestalCard({
  product,
  tagline,
}: {
  product: UIProduct;
  tagline: string;
}) {
  // 3D Tilt calculation based on mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="product-pedestal-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <Link href={`/products/${product.slug}`} className="pedestal-card-link">
        {/* Upper Stage with Pedestal & Product Asset */}
        <div className="pedestal-stage">
          <div className="pedestal-glow" aria-hidden="true" />
          <div className="pedestal-disc" aria-hidden="true" />

          {/* Authentic Product Image from Assets */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image || "/img/product-hot-peppe.png"}
            alt={product.name}
            className="pedestal-product-asset"
            loading="lazy"
          />

          {/* Pack Weight Tag */}
          <span className="pedestal-weight-tag">
            {product.sizes && product.sizes.length > 0 ? product.sizes.join(" · ") : "25g / 50g / 100g"}
          </span>
        </div>

        {/* Lower Info */}
        <div className="pedestal-info">
          <h3 className="pedestal-title">{product.name}</h3>
          <p className="pedestal-desc">{tagline}</p>
          <div className="pedestal-cta">
            <span>Shop Now</span>
            <span className="cta-arrow">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedProducts({ products }: { products: UIProduct[] }) {
  // Flagship Nigerian pepper products
  const items = [...products.filter((p) => p.segment === "B2C")]
    .sort((a, b) => {
      const rank = (slug: string) =>
        slug.includes("hot-peppe") ? 0 : slug.includes("atarodo") ? 1 : slug.includes("cameroon") ? 2 : 9;
      return rank(a.slug) - rank(b.slug);
    })
    .slice(0, 3);

  const taglines: Record<string, string> = {
    "hot-peppe": "Bold heat, rich aroma. Perfect for every Nigerian kitchen.",
    "atarodo": "Traditionally sun-dried for unmatched rich red flavor.",
    "cameroon": "Earthy, exotic, and intensely aromatic.",
  };

  const getTagline = (slug: string) => {
    if (slug.includes("atarodo")) return taglines["atarodo"];
    if (slug.includes("cameroon")) return taglines["cameroon"];
    return taglines["hot-peppe"];
  };

  return (
    <section className="products-magical-section">
      <div className="container">
        {/* Section Header */}
        <div className="products-magical-head">
          <div>
            <span className="eyebrow">OUR PRODUCTS</span>
            <h2>Kitchen staples, ready for your pot</h2>
          </div>
          <Link href="/products" className="view-all-link">
            <span>View All Products</span>
            <span className="arr">→</span>
          </Link>
        </div>

        {/* Pedestal Cards Grid */}
        <motion.div
          className="pedestal-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          {items.map((prod) => (
            <ProductPedestalCard
              key={prod.id}
              product={prod}
              tagline={getTagline(prod.slug)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
