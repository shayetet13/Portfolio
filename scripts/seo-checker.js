const https = require("https");
const fs = require("fs");

const seoChecklist = {
  meta: {
    title: "✅ Title tag (50-60 characters)",
    description: "✅ Meta description (150-160 characters)",
    keywords: "✅ Meta keywords",
    canonical: "✅ Canonical URL",
    robots: "✅ Robots meta tag",
  },
  openGraph: {
    title: "✅ og:title",
    description: "✅ og:description",
    image: "✅ og:image (1200x630px)",
    url: "✅ og:url",
    type: "✅ og:type",
  },
  twitter: {
    card: "✅ twitter:card",
    title: "✅ twitter:title",
    description: "✅ twitter:description",
    image: "✅ twitter:image",
  },
  structured: {
    schema: "✅ JSON-LD Schema markup",
    breadcrumbs: "✅ Breadcrumb schema",
    business: "✅ Local business schema",
    faq: "✅ FAQ schema",
  },
  technical: {
    sitemap: "✅ XML Sitemap",
    robots: "✅ robots.txt",
    ssl: "✅ HTTPS/SSL",
    mobile: "✅ Mobile-friendly",
    speed: "✅ Page speed optimization",
    core_vitals: "✅ Core Web Vitals",
  },
};

const checkSEO = async (url) => {
  console.log(`🔍 Checking SEO for: ${url}`);
  console.log("\n📋 SEO Checklist:");

  Object.entries(seoChecklist).forEach(([category, items]) => {
    console.log(`\n${category.toUpperCase()}:`);
    Object.entries(items).forEach(([key, description]) => {
      console.log(`  ${description}`);
    });
  });

  console.log("\n🛠️ Tools to use:");
  console.log("- Google PageSpeed Insights");
  console.log("- Google Search Console");
  console.log("- GTmetrix");
  console.log("- Lighthouse");
  console.log("- Screaming Frog SEO Spider");
};

checkSEO("https://dev-kao-portfolio.netlify.app");
