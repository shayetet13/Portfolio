const submissions = {
  google: {
    searchConsole: "https://search.google.com/search-console",
    indexing: "https://developers.google.com/search/apis/indexing-api",
    steps: [
      "1. เข้า Google Search Console",
      "2. เพิ่ม Property ใหม่",
      "3. Verify ownership ด้วย HTML tag",
      "4. Submit sitemap.xml",
      "5. Request indexing สำหรับ URL สำคัญ",
    ],
  },
  bing: {
    webmaster: "https://www.bing.com/webmasters",
    steps: [
      "1. เข้า Bing Webmaster Tools",
      "2. Add Site",
      "3. Verify ownership",
      "4. Submit sitemap",
    ],
  },
  yandex: {
    webmaster: "https://webmaster.yandex.com",
    steps: [
      "1. เข้า Yandex Webmaster",
      "2. Add Site",
      "3. Verify ownership",
      "4. Submit sitemap",
    ],
  },
  directories: [
    "https://www.dmoz.org",
    "https://dir.yahoo.com",
    "https://www.business.com",
    "https://www.hotfrog.com",
    "https://www.brownbook.net",
  ],
};

console.log("🔍 SEO Submission Guide:");
console.log(JSON.stringify(submissions, null, 2));
