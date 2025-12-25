function generateSiteMap(posts = []) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static pages -->
     <url>
       <loc>https://devnid.xyz</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://devnid.xyz/about</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <!-- Dynamic pages from posts -->
     ${posts
       .map((post) => {
         return `
       <url>
           <loc>https://devnid.xyz/posts/${post.slug}</loc>
           <lastmod>${post.date || new Date().toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

export default function handler(req, res) {
  // Get all posts - แทนที่ด้วย function ดึงบทความจริง
  const posts = [
    // ตัวอย่างข้อมูล
    // { slug: 'example-post', date: '2023-01-01' }
  ];

  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "application/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate"
  );
  res.status(200).send(sitemap);
}
