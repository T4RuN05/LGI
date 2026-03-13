"use client";
import { motion } from "framer-motion";

export default function ProductCategories() {

  const reveal = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


  return (
    <section className="w-full py-10 flex justify-center">
      <div className="w-full max-w-[1850px] px-6">

        {/* HEADER */}
        <div className="w-full bg-[var(--component-bg)] text-center py-4 text-2xl font-semibold tracking-widest mb-8 shadow">
          PRODUCT CATEGORIES
        </div>

        {/* ROW 1 */}
        <div className="grid grid-cols-2 gap-8 h-[55vh] mb-10">

          {/* BANGLES BLOCK */}
          <div className="grid grid-cols-2 grid-rows-[45%_55%] gap-3">

            {/* TOP IMAGE */}
            <div className="col-span-2 relative overflow-hidden">
              <img
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773406962/Untitled_design_51_pacvju.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* TITLE + DESC CELL */}
            <div className="grid grid-rows-2">

              <div className="bg-[var(--component-bg)] flex flex-col items-center justify-center shadow-md">
                <h3 className="tracking-[3px] text-lg">BANGLES</h3>

                <button className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                  VIEW PRODUCTS
                </button>
              </div>

              <div className="bg-[#3b2412] text-white text-sm font-extralight p-4 flex items-center">
                Built to shine and crafted to last, each bangle in our collection is precision-engineered with premium 14k–18k gold finishes. These pieces offer a perfect balance of exceptional durability and high-luster elegance for any occasion.
              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773406014/Hda8aad0a9c124fd3835e59517ee70f4aW_ermxbv.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>


          {/* BRIDAL BLOCK */}
          <div className="grid grid-cols-2 grid-rows-[55%_45%] gap-3">

            {/* TOP IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773405876/Untitled_design_34_mqoubn.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* DESC + TITLE */}
            <div className="grid grid-rows-2 shadow-md">

              <div className="bg-[#3b2412] text-white text-sm font-extralight p-4 flex items-center">
                Our bridal collections are defined by a dedication to quality and design that has been our hallmark for over three decades. Discover exquisite, high-end jewelry crafted to provide a lifetime of radiance on your most unforgettable day.
              </div>

              <div className="bg-[#f3f1ee] flex flex-col items-center justify-center">
                <h3 className="tracking-[3px] text-lg">BRIDAL</h3>

                <button className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                  VIEW PRODUCTS
                </button>
              </div>

            </div>

            {/* BOTTOM IMAGE */}
            <div className="col-span-2 relative overflow-hidden">
              <img
                src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773407575/Untitled_design_52_stnvqw.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>
        </div>


        {/* ROW 2 — NECKLACES */}
        <div className="grid grid-cols-[1fr_940px_1fr] items-center h-[45vh] mb-10">

          <div className="relative overflow-hidden h-full">
            <img
              src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773407909/Untitled_design_53_bml2dh.png"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center justify-center">

            <div className="bg-[var(--component-bg)] w-[420px] py-10 text-center shadow-md">
              <h3 className="tracking-[3px] text-lg">NECKLACE</h3>

              <button className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                VIEW PRODUCTS
              </button>
            </div>

            <div className="bg-[#3b2412] text-white text-sm p-5 mt-6 mx-3 text-center w-[920px] h-[150px]">
              Explore our refined collection of necklaces, ranging from timeless classic links and heavy-duty chains to intricate modern designs crafted specifically for the global market. Each piece is precision-engineered in our advanced factory using high-purity 14k–18k gold finishes, ensuring a superior luster and exceptional durability that reflects over three decades of manufacturing mastery and our status as a leading exclusive supplier.
            </div>

          </div>

          <div className="relative overflow-hidden h-full">
            <img
              src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773405883/Gemini_Generated_Image_ogsa6zogsa6zogsa_aygxqf.png"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

        </div>


        {/* ROW 3 */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] items-end min-h-[30vh] mb-10 gap-6">

          <div className="flex flex-col h-full">

            <div className="bg-[var(--component-bg)] py-10 text-center shadow-md h-[220px] flex flex-col items-center justify-center">
              <h3 className="tracking-widest text-lg">ROSARIES</h3>

              <button className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                VIEW PRODUCTS
              </button>
            </div>

            <div className="bg-[#3b2412] text-white text-sm p-5 mt-4 flex flex-col items-center justify-center h-[200px]">
              Our master-crafted rosaries are designed for both devotion and beauty, featuring beautiful stones and detailed metalwork. This collection offers quality you can trust, providing a durable and elegant heirloom to be cherished for a lifetime.
            </div>

          </div>

          <div className="relative overflow-hidden h-full">
            <img src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773405876/Untitled_design_35_extrm8.png" className="absolute inset-0 w-full h-full object-cover"/>
          </div>

          <div className="relative overflow-hidden h-full">
            <img src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773405941/Untitled_design_36_guwvp5.png" className="absolute inset-0 w-full h-full object-cover"/>
          </div>

          <div className="relative overflow-hidden h-full">
            <img src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773405939/ChatGPT_Image_Mar_1_2026_06_33_02_PM_o8io17.png" className="absolute inset-0 w-full h-full object-cover"/>
          </div>

        </div>


        {/* ROW 4 */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] items-end min-h-[30vh] mb-10 gap-6">

          <div className="relative overflow-hidden h-full">
            <img src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773405948/Untitled_design_37_kqnk35.png" className="absolute inset-0 w-full h-full object-cover"/>
          </div>

          <div className="relative overflow-hidden h-full">
            <img src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773405940/ChatGPT_Image_Mar_1_2026_06_47_49_PM_dphshz.png" className="absolute inset-0 w-full h-full object-cover"/>
          </div>

          <div className="relative overflow-hidden h-full">
            <img src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1773406851/Rectangle_125_wsqgve.png" className="absolute inset-0 w-full h-full object-cover"/>
          </div>

          <div className="flex flex-col h-full">

            <div className="bg-[var(--component-bg)] py-10 text-center shadow-md h-[220px] flex flex-col items-center justify-center">
              <h3 className="tracking-widest text-lg">EARRINGS</h3>

              <button className="mt-3 border border-[#3b2412] px-5 py-1 text-sm tracking-wide hover:bg-[#3b2412] hover:text-white transition">
                VIEW PRODUCTS
              </button>
            </div>

            <div className="bg-[#3b2412] text-white text-sm p-5 mt-4 h-[200px] flex flex-col items-center justify-center">
              Discover an exquisite range of earrings, featuring everything from delicate everyday studs to ornate three-tone hoops and high-fashion statement drops. Each pair is meticulously crafted in our advanced facility with premium 14k–18k gold and silver-filled finishes, delivering a perfect blend of sophisticated style and the enduring quality that global markets have trusted for decades.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}