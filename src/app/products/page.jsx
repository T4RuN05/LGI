import { fetchProducts, fetchCategories } from "@/lib/api";
import ProductsLayout from "../components/products/ProductsLayout";

export const metadata = {
  title: "Products",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;

  const categorySlug = params?.category;
  const search = params?.search;
  const page = Math.max(parseInt(params?.page, 10) || 1, 1);
  const limit = 24;

  const productResponse = await fetchProducts(categorySlug, search, page, limit);
  const categories = await fetchCategories();

  // Find selected category name
  const selectedCategory = categories.find(
    (cat) => cat.slug === categorySlug
  );

  return (
    <ProductsLayout
      products={productResponse.products || []}
      categories={categories}
      selectedCategoryName={selectedCategory?.name || "ALL PRODUCTS"}
      totalPages={productResponse.totalPages || 1}
      currentPage={productResponse.page || page}
      isServerPaginated={true}
    />
  );
}
