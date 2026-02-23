import {
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiBox,
  FiFilter,
} from "react-icons/fi";
import ProductsGrid from "./ProductsGrid";
import CategoryAccordion from "./CategoryAccordion";
import Link from "next/link";

export default function ProductsLayout({
  products = [],
  categories = [],
  selectedCategoryName,
  isAdmin = false,
  onDelete,
  onToggleFeatured,
  loading = false,
}) {
  return (
    <section className="bg-[#EBE2DB] min-h-screen py-3">
      <div className="max-w-[1850px] mx-auto px-8">
        {/* HEADER */}
        <div className="bg-[#F2F1EC] flex items-center justify-between px-6 py-4 mb-12 shadow-md rounded-md">
          <button className="w-10 h-10 flex items-center justify-center border border-[#d8d3cc] bg-[#EBE2DB] rounded-sm">
            <FiChevronLeft size={20} />
          </button>

          <h2 className="tracking-[0.3em] text-2xl font-semibold">
            {selectedCategoryName}
          </h2>

          <button className="w-10 h-10 flex items-center justify-center border border-[#d8d3cc] bg-[#EBE2DB] rounded-sm">
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* FILTER ROW */}
        {isAdmin ? (
          <div className="flex items-center justify-between gap-8 mb-12">
            {/* LEFT - CATEGORY */}
            <div className="flex-1">
              <CategoryAccordion categories={categories} isAdmin={true} />
            </div>

            {/* CENTER - ADD PRODUCT */}
            <div className="flex-1 flex justify-center">
              <Link
                href="/admin/products/create"
                className="bg-[#F2F1EC] 
                   flex items-center gap-3 
                   px-10 py-4 
                   shadow-md rounded-md 
                   border border-[#d8d3cc] 
                   tracking-widest text-sm
                   hover:bg-black hover:text-white transition"
              >
                <FiBox size={18} />
                ADD PRODUCT
              </Link>
            </div>

            {/* RIGHT - SEARCH + FILTER */}
            <div className="flex-1 flex justify-end">
              <div
                className="bg-[#F2F1EC] 
                      flex items-center gap-3 
                      px-6 py-4 
                      shadow-md rounded-md 
                      w-[360px]"
              >
                <FiSearch size={18} />

                <input
                  placeholder="Search among 100+ products"
                  className="bg-transparent outline-none text-sm w-full"
                />

                <FiFilter size={18} className="cursor-pointer" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-12">
            <CategoryAccordion categories={categories} isAdmin={false} />

            <div className="bg-[#F2F1EC] flex items-center gap-3 px-5 py-3 shadow-sm rounded-md w-[320px]">
              <FiSearch size={18} />
              <input
                placeholder="Search among 100+ products"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
          </div>
        )}

        {/* PRODUCT GRID */}
        <ProductsGrid
          products={products}
          isAdmin={isAdmin}
          onDelete={onDelete}
          onToggleFeatured={onToggleFeatured}
          loading={loading}
        />
      </div>
    </section>
  );
}
