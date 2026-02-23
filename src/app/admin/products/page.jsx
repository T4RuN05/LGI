export const dynamic = "force-dynamic";

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductsLayout from "@/app/components/products/ProductsLayout";
import { useAuth } from "@/context/AuthContext";

export default function AdminProductsPage() {
  const { user, hydrated } = useAuth();   
  const searchParams = useSearchParams();

  const categorySlug = searchParams.get("category");
  const featured = searchParams.get("featured");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

const fetchData = async () => {
  try {
    setLoading(true);

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products?`;

    if (categorySlug) url += `category=${categorySlug}&`;
    if (featured) url += `featured=true&`;

    const productRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (!productRes.ok) {
      console.error("Product fetch failed:", productRes.status);
      setLoading(false);
      return;
    }

    const productData = await productRes.json();
    setProducts(productData.products || []);

    const categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
    );

    if (!categoryRes.ok) {
      console.error("Category fetch failed:", categoryRes.status);
      setLoading(false);
      return;
    }

    const categoryData = await categoryRes.json();
    setCategories(categoryData || []);

  } catch (error) {
    console.error("FETCH ERROR:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!hydrated) return;        // 👈 wait for auth hydration

    if (!user?.token) {
      setLoading(false);
      return;
    }

    fetchData();
  }, [hydrated, user?.token, categorySlug, featured]);

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
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}/toggle-featured`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

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
      loading={loading}
    />
  );
}