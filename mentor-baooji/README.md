# Mentor Baooji — Website

**Status:** Phase 1 complete. Do not extend beyond Phase 1 scope until reviewed and approved.

## Phase 1 scope (this delivery)

- Global design system (tokens, typography, buttons)
- Folder structure
- Navigation (desktop + accessible mobile off-canvas menu)
- Hero section
- Footer
- Responsive layout primitives
- Accessibility baseline (WCAG 2.2 AA target)
- SEO meta (title, description, canonical, Open Graph, Twitter Card)
- Performance optimization baseline (font loading, resource hints, deferred JS)

No other pages, sections, or schema markup (Person/FAQ/Breadcrumb) have been
built yet — these belong to later phases per the approved v3 architecture.

## Folder structure

```
mentor-baooji/
├── index.html                  Homepage (Phase 1: Hero only, in main)
├── assets/
│   ├── css/
│   │   ├── variables.css       Design tokens — single source of truth
│   │   ├── base.css            Reset + global element defaults
│   │   ├── typography.css      Type scale, headings, eyebrow/signature mark
│   │   ├── layout.css          Container, section rhythm, grid utilities
│   │   ├── navigation.css      Header + mobile off-canvas nav
│   │   ├── hero.css            Hero section layout
│   │   ├── footer.css          Footer layout
│   │   ├── buttons.css         Button component variants
│   │   └── accessibility.css   Focus states, reduced motion, a11y overrides
│   ├── js/
│   │   ├── navigation.js       Mobile nav: open/close, focus trap, Escape key
│   │   └── main.js             Lightweight global enhancements
│   └── images/                 Place baooji-portrait.jpg here (800x1000+)
└── README.md
```

## Notes for next phase

- **Image required:** `assets/images/baooji-portrait.jpg` is referenced but
  not included — drop in a real portrait (recommend ≥1600px wide source,
  will be optimized/resized per the Image Optimization strategy when the
  build pipeline is added).
- **WhatsApp link:** replace `https://whatsapp.com/channel/your-channel-id`
  in `index.html` (appears 3 times: desktop nav, mobile nav, footer) with
  the real channel URL before launch.
- **Favicon:** only a placeholder `<link rel="icon">` tag is wired up.
  Full favicon set + manifest is a dedicated Phase-2/production task per
  the approved architecture.
- **CSS loading:** files are linked individually (not bundled) to honor
  the "separate files" requirement. A future phase should introduce a
  build step to concatenate/minify for production without changing the
  source file structure.
- Do not add Blog, Resources, Baooji Says, Philosophy, AI Masterclass, or
  schema markup yet — these are separate, explicitly scoped phases.
