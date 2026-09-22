"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { type UIProduct } from "@/lib/data";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";

function ProductPedestalCard({
  product,
  tagline,
  stageClass,
  isAutoPopped,
  isAutoPlaying,
}: {
  product: UIProduct;
  tagline: string;
  stageClass: string;
  isAutoPopped: boolean;
  isAutoPlaying: boolean;
}) {
  // 3D Tilt calculation based on mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAutoPlaying) return;
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

  // Reset 3D tilt whenever auto-pop sequence plays
  useEffect(() => {
    if (isAutoPlaying) {
      x.set(0);
      y.set(0);
    }
  }, [isAutoPlaying, x, y]);

  return (
    <motion.div
      className={`product-pedestal-card ${isAutoPopped ? "auto-popped" : ""} ${
        isAutoPlaying ? "auto-playing" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={isAutoPopped ? { y: -12 } : { y: 0 }}
      whileHover={isAutoPlaying ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <Link href={`/products/${product.slug}`} className="pedestal-card-link">
        {/* Upper Stage with Individual Photographic Spice Background */}
        <div className={`pedestal-stage ${stageClass}`}>
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
  const sectionRef = useRef<HTMLElement>(null);
  // Viewport tracking for both scrolling down and scrolling up
  const isInView = useInView(sectionRef, { amount: 0.25, once: false });

  const [activePopIndex, setActivePopIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Trigger sequential 1.5s pop-up wave when section enters view
  useEffect(() => {
    if (!isInView) {
      setActivePopIndex(null);
      setIsAutoPlaying(false);
      return;
    }

    // Start auto wave: 1.5s per product
    setIsAutoPlaying(true);
    setActivePopIndex(0); // Card 1 (Hot Peppe) pops up from 0.0s to 1.5s

    const t1 = setTimeout(() => {
      setActivePopIndex(1); // Card 2 (Atarodo) pops up from 1.5s to 3.0s
    }, 1500);

    const t2 = setTimeout(() => {
      setActivePopIndex(2); // Card 3 (Cameroon) pops up from 3.0s to 4.5s
    }, 3000);

    const t3 = setTimeout(() => {
      setActivePopIndex(null); // Card 3 returns to rest at 4.5s
    }, 4500);

    const t4 = setTimeout(() => {
      setIsAutoPlaying(false); // Hover lock releases at 4.9s
    }, 4900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isInView]);

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

  const getStageClass = (slug: string) => {
    if (slug.includes("atarodo")) return "stage-atarodo";
    if (slug.includes("cameroon")) return "stage-cameroon";
    return "stage-hot-peppe";
  };

  return (
    <section ref={sectionRef} className="products-magical-section">
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
          className={`pedestal-grid ${isAutoPlaying ? "is-auto-playing" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          {items.map((prod, index) => (
            <ProductPedestalCard
              key={prod.id}
              product={prod}
              tagline={getTagline(prod.slug)}
              stageClass={getStageClass(prod.slug)}
              isAutoPopped={activePopIndex === index}
              isAutoPlaying={isAutoPlaying}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

