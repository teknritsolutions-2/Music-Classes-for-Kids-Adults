# UPBEAT implementation and QA

## Design and scope

UPBEAT uses a four-bar rhythm mark, Bricolage Grotesque display type, Public Sans for body text, midnight ink, coral, chalk and mist. Dark mode uses a neutral ink canvas and a lighter coral accent. Home 1 opens with an ensemble rehearsal photograph. Home 2 starts with an individual lesson and leads to the learning-path filters. The dashboard uses a compact workspace layout with a sidebar or modal navigation drawer.

The nine primary routes are Home 1, Home 2, Courses, Instructors, Fees & Batches, Contact / Visit, Login, Sign Up, and Student Dashboard. The four instrument tracks share a catalogue of 36 age- and level-specific course options and corresponding indicative batches. Instructor records are illustrative and photography depicts stock subjects.

## Browser coverage

Brave Chromium was driven with Playwright against HTTP, including a repository subpath that mirrors GitHub Pages. Each route was checked in light and dark mode with both layout directions at 320, 360, 390, 425, 430, 768, 820, 960, 1024, 1099, 1100, 1159, 1160, 1180, 1280, 1440, and 1920 px. The 768 and 1024 px passes used heights of 1024 and 768 px respectively. All dashboard sections were opened, with additional panel checks at 320, 820, and 1440 px. Representative mobile, tablet, and desktop screenshots were visually reviewed for type, gutters, media framing, navigation, and card density.

| Area | Browser checks |
| --- | --- |
| Navigation and preferences | Home dropdown, keyboard dismissal, mobile drawer and scroll lock, return focus, dashboard drawer, theme and direction across page loads, back-to-top |
| Discovery | Instrument tab keyboard navigation, changed photo and content, recovery from a forced image error, combined course and schedule filters, useful empty states, progressive batch loading |
| Enrollment | Guitar, keyboard, vocals, and drums from course filters through matching batch, review, local save, My Courses, schedule and fee comparison, duplicate prevention, reload, and reset. Also exercised directly inside the dashboard. |
| Academic and billing records | Empty attendance and progress panels, tentative weekly sessions and class details, no charge for local requests, and accurate percentage and invoice balance using browser test fixtures. The fixtures were injected only during verification. |
| Profile | Save, reload, safe display of entered text, cancel reset, confirm reset, and exit |
| Contact and authentication | Required fields, downloadable unsent enquiry draft, password visibility, mismatch validation, reset and provider availability feedback, no locally stored password |
| Tempo | Timed half-second taps returned approximately 120 BPM and reset returned to the initial state |

## Recurring problems prevented from previous projects

The reference review used the local checkouts of Travel Agency, Yoga, Courier, and School Bus, plus the lessons document from the previous 15 projects.

- Wide layouts no longer leave a large gap above the course filters. The shared page-intro spacing and display tracking were corrected after the first browser review. [Before](screenshots/courses-before.jpg) · [After](screenshots/courses-after.jpg)
- The hero retains a readable photo overlay and the musician’s face and instrument on desktop, with a photo-first stack at mobile widths. Tracking and crop were adjusted after viewing the first samples. [Before](screenshots/hero-before.jpg) · [After](screenshots/hero-after.jpg)
- English punctuation retains its reading order in RTL while the layout aligns to the right. The hero photo was reframed to keep the musician visible. [Before](screenshots/hero-rtl-before.jpg) · [After](screenshots/hero-rtl-after.jpg)
- The shared navigation uses native dialogs for compact widths. Browser checks exercised scroll locking, Escape and restored focus. Theme and direction initialize before CSS renders.
- One batch source supplies public fees, review details, and dashboard billing. Four full enrollment journeys compared prices and weekly session times. Browser fixtures also verified that unapproved payments and payments for another invoice cannot reduce a charge.
- Photos and fonts are served locally. The instrument explorer recovered after an image request was deliberately failed. Source, photographer, license, and resizing are recorded in the [asset credits](asset-credits.md).

## Production handoff

The frontend supports branch-root GitHub Pages hosting through physical HTML pages, relative asset paths, and `.nojekyll`. Production requires academy-approved schedules, fees, instructor profiles and visit details, plus server-side authentication, enrollment confirmation, student records, enquiry delivery, and billing. The browser workspace contains local requests and an optional limited profile.
