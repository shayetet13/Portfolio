// Google Search Console และ Analytics integration
export const initializeSEOTools = () => {
  // Google Search Console verification
  const gscMeta = document.createElement("meta");
  gscMeta.name = "google-site-verification";
  gscMeta.content = "YOUR_GOOGLE_SEARCH_CONSOLE_CODE";
  document.head.appendChild(gscMeta);

  // Bing Webmaster verification
  const bingMeta = document.createElement("meta");
  bingMeta.name = "msvalidate.01";
  bingMeta.content = "17CF7F384968B14D1F5D2A70D6ED9408";
  document.head.appendChild(bingMeta);

};

// Rich Snippets สำหรับการแสดงผลใน Search Results
export const generateRichSnippets = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "หน้าแรก",
        item: "https://devnid.xyz/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "บริการ",
        item: "https://devnid.xyz/#expertise",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "ผลงาน",
        item: "https://devnid.xyz/#featured-projects",
      },
    ],
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(breadcrumbSchema);
  document.head.appendChild(script);
};

// Core Web Vitals optimization
export const optimizeWebVitals = () => {
  // Preload critical resources
  const preloadLinks = [
    { href: "/fonts/your-font.woff2", as: "font", type: "font/woff2" },
    { href: "/images/hero-image.webp", as: "image" },
  ];

  preloadLinks.forEach((link) => {
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.href = link.href;
    preloadLink.as = link.as;
    if (link.type) preloadLink.type = link.type;
    if (link.as === "font") preloadLink.crossOrigin = "anonymous";
    document.head.appendChild(preloadLink);
  });
};

// Image optimization
export const optimizeImages = () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    // เพิ่ม lazy loading
    img.loading = "lazy";

    // เพิ่ม alt text ถ้าไม่มี
    if (!img.alt) {
      img.alt = "Dev เก๊า - Professional Web Development Services";
    }
  });
};

// Generate sitemap dynamically
export const generateSitemap = () => {
  const pages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/#expertise", priority: "0.9", changefreq: "monthly" },
    { url: "/#featured-projects", priority: "0.9", changefreq: "weekly" },
    { url: "/#about", priority: "0.8", changefreq: "monthly" },
    { url: "/#testimonials", priority: "0.7", changefreq: "weekly" },
    { url: "/#contact", priority: "0.8", changefreq: "monthly" },
  ];

  return pages;
};

export const updateMetaTags = (tags: Record<string, string>) => {
  Object.entries(tags).forEach(([name, content]) => {
    let meta = document.querySelector(
      `meta[name="${name}"]`
    ) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  });
};

export const updateTitle = (title: string) => {
  document.title = title;
};

export const updateCanonical = (url: string) => {
  let canonical = document.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url;
};

export const addStructuredData = (data: object) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};
