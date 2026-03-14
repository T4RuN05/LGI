"use client";

import { useEffect } from "react";

export default function ImagePrefetcher({ images = [] }) {
  useEffect(() => {
    const preload = () => {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(preload);
    } else {
      setTimeout(preload, 800);
    }
  }, [images]);

  return null;
}