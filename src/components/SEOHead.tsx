import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

const SEOHead = ({
  title = "Dev เก๊า - Full Stack Developer Thailand | รับพัฒนาเว็บไซต์ WebApp มืออาชีพ | React TypeScript Node.js",
  description = "Dev เก๊า Full Stack Developer มืออาชีพ รับพัฒนาเว็บไซต์ WebApp E-commerce ระบบจัดการ CRM ERP สร้างโปรแกรมตามความต้องการ React TypeScript Node.js MongoDB PostgreSQL ประสบการณ์ 7+ ปี ราคาเริ่มต้น 3,000 บาท Bangkok Thailand",
  keywords = "Dev เก๊า, พัฒนาเว็บไซต์, full stack developer thailand, รับทำเว็บไซต์, โปรแกรมเมอร์ไทย, web developer bangkok, react developer thailand, nodejs developer, typescript developer, mongodb developer, postgresql developer, เว็บแอป, web application development, e-commerce development thailand, ระบบจัดการ, CRM system, ERP system, inventory management, point of sale thailand, pos system, online store development, marketplace development, booking system thailand, cms development, responsive design, mobile app development, progressive web app thailand, seo optimization thailand, digital transformation thailand, automation system thailand, crm development thailand, erp development thailand, inventory system thailand, รับทำเว็บไซต์ราคาถูก, รับทำเว็บไซต์มืออาชีพ, บริษัททำเว็บไซต์, ออกแบบเว็บไซต์, สร้างเว็บไซต์, เว็บไซต์สำเร็จรูป, ระบบหลังบ้าน, ระบบฐานข้อมูล, การพัฒนาแอปพลิเคชัน, โปรแกรมตามสั่ง, ระบบสมาชิก, ระบบตะกร้าสินค้า, ระบบชำระเงิน",
  image = "https://devnid.xyz/img/1dev.png",
  url = "https://devnid.xyz",
  type = "website",
  author = "Dev เก๊า",
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags with enhanced SEO
    const updateMetaTag = (
      name: string,
      content: string,
      property?: boolean
    ) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Enhanced Basic Meta Tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", author);
    updateMetaTag(
      "robots",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    updateMetaTag(
      "googlebot",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    updateMetaTag("bingbot", "index, follow");
    updateMetaTag("rating", "general");
    updateMetaTag("distribution", "global");
    updateMetaTag("language", "Thai, English");
    updateMetaTag("geo.region", "TH");
    updateMetaTag("geo.placename", "Bangkok");
    updateMetaTag("ICBM", "13.7563, 100.5018");

    // Enhanced Open Graph Tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:image:width", "1200", true);
    updateMetaTag("og:image:height", "630", true);
    updateMetaTag(
      "og:image:alt",
      "Dev เก๊า - Professional Full Stack Developer Thailand",
      true
    );
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "Dev เก๊า Portfolio", true);
    updateMetaTag("og:locale", "th_TH", true);
    updateMetaTag("og:locale:alternate", "en_US", true);

    // Enhanced Twitter Tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:site", "@devnid");
    updateMetaTag("twitter:creator", "@devnid");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Update canonical link with alternate
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Add alternate URL
    let alternate = document.querySelector(
      'link[rel="alternate"]'
    ) as HTMLLinkElement;
    if (!alternate) {
      alternate = document.createElement("link");
      alternate.setAttribute("rel", "alternate");
      document.head.appendChild(alternate);
    }
    alternate.setAttribute("href", "https://devnid.netlify.app/");
  }, [title, description, keywords, image, url, type, author]);

  return null;
};

export default SEOHead;
