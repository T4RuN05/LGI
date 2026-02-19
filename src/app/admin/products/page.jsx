"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductsLayout from "@/app/components/products/ProductsLayout";
import { useAuth } from "@/context/AuthContext";

export default function AdminProductsPage() {

  const { user } = useAuth();
  const searchParams = useSearchParams();

  const categorySlug = searchParams.get("category");
  const featured = searchParams.get("featured");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products?`;

    if (categorySlug) {
      url += `category=${categorySlug}&`;
    }

    if (featured) {
      url += `featured=true&`;
    }

    const productRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const productData = await productRes.json();
    setProducts(productData.products || []);

    const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
    const categoryData = await categoryRes.json();
    setCategories(categoryData || []);
  };

  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, [user, categorySlug, featured]);

  // 🔥 Dynamic Header Logic
  let selectedCategoryName = "ALL PRODUCTS";

  if (featured === "true") {
    selectedCategoryName = "FEATURED";
  } else if (categorySlug) {
    const matchedCategory = categories.find(
      (cat) => cat.slug === categorySlug
    );

    if (matchedCategory) {
      selectedCategoryName = matchedCategory.name.toUpperCase();
    }
  }

  const handleDelete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    fetchData();
  };

  const handleToggleFeatured = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}/toggle-featured`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    fetchData();
  };

  return (
    <ProductsLayout
      products={products}
      categories={categories}
      selectedCategoryName={selectedCategoryName}
      isAdmin={true}
      onDelete={handleDelete}
      onToggleFeatured={handleToggleFeatured}
    />
  );
}
