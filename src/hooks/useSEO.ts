import { useEffect } from "react";
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
  trackCustomEvent,
} from "../utils/analytics";

interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
}

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    // Track page view
    trackPageView(window.location.href, config.title);

    // Track scroll depth
    let maxScrollDepth = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
        maxScrollDepth = scrollPercent;
        trackScrollDepth(scrollPercent);
      }
    };

    // Track time on page
    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackTimeOnPage(timeSpent);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [config]);
};

// Hook for tracking intersections (for section views)
export const useIntersectionTracking = (
  elementRef: React.RefObject<HTMLElement>,
  sectionName: string
) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackCustomEvent("section_view", {
              section_name: sectionName,
              visibility_ratio: entry.intersectionRatio,
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, sectionName]);
};
