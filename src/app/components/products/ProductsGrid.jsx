"use client";

import ProductCard from "./ProductCard";

export default function ProductsGrid({
  products,
  isAdmin = false,
  onDelete,
  onToggleFeatured,
}) {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-12">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isAdmin={isAdmin}
          onDelete={onDelete}
          onToggleFeatured={onToggleFeatured}
        />
      ))}
    </div>
  );
}
