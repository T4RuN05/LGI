import { fetchProductBySlug } from "@/lib/api";
import ProductDetails from "../../components/products/ProductDetails";

export async function generateMetadata(props) {
  const { slug } = await props.params;

  const product = await fetchProductBySlug(slug);

  if (!product) return {};

  return {
    title: product.title,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160),
      url: `https://www.lordganeshaimpex.com/products/${slug}`,
      siteName: "Lord Ganesha Impex",
      images: [
        {
          url: product.images?.[0]?.url,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description?.slice(0, 160),
      images: [product.images?.[0]?.url],
    },
  };
}

export default async function ProductPage(props) {

  const { slug } = await props.params;

  const product = await fetchProductBySlug(slug);

  return <ProductDetails product={product} />;
}