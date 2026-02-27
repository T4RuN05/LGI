import { fetchProducts, fetchCategories } from "@/lib/api";
import ProductsLayout from "../components/products/ProductsLayout";

export default async function ProductsPage({ searchParams }) {
const params = await searchParams;

const categorySlug = params?.category;
const search = params?.search;

  const products = await fetchProducts(categorySlug, search);
  const categories = await fetchCategories();

  // Find selected category name
  const selectedCategory = categories.find(
    (cat) => cat.slug === categorySlug
  );

  return (
    <ProductsLayout
      products={products}
      categories={categories}
      selectedCategoryName={selectedCategory?.name || "ALL PRODUCTS"}
    />
  );
}
