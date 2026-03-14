import HeroCollage from "./components/home/HeroCollage";
import ProductCategories from "./components/home/ProductCategories";
import FeaturedProducts from "./components/home/FeaturedProducts";
import ImagePrefetcher from "./components/ui/ImagePrefetcher";

export default function Home() {
  return (
    <>
      <HeroCollage />
      <ProductCategories />
      <FeaturedProducts />
    </>
  );
}
