# UPBEAT Music Academy

UPBEAT is a static, responsive music academy site with two homepages, About, a course catalogue, instructor profiles, a batch finder, contact, standalone login and signup, and a Student Dashboard. It uses HTML, CSS, and native JavaScript modules.

## Run locally

From the project root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Serve the files over HTTP so the browser can load native modules.

## GitHub Pages

Serve the root of the `main` branch through **Settings → Pages → Deploy from a branch**. There is no build step. Keep `.nojekyll` and the physical HTML files under `pages/`. They support project-subpath URLs, direct page access, and refresh.

## Update academy information

- Edit courses, learner groups, levels, and illustrative instructor profiles in `assets/js/course-data.js`.
- Edit weekly schedules and indicative INR fees in `assets/js/batch-data.js`. Public cards, enrollment review, and dashboard read this source.
- Update approved photography and its [asset credits](documentation/asset-credits.md) together.
- Studio location, visit hours, and enquiry delivery can be added once supplied.

## Local workspace and production services

The dashboard opens without an account. Enrollment requests and limited profile preferences are saved in the current browser. A request does not reserve a seat, generate a charge, or create an attendance record. Reset clears the workspace. Theme and layout direction are site preferences and survive a workspace reset.

Production requires authentication and recovery, academy-managed enrollment and class records, secure learner profiles, instructor-managed attendance and progress, enquiry delivery, and an approved billing and payment integration. The current data model exposes empty staff-managed records. Login, signup, provider sign-in, and payment controls explain service availability. The contact form can generate a draft file locally.

See the [QA report](documentation/qa-report.md) for browser coverage and release verification.
