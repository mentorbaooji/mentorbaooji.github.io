/* ==========================================================================
   NAVIGATION CONTROLLER
   Vanilla JS. No dependencies. Handles the mobile off-canvas menu:
   open/close, Escape-to-close, focus management, and body scroll lock.
   ========================================================================== */

(function () {
  "use strict";

  const toggle = document.querySelector("[data-nav-toggle]");
  const closeBtn = document.querySelector("[data-nav-close]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const body = document.body;

  if (!toggle || !mobileNav) return;

  let lastFocusedElement = null;

  function getFocusableElements() {
    return mobileNav.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
  }

  function openMenu() {
    lastFocusedElement = document.activeElement;

    mobileNav.setAttribute("data-open", "true");
    toggle.setAttribute("aria-expanded", "true");
    body.classList.add("nav-open");

    const focusable = getFocusableElements();
    if (focusable.length) focusable[0].focus();

    document.addEventListener("keydown", handleKeydown);
  }

  function closeMenu() {
    mobileNav.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
    body.classList.remove("nav-open");

    document.removeEventListener("keydown", handleKeydown);

    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeMenu();
      return;
    }

    // Basic focus trap while the mobile nav is open
    if (event.key === "Tab") {
      const focusable = Array.from(getFocusableElements());
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  toggle.addEventListener("click", function () {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  // Close mobile nav automatically if a link inside it is activated
  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // If viewport is resized past the desktop breakpoint while menu is
  // open, reset state so it doesn't get stuck open behind the desktop nav.
  const desktopBreakpoint = window.matchMedia("(min-width: 900px)");
  desktopBreakpoint.addEventListener("change", function (e) {
    if (e.matches) closeMenu();
  });
})();
