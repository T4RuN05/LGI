//import HeroCollage from "./components/home/HeroCollage";
import HeroSection from "./components/home/Hero";
import ProductCategories from "./components/home/ProductCategories";
import FeaturedProducts from "./components/home/FeaturedProducts";
import GoldPlatedBangles from "./components/home/GoldPlatedBangles";
import Link from "next/link";

export const metadata = {
  title: "Lord Ganesha Impex | Premium Jewelry Manufacturer",
  description: "Wholesale gold-finished jewelry manufacturer and exporter.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <GoldPlatedBangles />

      <div className="hidden">
        <Link href="/products">Products</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </>
  );
}
