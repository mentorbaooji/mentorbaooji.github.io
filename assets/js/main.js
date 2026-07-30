/* ==========================================================================
   MAIN.JS
   Minimal, dependency-free progressive-enhancement layer for Phase 1.
   Kept deliberately small — brand-pillar pages should feel closer to a
   static document than an app (see performance strategy in blueprint).
   ========================================================================== */

(function () {
  "use strict";

  // Mark JS as available for CSS hooks that want to progressively
  // enhance (e.g. hiding a no-JS fallback message if one is ever added).
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js-enabled");

  // Current-year footer stamp — avoids a stale hard-coded copyright year.
  const yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Adds aria-current="page" to the nav link matching the current path.
  // Written defensively so it never throws on file:// or unusual paths.
  try {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      const linkPath = link.getAttribute("href").split("/").pop();
      if (linkPath === currentPath) {
        link.setAttribute("aria-current", "page");
      }
    });
  } catch (err) {
    /* Fail silently — non-critical enhancement */
  }
})();
