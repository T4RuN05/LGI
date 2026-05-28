"use client";

export default function ProductDetailLoading() {
  return (
    <section className="bg-[#EBE2DB] min-h-screen py-3">
      <div className="max-w-[1850px] mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-6 md:gap-10">
        {/* LEFT CONTENT */}
        <div className="flex-1">
          {/* TOP PRODUCT SECTION */}
          <div className="bg-[#F2F1EC] p-4 md:p-8 shadow-md rounded-md flex flex-col md:flex-row gap-6 md:gap-10">
            {/* IMAGES */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
              {/* THUMBNAILS */}
              <div className="hidden md:flex flex-col items-center gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-md skeleton-shimmer"
                  />
                ))}
              </div>

              {/* MAIN IMAGE */}
              <div className="w-full md:w-[450px] md:min-w-[450px] aspect-square bg-white rounded-lg shadow-inner flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-md skeleton-shimmer" />
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Title */}
              <div className="h-6 w-4/5 rounded skeleton-shimmer" />
              <div className="h-6 w-3/5 rounded skeleton-shimmer" />

              {/* MOQ */}
              <div className="h-4 w-2/5 rounded skeleton-shimmer" />

              {/* Price */}
              <div className="h-8 w-1/3 rounded skeleton-shimmer" />

              {/* Button */}
              <div className="h-11 w-48 rounded skeleton-shimmer" />
            </div>
          </div>

          {/* MOBILE RECOMMENDATIONS TAB HEADER */}
          <div className="mt-5 md:hidden bg-[#F2F1EC] shadow-md rounded-md py-3">
            <div className="h-5 w-48 mx-auto rounded skeleton-shimmer" />
          </div>

          {/* TAB STRIP */}
          <div className="bg-[#F2F1EC] mt-8 shadow-md backdrop-blur-md rounded-md sticky top-18 z-20">
            <div className="flex justify-center gap-6 md:gap-16 py-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-20 md:w-24 rounded skeleton-shimmer"
                />
              ))}
            </div>
          </div>

          {/* ATTRIBUTES SECTION */}
          <div className="bg-[#F2F1EC] mt-6 shadow-md rounded-md p-4 md:p-8">
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-4 w-1/4 rounded skeleton-shimmer" />
                  <div className="h-4 w-2/4 rounded skeleton-shimmer" />
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION SECTION */}
          <div className="bg-[#F2F1EC] mt-8 shadow-md rounded-md p-4 md:p-8">
            <div className="space-y-3">
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-4 w-5/6 rounded skeleton-shimmer" />
              <div className="h-4 w-4/6 rounded skeleton-shimmer" />
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-4 w-3/5 rounded skeleton-shimmer" />
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="bg-[#F2F1EC] mt-8 shadow-md rounded-md p-4 md:p-8">
            <div className="h-6 w-16 rounded skeleton-shimmer mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-4 w-4/5 rounded skeleton-shimmer" />
              <div className="h-4 w-3/5 rounded skeleton-shimmer" />
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="bg-[#F2F1EC] mt-8 shadow-md rounded-md p-4 md:p-8">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center mb-8 pb-6 border-b border-[#e0dbd4]">
              <div className="flex flex-col items-center sm:items-start gap-2">
                <div className="h-10 w-14 rounded skeleton-shimmer" />
                <div className="h-4 w-24 rounded skeleton-shimmer" />
                <div className="h-3 w-16 rounded skeleton-shimmer" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded skeleton-shimmer" />
                    <div className="flex-1 h-2 rounded-full skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>

            {/* Review cards skeleton */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="mb-6 pb-6 border-b border-[#e6e1da] last:border-0"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full skeleton-shimmer" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-4 w-28 rounded skeleton-shimmer" />
                    <div className="h-3 w-20 rounded skeleton-shimmer" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded skeleton-shimmer" />
                  <div className="h-3 w-4/5 rounded skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR - RELATED PRODUCTS */}
        <div className="hidden md:block w-[280px] flex-shrink-0">
          <div className="bg-[#F2F1EC] shadow-md rounded-md py-3 mb-4">
            <div className="h-5 w-48 mx-auto rounded skeleton-shimmer" />
          </div>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#F2F1EC] rounded-md shadow-md p-4 flex flex-col"
              >
                <div className="aspect-square mb-4 bg-white flex items-center justify-center rounded-sm">
                  <div className="w-3/4 h-3/4 rounded-md skeleton-shimmer" />
                </div>
                <div className="h-3 w-4/5 rounded skeleton-shimmer mb-2" />
                <div className="h-4 w-2/5 rounded skeleton-shimmer mb-2" />
                <div className="h-8 w-full rounded-sm skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
