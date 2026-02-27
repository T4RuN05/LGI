"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";
import "@/app/nprogress.css";

export default function RouteProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleClick = (e) => {
      const target = e.target.closest("a");

      if (!target) return;

      const href = target.getAttribute("href");

      if (!href) return;

      // Ignore external links
      if (href.startsWith("http")) return;

      // Ignore same page links
      if (href === window.location.pathname) return;

      NProgress.start();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return null;
}