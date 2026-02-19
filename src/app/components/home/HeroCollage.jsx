export default function HeroCollage() {
  return (
    <section className="w-full flex justify-center bg-[#EBE2DB]">

      <div className="w-full max-w-[1800px] aspect-[16/10]">

        <div className="grid grid-cols-2 h-full">

          {/* LEFT COLUMN */}
          <div className="grid grid-rows-2 h-full">

            <GridItem
              title="Rosary Jewelries"
              image="https://res.cloudinary.com/dijssimbb/image/upload/v1771185622/lgi-home-img1_puenz4.png"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
            />

            <div className="grid grid-cols-2 h-full">
              <GridItem
                title="PENDANTS"
                image="https://res.cloudinary.com/dijssimbb/image/upload/v1771185617/lgi-home-img3_ym64ns.png"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <GridItem
                title="BANGLES"
                image="https://res.cloudinary.com/dijssimbb/image/upload/v1771185618/lgi-home-img4_glpaq3.png"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="grid grid-rows-2 h-full">

            <GridItem
              title="SILVER CHAINS"
              image="https://res.cloudinary.com/dijssimbb/image/upload/v1771185624/lgi-home-img2_xvfpda.png"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
            />

            <div className="grid grid-rows-2 h-full">
              <GridItem
                title="WEDDING EARRINGS"
                image="https://res.cloudinary.com/dijssimbb/image/upload/v1771260375/lgi-home-img6_bho4wn.png"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <GridItem
                title="BRASS BRACELETS"
                image="https://res.cloudinary.com/dijssimbb/image/upload/v1771185617/lgi-home-img5_mhmbyj.png"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function GridItem({ title, image, desc }) {
  return (
    <div className="relative w-full h-full overflow-hidden group">

      {/* Subtle zoom animation added */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover 
                   transition-transform duration-700 ease-out 
                   group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center">

        <h2 className="text-[22px] font-medium tracking-wide">
          {title}
        </h2>

        {/* Slightly smaller subtext */}
        <h4 className="text-[9px] font-extralight w-[25rem]">
          {desc}
        </h4>

        <button className="mt-3 border border-white px-5 py-1 text-sm tracking-wide hover:bg-white hover:text-black transition">
          VIEW PRODUCTS
        </button>

      </div>
    </div>
  );
}
