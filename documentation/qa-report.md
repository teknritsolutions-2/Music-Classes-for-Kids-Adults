# UPBEAT design and regression QA

## Section design revision

The original project brief flagged repeated image-and-text splits, empty columns, desktop compositions squeezed onto tablets, oversized headings, and cropped subjects. The section review also found that the previous release reduced the mosaic to a mostly hidden hero accent. This revision brings back the original artwork on the main homepage hero, the performance spread, the secondary homepage introduction, and selected supporting sections.

| Page | What changed |
| --- | --- |
| Home 1 | A framed guitar lesson overlaps a compact headline panel. Instrument tabs form a rail on wide screens, lesson photos sit alongside a short studio introduction, and the two-photo performance spread appears earlier in the page. |
| Home 2 | A compact, photo-led introduction leads into the finder. Instrument shortcuts form a directory, and the lesson sequence uses a photo and four practice stages. |
| About | The rehearsal photo and introduction form a single composition. The teaching approach and learner age guide use short editorial panels with the course and batch links intact. |
| Courses | Image links lead into the filtered catalogue from a mosaic masthead. A drum lesson replaces the dark stage silhouette in the shortcut. |
| Instructors | The directory features one teaching profile and keeps the other three aligned with their related course and batch actions. The featured photo and copy were rebalanced after the render exposed a large internal gap. |
| Fees & Batches | The schedule guidance is a compact note, and redundant headings were removed from the comparison and fee guidance. |
| Contact | Topic links sit in a readable directory over the mosaic. The enquiry form, first-visit guidance, FAQs, and related links remain available. |

The browser review covered 23 viewport widths, including the 720 px layout transition, the 1000 px profile grid transition, and the 1240 px navigation breakpoint. It covered both themes and text directions, plus the dashboard panels. The locally verified flows include keyboard instrument selection, the Home 2 finder, filters and enrollment, enquiry drafts, account form validation, and dashboard records.

[Desktop overview](screenshots/upbeat-sections-desktop.jpg) · [Tablet in dark RTL](screenshots/upbeat-sections-tablet-rtl.jpg) · [Phone homepage](screenshots/upbeat-sections-phone.jpg)

## UPBEAT 4.0 baseline

The site uses UPBEAT’s angular mark, ultraviolet actions, cool lilac surfaces, and consistent spacing and controls. The mosaic sits behind the main guitar lesson photo and the standalone account pages. Lessons, studio spaces, and rehearsals illustrate what learners can explore, practice, and play together. [Photography and font credits](asset-credits.md)

### Page layouts

| Page | Rebuild |
| --- | --- |
| Home 1 | A guitar lesson and a small keyboard inset introduce the studio. Instrument tabs, lesson formats, learner groups, sample schedules, rehearsals, instructors, and a tempo tool show how to get started. |
| Home 2 | A keyboard lesson opens a guided path with learner-group choices, instrument links, and a class finder. A weekly timetable and practice guidance follow the results. |
| About | An editorial introduction and wide ensemble image lead into the studio approach, age groups, and progression from first lessons to playing with others. |
| Courses | An instrument photo index leads to a filterable course catalog, clearer course comparisons, and links to batch options. |
| Instructors | A featured teaching profile and image-led instrument profiles connect individual and group lesson guidance to related courses and batches. |
| Fees & Batches | The introduction explains how to read the listings. Compact filters and weekly rows support comparison by schedule, course, level, group, and fee. |
| Contact | Six sections cover the introduction, topic shortcuts, enquiry form, first visit, FAQs, and useful links. Topic links select the corresponding form option and move keyboard focus to it. The form validates, previews, and downloads a local draft. |
| Login | A focused account form uses a solid panel over the approved mosaic, with password visibility and clear feedback for sign-in, recovery, Google, and Apple. |
| Sign Up | The standalone form shares the account layout and provides password requirements and matching confirmation feedback. |
| Student Dashboard | A compact sidebar and top bar frame the overview, schedule timeline, and record panels. Attendance progress reflects stored sessions, and billing displays approved payments. |

Display headlines wrap at a readable scale, with the main home headline around 65 px on desktop and 40 px on a phone. Section headings, body copy, inputs, and buttons use a shared hierarchy. Wider compositions stack into a single reading order on compact screens. The shared header and footer retain route selection, and layout direction and theme controls persist across navigation.

### Rendered review

| Capture | Coverage |
| --- | --- |
| [Desktop](screenshots/upbeat4-desktop.jpg) | All ten routes at 1440 px in light LTR |
| [Tablet](screenshots/upbeat4-tablet-dark-rtl.jpg) | All ten routes at 820 px in dark RTL |
| [Phone](screenshots/upbeat4-phone.jpg) | All ten routes at 390 px in light LTR |
| [Full Contact page](screenshots/upbeat4-contact.jpg) | The complete six-section layout |
| [Dashboard attendance](screenshots/upbeat4-attendance.jpg) | Populated state rendered with isolated browser test records |

Rendered review led to shorter desktop and phone headline wraps, revised teaching photo crops, full-width finder results, and a more compact instructor directory.

### Browser regression

Brave Chromium and Playwright exercised all ten routes at 17 viewport widths from 320 to 1920 px in both themes and both layout directions. Seven dashboard panels were also checked at three widths in all four mode combinations. All 764 layout checks passed. Thirty representative screenshots were checked for horizontal overflow and image loading.

- Verified shared desktop and mobile menus, sticky navigation, route selection, drawer dismissal, keyboard focus, footer links, theme and direction persistence, and back-to-top.
- Exercised Home 1 instrument tabs and image fallback, Home 2 learner-group controls and instrument shortcuts, all 36 course options, and fee and batch filters with their empty and expanded states.
- Exercised local enrollment for all four instruments, comparison filters, duplicate prevention, and dashboard persistence and reset.
- Used isolated browser fixtures for attendance calculations, progress notes, schedule, course records, and approved payments.
- Exercised tempo calculation, contact topic shortcuts and URL preselection, enquiry validation and draft download, password visibility and matching, and recovery and social sign-in feedback.

The site remains static. Authentication, OAuth, password recovery, enquiry delivery, confirmed enrollment, synchronized student records, and payment processing require production integrations.
