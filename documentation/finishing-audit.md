# Targeted finishing audit

Baseline commit is f13d0dccb46a2ed00361506af5595a7f0b293e39, preserved as backup/upbeat-before-finishing-f13d0dc.

The Home 1 explorer now places the instrument tabs across the top of a compact studio panel. The selected instrument is named explicitly above its description, topics, age groups, levels, and course action. The four course cards and every homepage section remain present.

Course comparisons use a single column, placing each overview above its full-width options. Expanding options grows the module downward without creating a tall empty overview column. Native details and summary retain keyboard behavior. Summaries use consistent padding, focus and hover states, and an inline-end plus/minus indicator in both text directions. No additional pixel artwork was needed.

The separate “Lessons from the 15 most recently worked-on website projects” document was not found in the available attachments or workspace. The supplied recurring-flaws checklist guided the audit.

Brave browser verification passed 160 route/width checks across all ten routes at 320, 390, 430, 768, 820, 1024, 1280, and 1440 px in light LTR and dark RTL. Additional checks covered all four explorer selections and keyboard navigation, image fallback, collapsed and expanded options, one/several/all course matches, reset, filtered batch links, saved enrollment and reload persistence, every dashboard panel, tempo, sticky navigation, dropdown dismissal, back-to-top, mobile drawer, persisted preferences, enquiry draft download, and password visibility. Login and Sign Up still omit the dashboard shortcut.

The audit found no additional regressions requiring unrelated changes. Existing state, attendance, progress, fees, auth and contact handlers were preserved. The changes are limited to the two component styles and the explorer’s title and tab orientation.

[Explorer](screenshots/upbeat-finishing-explorer.png) · [Collapsed comparison](screenshots/upbeat-finishing-collapsed.png) · [Expanded comparison](screenshots/upbeat-finishing-expanded.png)
