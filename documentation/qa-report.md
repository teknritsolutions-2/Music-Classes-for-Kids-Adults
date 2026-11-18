# UPBEAT 3.0 design and regression QA

## Layout changes

| Page | Change |
| --- | --- |
| Home 1 | Two display lines bracket a wide studio photograph to make a single poster composition. Course and batch actions stay in the support line. A vertical instrument rail, lesson collage, stage-and-rehearsal spread, age-group list, timetable, and mentor index each use different layouts. |
| Home 2 | The Sound Lab opens with four instrument photo links connected to the class finder. A rhythm-led learning sequence, instrument spread, practice journal, weekly timetable, and guidance rail support the discovery path. |
| Instructors | A compact magazine masthead leads into four lesson profiles over three compositions. Actual teaching photographs illustrate guitar, keyboard, vocals, and drums. Every profile retains its related course and batch actions. |
| About | New physical route explaining the learning philosophy, studio environment, age groups, and progression toward playing with others. Course, schedule, instructor, and contact links connect the page to the rest of the site. |
| Login and Sign Up | The approved mosaic surrounds both standalone forms. The solid form surfaces provide contrast in both themes. |
| Shared navigation | About is included in desktop and compact menus, the static navigation fallback, and footer Explore. The desktop navbar starts at 1240 px to leave room for the new item. |

The ultraviolet palette, pixel mosaic, and angular mark carry over from the previous release. The new hero, rehearsal, studio, drum lesson, and sheet-music photographs are licensed and illustrative. [Photography and font credits](asset-credits.md)

## Rendered comparison

| Page | Previous live release | UPBEAT 3.0 |
| --- | --- | --- |
| Home 1 | [Prior layout](screenshots/upbeat3-home-before.jpg) | [Poster layout](screenshots/upbeat3-home-after.jpg) |
| Home 2 | [Prior layout](screenshots/upbeat3-lab-before.jpg) | [Sound Lab layout](screenshots/upbeat3-lab-after.jpg) |
| Instructors | [Prior layout](screenshots/upbeat3-faculty-before.jpg) | [Editorial directory](screenshots/upbeat3-faculty-after.jpg) |

Representative captures included [the dark RTL poster at tablet width](screenshots/upbeat3-poster-tablet-rtl.jpg), [the Sound Lab on a phone](screenshots/upbeat3-lab-phone.jpg), [About on a phone](screenshots/upbeat3-about-phone.jpg), [desktop Login](screenshots/upbeat3-login-desktop.jpg), and [dark RTL Sign Up](screenshots/upbeat3-signup-tablet-rtl.jpg). Full-page comparison led to a tighter instructor masthead, a shorter mobile poster, and a compact mentor index.

## Browser regression

Playwright with Brave Chromium was used against the GitHub Pages-style project subpath. The responsive matrix covered 10 pages at 17 widths from 320 to 1920 px, including both sides of the new navbar breakpoint, light and dark modes, and both layout directions. Seven dashboard panels were also checked at three widths in all four mode combinations. All 764 checks passed.

- Exercised desktop and compact About navigation, selected states, About’s batch CTA, Home menu, sticky positioning, drawer dismissal, footer hover and focus, theme and direction persistence, and back-to-top.
- Exercised the instrument rail with a keyboard and a forced image fallback. The Sound Lab’s photo links select an instrument in the connected finder, update matching results, and focus the finder heading. Course and batch filters, empty states, and progressive batch loading were checked.
- Verified the related instructor course link and all 36 course options. Ran all four instruments through local enrollment, fee and schedule comparison, duplicate prevention, reload persistence, and reset.
- Exercised the dashboard’s course, schedule, attendance, progress, fees, and settings flows. Used browser-only fixtures for attendance calculations and approved-payment handling.
- Verified tempo calculation and reset, enquiry draft validation and download, standalone Login and Sign Up, password visibility, mismatch validation, and Google, Apple, and recovery feedback.

The dashboard and enrollment records remain local to the browser. Production authentication, OAuth, account recovery, enquiry delivery, confirmed enrollment, instructor-managed records, and payment processing require integrations.
