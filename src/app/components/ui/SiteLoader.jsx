"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { preloadImages } from "@/utils/preloadImages";

export default function SiteLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("loading");

    let interval;

    const startFakeProgress = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 6;
          return next >= 92 ? 92 : next;
        });
      }, 200);
    };

    const loadEverything = async () => {
      startFakeProgress();

      await preloadImages([
        "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1774034517/Untitled_design_68_qcdbxc.png",
        "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1774032682/Untitled_design_66_kb0txv.png",
        "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1774032792/Untitled_design_67_x9pivj.png",
        "https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1774091919/Untitled_design_69_ohrfwq.png",
      ]);

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        document.documentElement.classList.remove("loading");
        setLoading(false);
      }, 700);
    };

    loadEverything();

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={`site-loader fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#EBE2DB] ${
            loading ? "pointer-events-auto" : "pointer-events-none"
          }`}
          initial={{ y: 0, scale: 1 }}
          animate={{ y: 0 }}
          exit={{ y: "-110%", scale: 0.98 }}
          transition={{
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Ganesha Idol */}
          <motion.img
            src="/Lord Ganesha.png"
            className="w-[150px] mb-12"
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "easeInOut",
            }}
          />

          {/* Progress Bar */}
          <div className="w-[260px] h-[2px] bg-black/20 overflow-hidden rounded">
            <motion.div
              className="h-full bg-black"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.4 }}
            />
          </div>

          {/* Luxury curved reveal */}
          <div className="absolute bottom-0 left-1/2 w-[140%] -translate-x-1/2 pointer-events-none">
            <svg
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              className="w-full h-[120px]"
            >
              <path
                d="M0,80 C360,140 1080,0 1440,80 L1440,120 L0,120 Z"
                fill="#EBE2DB"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
