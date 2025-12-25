const JsonLd = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

// Predefined schemas
export const WebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "devnid.xyz",
  url: "https://devnid.xyz",
  description:
    "บล็อกสำหรับนักพัฒนาโดย Nid เกี่ยวกับ Software Development, System Design และเทคโนโลยี",
  inLanguage: ["th-TH", "en-US"],
  author: {
    "@type": "Person",
    name: "Nid",
    url: "https://devnid.xyz/about",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://devnid.xyz/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nid",
  url: "https://devnid.xyz",
  jobTitle: "Software Developer",
  knowsAbout: [
    "Software Development",
    "System Design",
    "Docker",
    "Next.js",
    "Microservices",
    "Cloud Computing",
    "การเขียนโปรแกรม",
    "การพัฒนาเว็บ",
  ],
  sameAs: [
    "https://github.com/your-github",
    "https://linkedin.com/in/your-linkedin",
  ],
};

export const OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "devnid.xyz",
  url: "https://devnid.xyz",
  logo: "https://devnid.xyz/logo.png",
  description: "เว็บไซต์สำหรับแชร์ความรู้ด้าน Software Development",
  foundingDate: "2023",
  sameAs: ["https://github.com/your-github"],
};

export const createArticleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt || article.description,
  image: article.image || "https://devnid.xyz/default-article-image.jpg",
  datePublished: article.publishedTime,
  dateModified: article.modifiedTime || article.publishedTime,
  author: {
    "@type": "Person",
    name: "Nid",
    url: "https://devnid.xyz/about",
  },
  publisher: {
    "@type": "Person",
    name: "Nid",
    url: "https://devnid.xyz",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://devnid.xyz/posts/${article.slug}`,
  },
  keywords: article.tags ? article.tags.join(", ") : "",
  inLanguage: "th-TH",
});

export default JsonLd;
