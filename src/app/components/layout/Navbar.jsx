"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navItem = (href, label) => (
    <Link
      href={href}
      className={`relative pb-1 ${
        pathname === href
          ? "after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black"
          : ""
      }`}
    >
      {label}
    </Link>
  );

  const isAdmin = user?.role === "admin";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="bg-[var(--component-bg)] border-y border-[#e3e1dc] my-3 shadow-lg rounded-lg sticky top-0 z-10">
      <div className="max-w-8xl mx-auto px-6 py-3 flex items-center">
        {/* LEFT SPACER */}
        <div className="flex-1"></div>

        {/* CENTER NAV */}
        <div className="flex-1 flex justify-center gap-14 text-[18px]">
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

        {/* RIGHT SIDE */}
        <div className="flex-1 flex justify-end items-center gap-6 text-[17px]">
          {!isAdmin && (
            <>
              <FiSearch className="cursor-pointer" />
              <div className="flex items-center gap-2 cursor-pointer">
                <HiOutlineGlobeAlt />
                English - US
              </div>
            </>
          )}

          {user ? (
            <div className="relative profile-dropdown">
              <button onClick={() => setOpen(!open)}>
                <FaUserCircle size={26} className="cursor-pointer" />
              </button>

              {open && (
                <div className="absolute right-0 top-[140%] w-52 bg-[#F2F1EC] shadow-xl rounded-lg border border-[#d8d3cc] z-50 overflow-hidden animate-fadeIn">
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


  document.cookie = "token=; Max-Age=0; path=/";


  window.location.href = "/";
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
