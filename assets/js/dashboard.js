import './enrollment.js';
import { attendancePanel, attendanceSummary } from './attendance.js';
import { batchDetails, empty, mountFinder, selectField } from './batch-finder.js';
import { days, getBatch, money } from './batch-data.js';
import { getCourse, getInstrument } from './course-data.js';
import { openDialog } from './dialog.js';
import { feesPanel, openPaymentDetails, paymentStatus } from './fees.js';
import { preferences, updatePreferences } from './main.js';
import { formatSession, nextSession, scheduleLine, upcomingSessions } from './schedule.js';
import { brand, buttonLink, escapeHTML, icon, page } from './site-config.js';
import {
  academicRecords,
  readWorkspace,
  resetWorkspace,
  saveProfile,
  studentBatches,
} from './student-data.js';

const sections = [
  ['overview', 'Overview', 'See your courses, weekly schedule, and academic updates.'],
  ['enroll', 'Browse & Enroll', 'Find a studio batch and review its schedule and indicative fee.'],
  ['my-courses', 'My Courses & Batches', 'Review batches you have requested and track their status.'],
  [
    'schedule',
    'Class Schedule',
    'See when your selected batches meet. Requested sessions are tentative.',
  ],
  ['attendance', 'Attendance', 'View sessions recorded by the academy.'],
  ['progress', 'Progress Notes', 'Review practice guidance recorded by your instructor.'],
  [
    'fees',
    'Fees & Payments',
    'Compare indicative fees and review confirmed charges and payment history.',
  ],
  ['settings', 'Profile & Settings', 'Customize this browser’s student workspace.'],
];
const host = document.querySelector('[data-dashboard]');
const navigation = () =>
  `<nav class="dash-nav" aria-label="Student workspace">${sections
    .map(([id, name]) => `<a data-section="${id}" href="#${id}">${name}</a>`)
    .join('')}</nav>`;
host.innerHTML = `
  <a class="skip" href="#workspace">Skip to workspace</a>
  <aside class="dash-sidebar" aria-label="Dashboard navigation">
    ${brand()}${navigation()}<div class="dash-side-tools">${preferences()}<a href="${page()}">Exit dashboard</a></div>
  </aside>
  <dialog class="drawer" id="student-navigation" aria-label="Dashboard navigation">
    <div class="drawer-top">${brand()}<button type="button" class="icon-button" data-close aria-label="Close dashboard navigation" autofocus>${icon('close')}</button></div>
    ${navigation()}<div class="dash-side-tools">${preferences()}<a href="${page()}">Exit dashboard</a></div>
  </dialog>
  <div class="dash-main">
    <header class="dash-top"><div class="compact-brand">${brand()}</div><strong class="dash-top-label">Student Dashboard</strong>
      <button type="button" class="icon-button dash-toggle" data-open="student-navigation" aria-label="Open dashboard navigation" aria-haspopup="dialog">${icon('menu')}</button>
      <a class="button dash-top-link" href="${page('courses')}">Explore courses</a>
    </header>
    <section class="dash-content" id="workspace" aria-labelledby="workspace-title" tabindex="-1">
      <header class="dash-title"><h1 id="workspace-title" tabindex="-1"></h1><p class="muted"></p></header>
      <div class="dash-stack" data-panel></div>
    </section>
  </div>`;
updatePreferences();

const panel = host.querySelector('[data-panel]');
const title = host.querySelector('#workspace-title');
const titleCopy = host.querySelector('.dash-title p');
const drawer = host.querySelector('#student-navigation');
const compact = matchMedia('(min-width: 1100px)');
compact.addEventListener('change', (event) => {
  if (event.matches && drawer.open) drawer.close();
});

function notes() {
  return academicRecords.notes
    .filter((note) => getBatch(note.batchId))
    .sort((a, b) => b.date.localeCompare(a.date));
}

