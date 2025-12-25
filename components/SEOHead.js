import Head from "next/head";

const SEOHead = ({
  title = "devnid.xyz - บล็อกสำหรับนักพัฒนาโดย Nid | React Next.js, Docker, UX/UI, การเขียนโปรแกรม",
  description = "รวบรวมบทความ, บันทึก และโปรเจกต์ที่น่าสนใจเกี่ยวกับ Software Development, System Design, Cloud และเทคโนโลยีอื่นๆ จากประสบการณ์ของ Nid",
  url = "https://devnid.xyz",
  image = "https://devnid.xyz/og-image.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Nid",
  keywords = "software development, system design, docker, next.js, microservices, cloud, programming, thai developer, การเขียนโปรแกรม, พัฒนาเว็บไซต์, สร้างเว็บแอป, web application, โปรแกรมเมอร์ไทย, เรียนเขียนโปรแกรม, บทความโปรแกรมมิ่ง, สอนเขียนเว็บ, ระบบคลาวด์, ไมโครเซอร์วิส, นักพัฒนาซอฟต์แวร์, การออกแบบระบบ, เทคโนโลยีสารสนเทศ, โค้ดดิ้ง, การพัฒนาแอพพลิเคชั่น, เว็บเทคโนโลยี, ฟรอนต์เอนด์, แบ็คเอนด์, ฐานข้อมูล, API, เซิร์ฟเวอร์, DevOps, การเรียนรู้โปรแกรมมิ่ง, สร้างเว็บด้วย React, Node.js, JavaScript, เปิดตัวเว็บ, โฮสติ้งเว็บ, เว็บดีไซน์, UX/UI, การพัฒนาเว็บ, เครื่องมือพัฒนา, Git, GitHub, วิธีเขียนโค้ด, คู่มือโปรแกรมมิ่ง, เทคนิคการเขียนโปรแกรม, อัลกอริธึม, โครงสร้างข้อมูล, คอมพิวเตอร์ไซเอนส์",
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebSite",
    name: title,
    description: description,
    url: url,
    author: {
      "@type": "Person",
      name: author,
      url: "https://devnid.xyz/about",
    },
    ...(type === "article" && {
      headline: title,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      image: image,
      publisher: {
        "@type": "Person",
        name: "Nid",
        url: "https://devnid.xyz",
      },
    }),
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="devnid.xyz" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article specific */}
      {type === "article" && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default SEOHead;
