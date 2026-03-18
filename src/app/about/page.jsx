"use client";

import WorldShippingMap from "../components/ui/WorldShippingMap";
import { motion } from "framer-motion";
import CountrySlider from "../components/ui/CountrySlider";
import { useLocale } from "@/context/LocaleContext";

export default function AboutPage() {
  const revealVariant = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const { t } = useLocale();
  return (
    <>
      <section className="bg-[#EBE2DB] min-h-screen py-3 px-6">
        <div className="max-w-[1800px] mx-auto space-y-12">
          {/* ===== TITLE STRIP ===== */}
          <div
            className="bg-[var(--component-bg)]
             flex items-center justify-center
             px-6 py-4 mb-8
             shadow-md"
          >
            <h2 className="tracking-[0.25em] md:tracking-[0.3em] text-sm md:text-2xl font-semibold text-center">
              {t("about")}
            </h2>
          </div>

          {/* ===== MAIN CONTENT CARD ===== */}
          <div className="bg-[#F2F1EC] shadow-md rounded-md px-6 md:px-20 py-10 md:py-16 mb-8 flex flex-col md:flex-row items-center gap-10 md:gap-24">
            {/* LEFT IMAGE */}
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              variants={revealVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1772379811/Untitled_design_39_amblox.png"
                alt="Lord Ganesha"
                className="max-h-[280px] md:max-h-[450px] object-contain"
              />
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              className="w-full md:w-1/2 md:pr-10 text-[#2D2319]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {/* LOGO */}
              <motion.img
                src="https://res.cloudinary.com/dijssimbb/image/upload/v1771186076/LGI_1_awfgfe.png"
                alt="Lord Ganesha Impex"
                className="h-28 mb-8 mx-auto md:mx-0"
                variants={revealVariant}
              />

              {/* PARAGRAPHS */}
              <motion.p
                variants={revealVariant}
                className="mb-6 leading-relaxed font-light"
              >
                {t("aboutp1")}
              </motion.p>

              <motion.p
                variants={revealVariant}
                className="mb-6 leading-relaxed font-light"
              >
                <span className="font-semibold">Lord Ganesha Impex </span>
                {t("aboutp2")}
              </motion.p>

              <motion.p
                variants={revealVariant}
                className="leading-relaxed font-light"
              >
                {t("aboutp3")}
              </motion.p>
            </motion.div>
          </div>
          {/* ================= INTERNATIONAL STRIP ================= */}
          <motion.div
            className="bg-[var(--component-bg)]
            flex items-center justify-center
            px-6 py-4 mb-8 shadow-md"
            variants={revealVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="tracking-[0.25em] md:tracking-[0.3em] text-sm md:text-2xl font-semibold text-center">
              {t("countriesWeShip")}
            </h2>
          </motion.div>
          <motion.div
            className="bg-[#F2F1EC] shadow-md rounded-md p-12 overflow-hidden"
            variants={revealVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="h-[300px] md:h-[700px] flex items-center justify-center">
              <WorldShippingMap />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="py-8 md:py-12">
        <CountrySlider />
      </div>
    </>
  );
}
