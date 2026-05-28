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

      const targetAttr = target.getAttribute("target");
      if (targetAttr === "_blank") return;

      // Ignore external or specialized links
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(target.href, window.location.href);

        // Ignore hash links on the same page
        if (
          currentUrl.pathname === targetUrl.pathname &&
          currentUrl.search === targetUrl.search &&
          targetUrl.hash
        ) {
          return;
        }

        // Ignore exact same URL clicks
        if (currentUrl.href === targetUrl.href) return;
      } catch (err) {
        // Fallback for invalid URLs
      }

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