function overview(workspace, records) {
  const { percent } = attendanceSummary();
  const { balance, invoiceCount } = paymentStatus();
  const recent = notes()[0];
  const confirmed = records.filter((record) => record.status === 'Confirmed').length;
  const next = upcomingSessions(records).slice(0, 3);
  return `
    ${workspace.profile.displayName ? `<p class="dash-greeting">Hello, ${escapeHTML(workspace.profile.displayName)}.</p>` : ''}
    <div class="overview-layout">
      <div class="overview-main">
      <article class="card"><h2>Upcoming classes</h2>
        ${
          next.length
            ? `<ul class="session-list">${next
                .map(
                  ({ batch, date, status }) => `<li><strong>${batch.title}</strong>
        <p>${formatSession(date)} · ${scheduleLine(batch)}</p><span class="pill">${status === 'Confirmed' ? 'Confirmed' : 'Tentative'}</span></li>`,
                )
                .join('')}</ul>`
            : '<p>Choose a batch to see its upcoming weekly sessions here.</p>'
        }
        <div class="actions">${next.length ? '<a class="button" href="#schedule">View schedule</a>' : '<a class="button accent" href="#enroll">Browse batches</a>'}</div>
      </article>
      <article class="card"><h2>Latest progress note</h2><p>${recent ? escapeHTML(recent.focus) : 'Practice notes appear here when your instructor adds them.'}</p>
        <div class="actions"><a class="button" href="#progress">View progress notes</a></div></article>
      </div>
      <aside class="overview-summary"><h2>At a glance</h2>
<div class="dash-metrics overview-metrics">
      <a class="card" href="#my-courses"><strong>${confirmed}</strong><p>Confirmed courses · ${records.length - confirmed} requested</p></a>
      <a class="card" href="#attendance"><strong>${percent === null ? '—' : percent + '%'}</strong><p>Recorded attendance</p></a>
      <a class="card" href="#fees"><strong>${invoiceCount ? money(balance) : '—'}</strong><p>${invoiceCount ? 'Outstanding fees' : 'No confirmed charges'}</p></a>
    </div>
      </aside>
    </div>`;
}

function myCourses(records) {
  if (!records.length)
    return `${empty('No courses in your workspace', 'Browse batches and save a local enrollment request to get started.')}<div><a class="button accent" href="#enroll">Browse batches</a></div>`;
  return `<div class="dash-list">${records
    .map(({ batch, status }) => {
      const course = getCourse(batch.courseId);
      return `<article class="card"><span class="pill">${status}</span><h3>${batch.title}</h3>
       ${batchDetails(batch)}<div class="actions"><button type="button" class="button" data-session="${batch.id}">Class details</button>
       ${buttonLink('Course details', page('courses', { instrument: course.instrument, group: course.group, level: course.level }))}</div></article>`;
    })
    .join('')}</div>`;
}

function showSchedule(records) {
  if (!records.length) {
    panel.innerHTML = empty(
      'Your schedule is empty',
      'Weekly sessions appear here when you request a batch.',
    );
    return;
  }
  panel.innerHTML = `<form class="selects" aria-label="Class schedule filters">
    ${selectField('day', 'Class day', days, '', 'All days')}
    ${selectField(
      'course',
      'Course',
      records.map(({ batch }) => [batch.id, `${batch.title} · ${getCourse(batch.courseId).level}`]),
      '',
      'All courses',
    )}
  </form><div class="dash-list session-ledger" aria-live="polite"></div>`;
  const form = panel.querySelector('form');
  const list = panel.querySelector('.dash-list');
  function update() {
    const { day, course } = Object.fromEntries(new FormData(form));
    const matches = upcomingSessions(records).filter(
      ({ batch }) => (!day || day === batch.day) && (!course || course === batch.id),
    );
    list.innerHTML = matches.length
      ? matches
          .map(
            ({ batch, status, date }) =>
              `<article class="card"><div class="session-identity"><span class="pill">${status === 'Confirmed' ? 'Confirmed' : 'Tentative'}</span><h3>${batch.title}</h3></div>
      <div class="session-timing"><p>Next session · ${formatSession(date)}</p><p>Every ${scheduleLine(batch)} · ${batch.duration} minutes</p></div>
      <div class="actions"><button type="button" class="button" data-session="${batch.id}">Class details</button></div></article>`,
          )
          .join('')
      : empty('No sessions match the filters', 'Choose another day or show all courses.');
  }
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('change', update);
  update();
}

function progress() {
  const entries = notes();
  return entries.length
    ? `<div class="dash-list">${entries
        .map(
          (note) =>
            `<article class="card"><span class="pill">${escapeHTML(note.date)}</span><h3>${escapeHTML(note.focus)}</h3>
       <p>${getBatch(note.batchId).title}</p><dl class="meta"><div><dt>Milestone</dt><dd>${escapeHTML(note.milestone)}</dd></div>
       <div><dt>Observation</dt><dd>${escapeHTML(note.observation)}</dd></div><div><dt>Practice focus</dt><dd>${escapeHTML(note.practice)}</dd></div></dl>
    </article>`,
        )
        .join('')}</div>`
    : empty(
        'No progress notes',
        'Instructor-authored practice guidance will appear here when available.',
      );
}

