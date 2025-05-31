import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
}

const SEOHead = ({ title, description, keywords, image, url }: SEOProps) => {
  const siteUrl = url || "https://devnid.xyz/";
  const imageUrl = image || `${siteUrl}og-image.jpg`;

  // ฟังก์ชันสำหรับอัพเดท meta tags
  const updateMetaTag = (name: string, content: string, property?: string) => {
    const attribute = property || "name";
    let tag = document.querySelector(`meta[${attribute}="${name}"]`);

    if (tag) {
      tag.setAttribute("content", content);
    } else {
      tag = document.createElement("meta");
      tag.setAttribute(attribute, name);
      tag.setAttribute("content", content);
      document.head.appendChild(tag);
    }
  };

  // ฟังก์ชันสำหรับอัพเดท canonical URL
  const updateCanonicalUrl = (url: string) => {
    let link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;

    if (link) {
      link.setAttribute("href", url);
    } else {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", url);
      document.head.appendChild(link);
    }
  };

  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:url", siteUrl, "property");
    updateMetaTag("og:image", imageUrl, "property");
    updateMetaTag("og:site_name", "Dev เก๊า Portfolio", "property");
    updateMetaTag("og:type", "website", "property");
    updateMetaTag("og:locale", "th_TH", "property");
    updateMetaTag(
      "og:alternate_url",
      "https://devnid.netlify.app/",
      "property"
    );

    // Twitter Card
    updateMetaTag("twitter:card", "summary_large_image", "name");
    updateMetaTag("twitter:title", title, "name");
    updateMetaTag("twitter:description", description, "name");
    updateMetaTag("twitter:image", imageUrl, "name");
    updateMetaTag("twitter:url", siteUrl, "name");
    updateMetaTag("twitter:creator", "@Shayetet14", "name");

    // Additional SEO tags
    updateMetaTag("robots", "index, follow", "name");
    updateMetaTag("author", "Dev เก๊า", "name");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0", "name");
    updateMetaTag("theme-color", "#0f172a", "name");

    // Canonical URL
    updateCanonicalUrl(siteUrl);

    // JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Dev เก๊า",
      jobTitle: "Full Stack Developer",
      url: siteUrl,
      sameAs: [
        "https://www.facebook.com/Comfixit",
        "https://line.me/ti/p/~kao_no_limit",
        "https://t.me/up2uok",
        "https://x.com/@Shayetet14",
        "https://www.tiktok.com/@it_step1",
      ],
      knowsAbout: [
        "React",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Web Development",
        "Full Stack Development",
      ],
      description: description,
      image: imageUrl,
      email: "shayetet14@protonmail.com",
      worksFor: {
        "@type": "Organization",
        name: "Dev เก๊า Portfolio",
      },
    };

    // Add or update JSON-LD script - แก้ไข TypeScript error โดยใช้ type assertion
    let scriptTag = document.querySelector(
      "#json-ld-schema"
    ) as HTMLScriptElement | null;

    if (scriptTag) {
      scriptTag.textContent = JSON.stringify(schema);
    } else {
      const newScript = document.createElement("script");
      newScript.type = "application/ld+json";
      newScript.id = "json-ld-schema";
      newScript.textContent = JSON.stringify(schema);
      document.head.appendChild(newScript);
    }

    // Cleanup function
    return () => {
      // ไม่ต้องลบ meta tags เพราะอาจส่งผลกระทบต่อ SEO
      // การลบออกจะทำเมื่อ component unmount เท่านั้น
    };
  }, [title, description, keywords, siteUrl, imageUrl]);

  return null; // Component นี้ไม่ render อะไรใน DOM
};

export default SEOHead;
