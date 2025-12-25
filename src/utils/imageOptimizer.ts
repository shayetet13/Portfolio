export const imageVersions = {
  mern: "1.0.0",
  // Add other image versions here
} as const;

export const getOptimizedImageSrc = (
  imagePath: string,
  format: "webp" | "avif" | "jpeg" = "jpeg"
): string => {
  const imageName = imagePath.split("/").pop()?.split(".")[0];
  const version = imageName
    ? imageVersions[imageName as keyof typeof imageVersions]
    : "1.0.0";

  const extension = format === "jpeg" ? "jpeg" : format;
  const basePath = imagePath.replace(/\.[^/.]+$/, "");

  return `${basePath}.${extension}?v=${version}`;
};

export const preloadCriticalImages = () => {
  // Preload critical images
  const criticalImages = ["/img/mern.webp?v=1.0.0", "/img/mern.jpeg?v=1.0.0"];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
};

// Service Worker registration for advanced caching
export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  }
};
