const BASE_URL = "http://localhost:5000/api";

export const fetchFeaturedProducts = async () => {
  const res = await fetch(`${BASE_URL}/products/featured`);
  return res.json();
};

export const fetchProducts = async (categorySlug) => {

  const url = categorySlug
    ? `${BASE_URL}/products?category=${categorySlug}`
    : `${BASE_URL}/products`;

  const res = await fetch(url, { cache: "no-store" });

  return res.json();
};


export const fetchProductBySlug = async (slug) => {
  const res = await fetch(`${BASE_URL}/products/${slug}`);
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch("http://localhost:5000/api/categories", {
    cache: "no-store",
  });

  return res.json();
};
