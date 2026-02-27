"use client";

import { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../../../lib/api";
import ProductCard from "../products/ProductCard";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 8;

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
  const currentItems = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
    <section className="py-16">
      <div className="max-w-[1850px] mx-auto px-6">
        {/* Header Bar */}
        <div
          className="bg-[var(--component-bg)] 
                flex items-center justify-between 
                px-6 py-4 mb-12 
                shadow-md"
        >
          {/* LEFT ARROW */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`w-10 h-10 
                     flex items-center justify-center 
                     bg-[#EBE2DB] 
                     transition
                     ${currentPage === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#e2dbd3]"}`}
          >
            <FiChevronLeft size={20} />
          </button>

          {/* TITLE */}
          <h2 className="tracking-[0.3em] text-2xl font-semibold text-center">
            FEATURED PRODUCTS
          </h2>

          {/* RIGHT ARROW */}
          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            className={`w-10 h-10 
                     flex items-center justify-center  
                     bg-[#EBE2DB] 
                     transition
                     ${currentPage >= totalPages - 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#e2dbd3]"}`}
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-8">
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
        {/* Pagination Indicator */}
        {totalPages > 1 && (
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
