"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import LanguageCurrencyPopup from "../ui/LanguageCurrencyPopup";
import { useLocale } from "@/context/LocaleContext";
import { useState, useEffect, useRef } from "react";
import { Sling as Hamburger } from "hamburger-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, hydrated } = useAuth();
  const [open, setOpen] = useState(false);
  const isAdmin = user?.role === "admin";
  const [showLocalePopup, setShowLocalePopup] = useState(false);
  const { language, currency, t } = useLocale();
  const [mobileMenu, setMobileMenu] = useState(false);
  const localeRefMobile = useRef(null);
  const localeRefDesktop = useRef(null);
  const profileRefMobile = useRef(null);
  const profileRefDesktop = useRef(null);

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

useEffect(() => {
  const handleClick = (e) => {
    const clickedInsideMobileProfile =
      profileRefMobile.current?.contains(e.target);

    const clickedInsideDesktopProfile =
      profileRefDesktop.current?.contains(e.target);

    if (!clickedInsideMobileProfile && !clickedInsideDesktopProfile) {
      setOpen(false);
    }

    const clickedInsideMobile =
      localeRefMobile.current?.contains(e.target);

    const clickedInsideDesktop =
      localeRefDesktop.current?.contains(e.target);

    if (!clickedInsideMobile && !clickedInsideDesktop) {
      setShowLocalePopup(false);
    }
  };

  document.addEventListener("click", handleClick);
  return () => document.removeEventListener("click", handleClick);
}, []);

  /* Close Profile Dropdown */
  const profileRef = useRef(null);

  return (
    <div className="sticky top-0 z-50 pointer-events-auto bg-[#F2F1EC]/75 backdrop-blur-lg border-y border-[#e3e1dc] shadow-lg my-[1rem]">
      {/* MOBILE HEADER (MERGED HEADER + NAV) */}
      <div className="md:hidden flex items-center justify-between px-4 h-[70px]">
        {/* HAMBURGER */}
        {!isAdmin && (
          <Hamburger
            toggled={mobileMenu}
            toggle={setMobileMenu}
            direction="right"
            size={22}
            distance="sm"
          />
        )}

        {/* LOGO */}
        <Link href="/">
          <img
            src="https://res.cloudinary.com/dijssimbb/image/upload/v1771186076/LGI_1_awfgfe.png"
            alt="Lord Ganesha Impex"
            className="h-[40px]"
          />
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 h-full">
          {/* LANGUAGE SWITCH (mobile only icon) */}
          {!isAdmin && (
            <div
              ref={localeRefMobile}
              className="relative h-full flex items-center"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLocalePopup(!showLocalePopup);
                }}
                className="flex items-center justify-center h-full"
              >
                <HiOutlineGlobeAlt size={26} />
              </button>

              {showLocalePopup && (
                <LanguageCurrencyPopup
                  onClose={() => setShowLocalePopup(false)}
                />
              )}
            </div>
          )}

          {/* USER / SIGNIN */}
          {user ? (
            <div ref={profileRefMobile} className="relative h-full flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((prev) => !prev);
                }}
              >
                <FaUserCircle size={26} />
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
              href="/auth"
              className="border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* DESKTOP NAVBAR (UNCHANGED) */}
      <div className="hidden md:flex relative w-full mx-auto px-6 h-[70px] items-center">
        {/* CENTER NAV */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 md:gap-10 text-[15px] md:text-[17px] font-medium whitespace-nowrap">
          {isAdmin ? (
            <>
              {navItem("/admin/products", "Products")}
              {navItem("/admin/users", "Users")}
            </>
          ) : (
            <>
              {navItem("/", t("home"))}
              {navItem("/products", t("products"))}
              {navItem("/about", t("navAbout"))}
              {navItem("/contact", t("contact"))}
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-6">
          {!isAdmin && (
            <div
              ref={localeRefDesktop}
              className="relative flex items-center gap-2"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLocalePopup(!showLocalePopup);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <HiOutlineGlobeAlt />
                {language.toUpperCase()} - {currency}
              </button>

              {showLocalePopup && (
                <LanguageCurrencyPopup
                  onClose={() => setShowLocalePopup(false)}
                />
              )}
            </div>
          )}

          {user ? (
            <div ref={profileRefDesktop} className="relative profile-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((prev) => !prev);
                }}
              >
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
              href="/auth"
              className="border px-4 py-1 text-sm hover:bg-black hover:text-white transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out
  ${mobileMenu ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
  border-t border-[#e3e1dc] bg-[#F2F1EC]`}
      >
        <div className="flex flex-col">
          {[
            { href: "/", label: t("home") },
            { href: "/products", label: t("products") },
            { href: "/about", label: t("navAbout") },
            { href: "/contact", label: t("contact") },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenu(false)}
              className={`px-6 py-4 text-lg tracking-wide font-medium transition-colors
        ${
          pathname === item.href
            ? "bg-[#312517] text-white"
            : "text-[#312517] hover:bg-[#ebe6e0]"
        }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
