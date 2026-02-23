"use client";

import { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../../../lib/api";
import ProductCard from "../products/ProductCard";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
          {/* LEFT ARROW BOX */}
          <button
            className="w-10 h-10 
                     flex items-center justify-center 
                     bg-[#EBE2DB] 
                     hover:bg-[#e2dbd3] transition"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* TITLE */}
          <h2 className="tracking-[0.3em] text-2xl font-semibold text-center">
            FEATURED PRODUCTS
          </h2>

          {/* RIGHT ARROW BOX */}
          <button
            className="w-10 h-10 
                     flex items-center justify-center  
                     bg-[#EBE2DB] 
                     hover:bg-[#e2dbd3] transition"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.length === 0
              ? <p className="col-span-4 text-center">No featured products.</p>
              : products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
        </div>
      </div>
    </section>
  );
}