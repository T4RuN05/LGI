"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, hydrated } = useAuth();
  const [open, setOpen] = useState(false);
  const isAdmin = user?.role === "admin";

  const navItem = (href, label) => (
    <Link
      href={href}
      className={`relative whitespace-nowrap ${
        pathname === href
          ? "after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-black"
          : ""
      }`}
    >
      {label}
    </Link>
  );

  /* Close Profile Dropdown */
  useEffect(() => {
    if (!hydrated) return;

    const handleClick = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [hydrated]);

  return (
    <div className="sticky top-0 z-50 bg-[var(--component-bg)] border-y border-[#e3e1dc] shadow-lg my-[1rem]">
      
      {/* FIXED HEIGHT NAVBAR */}
      <div className="w-full mx-auto px-6 h-[70px] flex items-center justify-between">

        {/* LEFT (optional logo space) */}
        <div className="w-[120px]" />

        {/* CENTER NAV */}
        <div className="flex gap-6 md:gap-10 text-[15px] md:text-[17px] font-medium whitespace-nowrap">
          {isAdmin ? (
            <>
              {navItem("/admin/products", "Products")}
              {navItem("/admin/users", "Users")}
            </>
          ) : (
            <>
              {navItem("/", "Home")}
              {navItem("/products", "Products")}
              {navItem("/about", "About us")}
              {navItem("/contact", "Contact Us")}
            </>
          )}
        </div>

        {/* RIGHT SIDE (STICKS TO EDGE) */}
        <div className="flex items-center gap-6">

          {!isAdmin && (
            <div className="hidden md:flex items-center gap-2 cursor-pointer">
              <HiOutlineGlobeAlt />
              English - US
            </div>
          )}

          {user ? (
            <div className="relative profile-dropdown">
              <button onClick={() => setOpen(!open)}>
                <FaUserCircle size={26} className="cursor-pointer" />
              </button>

              {open && (
                <div className="absolute right-0 top-[120%] w-52 bg-[#F2F1EC] shadow-xl rounded-lg border border-[#d8d3cc] z-50 overflow-hidden">
                  <div className="px-4 py-3 text-sm border-b border-[#d8d3cc] text-gray-600 truncate">
                    {user.email}
                  </div>

                  {isAdmin && (
                    <Link
                      href="/admin/products"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-[#ebe6e0] transition"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-[#ebe6e0] transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}