// DOM optimization utilities

export const removeEmptyElements = () => {
  // Remove empty div elements that serve no purpose
  const emptyDivs = document.querySelectorAll("div:empty");
  emptyDivs.forEach((div) => {
    if (
      !div.hasAttribute("data-keep") &&
      !div.className.includes("placeholder")
    ) {
      div.remove();
    }
  });
};

export const simplifyNestedWrappers = () => {
  // Find deeply nested single-child containers and flatten them
  const deepContainers = document.querySelectorAll("div > div:only-child");
  deepContainers.forEach((container) => {
    const parent = container.parentElement;
    const child = container.firstElementChild;

    if (parent && child && !container.hasAttribute("data-required")) {
      // Move child's classes to parent if safe
      const containerClasses = container.className;
      const parentClasses = parent.className;

      if (!parentClasses && containerClasses) {
        parent.className = containerClasses;
        parent.replaceChild(child, container);
      }
    }
  });
};

export const optimizeStaticElements = () => {
  // Convert complex static elements to simpler alternatives
  const staticIcons = document.querySelectorAll("[data-static-icon]");
  staticIcons.forEach((icon) => {
    const simplified = document.createElement("div");
    simplified.className = icon.className + " static-icon";
    simplified.textContent = icon.getAttribute("data-icon-char") || "●";
    icon.parentNode?.replaceChild(simplified, icon);
  });
};

export const initDOMOptimization = () => {
  // Run optimizations after initial render
  setTimeout(() => {
    removeEmptyElements();
    simplifyNestedWrappers();
    optimizeStaticElements();
  }, 1000);
};
