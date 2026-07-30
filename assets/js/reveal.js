/* ==========================================================================
   SCROLL REVEAL
   Vanilla JS, no dependencies. Adds .is-visible to any [data-reveal]
   element once it enters the viewport. Written as a generic controller
   (not section-specific) so future sections can opt in via the same
   data attribute without touching this file again.

   Progressive enhancement: if IntersectionObserver is unsupported, every
   [data-reveal] element is marked visible immediately — content is never
   permanently hidden.
   ========================================================================== */

(function () {
  "use strict";

  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
