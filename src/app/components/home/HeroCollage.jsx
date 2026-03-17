"use client"

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export default function HeroCollage() {
  const { t } = useLocale();

  return (
    <section className="w-full flex justify-center bg-[#EBE2DB]">

      <div className="w-full max-w-[1800px] md:aspect-[16/10]">

        <div className="flex flex-col md:grid md:grid-cols-2 md:h-full">

          {/* LEFT COLUMN */}
          <div className="flex flex-col md:grid md:grid-rows-2">

            <GridItem
              title={t("rosary")}
              slug="rosary"
              image="https://res.cloudinary.com/dijssimbb/image/upload/f_auto,q_auto/v1771185622/lgi-home-img1_puenz4.png"
              desc={t("rosaryDesc")}
            />

            <div className="flex flex-col sm:grid sm:grid-cols-2 md:h-full">
              <GridItem
                title={t("pendant")}
                slug="pendants"
                image="https://res.cloudinary.com/dijssimbb/image/upload/f_auto,q_auto/v1771185617/lgi-home-img3_ym64ns.png"
                desc={t("pendantDesc")}
              />
              <GridItem
                title={t("bangles")}
                slug="bangles"
                image="https://res.cloudinary.com/dijssimbb/image/upload/f_auto,q_auto/v1771185618/lgi-home-img4_glpaq3.png"
                desc={t("BanglesDesc")}
              />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col md:grid md:grid-rows-2">

            <GridItem
              title={t("silverchain")}
              slug="silver-chains"
              image="https://res.cloudinary.com/dijssimbb/image/upload/f_auto,q_auto/v1771185624/lgi-home-img2_xvfpda.png"
              desc={t("silverchainDesc")}
            />

            <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-1 md:h-full">
              <GridItem
                title={t("weddingearring")}
                slug="earrings"
                image="https://res.cloudinary.com/dijssimbb/image/upload/f_auto,q_auto/v1771260375/lgi-home-img6_bho4wn.png"
                desc={t("weddingearringDesc")}
              />
              <GridItem
                title={t("brassbracelets")}
                slug="bracelets"
                image="https://res.cloudinary.com/dijssimbb/image/upload/f_auto,q_auto/v1771185617/lgi-home-img5_mhmbyj.png"
                desc={t("brassbraceletsDesc")}
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function GridItem({ title, slug, image, desc }) {
  const { t } = useLocale();
  return (
    <div className="relative w-full min-h-[220px] md:h-full overflow-hidden group">

      {/* Subtle zoom animation added */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover 
                   transition-transform duration-700 ease-out 
                   md:group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/40 transition delay-50 hover:bg-black/10 flex flex-col justify-center items-center text-white text-center">

        <h2 className="text-[18px] md:text-[22px] font-medium tracking-wide">
          {title}
        </h2>

        {/* Slightly smaller subtext */}
        <h4 className="text-[10px] md:text-[11px] font-extralight w-[80%] md:w-[22rem]">
          {desc}
        </h4>

        <Link 
        href={`\products?category=${slug}`}
        className="mt-3 border border-white px-5 py-1 text-sm tracking-wide hover:bg-white hover:text-black transition">
          {t("viewProducts")}
        </Link>

      </div>
    </div>
  );
}
