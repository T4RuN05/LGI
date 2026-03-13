"use client";

import { motion } from "framer-motion";

export default function RevealHoverImage({ src, hoverSrc }) {
  return (
    <motion.div
      className="relative w-full h-full overflow-hidden transform-gpu"
      initial={{ filter: "grayscale(100%)", scale: 1.12 }}
      whileInView={{ filter: "grayscale(0%)", scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-120px" }}
    >
      
      {/* BASE IMAGE */}
      <img
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* HOVER IMAGE */}
      {hoverSrc && (
        <motion.img
          src={hoverSrc}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

    </motion.div>
  );
}