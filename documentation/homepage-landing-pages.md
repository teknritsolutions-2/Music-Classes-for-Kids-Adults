# Two UPBEAT landing pages

Baseline commit: `65109b87b6eb3b1a9c083e699d0cc59b0d669087`. The backup branch is `backup/upbeat-before-landing-pages-65109b8`.

| Route | Section inventory before changes | Interactive mounts and links |
| --- | --- | --- |
| Home 1 | Academy hero and four program links, instrument explorer, studio teaching and practice, age groups, performance and rehearsal, weekly classes, instructors, tempo, and enrollment | `#studio-title`, `#instruments`, `data-explorer=""`, `data-batch-preview=""`, `data-mentors="compact"`, `data-tempo`, tap/reset controls, course links for all instruments, course and batch links for all age groups, enrollment and contact actions |
| Home 2 | Instrument preview, class finder, instrument comparison, typical lesson, selectable progression, weekly schedule, instructor guidance, and enrollment | `#path-finder`, `#lab-finder-title`, `data-finder="path"`, `data-explorer="lab"`, `data-lab-choice` shortcuts, selectable stages, `data-batch-preview="journey"`, course and enrollment links, and instructor/contact actions |

The work covers the two homepages. The shared course and batch data, navigation, and dashboard and account pages remain on the existing routes.

## Implemented layouts

- **Home 1:** A light split hero, four course cards, and the working Instrument Explorer. A single teaching photo introduces the academy’s approach. Aligned learner-group cards lead into a dark performance feature with optional rehearsal photos. The weekly preview, instructor links and teaching descriptions, tempo tool, and enrollment invitation are present.
- **Home 2:** A full-width rehearsal photo and class-finder action lead directly to the existing filter panel. Landscape instrument cards link to courses and set the finder. The previous interactive instrument preview remains available below the cards. A four-step overview precedes the existing selectable stages, lesson and schedule sections, instructor guidance, short FAQ, and enrollment invitation.
- Both layouts use photographs already credited in the repository, with the original ultraviolet palette, fonts, and angular mark. The pixel mosaic appears as a small accent on the Home 1 hero frame. Homepage-specific CSS loads on those two routes.

## Browser verification

Brave Chromium passed **1,364 responsive checks** across 32 widths, both themes, and both text directions, including the dashboard panels. Full-page reviews covered both homepages at 1440, 1024, 820, and 390 px. The mobile hero keeps the entire rehearsal photograph across the top, and the 1024 × 768 review confirms the photo and finder entry points remain visible in landscape.

Regression tests covered the Home 1 explorer, course links, both schedule previews, tempo and reset, Home 2 finder and instrument synchronization, all four instruments through enrollment, duplicate prevention, state persistence, the learning stages, sticky header, mobile navigation, back-to-top, contact drafts, and account controls. Representative enrollment, finder, and course flows also passed at 390 and 820 px. Populated dashboard fixtures exercised attendance, progress notes, fees, and schedules.

All eight protected HTML routes and the shared course and batch data match the baseline. The login and sign-up shortcut remains absent, and the Student Dashboard is available through public navigation.

[Home 1 full desktop](screenshots/upbeat-landing-home-desktop.jpg) · [Home 2 full desktop](screenshots/upbeat-landing-home2-desktop.jpg)

[Phone](screenshots/upbeat-landing-phone.jpg) · [Tablet dark RTL](screenshots/upbeat-landing-tablet-rtl.jpg) · [Landscape tablet](screenshots/upbeat-landing-tablet-landscape.jpg) · [Photography credits](asset-credits.md)
