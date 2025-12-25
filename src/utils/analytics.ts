// Simple analytics utility for development
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "GA_MEASUREMENT_ID", {
      page_title: title,
      page_location: url,
    });
  }
  console.log(`Page view tracked: ${title} - ${url}`);
};

export const trackEvent = (
  action: string,
  category: string = "engagement",
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  console.log(`Event tracked: ${action} - ${category} - ${label}`);
};

export const trackScrollDepth = (depth: number) => {
  trackEvent("scroll", "engagement", `${depth}%`, depth);
};

export const trackTimeOnPage = (seconds: number) => {
  trackEvent("time_on_page", "engagement", "seconds", seconds);
};

export const trackCustomEvent = (
  eventName: string,
  parameters: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
  console.log(`Custom event tracked: ${eventName}`, parameters);
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
