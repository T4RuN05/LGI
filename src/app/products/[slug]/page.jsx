import { fetchProductBySlug } from "@/lib/api";
import ProductDetails from "../../components/products/ProductDetails";

export default async function ProductPage(props) {

  const { slug } = await props.params;

  const product = await fetchProductBySlug(slug);

  return <ProductDetails product={product} />;
}
