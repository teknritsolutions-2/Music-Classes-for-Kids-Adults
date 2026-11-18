import { batches, batchTime, days, fitsBatch, money, timePreferences } from './batch-data.js';
import { courses, getCourse, getInstrument, groups, instruments, levels } from './course-data.js';
import { buttonLink, escapeHTML, icon, page } from './site-config.js';

export function selectField(name, label, options, value = '', placeholder = 'Any') {
  return `<label class="field">${label}<span class="select-wrap"><select name="${name}">
    ${placeholder ? `<option value="">${placeholder}</option>` : ''}
    ${options
      .map((option) => {
        const [id, title] = Array.isArray(option) ? option : [option, option];
        return `<option value="${escapeHTML(id)}"${id === value ? ' selected' : ''}>${escapeHTML(title)}</option>`;
      })
      .join('')}</select>${icon('down')}</span></label>`;
}

export const empty = (title, description) =>
  `<div class="empty"><h3>${title}</h3><p>${description}</p></div>`;

export const courseFilters = [
  ['instrument', 'Instrument', instruments.map((instrument) => [instrument.id, instrument.name])],
  ['group', 'Learner group', groups],
  ['level', 'Experience level', levels],
];
const batchPageSize = 9;
const variedBatches = groups.flatMap((group) =>
  levels.flatMap((level) =>
    batches.filter((batch) => {
      const course = getCourse(batch.courseId);
      return course.group === group && course.level === level;
    }),
  ),
);
const batchFilters = [
  ...courseFilters,
  ['day', 'Day', days],
  ['preference', 'Time preference', timePreferences],
];

export function batchDetails(batch, includeLearner = true) {
  const course = getCourse(batch.courseId);
  const instrument = getInstrument(course.instrument);
  return `<dl class="meta">
    ${includeLearner ? `<div><dt>Level</dt><dd>${course.level}</dd></div>` : ''}
    <div><dt>Weekly session</dt><dd>${batch.day} · <span class="time">${batchTime(batch)}</span></dd></div>
    <div><dt>Session length</dt><dd>${batch.duration} minutes</dd></div>
    <div><dt>Instructor</dt><dd>${instrument.mentor}</dd></div>
  </dl>`;
}

export function feeLabel(batch) {
  return `<span class="fee">${money(batch.fee.amount)}</span> <span class="muted">/ ${batch.fee.period}</span>`;
}

export function batchCard(batch, path = false) {
  const course = getCourse(batch.courseId);
  return `<article class="card batch-card"><h3>${batch.title}</h3>${batchDetails(batch)}
    <p class="batch-price">${feeLabel(batch)}</p>
    <div class="actions batch-actions">
      <button type="button" class="button accent" data-enroll="${batch.id}">Review enrollment</button>
      ${path ? buttonLink('Course details', page('courses', { instrument: course.instrument, group: course.group, level: course.level })) : ''}
    </div></article>`;
}

function courseModule(instrument, matches) {
  const options = matches
    .map(
      (course) => `<details class="course-option"${matches.length === 1 ? ' open' : ''}>
      <summary><span class="course-summary"><span>${course.group} · ${course.level}</span><span>${course.weeks} weeks</span></span></summary>
      <p>${course.focus}</p><p>${course.format} · ${instrument.mentor}</p>
      ${buttonLink('View available batches', page('fees-batches', { instrument: course.instrument, group: course.group, level: course.level }), 'accent')}
    </details>`,
    )
    .join('');
  return `<article class="course-module">
    <div><h3>${instrument.name}</h3><p>${instrument.description}</p><ul>${instrument.topics.map((topic) => `<li>${topic}</li>`).join('')}</ul></div>
    <div class="course-options">${matches.length > 3 ? `<details class="course-option"><summary>Show ${matches.length} course options</summary>${options}</details>` : options}</div>
  </article>`;
}

export function mountFinder(host, type, params = new URLSearchParams(location.search)) {
  const isCourse = type === 'courses';
  const path = type === 'path';
  const fields = isCourse
    ? courseFilters
    : path
      ? [batchFilters[0], ...batchFilters.slice(2, 4)]
      : batchFilters;
  const group = groups.includes(params.get('group')) ? params.get('group') : '';
  const groupChoices = path
    ? `<fieldset class="path-audience"><legend>Learner group</legend><div class="path-options">
    ${['', ...groups].map((value) => `<label><input type="radio" name="group" value="${value}"${value === group ? ' checked' : ''}><span>${value || 'Any'}</span></label>`).join('')}
  </div></fieldset>`
    : '';
  host.innerHTML = `<form class="selects ${isCourse ? '' : path ? 'form-filter-path' : 'many'}" aria-label="${isCourse ? 'Course filters' : 'Batch filters'}">
    ${groupChoices}${fields.map(([name, label, options]) => selectField(name, label, options, params.get(name))).join('')}
  </form>
  <div class="result-toolbar actions"><span aria-live="polite" data-count></span><button type="button" class="button" data-clear>Clear filters</button></div>
  ${isCourse ? '' : '<p class="muted">Times are in IST. Schedules, fees, and instructor assignments may change.</p>'}
  <div class="results ${isCourse ? 'course-list' : 'grid three'}" data-results></div>
  ${isCourse ? '' : '<div class="actions results"><button type="button" class="button" data-load-batches hidden>Show more batches</button></div>'}`;
  const form = host.querySelector('form');
  const results = host.querySelector('[data-results]');
  const count = host.querySelector('[data-count]');
  const more = host.querySelector('[data-load-batches]');
  let pageSize = batchPageSize;
  function update() {
    const filters = Object.fromEntries(new FormData(form));
    if (isCourse) {
      const matches = courses.filter((course) =>
        courseFilters.every(([name]) => !filters[name] || course[name] === filters[name]),
      );
      count.textContent = `${matches.length} course ${matches.length === 1 ? 'option' : 'options'}`;
      results.innerHTML =
        instruments
          .map((instrument) => {
            const options = matches.filter((course) => course.instrument === instrument.id);
            return options.length ? courseModule(instrument, options) : '';
          })
          .join('') || empty('No matching courses', 'Clear a filter to explore other options.');
    } else {
      const matches = variedBatches.filter((batch) => fitsBatch(batch, filters));
      const featured = path && !Object.values(filters).some(Boolean);
      const visible = matches.slice(0, featured ? instruments.length : pageSize);
      results.classList.toggle('three', !featured);
      results.classList.toggle('four', featured);
      more.hidden = featured || visible.length === matches.length;
      count.textContent = featured
        ? `${visible.length} featured batches · Filter to see matches`
        : visible.length < matches.length
          ? `Showing ${visible.length} of ${matches.length} matching batches`
          : `${matches.length} matching ${matches.length === 1 ? 'batch' : 'batches'}`;
      results.innerHTML = visible.length
        ? visible.map((batch) => batchCard(batch, path)).join('')
        : empty('No batches match these filters', 'Try another day or clear one of your filters.');
    }
  }
  more?.addEventListener('click', () => {
    const firstNew = pageSize;
    pageSize += batchPageSize;
    update();
    const card = results.children[firstNew];
    if (card) {
      card.tabIndex = -1;
      card.focus();
    }
  });
  host.querySelector('[data-clear]').addEventListener('click', () => {
    form.querySelectorAll('select, input[type="radio"]').forEach((field) => {
      if (field.type === 'radio') field.checked = field.value === '';
      else field.value = '';
    });
    pageSize = batchPageSize;
    update();
  });
  form.addEventListener('change', () => {
    pageSize = batchPageSize;
    update();
  });
  form.addEventListener('submit', (event) => event.preventDefault());
  update();
}
