"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("loading");

    let interval;

    const handleLoad = () => {
      clearInterval(interval);

      setProgress(100);

      setTimeout(() => {
        document.documentElement.classList.remove("loading");
        setLoading(false);
      }, 700);
    };

    interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 6;

        if (next >= 92) return 92; // never exceed until load event
        return next;
      });
    }, 200);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
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
