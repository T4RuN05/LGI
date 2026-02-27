const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const fetchFeaturedProducts = async () => {
  const res = await fetch(`${BASE_URL}/products/featured`);
  return res.json();
};

export async function fetchProducts(categorySlug, search) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?`;

  if (categorySlug) url += `category=${categorySlug}&`;
  if (search) url += `search=${search}&`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  return res.json();
}


export const fetchProductBySlug = async (slug) => {
  const res = await fetch(`${BASE_URL}/products/${slug}`);
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: "no-store",
  });

  return res.json();
};
