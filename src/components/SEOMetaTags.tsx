import { useEffect } from "react";

const SEOMetaTags = () => {
  useEffect(() => {
    // เพิ่ม JSON-LD Schema เพิ่มเติม
    const schemas = [
      // Local Business Schema
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Dev เก๊า - Full Stack Developer",
        image: "https://devnid.xyz/logo.png",
        telephone: "+66-XXX-XXX-XXXX",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Bangkok",
          addressLocality: "Bangkok",
          addressCountry: "TH",
        },
        openingHours: "Mo-Su 00:00-23:59",
        sameAs: [
          "https://github.com/devkao",
          "https://linkedin.com/in/devkao",
          "https://devnid.netlify.app/",
        ],
        url: "https://devnid.xyz/",
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Alternative URL",
            value: "https://devnid.netlify.app/",
          },
        ],
      },
      // Article Schema for Blog/Portfolio
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Professional Full Stack Development Services",
        description:
          "Expert web development services specializing in React, TypeScript, Node.js, and modern technologies",
        author: {
          "@type": "Person",
          name: "Dev",
        },
        publisher: {
          "@type": "Organization",
          name: "Dev เก๊า Web Development",
        },
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString(),
      },
      // FAQ Schema
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "รับทำเว็บไซต์ราคาเท่าไหร่?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ราคาขึ้นอยู่กับความซับซ้อนของโปรเจค เริ่มต้นที่ 15,000 บาท สำหรับเว็บไซต์ธุรกิจ",
            },
          },
          {
            "@type": "Question",
            name: "ใช้เวลาทำเว็บไซต์นานเท่าไหร่?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "โดยเฉลี่ย 2-4 สัปดาห์ ขึ้นอยู่กับขนาดและความซับซ้อนของงาน",
            },
          },
          {
            "@type": "Question",
            name: "รองรับ responsive design ไหม?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ใช่ เว็บไซต์ทุกอันที่เราทำจะรองรับการใช้งานบนมือถือและแท็บเล็ต",
            },
          },
        ],
      },
    ];

    // เพิ่ม Schema ลงใน head
    schemas.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `schema-${index}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup
    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`schema-${index}`);
        if (script) document.head.removeChild(script);
      });
    };
  }, []);

  return null;
};

export default SEOMetaTags;
