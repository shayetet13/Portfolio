// Google Analytics 4 tracking functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const gtag = (...args: any[]) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  gtag("config", "G-XXXXXXXXXX", {
    page_title: title,
    page_location: url,
  });
};

// Track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track custom events
export const trackCustomEvent = (
  eventName: string,
  parameters: Record<string, any>
) => {
  gtag("event", eventName, parameters);
};

// Core Web Vitals optimization
export const trackSEOMetrics = () => {
  // Track core web vitals
  if (typeof window !== "undefined" && "performance" in window) {
    // First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          console.log("FCP:", entry.startTime);
        }
      }
    });
    observer.observe({ entryTypes: ["paint"] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log("LCP:", entry.startTime);
      }
    });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
  }
};

export const trackUserEngagement = () => {
  let startTime = Date.now();
  let maxScroll = 0;

  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100
    );
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
    }
  };

  const trackSession = () => {
    const sessionTime = Math.round((Date.now() - startTime) / 1000);
    console.log(`Session time: ${sessionTime}s, Max scroll: ${maxScroll}%`);
  };

  window.addEventListener("scroll", trackScroll);
  window.addEventListener("beforeunload", trackSession);

  return () => {
    window.removeEventListener("scroll", trackScroll);
    window.removeEventListener("beforeunload", trackSession);
  };
};
