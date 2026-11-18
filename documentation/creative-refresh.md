# Three-page redesign

Baseline: `c18871f443076690cb11399d03d68d66e91eaf3b`.

| Route | Section and interaction inventory |
| --- | --- |
| Home 1 | Studio hero and category links, four-instrument explorer, studio photo story, kids/teens/adults course and batch links, performance gallery, two-filter weekly preview, instructor preview and full profiles, tempo and reset, enrollment and contact actions |
| Home 2 | Introduction, instrument shortcuts and learning previews, four-filter finder with results and empty state, typical lesson, progression, visible weekly schedule, instructor guidance, enrollment action |
| Courses | Instrument category links, three filters, all 36 course combinations and their lengths, course-option disclosures and batch actions, level guidance, schedule and fee links |
| Login and Sign Up | Home-linked logo, local form validation, password visibility, provider feedback, cross-links, plus Login recovery and Remember Me. Both include a dashboard shortcut slated for removal. |

The redesign uses the existing physical routes and the same palette, fonts, photo library, pixel artwork, and shared course and batch records.

## Shipped layouts

- Home 1 uses a dark studio feature with a guitar lesson and a keyboard inset. The active instrument takes over a large stage. Studio instruction uses a staggered photo essay, and performance uses a wide ensemble photo with rehearsal images below. Learner pathways, weekly classes, instructor photographs, tempo, and enrollment all retain their actions.
- Home 2 uses a standalone instrument console. Selecting a tab updates its photo, lesson description, and finder. Changes to the finder or comparison shortcuts also update the preview. The five journey stages expand individually, and the visible timetable, lesson, instrument comparison, guidance, and enrollment sections remain available.
- Courses has a four-image gallery with alternating proportions and a filter panel connected to the selected instrument. The instrument modules display learning topics, age group, level, length, and links to matching batches.
- Login and Sign Up each lost one paragraph containing the dashboard link. The public navigation still provides access to the Student Dashboard.

## Verification

All 1,284 responsive checks passed across 30 viewport widths with light and dark themes and both text directions. The ten routes were rendered in Brave Chromium at 1440, 820, and 390 px. The QA review led to shorter hero heading wraps, a tablet layout with the supporting copy beside the heading, more legible gallery captions, and photo crops that keep the instruments in view.

The interactive tests covered instrument selection, Lab preview and finder synchronization, the learning journey, all three catalogue filters, fee and schedule consistency, enrollment for all four instruments, duplicate prevention, state persistence, contact drafts, tempo and reset, navigation, and account controls and links. Representative enrollment, Lab, Courses, and contact interactions also passed at 390 and 820 px. Dashboard record fixtures verified attendance, fees, class schedules, and progress notes.

About, Instructors, Fees & Batches, Contact, and Student Dashboard retained their source markup and existing behavior. Their before and after captures matched at the three screenshot widths. The shared course, batch, and student data also match the baseline.

[Desktop](screenshots/upbeat-creative-desktop.jpg) · [Tablet in dark RTL](screenshots/upbeat-creative-tablet-rtl.jpg) · [Phone](screenshots/upbeat-creative-phone.jpg) · [Photography credits](asset-credits.md)
