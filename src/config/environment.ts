// src/config/environment.ts
// Environment configuration with fallbacks — NO TELEGRAM

const config = {
  // Site Configuration
  siteUrl: import.meta.env.VITE_SITE_URL || "https://devnid.xyz",
  siteName: import.meta.env.VITE_SITE_NAME || "DevNid Portfolio",
  environment: import.meta.env.VITE_ENVIRONMENT || "development",

  // Social Media
  social: {
    lineId: import.meta.env.VITE_LINE_ID || "kao_no_limit",
    facebookUrl:
      import.meta.env.VITE_FACEBOOK_URL || "https://www.facebook.com/Comfixit",
    twitterUrl: import.meta.env.VITE_TWITTER_URL || "https://x.com/@Shayetet14",
    tiktokUrl:
      import.meta.env.VITE_TIKTOK_URL || "https://www.tiktok.com/@it_step1",
    telegramUrl: import.meta.env.VITE_TELEGRAM_URL || "https://t.me/up2uok",
    email: import.meta.env.VITE_EMAIL || "shayeket14@protonmail.com",
  },

  // Analytics
  analytics: {
    enabled: import.meta.env.VITE_ANALYTICS_ENABLED === "true",
    trackingId: import.meta.env.VITE_TRACKING_ID || "",
  },

  // Other configurations
  app: {
    cdnUrl: import.meta.env.VITE_CDN_URL || "",
    enablePwa: import.meta.env.VITE_ENABLE_PWA === "true",
  },

  // Environment flags
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default config;
export type Config = typeof config;

// Helper functions
export const getApiUrl = (endpoint: string) => {
  const baseUrl = config.isDevelopment
    ? "http://localhost:3000"
    : config.siteUrl;
  return `${baseUrl}/api/${endpoint}`;
};