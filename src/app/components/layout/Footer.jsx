"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const collections = [
  { name: "Bangles", slug: "bangles" },
  { name: "Earrings", slug: "earrings" },
  { name: "Rosaries", slug: "rosary" },
  { name: "Necklaces", slug: "fashion-jewellery" },
];

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className={`bg-[var(--component-bg)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] ${pathname === "/auth" ? "mt-0" : "mt-20"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-[#2D2319]">
        {/* INFORMATION */}
        <div className="text-left">
          <h3 className="text-base md:text-lg mb-4 md:mb-6 tracking-wide">
            INFORMATION
          </h3>
          <ul className="space-y-2 md:space-y-3 text-sm">
            <li>
              <Link href="/products" className="hover:underline">
                Search
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div className="text-left">
          <h3 className="text-base md:text-lg mb-4 md:mb-6 tracking-wide">
            CUSTOMER SERVICE
          </h3>
          <ul className="space-y-2 md:space-y-3 text-sm">
            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/contact?type=report" className="hover:underline">
                Report Issue
              </Link>
            </li>
          </ul>
        </div>

        {/* COLLECTIONS */}
        <div className="text-left">
          <h3 className="text-base md:text-lg mb-4 md:mb-6 tracking-wide">
            COLLECTIONS
          </h3>
          <ul className="space-y-2 md:space-y-3 text-sm">
            {collections.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/products?category=${item.slug}`}
                  className="hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT DETAILS */}
        <div className="text-left">
          <h3 className="text-base md:text-lg mb-4 md:mb-6 tracking-wide">
            CONTACT US
          </h3>
          <ul className="space-y-2 md:space-y-3 text-sm">
            <li>
              <a
                href="mailto:lordganeshaimpex1980@gmail.com"
                className="hover:underline break-all"
              >
                lordganeshaimpex1980@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+919594378891" className="hover:underline">
                +91 9594378891
              </a>
            </li>
            <li>Mumbai, Maharashtra</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
