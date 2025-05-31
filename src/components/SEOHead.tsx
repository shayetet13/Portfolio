import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({
  title = "Dev - Full Stack Developer | พัฒนาเว็บไซต์ โปรแกรม Web App ระดับมืออาชีพ",
  description = "Dev Full Stack Developer มืออาชีพ รับพัฒนาเว็บไซต์ โปรแกรม Web Application E-commerce ระบบจัดการ CRM ERP สร้างโปรแกรมตามความต้องการ React TypeScript Node.js MongoDB PostgreSQL",
  keywords = "พัฒนาเว็บไซต์, โปรแกรมเมอร์, web developer, full stack developer, react developer, nodejs developer, typescript, mongodb, postgresql, เว็บแอป, web application, e-commerce, ระบบจัดการ, โปรแกรม, software development, รับทำเว็บไซต์, รับทำโปรแกรม, รับพัฒนาระบบ, รับออกแบบเว็บไซต์, ทำเว็บไซต์ราคาถูก, ทำเว็บไซต์มืออาชีพ, พัฒนาแอปพลิเคชัน, สร้างเว็บไซต์, ออกแบบเว็บไซต์, เว็บไซต์บริษัท, เว็บไซต์ขายของ, เว็บไซต์ร้านค้า, ร้านค้าออนไลน์, เว็บอีคอมเมิร์ซ, ระบบขายหน้าร้าน, ระบบ POS, ระบบบัญชี, ระบบรายงาน, ระบบลูกค้าสัมพันธ์, ระบบ CRM, ระบบ ERP, ระบบจัดการคลังสินค้า, ระบบจัดการสินค้าคงคลัง, ระบบจัดการพนักงาน, ระบบ HR, ระบบเงินเดือน, ระบบลาป่วย, ระบบจองคิว, ระบบนัดหมาย, ระบบจัดการโรงแรม, ระบบจัดการร้านอาหาร, ระบบจัดการโรงเรียน, ระบบจัดการโรงพยาบาล, ระบบจัดการคลินิก, แอพมือถือ, แอปพลิเคชัน, โมบายแอป, เว็บแอปพลิเคชัน, PWA, Single Page Application, SPA, ระบบสมาชิก, ระบบล็อกอิน, ระบบสมัครสมาชิก, ระบบเก็บคะแนน, ระบบแต้มสะสม, ระบบคูปอง, ระบบส่วนลด, ระบบโปรโมชั่น, ระบบการตลาด, ระบบอีเมลมาร์เก็ตติ้ง, ระบบ SMS, ระบบแจ้งเตือน, ระบบแชทบอท, ระบบปัญญาประดิษฐ์, AI, Machine Learning, ปัญญาประดิษฐ์, การเรียนรู้ของเครื่อง, ระบบแนะนำสินค้า, ระบบค้นหา, ระบบกรองข้อมูล, ระบบรายงานแบบเรียลไทม์, Dashboard, แดชบอร์ด, ระบบวิเคราะห์ข้อมูล, Data Analytics, Business Intelligence, BI, thai developer, bangkok developer, freelance developer, remote developer, outsourcing, software house, tech startup, fintech, edtech, healthtech, proptech, agritech, foodtech, website design, เว็บดีไซน์, ระบบสมาชิก, ระบบตะกร้าสินค้า, api development, database design, ui ux design, responsive design, mobile app, progressive web app, seo optimization, digital transformation, automation, crm system, erp system, inventory management, point of sale, pos system, online store, marketplace, booking system, cms, content management, blog system, news website, portfolio website, business website, startup development, mvp development, prototype, agile development, scrum, devops, cloud deployment, aws, google cloud, digital ocean, hosting, domain, ssl certificate, security, performance optimization, speed optimization, google analytics, facebook pixel, social media integration, payment gateway, line pay, promptpay, credit card payment",
  image = "https://portfolio-6881e.firebaseapp.com/og-image.jpg",
  url = "https://portfolio-6881e.firebaseapp.com/",
  type = "website",
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let element = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement;

      if (element) {
        element.content = content;
      } else {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        element.content = content;
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);

    // Twitter tags
    updateMetaTag("twitter:title", title, true);
    updateMetaTag("twitter:description", description, true);
    updateMetaTag("twitter:image", image, true);
    updateMetaTag("twitter:url", url, true);

    // Update canonical link
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (canonical) {
      canonical.href = url;
    } else {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = url;
      document.head.appendChild(canonical);
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description: description,
      url: url,
      image: image,
      author: {
        "@type": "Person",
        name: "Dev เก๊า",
        jobTitle: "Full Stack Developer",
        url: url,
      },
      mainEntity: {
        "@type": "ProfessionalService",
        name: "Web Development Services",
        description: description,
        provider: {
          "@type": "Person",
          name: "Dev เก๊า",
        },
      },
    };

    let scriptTag = document.querySelector(
      'script[data-seo="page-data"]'
    ) as HTMLScriptElement;
    if (scriptTag) {
      scriptTag.textContent = JSON.stringify(structuredData);
    } else {
      scriptTag = document.createElement("script") as HTMLScriptElement;
      scriptTag.type = "application/ld+json";
      scriptTag.setAttribute("data-seo", "page-data");
      scriptTag.textContent = JSON.stringify(structuredData);
      document.head.appendChild(scriptTag);
    }

    // สร้าง SVG favicon
    const createSVGFavicon = () => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
          <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
        </linearGradient>
          </defs>
          <rect width="48" height="48" rx="8" fill="url(#grad)"/>
          <text x="24" y="33" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">D</text>
        </svg>
      `;

      const blob = new Blob([svg], { type: "image/svg+xml" });
      return URL.createObjectURL(blob);
    };

    // เพิ่ม favicon links
    const updateFaviconLink = (
      rel: string,
      href: string,
      sizes?: string,
      type?: string
    ) => {
      // ลบ favicon เก่าที่มี rel เดียวกัน
      const existingElements = document.querySelectorAll(`link[rel="${rel}"]`);
      existingElements.forEach((el) => el.remove());

      const element = document.createElement("link");
      element.rel = rel;
      element.href = href;
      if (sizes) element.setAttribute("sizes", sizes);
      if (type) element.type = type;
      document.head.appendChild(element);
    };

    // สร้าง SVG favicon URL
    const svgFaviconUrl = createSVGFavicon();

    // เพิ่ม favicon แบบต่างๆ
    updateFaviconLink("icon", svgFaviconUrl, "any", "image/svg+xml");
    updateFaviconLink("icon", svgFaviconUrl, "16x16", "image/svg+xml");
    updateFaviconLink("icon", svgFaviconUrl, "32x32", "image/svg+xml");
    updateFaviconLink("apple-touch-icon", svgFaviconUrl);
  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEOHead;
