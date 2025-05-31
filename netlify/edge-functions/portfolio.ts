import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Add security headers
  const response = await context.next();
  const headers = new Headers(response.headers);

  // Security headers
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-XSS-Protection", "1; mode=block");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  // Performance headers
  if (url.pathname.includes("/assets/")) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (
    url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/)
  ) {
    headers.set("Cache-Control", "public, max-age=86400");
  }

  // Add CSP for better security with colorful UI support
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; " +
      "img-src 'self' data: https: blob: https://images.unsplash.com https://picsum.photos; " +
      "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com; " +
      "connect-src 'self' https: wss: https://api.github.com; " +
      "media-src 'self' blob:; " +
      "object-src 'none'; " +
      "base-uri 'self'; " +
      "worker-src 'self' blob:; " +
      "child-src 'self' blob:;"
  );

  // Add additional performance headers for colorful assets
  headers.set("X-DNS-Prefetch-Control", "on");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export const config = {
  path: "/*",
};
