// utils/preloadImages.js
export const preloadImages = (sources = []) => {
  return Promise.all(
    sources.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // avoid blocking on failure
        })
    )
  );
};