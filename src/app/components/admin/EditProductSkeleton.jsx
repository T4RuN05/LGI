"use client";

export default function EditProductSkeleton() {
  return (
    <section className="bg-[#EBE2DB] min-h-screen py-10">
      <div className="max-w-[1400px] mx-auto space-y-10">

        {/* TOP SECTION */}
        <div className="bg-[#F2F1EC] shadow-md p-8 rounded-md flex gap-10">

          {/* LEFT IMAGE SECTION */}
          <div className="flex gap-6 w-1/2">

            {/* THUMBNAILS */}
            <div className="flex flex-col items-center gap-3">
              {[1,2,3,4].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-md skeleton-shimmer"
                />
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1 h-[420px] bg-white rounded-lg shadow-inner flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-md skeleton-shimmer" />
            </div>

          </div>

          {/* RIGHT FORM SECTION */}
          <div className="w-1/2 space-y-5">

            {/* TITLE */}
            <div className="h-12 rounded skeleton-shimmer w-full" />

            {/* MOQ + UNIT */}
            <div className="flex gap-4">
              <div className="h-10 rounded skeleton-shimmer w-2/3" />
              <div className="h-10 rounded skeleton-shimmer w-1/3" />
            </div>

            {/* PRICE */}
            <div className="flex gap-4">
              <div className="h-10 rounded skeleton-shimmer w-1/2" />
              <div className="h-10 rounded skeleton-shimmer w-1/2" />
            </div>

            {/* CATEGORY */}
            <div className="h-12 rounded skeleton-shimmer w-full" />

          </div>
        </div>

        {/* EDITOR SECTION */}
        <div className="bg-[#F2F1EC] shadow-md p-6 rounded-md space-y-6">

          {/* TABS */}
          <div className="flex gap-12">
            {[1,2,3].map((i) => (
              <div
                key={i}
                className="h-6 w-28 rounded skeleton-shimmer"
              />
            ))}
          </div>

          {/* EDITOR AREA */}
          <div className="h-[260px] rounded skeleton-shimmer w-full" />

        </div>

        {/* BUTTON */}
        <div className="flex justify-end">
          <div className="h-12 w-52 rounded-sm skeleton-shimmer" />
        </div>

      </div>
    </section>
  );
}