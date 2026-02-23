"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-[#F2F1EC] rounded-md shadow-md p-6 flex flex-col h-full">
      
      {/* IMAGE */}
      <div className="aspect-square mb-6 bg-white flex items-center justify-center overflow-hidden rounded-sm">
        <div className="w-3/4 h-3/4 rounded-md skeleton-shimmer" />
      </div>

      {/* TITLE */}
      <div className="h-4 rounded skeleton-shimmer w-4/5 mb-3" />
      <div className="h-4 rounded skeleton-shimmer w-3/5 mb-6" />

      {/* PRICE */}
      <div className="h-5 rounded skeleton-shimmer w-2/5 mb-3" />

      {/* MOQ */}
      <div className="h-3 rounded skeleton-shimmer w-3/5 mb-6" />

      {/* BUTTON */}
      <div className="mt-auto">
        <div className="h-11 rounded-sm skeleton-shimmer w-full" />
      </div>
    </div>
  );
}