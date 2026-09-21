"use client";

import { SPICES } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const } }
};

const spiceImages: Record<string, string> = {
  chilli: "/img/product-hot-peppe.png",
  turmeric: "/img/product-turmeric.png",
  ginger: "/img/product-ginger.png"
};

export default function SpiceTrio() {
  return (
    <section className="section section--cream2">
      <div className="container">
        <motion.div
          className="section-head center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow center">Three signature spices</span>
          <h2>Colour, heat &amp; aroma - in their purest form</h2>
          <p className="muted">
            Every Goodearth product begins with one of three crops, grown by smallholder farmers and
            processed to lock in natural colour and aroma.
          </p>
        </motion.div>
        
        <motion.div
          className="trio"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {SPICES.map((s) => (
            <motion.article
              className={`spice spice--${s.key}`}
              key={s.key}
              variants={itemVariants}
            >
              <div className="spice-bg-mesh"></div>
              
              <div className="spice-image-wrap">
                <Image 
                  src={spiceImages[s.key]} 
                  alt={`${s.name} product`} 
                  width={400} 
                  height={500} 
                  className="spice-product-img"
                />
              </div>

              <div className="spice-content-glass">
                <div className="spice-top-row">
                  <span className="hex">{s.hex}</span>
                  <span className="tag">{s.tag}</span>
                </div>
                <h3>{s.name}</h3>
                <p>{s.body}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
