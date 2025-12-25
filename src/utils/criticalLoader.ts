// Critical resource loader utility
export const loadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement("link");
  fontLink.rel = "preload";
  fontLink.href = "/fonts/inter.woff2";
  fontLink.as = "font";
  fontLink.type = "font/woff2";
  fontLink.crossOrigin = "anonymous";
  document.head.appendChild(fontLink);
};

// Defer non-critical resources
export const deferNonCriticalResources = () => {
  // Load animations after initial paint
  requestIdleCallback(() => {
    import("framer-motion").catch(() => {});
  });

  // Load modal after user interaction
  const loadModal = () => {
    import("../components/ProjectModal").catch(() => {});
    document.removeEventListener("click", loadModal);
    document.removeEventListener("scroll", loadModal);
  };

  document.addEventListener("click", loadModal, { once: true });
  document.addEventListener("scroll", loadModal, { once: true });
};

// Initialize critical loading
export const initCriticalPath = () => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadCriticalResources);
  } else {
    loadCriticalResources();
  }

  // Defer non-critical after initial render
  setTimeout(deferNonCriticalResources, 0);
};
