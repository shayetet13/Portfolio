const fs = require("fs");
const path = require("path");

const generateSitemap = () => {
  const baseUrl = "https://dev-kao-portfolio.netlify.app";
  const pages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/#expertise", priority: "0.9", changefreq: "monthly" },
    { url: "/#featured-projects", priority: "0.9", changefreq: "weekly" },
    { url: "/#about", priority: "0.8", changefreq: "monthly" },
    { url: "/#testimonials", priority: "0.7", changefreq: "weekly" },
    { url: "/#contact", priority: "0.8", changefreq: "monthly" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemap);
  console.log("✅ Sitemap generated successfully!");
};

generateSitemap();
