"use client";

import { VALUE_PROPS } from "@/lib/data";
import { Icon, type IconName } from "./icons";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: 15, y: 30 },
  show: { 
    opacity: 1, 
    scale: 1, 
    rotateX: 0,
    y: 0, 
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

export default function ValueProps() {
  return (
    <section className="value-props-magical-section" aria-label="Why Naija Families Trust Goodearth">
      <div className="container">
        <motion.div 
          className="section-head center vp-magical-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow center">Why Naija families trust Goodearth</span>
          <h2>Correct peppe, every single time</h2>
          <p className="lead-text">Quality you can see, smell and taste - at a price that works for every home.</p>
        </motion.div>
        
        <motion.div 
          className="vp-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          style={{ perspective: "1000px" }}
        >
          {VALUE_PROPS.map((v, index) => {
            const cardThemes = [
              "vp-card-chilli",
              "vp-card-farm",
              "vp-card-turmeric",
              "vp-card-earth",
            ];
            return (
              <motion.div 
                className={`vp-card ${cardThemes[index] || ""}`} 
                key={v.title}
                variants={cardVariants}
                whileHover={{ scale: 1.04, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="vp-icon">
                  <Icon name={v.icon as IconName} size={26} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
