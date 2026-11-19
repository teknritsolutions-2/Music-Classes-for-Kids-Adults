# Responsive image and drawer fixes

Baseline b1f3f36485204693cda8c0af15ad09f8299c0070 is preserved on backup/upbeat-before-responsive-b1f3f36.

Home 1 uses the existing responsive image as a positioned hero background below 1240 px, matching the public navigation breakpoint. Direction-aware overlays, light text, and high-contrast actions sit above it. Mobile uses its own overlay and image position. At 1240 px and above the existing text-and-photo columns remain.

The Home 1 Explorer image stretches to fill its grid column at 760 px and above. The photograph remains undistorted through object fitting, and each instrument has a scoped image position. Below 760 px the panel stacks intentionally. Home 2’s explorer styles are unaffected.

The shared compact drawer is anchored to the physical left. The former RTL inset override was removed. The dashboard uses this same drawer. Existing event handlers provide focus management, scroll locking, backdrop dismissal, Escape, close controls, section navigation and viewport-change dismissal.

Brave checks passed for 72 instrument/width/direction combinations, hero breakpoints, and public and dashboard drawer positioning at 320, 390, 430, 768, 820, 1024, 1180, 1280, and 1440 px. Both light LTR and dark RTL were checked. Actual images were reviewed for all four instruments on tablet, with mobile and desktop hero captures. A separate sitewide suite passed 160 route/width checks, expanded course options, filters, enrollment persistence, dashboard panels, explorer keyboard controls, and tempo.

Changes are confined to homepages.css and the shared drawer inset in style.css. No page markup, data, or JavaScript was changed.

[Phone hero](screenshots/upbeat-responsive-hero-phone.png) · [Tablet hero](screenshots/upbeat-responsive-hero-tablet.png) · [Tablet Explorer](screenshots/upbeat-responsive-explorer-tablet.png)
