"use client";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";

export default function ProductsGrid({
  products = [],
  isAdmin = false,
  onDelete,
  onToggleFeatured,
  loading = false,
}) {
  return (
    <div className="grid grid-cols-4 gap-12 auto-rows-fr">
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))
      ) : products.length === 0 ? (
        <p className="col-span-4 text-center">No products found.</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isAdmin={isAdmin}
            onDelete={onDelete}
            onToggleFeatured={onToggleFeatured}
          />
        ))
      )}
    </div>
  );
}