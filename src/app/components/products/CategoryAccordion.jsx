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
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[260px] category-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#F2F1EC]/75 backdrop-blur-sm flex items-center justify-between px-5 py-3 shadow-sm rounded-md w-full"
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
        <div className="absolute top-full left-0 mt-2 bg-[#F2F1EC]/75 backdrop-blur-sm shadow-lg rounded-md w-full z-20 p-4 space-y-4">
          {/* ALL PRODUCTS */}
          <div className="border-b pb-2">
            <Link
              href={baseRoute}
              onClick={() => setIsOpen(false)}
              className="block py-2 px-3 hover:bg-[#312517] hover:text-white rounded-sm text-sm transition"
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
                className="block py-2 px-3 hover:bg-[#312517] hover:text-white rounded-sm text-sm font-medium transition"
              >
                Featured
              </Link>
            </div>
          )}

          {/* CATEGORIES */}
          {categories.map((cat) => (
            <div key={cat._id} className="space-y-1">
              {/* PARENT */}
              <div className="flex items-center justify-between hover:bg-[#312517] hover:text-white rounded-sm transition group">
                <Link
                  href={`${baseRoute}?category=${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="text-sm px-2 py-1 flex-1 group-hover:text-white"
                >
                  {cat.name}
                </Link>

                {cat.children?.length > 0 && (
                  <button
                    onClick={() =>
                      setOpenCategory(openCategory === cat._id ? null : cat._id)
                    }
                    className="px-2 py-1"
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
                    className="block ml-4 text-xs py-1 px-2 hover:bg-[#312517] hover:text-white rounded-sm transition"
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
