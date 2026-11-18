# UPBEAT recovery inventory

The backup branch `backup/upbeat-before-recovery-d609675` points to `d609675d01c5358af4fcde9aec2e3c82558b8f56`. Recovery work began on `upbeat/emergency-recovery`. The audit compared `d609675d`, `caea1cc0`, `90f420e6`, and `c6b07fbe`.

| Route | Section coverage at the start | Required by the brief | Interactive inventory to retain |
| --- | --- | --- | --- |
| Home 1 | Hero, instrument explorer, ages, performance photo, schedule, instructor index, tempo | Studio instruction and rehearsal, performance gallery, enrollment invitation | `#instruments`, `data-explorer`, preview filter and enrollment buttons, `data-batch-preview`, `data-mentors="compact"`, instructor links, `data-tempo`, `data-tap`, `data-reset`, age and instrument links |
| Home 2 | Text introduction, finder, lesson, collapsed weekly preview, links | Photographic introduction, instrument previews, practice progression, visible timetable, instructors and enrollment | `#path-finder`, `#lab-finder-title`, `data-finder="path"`, four `data-lab-choice` shortcuts, learner-group radios, select filters, reset, results, course and enrollment actions, `data-batch-preview="journey"` |
| About | Introductory photograph, lesson philosophy, age options, links | Studio environment, practice to performance, instructor introduction, enrollment invitation | `#approach`, course and batch links for all three age groups, Fees & Batches, Instructors, Contact |
| Courses | Instrument shortcuts, course comparison and links | Instrument-specific lesson information and help choosing a level | `#course-finder`, four `data-catalogue-choice` links, `data-finder="courses"`, all 36 options, three filters, course detail disclosures, filtered batch links |
| Instructors | Four teaching profiles, individual and group guidance, links | Photo-led introduction and dedicated section for next steps | `#teaching-profiles`, `data-mentors="full"`, four `#mentor-*` anchors, two actions per profile |
| Fees & Batches | Schedule and fees introduction, finder, enrollment note | Fee and billing guidance, common questions | `#batch-finder`, `data-finder="batches"`, five filters, reset, show more, enrollment review and fee-topic shortcut |
| Contact | Introduction, topic shortcuts, form, visit guidance, FAQ, links | Distinct visual treatment for these areas | Four `data-topic` links, `#enquiry`, `data-contact`, name/email/topic/message inputs, URL preselection, draft dialog and download, six FAQs |
| Login and Sign Up | Standalone forms and home-linked brand | Preserve and verify | Local validation, password visibility, Login remember/recovery controls, provider feedback, links between forms |
| Student Dashboard | Eight mounted views and local workspace | Preserve and verify | Overview, Browse & Enroll, My Courses, Schedule, Attendance, Progress, Fees, Profile & Settings, reset, persisted records |

The comparison found the last commit altered presentation in the explorer, course finder, instrument copy and instructor preview. The shared batch dataset, enrollment state, dashboard modules and contact draft handler were outside that change. Recovery uses those existing modules and preserves physical routes.

## Verified recovery

| Route | `d609675d` HTML sections | `caea1cc0` HTML sections | Recovery | Restored or refined |
| --- | ---: | ---: | ---: | --- |
| Home 1 | 7 | 9 | 9 | Three-image studio feature, dedicated performance gallery, instructor photography, enrollment invitation, and a timetable filter for both day and instrument |
| Home 2 | 2 | 7 | 7 | Photo introduction, live instrument previews, typical lesson, progression, open timetable, level guidance, and enrollment action |
| About | 2 | 6 | 6 | Teaching philosophy, studio environment, age-group options, practice-to-performance sequence, instructors, and enrollment |
| Courses | 1 | 2 | 3 | Instrument practice descriptions, level guidance, and links into the shared schedule |
| Instructors | 2 | 3 | 3 | Photo introduction, four named instrument profiles with all teaching topics and related links, individual and group guidance, and next steps |
| Fees & Batches | 2 | 2 | 3 | Schedule and fee comparison, billing guidance, and questions about fees, confirmation, time zones, and saved requests |
| Contact | 5 | 5 | 5 | Separate first-visit guidance, topic selection, review and download form, six FAQs, and course links |

### Browser and source checks

- Reviewed real Brave Chromium screenshots of all ten routes at 1440 px, 820 px in dark RTL, and 390 px. Screenshots showed a desktop hero crop that hid part of the subjects’ heads and a mobile instrument shortcut that wrapped onto a row by itself. The final captures verify adjusted framing and an even mobile shortcut layout.
- Passed 1,204 responsive checks across 28 widths in light and dark modes and LTR and RTL. The matrix also exercised the seven dashboard panels beyond Overview.
- Passed the desktop journey for all four instruments and verified fee and schedule consistency, duplicate prevention, and record persistence. Repeated enrollment and enquiry selection at 390 and 820 px. Checked the restored Home 2 links and both timetable preview filters.
- Verified the tempo calculation and reset, Contact query preselection and draft download, form validation, account navigation and feedback, sticky navigation, dropdowns, compact drawers, and theme and direction persistence.
- Checked populated attendance, fees and payments, progress, and schedule with isolated browser fixtures. Dashboard, auth and contact handlers and the shared batch and student data files match the starting commit.
- Checked the section inventory, dynamic mounts, public anchors, unique IDs, form fields, all local image source sets and links, JavaScript syntax, and the staged diff. Photographs were reselected from the existing licensed library. [Asset credits](asset-credits.md)

### Rendered site and history

[Desktop routes](screenshots/upbeat-recovery-desktop.jpg) · [Tablet routes in dark RTL](screenshots/upbeat-recovery-tablet-rtl.jpg) · [Phone homepage](screenshots/upbeat-recovery-phone.jpg)

[Home 2 in all three revisions](screenshots/upbeat-recovery-home2-comparison.jpg) · [About in all three revisions](screenshots/upbeat-recovery-about-comparison.jpg)
