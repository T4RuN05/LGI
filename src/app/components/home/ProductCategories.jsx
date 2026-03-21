"use client";
import BlurReveal from "../animations/BlurReveal";
import RevealHoverImage from "../animations/RevealHoverImage";
import StaggerContainer from "../animations/StaggerContainer";
import { useLocale } from "@/context/LocaleContext";
import Link from "next/link";

export default function ProductCategories() {
  const { t } = useLocale();
  return (
    <section className="w-full py-10 flex justify-center">
      <div className="w-full max-w-[1850px] px-6">
        {/* HEADER */}
        <div className="w-full bg-[var(--component-bg)] rounded-md text-center py-4 text-sm md:text-2xl font-semibold tracking-widest mb-8 shadow">
          {t("productCategories")}
        </div>
        <StaggerContainer>
          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:h-[55vh] mb-10">
            {/* BANGLES BLOCK */}
            <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-[45%_55%] gap-3 md:h-full">
              {/* TOP IMAGE */}
              <div className="md:col-span-2 relative overflow-hidden rounded-md order-3 md:order-1 h-[300px] md:h-full">
                <RevealHoverImage
                  src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773406962/Untitled_design_51_pacvju.png"
                  hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773421350/Untitled_design_54_kyiok1.png"
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* TITLE + DESC CELL */}
              <div className="flex flex-col gap-3 order-1 md:order-2 md:grid md:grid-rows-2 md:h-full">
                <BlurReveal className="bg-[var(--component-bg)] light-select flex flex-col items-center justify-center shadow-md rounded-md p-6">
                  <h3 className="tracking-[3px] text-lg">{t("bangles")}</h3>
                  <Link href={`\products?category=gold-plated-bangles`} className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                     {t("viewProducts")}
                  </Link>
                </BlurReveal>
                <BlurReveal className="bg-[#3b2412] text-white light-select text-sm font-extralight p-4 flex items-center rounded-md">
                  {t("banglesLongDesc")}
                </BlurReveal>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative overflow-hidden rounded-md order-2 md:order-3 h-[300px] md:h-full">
                <RevealHoverImage
                  src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773406014/Hda8aad0a9c124fd3835e59517ee70f4aW_ermxbv.jpg"
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* BRIDAL BLOCK */}
            <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-[55%_45%] gap-3 md:h-full">
              {/* TOP IMAGE */}
              <div className="relative overflow-hidden rounded-md order-3 md:order-1 h-[300px] md:h-full w-full">
                <RevealHoverImage
                  src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773405876/Untitled_design_34_mqoubn.png"
                  hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773426857/Untitled_design_58_g2bgmf.png"
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* DESC + TITLE */}
              <div className="flex flex-col gap-3 order-1 md:order-2 md:grid md:grid-rows-2 md:h-full">
                <BlurReveal className="bg-[#3b2412] text-white light-select text-sm font-extralight p-4 flex items-center rounded-md">
                  {t("bridalDesc")}
                </BlurReveal>
                <BlurReveal className="bg-[#f3f1ee] flex flex-col items-center justify-center rounded-md p-6">
                  <h3 className="tracking-[3px] text-lg">{t("bridal")}</h3>
                  <Link href={`\products?category=bridal`} className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                    {t("viewProducts")}
                  </Link>
                </BlurReveal>
              </div>

              {/* BOTTOM IMAGE */}
              <div className="md:col-span-2 relative overflow-hidden rounded-md order-4 md:order-3 h-[300px] md:h-full">
                <RevealHoverImage
                  src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773407575/Untitled_design_52_stnvqw.png"
                  hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773426345/Untitled_design_55_etxihm.png"
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </StaggerContainer>

        {/* ROW 2 — CHAINS */}
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-[1fr_940px_1fr] items-center md:h-[45vh] mb-10 gap-4">
            {/* TITLE + DESC */}
            <div className="flex flex-col items-center justify-center order-1 md:order-2 col-span-2 md:col-span-1 gap-8 md:gap-0">
              <BlurReveal className="bg-[var(--component-bg)] w-full md:w-[420px] py-10 text-center shadow-md rounded-md">
                <h3 className="tracking-[3px] text-lg">{t("chains")}</h3>

                <Link href={`\products?category=silver-chains`} className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                  {t("viewProducts")}
                </Link>
              </BlurReveal>

              <BlurReveal className="bg-[#3b2412] text-white light-select text-sm p-6 mt-[-20px] md:mt-6 mx-3 text-center w-full md:w-[920px] rounded-md relative z-10">
                {t("chainsDesc")}
              </BlurReveal>
            </div>

            {/* LEFT IMAGE */}
            <div className="relative overflow-hidden rounded-md order-2 md:order-1 h-[440px] md:h-full">
              <RevealHoverImage
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773407909/Untitled_design_53_bml2dh.png"
                hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773426537/Untitled_design_57_fotae0.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative overflow-hidden rounded-md order-3 md:order-3 h-[440px] md:h-full">
              <RevealHoverImage
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773405883/Gemini_Generated_Image_ogsa6zogsa6zogsa_aygxqf.png"
                hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773427062/Untitled_design_60_hd7nnq.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </StaggerContainer>

        <StaggerContainer>
          {/* ROW 3 */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-end min-h-[30vh] mb-10 gap-6">
            <div className="flex flex-col h-full order-1 md:order-1 col-span-1">
              <BlurReveal className="bg-[var(--component-bg)] py-10 text-center shadow-md h-[220px] flex flex-col items-center justify-center rounded-md">
                <h3 className="tracking-widest text-lg">{t("rosary")}</h3>

                <Link href={`\products?category=rosary`} className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                  {t("viewProducts")}
                </Link>
              </BlurReveal>

              <BlurReveal className="bg-[#3b2412] text-white light-select text-sm p-5 mt-4 flex flex-col items-center justify-center h-[200px] rounded-md">
                {t("rosaryLongDesc")}
              </BlurReveal>
            </div>

            <div className="relative overflow-hidden rounded-md h-[260px] sm:h-[450px] md:h-full order-2 md:order-none">
              <RevealHoverImage
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773405876/Untitled_design_35_extrm8.png"
                hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773427210/Untitled_design_61_qxk4ys.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="relative overflow-hidden rounded-md h-[260px] sm:h-[450px] md:h-full order-3 md:order-none">
              <RevealHoverImage
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773405941/Untitled_design_36_guwvp5.png"
                hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773427454/Untitled_design_62_h2mmbt.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="relative overflow-hidden rounded-md h-[260px] sm:h-[450px] md:h-full order-4 md:order-none">
              <RevealHoverImage
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773405939/ChatGPT_Image_Mar_1_2026_06_33_02_PM_o8io17.png"
                hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773427556/Untitled_design_63_wqlqlt.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </StaggerContainer>

        <StaggerContainer>
          {/* ROW 4 */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-end min-h-[30vh] mb-10 gap-6">
            <div className="relative overflow-hidden rounded-md h-[260px] sm:h-[450px] md:h-full order-2 md:order-1">
              <RevealHoverImage
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773405948/Untitled_design_37_kqnk35.png"
                hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773426990/Untitled_design_59_okcmx2.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="relative overflow-hidden rounded-md h-[260px] sm:h-[450px] md:h-full order-3 md:order-1">
              <RevealHoverImage
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773405940/ChatGPT_Image_Mar_1_2026_06_47_49_PM_dphshz.png"
                hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773428846/Untitled_design_65_ex1osn.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="relative overflow-hidden rounded-md h-[260px] sm:h-[450px] md:h-full order-4 md:order-1">
              <RevealHoverImage
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773406851/Rectangle_125_wsqgve.png"
                hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773426471/Untitled_design_56_wfuhdw.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col h-full order-1 md:order-4">
              <BlurReveal className="bg-[var(--component-bg)] py-10 text-center shadow-md h-[220px] flex flex-col items-center justify-center rounded-md">
                <h3 className="tracking-widest text-lg">{t("earrings")}</h3>

                <Link href={`\products?category=basket-earrings`} className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                  {t("viewProducts")}
                </Link>
              </BlurReveal>

              <BlurReveal className="bg-[#3b2412] text-white light-select text-sm p-5 mt-4 flex flex-col items-center justify-center rounded-md">
                {t("earringsDescLong")}
              </BlurReveal>
            </div>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
