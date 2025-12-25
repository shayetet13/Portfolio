// filepath: c:\Users\Administrator\Desktop\port\src\utils\performance.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB } from "web-vitals";

interface WebVitalMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
}

// Log metrics to console only in development and only important ones
const logWebVital = (metric: WebVitalMetric) => {
  // Only log LCP and CLS in development to reduce console noise
  if (import.meta.env.DEV && ["LCP", "CLS"].includes(metric.name)) {
    console.log(`${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
    });
  }

  // Send to analytics in production
  if (import.meta.env.PROD && window.gtag) {
    window.gtag("event", "web_vital", {
      event_category: "Performance",
      event_label: metric.name,
      value: Math.round(metric.value),
      custom_map: {
        metric_rating: metric.rating,
      },
    });
  }
};

export const initPerformanceMonitoring = () => {
  // Measure Core Web Vitals with proper web-vitals v3+ syntax
  onCLS(logWebVital);
  onFID(logWebVital);
  onFCP(logWebVital);
  onLCP(logWebVital);
  onTTFB(logWebVital);

  // Additional performance observers
  if ("PerformanceObserver" in window && import.meta.env.PROD) {
    // Only enable performance observers in production to reduce development noise
    // Long Task Observer
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn("Long task detected:", entry.duration + "ms");

            if (import.meta.env.PROD && window.gtag) {
              window.gtag("event", "long_task", {
                event_category: "Performance",
                value: Math.round(entry.duration),
              });
            }
          }
        });
      });
      longTaskObserver.observe({ type: "longtask", buffered: true });
    } catch (e) {
      console.log("Long task observer not supported");
    }

    // Layout Shift Observer - only log significant shifts
    try {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (entry.hadRecentInput) return;

          // Only log significant layout shifts (> 0.1) to reduce console spam
          if (entry.value > 0.1) {
            console.log("Significant layout shift:", entry.value);
          }

          if (import.meta.env.PROD && window.gtag) {
            window.gtag("event", "layout_shift", {
              event_category: "Performance",
              value: entry.value,
            });
          }
        });
      });
      layoutShiftObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      console.log("Layout shift observer not supported");
    }
  }

  // Page visibility tracking
  document.addEventListener("visibilitychange", () => {
    if (import.meta.env.PROD && window.gtag) {
      window.gtag("event", "page_visibility", {
        event_category: "Engagement",
        event_label: document.hidden ? "hidden" : "visible",
      });
    }
  });
};

// Export for external use
export { logWebVital };

