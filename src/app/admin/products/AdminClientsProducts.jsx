"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductsLayout from "@/app/components/products/ProductsLayout";
import { useAuth } from "@/context/AuthContext";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const categorySlug = searchParams.get("category");
  const { user, hydrated } = useAuth();
  const featured = searchParams.get("featured");
  const search = searchParams.get("search");

  const fetchData = async () => {
    try {
      setLoading(true);

      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products?`;

      if (categorySlug) url += `category=${categorySlug}&`;
      if (featured) url += `featured=true&`;
      if (search) url += `search=${search}&`;

      const productRes = await fetch(url, {
        credentials: "include",
      });

      if (!productRes.ok) {
        console.error("Product fetch failed:", productRes.status);
        setLoading(false);
        return;
      }

      const productData = await productRes.json();
      setProducts(productData.products || []);

      const categoryRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
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
    if (!hydrated) return;
    fetchData();
  }, [hydrated, categorySlug, featured, search]);

  let selectedCategoryName = "ALL PRODUCTS";

  if (featured === "true") {
    selectedCategoryName = "FEATURED";
  } else if (categorySlug) {
    const matchedCategory = categories.find((cat) => cat.slug === categorySlug);

    if (matchedCategory) {
      selectedCategoryName = matchedCategory.name.toUpperCase();
    }
  }

  const handleDelete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    fetchData();
  };

  const handleToggleFeatured = async (id) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}/toggle-featured`,
      {
        method: "PATCH",
        credentials: "include",
      },
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
