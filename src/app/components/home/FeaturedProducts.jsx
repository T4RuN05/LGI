"use client";

import { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../../../lib/api";
import ProductCard from "../products/ProductCard";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocale } from "@/context/LocaleContext";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useLocale();
  const ITEMS_PER_PAGE = 8;
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentItems = isMobile
    ? products.slice(0, visibleCount)
    : products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <section className="py-8 md:py-16">
      <div className="max-w-[1850px] mx-auto px-3 md:px-6">
        {/* Header Bar */}
        <div
          className="bg-[var(--component-bg)] 
  flex items-center justify-between 
  px-4 md:px-6 py-4 mb-12 
  shadow-md rounded-md"
        >
          {/* LEFT ARROW (desktop only) */}
          {!isMobile ? (
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`w-10 h-10 flex items-center justify-center bg-[#EBE2DB] transition
      ${currentPage === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#e2dbd3]"}`}
            >
              <FiChevronLeft size={20} />
            </button>
          ) : (
            <div className="w-10" /> // spacer to keep title centered
          )}

          {/* TITLE */}
          <h2 className="tracking-[0.25em] md:tracking-[0.3em] text-xs md:text-2xl font-semibold text-center flex-1">
            {t("featuredProducts")}
          </h2>

          {/* RIGHT ARROW (desktop only) */}
          {!isMobile ? (
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              className={`w-10 h-10 flex items-center justify-center bg-[#EBE2DB] transition
      ${currentPage >= totalPages - 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#e2dbd3]"}`}
            >
              <FiChevronRight size={20} />
            </button>
          ) : (
            <div className="w-10" /> // spacer
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : products.length === 0 ? (
            <p className="col-span-4 text-center">No featured products.</p>
          ) : (
            currentItems.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>

        {/* MOBILE VIEW MORE */}
        {isMobile && visibleCount < products.length && (
          <div className="relative mt-6">
            <button
              onClick={() =>
                setVisibleCount((prev) => Math.min(prev + 4, products.length))
              }
              className="mx-auto block mt-6 px-6 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition"
            >
              View More
            </button>
          </div>
        )}

        {/* Pagination Indicator */}
        {!isMobile && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-8 h-8 text-sm flex items-center justify-center border transition
          ${
            currentPage === index
              ? "bg-black text-white border-black"
              : "bg-[#EBE2DB] hover:bg-[#e2dbd3] border-gray-300"
          }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
