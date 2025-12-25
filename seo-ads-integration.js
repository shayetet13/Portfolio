class SEOAdsIntegration {
  constructor() {
    this.init();
  }

  init() {
    this.trackKeywords();
    this.trackConversions();
    this.setupStructuredData();
  }

  // ติดตาม keywords จาก organic search
  trackKeywords() {
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get("utm_source");
    const utm_medium = urlParams.get("utm_medium");

    if (utm_source === "google" && utm_medium === "cpc") {
      // Track paid traffic
      gtag("event", "ads_click", {
        campaign: urlParams.get("utm_campaign"),
        ad_group: urlParams.get("utm_term"),
      });
    } else if (document.referrer.includes("google.com")) {
      // Track organic traffic
      gtag("event", "organic_visit", {
        referrer: document.referrer,
      });
    }
  }

  // ติดตาม conversions
  trackConversions() {
    // Track form submissions
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
          value: 1.0,
          currency: "THB",
        });
      });
    });

    // Track button clicks
    document.querySelectorAll(".cta-button").forEach((button) => {
      button.addEventListener("click", () => {
        gtag("event", "cta_click", {
          button_text: button.textContent,
        });
      });
    });
  }

  // Setup structured data for better SEO
  setupStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "devvnid",
      url: window.location.origin,
      sameAs: ["https://www.facebook.com/Comfixit", "https://x.com/@Shayetet14"],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new SEOAdsIntegration();
});
