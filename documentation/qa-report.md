# UPBEAT 2.0 design and regression QA

## Design changes

The New Wave Music Studio identity uses ultraviolet `#7038E8`, lilac `#BBA2FF`, a cool light canvas, and neutral ink in both themes. Space Grotesk is used for display text, with Public Sans for body copy and controls. The new angular pulse is a vector mark used in the wordmark and favicon. A composed violet mosaic appears in the Home 1 hero and closing panel.

| Page | Visual change |
| --- | --- |
| Home 1 | Editorial “Find your sound.” hero with monochrome performance photography and two direct calls to action. The page follows with a connected instrument explorer, a two-photo lesson feature, an asymmetric performance showcase, age pathways, schedule rows, mentor photography, and a tap indicator. |
| Home 2 | Piano close-up, a compact lesson-planning hero, numbered learning steps, an asymmetric instrument spotlight, and quieter practice and guidance sections. |
| Courses | Photo-led category links reflect the selected instrument. Square-edged instrument modules keep course details, filters, and batch links in view. |
| Instructors | Feature profile and open directory layout, with a licensed vocal coaching photograph and the original course and batch links. |
| Fees & Batches | Schedule-first header, compact filter controls, stronger price hierarchy, and a neutral backdrop. |
| Contact | Compact two-column layout for enquiry preparation and visit information, with a single-column phone layout. |
| Login and Sign Up | Standalone forms with the new wordmark, violet accents, and visible form focus. |
| Student Dashboard | Restrained neutral surfaces, a clearer active navigation state, quieter section headings, and stronger contrast for numeric and empty states. |

The sticky navbar retains its existing destinations and controls. Footer navigation keeps its groups and photography credits, with accent-colored hover and active states, visible keyboard focus, and no permanent underlines. The floating back-to-top remains available.

The hero guitarist, stage ensemble, piano study, guitar detail, and vocal coaching are licensed photographs. [Photography, artwork, and font credits](asset-credits.md)

## Visual evidence

- [Home 1 desktop](screenshots/upbeat2-hero-desktop.jpg)
- [Home 1 phone](screenshots/upbeat2-hero-phone.jpg)
- [Home 1 tablet in dark RTL](screenshots/upbeat2-hero-tablet-rtl.jpg)
- [Home 2 desktop](screenshots/upbeat2-home2.jpg)
- [Dashboard attendance in dark RTL](screenshots/upbeat2-dashboard-dark-rtl.jpg)

The first hero and explorer were inspected at 390, 820, and 1440 px before applying the design system elsewhere. The next pass covered the nine page layouts and all dashboard sections. It included representative full-page captures, both themes and directions, and 17 widths from 320 through 1920 px. Visual revisions reduced catalogue spacing, balanced the Home 2 title and piano image, and corrected outlined English punctuation in RTL.

## Functional regression

Tests were run in Brave Chromium via Playwright against the static project subpath. The original QA scenarios provided the baseline.

- Checked sticky positioning while scrolling at 320, 390, 820, 1024, 1180, and 1440 px, plus desktop Home menu, compact drawers, focus restoration, Escape, theme and direction persistence, footer link styling, and back-to-top.
- Exercised the four instrument tabs, keyboard navigation, image switching and forced image fallback, course category links and selected states, the 36 course options, combined filters, empty states, and progressive batch loading.
- Ran Guitar, Keyboard, Vocals, and Drums through course selection, batch review, local enrollment, schedule and fee comparison, duplicate prevention, reload, and workspace reset. Also enrolled through the dashboard.
- Opened every dashboard section and verified profile saving and reload, class details, empty progress notes, attendance calculations, and approved-payment behavior. Attendance and billing fixtures were injected only during tests.
- Tested contact validation and draft download, login and signup validation, password visibility, provider and account recovery feedback, and timed tempo calculation and reset.

## Production handoff

The project still runs as physical HTML pages with local CSS, JavaScript, photos, and fonts. Its GitHub Pages branch-root configuration and `.nojekyll` remain in place. Login, OAuth, account recovery, enquiry delivery, enrollment confirmation, instructor-managed records, and billing require production integrations.

The original release screenshots remain in this folder for comparison. [Previous hero](screenshots/hero-after.jpg) · [Previous course page](screenshots/courses-after.jpg)
