"use client";

import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiBox } from "react-icons/fi";
import ProductsGrid from "./ProductsGrid";
import CategoryAccordion from "./CategoryAccordion";
import Link from "next/link";
import SearchBar from "../SearchBar";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsLayout({
  products = [],
  categories = [],
  selectedCategoryName,
  isAdmin = false,
  onDelete,
  onToggleFeatured,
  loading = false,
  totalPages,
  currentPage,
  isServerPaginated = false,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const observerRef = useRef(null);
  const loaderRef = useRef(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setVisibleCount(8);
    setLoadingMore(false);
  }, [products.length]);

  useEffect(() => {
    if (!isMobile) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMore) {
        setLoadingMore(true);

        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 8, products.length));
          setLoadingMore(false);
        }, 300);
      }
    });

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [isMobile, products.length]);

  const ITEMS_PER_PAGE = 24;
  const [localPage, setLocalPage] = useState(0);

  const resolvedTotalPages = isServerPaginated
    ? totalPages || 1
    : Math.ceil(products.length / ITEMS_PER_PAGE) || 1;

  const resolvedCurrentPage = isServerPaginated
    ? currentPage || 1
    : localPage + 1;

  const startIndex = localPage * ITEMS_PER_PAGE;
  const currentProducts = isMobile
    ? products.slice(0, visibleCount)
    : isServerPaginated
      ? products
      : products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const buildPageUrl = (pageNumber) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNumber));
    return `/products?${params.toString()}`;
  };

  const handlePrev = () => {
    if (resolvedCurrentPage > 1) {
      if (isServerPaginated) {
        router.push(buildPageUrl(resolvedCurrentPage - 1));
      } else {
        setLocalPage((prev) => prev - 1);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (resolvedCurrentPage < resolvedTotalPages) {
      if (isServerPaginated) {
        router.push(buildPageUrl(resolvedCurrentPage + 1));
      } else {
        setLocalPage((prev) => prev + 1);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#EBE2DB] min-h-screen py-2 md:py-3">
      <div className="max-w-[1850px] mx-auto px-3 md:px-6">
        {/* HEADER STRIP (STICKY) */}
        <div className="sticky top-[80px] z-40 bg-[#F2F1EC]/75 backdrop-blur-lg flex items-center justify-between px-4 md:px-6 py-4 mb-8 md:mb-12 shadow-lg border-y border-[#e3e1dc] rounded-md">
          {/* LEFT */}
          {!isMobile ? (
            <button
              onClick={handlePrev}
              disabled={resolvedCurrentPage === 1}
              className={`w-10 h-10 flex items-center justify-center border border-[#d8d3cc] bg-[#EBE2DB] rounded-sm transition
              ${resolvedCurrentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#e2dbd3]"}`}
            >
              <FiChevronLeft size={20} />
            </button>
          ) : (
            <div className="w-10" />
          )}

          {/* TITLE */}
          <h2 className="tracking-[0.25em] md:tracking-[0.3em] text-sm md:text-2xl font-semibold text-center flex-1">
            {selectedCategoryName}
          </h2>

          {/* RIGHT */}
          {!isMobile ? (
            <button
              onClick={handleNext}
              disabled={resolvedCurrentPage >= resolvedTotalPages}
              className={`w-10 h-10 flex items-center justify-center border border-[#d8d3cc] bg-[#EBE2DB] rounded-sm transition
      ${resolvedCurrentPage >= resolvedTotalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-[#e2dbd3]"}`}
            >
              <FiChevronRight size={20} />
            </button>
          ) : (
            <div className="w-10" />
          )}
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
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-stretch md:items-center mb-8 md:mb-12">
            <CategoryAccordion categories={categories} isAdmin={false} />
            <div className="w-full md:w-[320px]">
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

        {isMobile && visibleCount < products.length && (
          <div ref={loaderRef} className="grid grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Pagination Indicator */}
        {!isMobile && resolvedTotalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            {Array.from({ length: resolvedTotalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isServerPaginated) {
                    router.push(buildPageUrl(index + 1));
                  } else {
                    setLocalPage(index);
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-8 h-8 text-sm flex items-center justify-center border transition
          ${
            resolvedCurrentPage === index + 1
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