function settings({ profile }) {
  return `<form class="card form-stack dash-profile">
      <h2>Your learner profile</h2>
      <label class="field">Display name<input name="displayName" autocomplete="off" maxlength="60" value="${escapeHTML(profile.displayName)}"></label>
      ${selectField('contact', 'Contact preference', ['No preference', 'Email', 'In person'], profile.contact, '')}
      ${selectField('learning', 'Practice preference', ['No preference', 'Individual practice', 'Small-group practice'], profile.learning, '')}
      <div class="actions"><button class="button accent" type="submit">Save profile</button><span role="status" data-profile-status></span></div>
    </form>
    <div class="grid dash-overview">
      <article class="card"><h2>Display</h2><p>Change color theme or reading direction across the site.</p>${preferences()}</article>
      <article class="card"><h2>Local workspace</h2><p>Reset requests and learner profile on this device.</p>
        <div class="actions"><button type="button" class="button" data-reset-workspace>Reset local workspace</button><a href="${page()}" class="button">Exit dashboard</a></div>
      </article>
    </div>`;
}

function render(focus = false) {
  const id = location.hash.slice(1);
  const [active, label, description] = sections.find(([section]) => section === id) ?? sections[0];
  const data = readWorkspace();
  const records = studentBatches(data);
  title.textContent = label;
  titleCopy.textContent = description;
  panel.dataset.view = active;
  host.querySelectorAll('[data-section]').forEach((link) => {
    if (link.dataset.section === active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (active === 'enroll') mountFinder(panel, 'batches');
  else if (active === 'schedule') showSchedule(records);
  else {
    const views = {
      overview: () => overview(data, records),
      'my-courses': () => myCourses(records),
      attendance: attendancePanel,
      progress,
      fees: () => feesPanel(records),
      settings: () => settings(data),
    };
    panel.innerHTML = views[active]();
  }
  updatePreferences();
  if (focus) {
    scrollTo(0, 0);
    title.focus({ preventScroll: true });
  }
}

host.addEventListener('submit', async (event) => {
  if (!event.target.matches('.dash-profile')) return;
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.target));
  const status = event.target.querySelector('[data-profile-status]');
  try {
    await saveProfile({ ...values, displayName: values.displayName.trim() });
    status.textContent = 'Profile saved on this device.';
  } catch {
    status.textContent = 'This browser could not save your profile.';
  }
});

host.addEventListener('click', (event) => {
  if (event.target.closest('[data-section]') && drawer.open) drawer.close();
  const session = event.target.closest('[data-session]');
  if (session) {
    const batch = getBatch(session.dataset.session);
    const course = getCourse(batch.courseId);
    openDialog(
      'Class details',
      `<h3>${batch.title}</h3><p>${getInstrument(course.instrument).name} · ${course.group} · ${course.level}</p>
      ${batchDetails(batch, false)}<p>Next scheduled meeting · ${formatSession(nextSession(batch))}</p>`,
    );
  }
  const payment = event.target.closest('[data-payment]');
  if (payment) openPaymentDetails(payment.dataset.payment);
  if (event.target.closest('[data-reset-workspace]')) {
    const dialog = openDialog(
      'Reset local workspace?',
      `<p>This clears your saved enrollment requests and learner profile on this device.</p>
      <p class="error" role="status" data-reset-status hidden></p>
      <div class="actions"><button class="button" type="button" data-close>Cancel</button><button class="button accent" type="button" data-confirm-reset>Reset workspace</button></div>`,
    );
    dialog.querySelector('[data-confirm-reset]').addEventListener('click', async (event) => {
      const button = event.currentTarget;
      button.disabled = true;
      try {
        await resetWorkspace();
        dialog.close();
        render();
        const reset = panel.querySelector('[data-reset-workspace]');
        reset.focus();
        const status = panel.querySelector('[data-profile-status]');
        status.textContent = 'Local workspace reset.';
      } catch {
        button.disabled = false;
        const status = dialog.querySelector('[data-reset-status]');
        status.hidden = false;
        status.textContent = 'This browser could not reset your workspace.';
      }
    });
  }
});
addEventListener('hashchange', () => {
  document.querySelector('.modal[open]')?.close();
  render(true);
});
addEventListener('storage', (event) => {
  if (
    (event.key === 'upbeat.workspace.v1' || event.key === null) &&
    !['#settings', '#enroll'].includes(location.hash)
  )
    render();
});
render();
