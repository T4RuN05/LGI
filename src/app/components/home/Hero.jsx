"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { motion, AnimatePresence } from "framer-motion";

const textVariants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(6px)",
    transition: {
      duration: 0.5,
    },
  },
};

const slides = [
  {
    img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1774034517/Untitled_design_68_qcdbxc.png",
    titleKey: "heroTitle2",
    subtitleKey: "heroSubtitle2",
    fit: "cover",
  },
  {
    img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1774032682/Untitled_design_66_kb0txv.png",
    titleKey: "heroTitle1",
    subtitleKey: "heroSubtitle1",
    fit: "cover",
  },
  {
    img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1774032792/Untitled_design_67_x9pivj.png",
    titleKey: "heroTitle1",
    subtitleKey: "heroSubtitle1",
    scale: "scale-100",
    position: "object-[30%_center]",
  },
  {
    img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1774091919/Untitled_design_69_ohrfwq.png",
    titleKey: "heroTitle1",
    subtitleKey: "heroSubtitle1",
    scale: "scale-125",
    position: "object-[35%_center]",
  },
];

export default function HeroSection() {
  const { t } = useLocale();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-120px)] overflow-hidden">
      {/* IMAGES */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.img}
          alt="Hero"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          } ${slide.scale || ""} ${slide.position || "object-center"}`}
        />
      ))}

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

      {/* TEXT */}
      <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 w-full text-center text-white z-20 px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.h1
              className="text-xl md:text-4xl font-semibold tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t(slides[current].titleKey)}
            </motion.h1>

            <motion.p
              className="text-xs md:text-base mt-3 opacity-90 max-w-2xl md:max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              {t(slides[current].subtitleKey)}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
