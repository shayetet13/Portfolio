/// <reference types="vite/client" />
/// <reference types="node" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
  readonly VITE_SITE_NAME: string;
  readonly VITE_ENVIRONMENT: string;
  readonly VITE_LINE_ID: string;
  readonly VITE_FACEBOOK_URL: string;
  readonly VITE_TWITTER_URL: string;
  readonly VITE_TIKTOK_URL: string;
  readonly VITE_TELEGRAM_URL: string;
  readonly VITE_EMAIL: string;
  readonly VITE_ANALYTICS_ENABLED: string;
  readonly VITE_TRACKING_ID: string;
  readonly VITE_CDN_URL: string;
  readonly VITE_ENABLE_PWA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Add global NodeJS namespace for browser environment
declare global {
  namespace NodeJS {
    interface Timeout {
      _idleTimeout: number;
    }
  }
}

// Alternative timeout types for browser environment
type TimeoutId = ReturnType<typeof setTimeout>;

declare global {
  type NodeJSTimeout = TimeoutId;
}
