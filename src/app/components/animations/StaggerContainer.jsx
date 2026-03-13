"use client";

import { motion } from "framer-motion";

export default function StaggerContainer({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.18,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}