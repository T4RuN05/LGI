"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiBox } from "react-icons/fi";
import ProductsGrid from "./ProductsGrid";
import CategoryAccordion from "./CategoryAccordion";
import Link from "next/link";
import SearchBar from "../SearchBar";

export default function ProductsLayout({
  products = [],
  categories = [],
  selectedCategoryName,
  isAdmin = false,
  onDelete,
  onToggleFeatured,
  loading = false,
}) {
  const ITEMS_PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#EBE2DB] min-h-screen py-3">
      <div className="max-w-[1850px] mx-auto px-8">
        {/* HEADER STRIP (STICKY) */}
        <div className="sticky top-[80px] z-40 bg-[#F2F1EC]/75 backdrop-blur-lg flex items-center justify-between px-6 py-4 mb-12 shadow-lg border-y border-[#e3e1dc] relative rounded-md">
          {/* LEFT ARROW */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`w-10 h-10 flex items-center justify-center border border-[#d8d3cc] bg-[#EBE2DB] rounded-sm transition
              ${currentPage === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#e2dbd3]"}`}
          >
            <FiChevronLeft size={20} />
          </button>

          {/* TITLE */}
          <h2 className="tracking-[0.3em] text-2xl font-semibold text-center">
            {selectedCategoryName}
          </h2>

          {/* RIGHT ARROW */}
          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            className={`w-10 h-10 flex items-center justify-center border border-[#d8d3cc] bg-[#EBE2DB] rounded-sm transition
              ${currentPage >= totalPages - 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#e2dbd3]"}`}
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* FILTER ROW */}
        {isAdmin ? (
          <div className="flex items-center justify-between gap-8 mb-12">
            <div className="flex-1">
              <CategoryAccordion categories={categories} isAdmin={true} />
            </div>

            <div className="flex-1 flex justify-center">
              <Link
                href="/admin/products/create"
                className="bg-[#F2F1EC] flex items-center gap-3 px-10 py-4 shadow-md rounded-md border border-[#d8d3cc] tracking-widest text-sm hover:bg-black hover:text-white transition"
              >
                <FiBox size={18} />
                ADD PRODUCT
              </Link>
            </div>

            <div className="flex-1 flex justify-end">
              <div className="w-[320px]">
                <SearchBar isAdmin={true} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-12">
            <CategoryAccordion categories={categories} isAdmin={false} />
            <div className="w-[320px]">
              <SearchBar isAdmin={false} />
            </div>
          </div>
        )}

        {/* PRODUCTS GRID */}
        <ProductsGrid
          products={currentProducts}
          isAdmin={isAdmin}
          onDelete={onDelete}
          onToggleFeatured={onToggleFeatured}
          loading={loading}
        />

        {/* Pagination Indicator */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
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
