import Link from "next/link";

export default function HeroCollage() {
  return (
    <section className="w-full flex justify-center bg-[#EBE2DB]">

      <div className="w-full max-w-[1800px] aspect-[16/10]">

        <div className="grid grid-cols-2 h-full">

          {/* LEFT COLUMN */}
          <div className="grid grid-rows-2 h-full">

            <GridItem
              title="Rosary Jewelries"
              slug="rosary"
              image="https://res.cloudinary.com/dijssimbb/image/upload/v1771185622/lgi-home-img1_puenz4.png"
              desc="Gracefully crafted devotional pieces that blend spiritual meaning with timeless elegance and intricate detailing."
            />

            <div className="grid grid-cols-2 h-full">
              <GridItem
                title="PENDANTS"
                slug="pendants"
                image="https://res.cloudinary.com/dijssimbb/image/upload/v1771185617/lgi-home-img3_ym64ns.png"
                desc="Artfully crafted pendants that express personality, tradition, and contemporary style in every detail."
              />
              <GridItem
                title="BANGLES"
                slug="bangles"
                image="https://res.cloudinary.com/dijssimbb/image/upload/v1771185618/lgi-home-img4_glpaq3.png"
                desc="Beautifully sculpted bangles that celebrate heritage, craftsmanship, and everyday grace."
              />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="grid grid-rows-2 h-full">

            <GridItem
              title="SILVER CHAINS"
              slug="silver-chains"
              image="https://res.cloudinary.com/dijssimbb/image/upload/v1771185624/lgi-home-img2_xvfpda.png"
              desc="Delicately designed silver chains that add subtle sophistication and effortless charm to every look."
            />

            <div className="grid grid-rows-2 h-full">
              <GridItem
                title="WEDDING EARRINGS"
                slug="earrings"
                image="https://res.cloudinary.com/dijssimbb/image/upload/v1771260375/lgi-home-img6_bho4wn.png"
                desc="Exquisite earrings designed to enhance bridal radiance with sparkle, elegance, and unforgettable charm."
              />
              <GridItem
                title="BRASS BRACELETS"
                slug="bracelets"
                image="https://res.cloudinary.com/dijssimbb/image/upload/v1771185617/lgi-home-img5_mhmbyj.png"
                desc="Bold and beautifully finished brass bracelets that combine vintage character with modern design appeal."
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function GridItem({ title, slug, image, desc }) {
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

      <div className="absolute inset-0 bg-black/40 transition delay-50 hover:bg-black/10 flex flex-col justify-center items-center text-white text-center">

        <h2 className="text-[22px] font-medium tracking-wide">
          {title}
        </h2>

        {/* Slightly smaller subtext */}
        <h4 className="text-[10px] font-extralight w-[22rem]">
          {desc}
        </h4>

        <Link 
        href={`\products?category=${slug}`}
        className="mt-3 border border-white px-5 py-1 text-sm tracking-wide hover:bg-white hover:text-black transition">
          VIEW PRODUCTS
        </Link>

      </div>
    </div>
  );
}
