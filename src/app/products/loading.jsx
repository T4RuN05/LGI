"use client";

import ProductCardSkeleton from "../components/ui/ProductCardSkeleton";

export default function Loading() {
  return (
    <section className="bg-[#EBE2DB] min-h-screen py-2 md:py-3">
      <div className="max-w-[1850px] mx-auto px-3 md:px-6">
        <div className="sticky top-[80px] z-40 bg-[#F2F1EC]/75 backdrop-blur-lg flex items-center justify-between px-4 md:px-6 py-4 mb-8 md:mb-12 shadow-lg border-y border-[#e3e1dc] rounded-md">
          <div className="w-10 h-10 bg-[#EBE2DB] rounded-sm" />
          <div className="h-5 w-40 md:w-64 rounded skeleton-shimmer" />
          <div className="w-10 h-10 bg-[#EBE2DB] rounded-sm" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-stretch md:items-center mb-8 md:mb-12">
          <div className="h-12 w-[260px] rounded skeleton-shimmer" />
          <div className="h-12 w-full md:w-[320px] rounded skeleton-shimmer" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8 auto-rows-fr">
          {Array.from({ length: 24 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
