"use client";

import { useState, useEffect } from "react";

export default function TopHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`hidden md:block transition-all duration-500 ${
        scrolled
          ? "opacity-0 -translate-y-10 pointer-events-none"
          : "opacity-100"
      } bg-[var(--component-bg)] w-full shadow-lg rounded-lg`}
    >
      {/* ONLY HEIGHT — NO LOGO */}
      <div className="h-[110px]" />
    </div>
  );
}