"use client";
import BlurReveal from "../animations/BlurReveal";
import RevealHoverImage from "../animations/RevealHoverImage";
import StaggerContainer from "../animations/StaggerContainer";

export default function ProductCategories() {
  return (
    <section className="w-full py-10 flex justify-center">
      <div className="w-full max-w-[1850px] px-6">
        {/* HEADER */}
        <div className="w-full bg-[var(--component-bg)] rounded-md text-center py-4 text-2xl font-semibold tracking-widest mb-8 shadow">
          PRODUCT CATEGORIES
        </div>
        <StaggerContainer>
          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:h-[55vh] mb-10">
            {/* BANGLES BLOCK */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[45%_55%] gap-3 md:h-full sm:grid-cols-2 sm:auto-rows-auto">
              {/* TOP IMAGE */}
              <div className="col-span-2 md:col-span-2 relative overflow-hidden rounded-md order-3 md:order-1 h-[300px] md:h-full">
                <RevealHoverImage
                  src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773406962/Untitled_design_51_pacvju.png"
                  hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773421350/Untitled_design_54_kyiok1.png"
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* TITLE + DESC CELL */}
              <div className="grid grid-rows-2 order-1 md:order-2 col-span-1">
                <BlurReveal className="bg-[var(--component-bg)] flex flex-col items-center justify-center shadow-md rounded-md p-6">
                  <h3 className="tracking-[3px] text-lg">BANGLES</h3>

                  <button className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                    VIEW PRODUCTS
                  </button>
                </BlurReveal>

                <BlurReveal className="bg-[#3b2412] text-white text-sm font-extralight p-4 flex items-center rounded-md">
                  Built to shine and crafted to last, each bangle in our
                  collection is precision-engineered with premium 14k–18k gold
                  finishes. These pieces offer a perfect balance of exceptional
                  durability and high-luster elegance for any occasion.
                </BlurReveal>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative overflow-hidden rounded-md order-2 md:order-3 h-[300px] md:h-full col-span-1">
                <RevealHoverImage
                  src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773406014/Hda8aad0a9c124fd3835e59517ee70f4aW_ermxbv.jpg"
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* BRIDAL BLOCK */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[55%_45%] gap-3 md:h-full">
              {/* TOP IMAGE */}
              <div className="relative overflow-hidden rounded-md order-3 md:order-1 min-h-[300px] md:h-full w-full">
                <RevealHoverImage
                  src="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773405876/Untitled_design_34_mqoubn.png"
                  hoverSrc="https://res.cloudinary.com/dc2qtmg05/image/upload/f_auto,q_auto/v1773426857/Untitled_design_58_g2bgmf.png"
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* DESC + TITLE */}
              <div className="grid grid-rows-2 shadow-md order-1 md:order-2">
                <BlurReveal className="bg-[#3b2412] text-white text-sm font-extralight p-4 flex items-center rounded-md">
                  Our bridal collections are defined by a dedication to quality
                  and design that has been our hallmark for over three decades.
                  Discover exquisite, high-end jewelry crafted to provide a
                  lifetime of radiance on your most unforgettable day.
                </BlurReveal>

                <BlurReveal className="bg-[#f3f1ee] flex flex-col items-center justify-center rounded-md p-6">
                  <h3 className="tracking-[3px] text-lg">BRIDAL</h3>

                  <button className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                    VIEW PRODUCTS
                  </button>
                </BlurReveal>
              </div>

              {/* BOTTOM IMAGE */}
              <div className="col-span-2 relative overflow-hidden rounded-md order-4 md:order-3 h-[300px] md:h-full">
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
            <div className="flex flex-col items-center justify-center order-1 md:order-2 col-span-2 md:col-span-1">
              <BlurReveal className="bg-[var(--component-bg)] w-full md:w-[420px] py-10 text-center shadow-md rounded-md">
                <h3 className="tracking-[3px] text-lg">CHAINS</h3>

                <button className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                  VIEW PRODUCTS
                </button>
              </BlurReveal>

              <BlurReveal className="bg-[#3b2412] text-white text-sm p-6 mt-[-20px] md:mt-6 mx-3 text-center w-full md:w-[920px] rounded-md relative z-10">
                Explore our refined collection of necklaces, ranging from
                timeless classic links and heavy-duty chains to intricate modern
                designs crafted specifically for the global market. Each piece
                is precision-engineered in our advanced factory using
                high-purity 14k–18k gold finishes, ensuring a superior luster
                and exceptional durability that reflects over three decades of
                manufacturing mastery.
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
                <h3 className="tracking-widest text-lg">ROSARIES</h3>

                <button className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                  VIEW PRODUCTS
                </button>
              </BlurReveal>

              <BlurReveal className="bg-[#3b2412] text-white text-sm p-5 mt-4 flex flex-col items-center justify-center h-[200px] rounded-md">
                Our master-crafted rosaries are designed for both devotion and
                beauty, featuring beautiful stones and detailed metalwork. This
                collection offers quality you can trust, providing a durable and
                elegant heirloom to be cherished for a lifetime.
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
                <h3 className="tracking-widest text-lg">EARRINGS</h3>

                <button className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                  VIEW PRODUCTS
                </button>
              </BlurReveal>

              <BlurReveal className="bg-[#3b2412] text-white text-sm p-5 mt-4 h-[200px] flex flex-col items-center justify-center rounded-md">
                Discover an exquisite range of earrings, featuring everything
                from delicate everyday studs to ornate three-tone hoops and
                high-fashion statement drops. Each pair is meticulously crafted
                in our advanced facility with premium 14k–18k gold and
                silver-filled finishes, delivering a perfect blend of
                sophisticated style and the enduring quality that global markets
                have trusted for decades.
              </BlurReveal>
            </div>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
