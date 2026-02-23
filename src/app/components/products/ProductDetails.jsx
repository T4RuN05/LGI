"use client";

import { useRef, useState } from "react";
import { FaWhatsapp, FaChevronUp, FaChevronDown } from "react-icons/fa";
import AuthModal from "@/app/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetails({ product }) {
  const attributesRef = useRef(null);
  const descriptionRef = useRef(null);
  const reviewsRef = useRef(null);
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const thumbnailsRef = useRef(null);
  const faqRef = useRef(null);
  const [showGallery, setShowGallery] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const activeImage = product?.images?.[currentIndex]?.url;

  const scrollToSection = (ref) => {
    if (!ref.current) return;

    const tabHeight = 95;
    const y =
      ref.current.getBoundingClientRect().top + window.pageYOffset - tabHeight;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const scrollThumbs = (direction) => {
    if (!thumbnailsRef.current) return;

    thumbnailsRef.current.scrollBy({
      top: direction === "up" ? -120 : 120,
      behavior: "smooth",
    });
  };

  const handlePrevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const minPrice = product?.priceRange?.min;
  const maxPrice = product?.priceRange?.max;

  const priceDisplay =
    minPrice !== maxPrice ? `$${minPrice}-${maxPrice}` : `$${minPrice}`;

  const handleChat = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${product._id}/whatsapp`,
      );

      const data = await res.json();

      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
      }
    } catch (error) {
      console.error("WhatsApp redirect failed:", error);
    }
  };

  return (
    <section className="bg-[#EBE2DB] min-h-screen py-3">
      <div className="max-w-[1850px] mx-auto px-8 flex gap-10">
        {/* LEFT CONTENT */}
        <div className="flex-1">
          {/* TOP PRODUCT SECTION */}
          <div className="bg-[#F2F1EC] p-8 shadow-md rounded-md flex gap-10">
            {/* IMAGES */}
            <div className="flex gap-6">
              {/* THUMBNAILS */}
              <div className="flex flex-col items-center">
                {/* UP ARROW */}
                <button
                  onClick={() => scrollThumbs("up")}
                  className="mb-2 p-2 bg-white rounded-full shadow hover:scale-105 transition"
                >
                  <FaChevronUp size={12} />
                </button>

                {/* THUMBNAIL LIST */}
                <div
                  ref={thumbnailsRef}
                  className="flex flex-col gap-3 max-h-[360px] overflow-hidden"
                >
                  {product.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      onMouseEnter={() => setCurrentIndex(index)}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-20 h-20 object-contain border rounded-md cursor-pointer transition hover:shadow-md ${
                        activeImage === img.url
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* DOWN ARROW */}
                <button
                  onClick={() => scrollThumbs("down")}
                  className="mt-2 p-2 bg-white rounded-full shadow hover:scale-105 transition"
                >
                  <FaChevronDown size={12} />
                </button>
              </div>

              {/* MAIN IMAGE */}
              <div className="relative w-[450px] h-[450px] bg-white rounded-lg flex items-center justify-center shadow-inner overflow-hidden group">
                {/* LEFT ARROW */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 z-10 bg-white/90 hover:bg-white 
               p-3 rounded-full shadow-md 
               opacity-0 group-hover:opacity-100 
               transition duration-300"
                >
                  <FaChevronUp className="-rotate-90" size={14} />
                </button>

                {/* IMAGE */}
                <img
                  src={activeImage}
                  onClick={() => setShowGallery(true)}
                  className="max-w-full max-h-full object-contain transition duration-500 hover:scale-105 cursor-zoom-in"
                />

                {/* RIGHT ARROW */}
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 z-10 bg-white/90 hover:bg-white 
               p-3 rounded-full shadow-md 
               opacity-0 group-hover:opacity-100 
               transition duration-300"
                >
                  <FaChevronDown className="rotate-270" size={14} />
                </button>
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="flex-1">
              <h1 className="text-xl font-semibold mb-4">{product.title}</h1>

              <p className="text-sm text-gray-600 mb-2">
                Minimum Order Quantity: {product.moq} {product.moqUnit}
              </p>

              <p className="text-2xl font-semibold mb-6">{priceDisplay}</p>

              <button
                onClick={handleChat}
                className="inline-flex items-center gap-2 
                  border border-black px-6 py-2
               hover:bg-black hover:text-white transition"
              >
                <FaWhatsapp />
                CHAT NOW
              </button>
            </div>
          </div>

          {/* TAB STRIP */}
          <div className="bg-[#F2F1EC] mt-8 shadow-md rounded-md sticky top-14 z-10">
            <div className="flex justify-center gap-16 py-4 text-lg">
              <button onClick={() => scrollToSection(attributesRef)}>
                Attributes
              </button>
              <button onClick={() => scrollToSection(descriptionRef)}>
                Description
              </button>
              <button onClick={() => scrollToSection(reviewsRef)}>
                Reviews
              </button>
              <button onClick={() => scrollToSection(faqRef)}>FAQ</button>
            </div>
          </div>

          {/* ===== ATTRIBUTES SECTION ===== */}
          <div
            ref={attributesRef}
            className="bg-[#F2F1EC] mt-6 shadow-md rounded-md p-8"
          >
            <div
              className="product-table overflow-x-auto
             [&_table]:w-full
             [&_table]:border-collapse
             [&_td]:p-3
             [&_td]:border
             [&_th]:p-3
             [&_th]:border
             [&_h2]:mt-8
             [&_h3]:mt-6
             [&_table]:mt-4
             [&_ul]:mt-4
             [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: product.attributes }}
            />
          </div>

          {/* DESCRIPTION */}
          <div
            ref={descriptionRef}
            className="bg-[#F2F1EC] mt-8 shadow-md rounded-md p-8"
          >
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.description || "<p>No description added.</p>",
              }}
            />
          </div>

          {/* FAQ */}
          <div
            ref={faqRef}
            className="bg-[#F2F1EC] mt-8 shadow-md rounded-md p-8"
          >
            <h2 className="text-lg font-semibold mb-4">FAQ</h2>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.faq || "<p>No FAQs added yet.</p>",
              }}
            />
          </div>

          {/* REVIEWS */}
          <div
            ref={reviewsRef}
            className="bg-[#F2F1EC] mt-8 shadow-md rounded-md p-8"
          >
            <h2 className="text-lg font-semibold mb-4">Reviews</h2>
            <p>No reviews yet.</p>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-[320px]">
          <div className="bg-[#F2F1EC] shadow-md rounded-md p-4">
            <h3 className="text-center font-semibold tracking-widest">
              OTHER RECOMMENDATION
            </h3>
          </div>
        </div>
      </div>
      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowGallery(false)}
          />

          {/* Modal Content */}
          <div className="relative w-[90%] max-w-[1200px] h-[85vh] bg-[#F2F1EC] rounded-lg flex items-center justify-center p-6">
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-black text-2xl"
            >
              ✕
            </button>

            {/* Left Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 bg-white/90 hover:bg-white p-4 rounded-full shadow"
            >
              <FaChevronUp className="-rotate-90" size={18} />
            </button>

            {/* Main Large Image */}
            <img
              src={activeImage}
              className="max-h-full max-w-full object-contain"
            />

            {/* Right Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 bg-white/90 hover:bg-white p-4 rounded-full shadow"
            >
              <FaChevronDown className="rotate-270" size={18} />
            </button>

            {/* Bottom Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-md">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-16 h-16 object-contain cursor-pointer border rounded-md ${
                    currentIndex === index ? "border-black" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </section>
  );
}
