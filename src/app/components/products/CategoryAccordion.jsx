"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function CategoryAccordion({ categories }) {

  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const pathname = usePathname();
  const { user } = useAuth();

  const isAdminRoute = pathname.startsWith("/admin");
  const baseRoute = isAdminRoute ? "/admin/products" : "/products";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".category-dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[260px] category-dropdown">

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#F2F1EC] flex items-center justify-between px-5 py-3 shadow-sm rounded-md w-full"
      >
        <div className="flex items-center gap-3">
          <HiAdjustmentsHorizontal size={18} />
          <span className="text-sm">Product Categories</span>
        </div>

        <FiChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-[#F2F1EC] shadow-lg rounded-md w-full z-50 p-4 space-y-4">

          {/* ALL PRODUCTS */}
          <div className="border-b pb-2">
            <Link
              href={baseRoute}
              onClick={() => setIsOpen(false)}
              className="block py-2 px-3 hover:bg-[#f3eee8] rounded-sm text-sm"
            >
              All Products
            </Link>
          </div>

          {/* FEATURED (ADMIN ONLY) */}
          {user?.role === "admin" && (
            <div className="border-b pb-2">
              <Link
                href={`${baseRoute}?featured=true`}
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 hover:bg-[#f3eee8] rounded-sm text-sm font-medium"
              >
                Featured
              </Link>
            </div>
          )}

          {/* CATEGORIES */}
          {categories.map((cat) => (
            <div key={cat._id} className="space-y-1">

              {/* PARENT */}
              <div className="flex items-center justify-between">
                <Link
                  href={`${baseRoute}?category=${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="text-sm hover:text-black"
                >
                  {cat.name}
                </Link>

                {cat.children?.length > 0 && (
                  <button
                    onClick={() =>
                      setOpenCategory(
                        openCategory === cat._id ? null : cat._id
                      )
                    }
                  >
                    <FiChevronRight
                      size={14}
                      className={`transition-transform ${
                        openCategory === cat._id ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* CHILDREN */}
              {openCategory === cat._id &&
                cat.children?.map((child) => (
                  <Link
                    key={child._id}
                    href={`${baseRoute}?category=${child.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block ml-4 text-xs py-1 hover:text-black"
                  >
                    └ {child.name}
                  </Link>
                ))}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
