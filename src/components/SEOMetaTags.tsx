import { useEffect } from "react";

const SEOMetaTags = () => {
  useEffect(() => {
    // เพิ่ม JSON-LD Schema เพิ่มเติม
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Dev เก๊า Portfolio",
      url: "https://devnid.xyz/",
      description: "Professional Full Stack Developer Portfolio & Services",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://devnid.xyz/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Dev เก๊า",
      url: "https://devnid.xyz/",
      logo: "https://devnid.xyz/logo.png",
      sameAs: [
        "https://www.facebook.com/Comfixit",
        "https://line.me/ti/p/~kao_no_limit",
        "https://t.me/up2uok",
        "https://x.com/@Shayetet14",
        "https://www.tiktok.com/@it_step1",
      ],
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Full Stack Development Services",
      provider: {
        "@type": "Person",
        name: "Dev เก๊า",
        url: "https://devnid.xyz/",
      },
      description:
        "Professional web development, mobile app development, and software solutions",
      areaServed: "Thailand",
    };

    // Add schemas to head
    [websiteSchema, organizationSchema, serviceSchema].forEach(
      (schema, index) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(schema);
        script.id = `schema-${index}`;

        const existing = document.getElementById(`schema-${index}`);
        if (existing) {
          existing.remove();
        }

        document.head.appendChild(script);
      }
    );

    return () => {
      // Cleanup
      [0, 1, 2].forEach((index) => {
        const existing = document.getElementById(`schema-${index}`);
        if (existing) {
          existing.remove();
        }
      });
    };
  }, []);

  return null;
};

export default SEOMetaTags;
