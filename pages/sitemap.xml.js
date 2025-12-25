import { getAllPosts } from "../lib/posts"; // สมมติว่ามี function นี้อยู่

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

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Get all posts - แทนที่ด้วย function ดึงบทความจริงของคุณ
  const posts = [
    // ตัวอย่างข้อมูล - ให้เปลี่ยนเป็นข้อมูลจริง
    // { slug: 'example-post', date: '2023-01-01' }
  ];

  // Generate the XML sitemap
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate"
  );
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
