"use client";

export default function CountrySlider() {
  const countries = [
    {
      name: "United States Of America",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772435021/image_14_3_fwm9hl.png",
    },
    {
      name: "United Arab Emirates",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772435025/image_14_2_gjsutl.png",
    },
    {
      name: "Spain",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772435017/image_14_5_aai8ob.png",
    },
    {
      name: "France",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772435019/image_14_4_yubxrs.png",
    },
    {
      name: "Germany",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772436280/msid-111576967_width-96_height-65_d1bved.avif",
    },
    {
      name: "Italy",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772436401/MCE-26334-DEST-Italy-Main_Venice-Grand-Canal-at-Night_in87z5.webp",
    },
    {
      name: "United Kingdom",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772436463/image_processing20220410-4-6xqoix_xbluu4.jpg",
    },
    {
      name: "Canada",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772436253/m_Toronto_destination_main_1_l_572_1000_s7vz9u.webp",
    },
    {
      name: "Saudi Arabia",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772436719/122748606_1_ffd6rw.avif",
    },
    {
      name: "Qatar",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772436645/b3f7cfde-2031-4df4-8afc-4db6d101ae6b_frwnga.webp",
    },
    {
      name: "Kuwait",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772436307/Kuwait_City_Skyline_1_alrkbi.jpg",
    },
    {
      name: "Bahrain",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772436616/bahrain-harbour_cuemrk.jpg",
    },
    {
      name: "Oman",
      img: "https://res.cloudinary.com/dc2qtmg05/image/upload/v1772436432/anfal-shamsudeen-du1iIMhW5Eg-unsplash-HEADER-MOBILE_rrift8.webp",
    },
  ];

  const duplicated = [...countries, ...countries];

  return (
    <div className="relative max-w-[1800px] mx-auto overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-[#EBE2DB] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#EBE2DB] to-transparent z-10 pointer-events-none" />

      <div className="marquee flex gap-12 py-10">
        {duplicated.map((country, index) => (
          <div
            key={index}
            className="w-[260px] md:w-[520px] h-[180px] md:h-[340px] flex-shrink-0 relative rounded-md overflow-hidden shadow-xl"
          >
            <img
              src={country.img}
              alt={country.name}
              className="w-full h-full object-cover"
            />

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-[#F2F1EC] via-[#F2F1EC]/90 to-transparent" />

            <p className="absolute bottom-2 md:bottom-8 left-1/2 -translate-x-1/2 text-[14px] md:text-[20px] font-medium text-black tracking-wide">
              {country.name}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee {
          width: max-content;
          animation: scroll 40s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
