import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPerformanceMonitoring } from "./utils/performance.ts";

// Initialize performance monitoring
initPerformanceMonitoring();

// Initialize app with performance optimizations
const initializeApp = () => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Remove loading screen after app mounts
  requestAnimationFrame(() => {
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
      loadingElement.style.opacity = "0";
      setTimeout(() => {
        loadingElement.style.display = "none";
      }, 300);
    }
  });
};

// Start the app
initializeApp();

// Report any runtime errors to analytics
window.addEventListener("error", (event) => {
  if (window.gtag) {
    window.gtag("event", "javascript_error", {
      event_category: "Error",
      event_label: event.message,
      value: 1,
    });
  }
});

window.addEventListener("unhandledrejection", (event) => {
  if (window.gtag) {
    window.gtag("event", "promise_rejection", {
      event_category: "Error",
      event_label: event.reason?.toString() || "Unknown",
      value: 1,
    });
  }
});

