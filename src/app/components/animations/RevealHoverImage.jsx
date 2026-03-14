"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export default function RevealHoverImage({
  src,
  hoverSrc,
  priority = false,
  className = "",
}) {

  // Preload hover image to prevent flicker
  useEffect(() => {
    if (!hoverSrc) return;

    const img = new window.Image();
    img.src = hoverSrc;
  }, [hoverSrc]);

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
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
        className={`object-cover ${className}`}
      />

      {/* HOVER IMAGE */}
      {hoverSrc && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={hoverSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
            className={`object-cover ${className}`}
          />
        </motion.div>
      )}
    </motion.div>
  );
}