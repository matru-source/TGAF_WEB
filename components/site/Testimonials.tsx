"use client";

import { TESTIMONIALS } from "@/lib/data";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1, 
    transition: { type: "spring" as const, stiffness: 80, damping: 15 }
  }
};

export default function Testimonials() {
  return (
    <section className="section section--cream2">
      <div className="container">
        <motion.div 
          className="section-head center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow center">Wetin people dey talk</span>
          <h2>Loved from the market to the kitchen</h2>
          <p className="muted">Real voices from the traders, cooks and partners who use Goodearth every day.</p>
        </motion.div>
        
        <motion.div 
          className="tst-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure 
              className="tst" 
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.06)" }}
            >
              <div className={`tst-quote tq-${t.accent}`}>&ldquo;</div>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className={`tst-avatar tq-${t.accent}`}>{t.name.charAt(0)}</span>
                <span>
                  <span className="tst-name">{t.name}</span>
                  <span className="tst-role">{t.role} · {t.place}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
