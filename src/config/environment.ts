// Environment configuration with fallbacks and multiple Telegram bots
export const config = {
  // Site Configuration
  siteUrl: import.meta.env.VITE_SITE_URL || "https://devnid.netlify.app",
  siteName: import.meta.env.VITE_SITE_NAME || "DevNid Portfolio",
  environment: import.meta.env.VITE_ENVIRONMENT || "development",

  // Telegram Configuration - Multiple Bots
  telegram: {
    // Contact Form Bot
    contact: {
      botToken:
        import.meta.env.VITE_TELEGRAM_CONTACT_BOT_TOKEN ||
        "7499202173:AAH0u99APw0cqEswfLNfuRu447w-QDpLj9c",
      chatId: import.meta.env.VITE_TELEGRAM_CONTACT_CHAT_ID || "471795698",
    },
    // Chat Button Bot
    chat: {
      botToken:
        import.meta.env.VITE_TELEGRAM_CHAT_BOT_TOKEN ||
        "8137827400:AAFsH5HsZqEysesIQN4IejJqcvwz1Qk4m0Y",
      chatId: import.meta.env.VITE_TELEGRAM_CHAT_CHAT_ID || "471795698",
    },
    // Legacy support - ใช้สำหรับ contact form (backward compatibility)
    botToken:
      import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
      "7499202173:AAH0u99APw0cqEswfLNfuRu447w-QDpLj9c",
    chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID || "471795698",
  },

  // Social Media
  social: {
    lineId: import.meta.env.VITE_LINE_ID || "kao_no_limit",
    facebookUrl:
      import.meta.env.VITE_FACEBOOK_URL || "https://www.facebook.com/Comfixit",
    twitterUrl: import.meta.env.VITE_TWITTER_URL || "https://x.com/@Shayetet14",
    tiktokUrl:
      import.meta.env.VITE_TIKTOK_URL || "https://www.tiktok.com/@it_step1",
    telegramUrl: import.meta.env.VITE_TELEGRAM_URL || "https://t.me/up2uok",
    email: import.meta.env.VITE_EMAIL || "shayetet14@protonmail.com",
  },

  // Analytics
  analytics: {
    enabled: import.meta.env.VITE_ANALYTICS_ENABLED === "true",
    trackingId: import.meta.env.VITE_TRACKING_ID || "",
  },

  // Performance
  performance: {
    cdnUrl: import.meta.env.VITE_CDN_URL || "",
    enablePwa: import.meta.env.VITE_ENABLE_PWA === "true",
  },

  // Development flags
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Type safety
export type Config = typeof config;

// Helper functions
export const getApiUrl = (endpoint: string) => {
  const baseUrl = config.isDevelopment
    ? "http://localhost:3000"
    : config.siteUrl;
  return `${baseUrl}/api/${endpoint}`;
};

// Telegram Bot URL helpers
export const getTelegramBotUrl = (botType: "contact" | "chat" = "contact") => {
  const token =
    botType === "contact"
      ? config.telegram.contact.botToken
      : config.telegram.chat.botToken;
  return `https://api.telegram.org/bot${token}`;
};

// Get specific bot configuration
export const getTelegramConfig = (botType: "contact" | "chat" = "contact") => {
  return botType === "contact" ? config.telegram.contact : config.telegram.chat;
};

// Legacy support for backward compatibility
export const getLegacyTelegramBotUrl = () => {
  return `https://api.telegram.org/bot${config.telegram.botToken}`;
};

// Validation function
export const validateConfig = () => {
  const errors: string[] = [];

  // Validate contact bot
  if (!config.telegram.contact.botToken) {
    errors.push("VITE_TELEGRAM_CONTACT_BOT_TOKEN is required");
  }

  if (!config.telegram.contact.chatId) {
    errors.push("VITE_TELEGRAM_CONTACT_CHAT_ID is required");
  }

  // Validate chat bot
  if (!config.telegram.chat.botToken) {
    errors.push("VITE_TELEGRAM_CHAT_BOT_TOKEN is required");
  }

  if (!config.telegram.chat.chatId) {
    errors.push("VITE_TELEGRAM_CHAT_CHAT_ID is required");
  }

  if (config.isProduction && !config.siteUrl.startsWith("https://")) {
    errors.push("VITE_SITE_URL must use HTTPS in production");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Initialize config validation in development
if (config.isDevelopment) {
  const validation = validateConfig();
  if (!validation.isValid) {
    console.warn("Environment configuration issues:", validation.errors);
  }

  // Log bot configurations for debugging
  console.log("Telegram Bots Configuration:");
  console.log(
    "Contact Bot:",
    config.telegram.contact.botToken ? "Configured" : "Missing"
  );
  console.log(
    "Chat Bot:",
    config.telegram.chat.botToken ? "Configured" : "Missing"
  );
}
