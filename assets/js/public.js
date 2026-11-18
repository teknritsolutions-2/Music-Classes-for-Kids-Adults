import './enrollment.js';
import { batches, days } from './batch-data.js';
import { batchCard, empty, mountFinder, selectField } from './batch-finder.js';
import { mountExplorer } from './course-explorer.js';
import { instruments } from './course-data.js';
import { page, photo, textLink } from './site-config.js';

document.querySelectorAll('[data-finder]').forEach((host) => mountFinder(host, host.dataset.finder));
document.querySelectorAll('[data-explorer]').forEach(mountExplorer);

const trackLinks = [...document.querySelectorAll('.catalogue-tracks a, .lab-tracks a')];
if (trackLinks.length) {
  const finder = document.querySelector('[data-finder]');
  const instrumentSelect = finder.querySelector('select[name="instrument"]');
  const reflectInstrument = () => {
    trackLinks.forEach((track) => {
      const trackId = new URL(track.href).searchParams.get('instrument');
      if (trackId === instrumentSelect.value) track.setAttribute('aria-current', 'true');
      else track.removeAttribute('aria-current');
    });
  };
  trackLinks.forEach((track) => {
    if (!track.dataset.labChoice) return;
    track.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      instrumentSelect.value = track.dataset.labChoice;
      instrumentSelect.dispatchEvent(new Event('change', { bubbles: true }));
      document.getElementById('lab-finder-title').focus();
    });
  });
  instrumentSelect.addEventListener('change', reflectInstrument);
  finder.querySelector('[data-clear]').addEventListener('click', reflectInstrument);
  reflectInstrument();
}

document.querySelectorAll('[data-batch-preview]').forEach((host) => {
  host.innerHTML = `<form class="preview-filter">${selectField('day', 'Filter by day', days, '', 'Featured sessions')}</form><div class="grid three results" aria-live="polite"></div>`;
  const select = host.querySelector('select');
  const grid = host.querySelector('.grid');
  const featured = host.dataset.batchPreview ? [9, 21, 33] : [0, 13, 24];
  function update() {
    const options = select.value
      ? batches.filter((batch) => batch.day === select.value).slice(0, 3)
      : featured.map((index) => batches[index]);
    grid.innerHTML = options.length
      ? options.map((batch) => batchCard(batch)).join('')
      : empty('No classes that day', 'Choose a different day.');
  }
  select.addEventListener('change', update);
  update();
});

document.querySelectorAll('[data-mentors]').forEach((host) => {
  const full = host.dataset.mentors === 'full';
  host.innerHTML = instruments
    .map((instrument) => {
      const courses = page('courses', { instrument: instrument.id });
      const mentorID = `mentor-${instrument.id}`;
      const name = full
        ? instrument.mentor
        : `<a href="${page('instructors')}#${mentorID}">${instrument.mentor}</a>`;
      return `<article class="${full ? 'faculty-profile' : 'teaching-credit'}"${full ? ` id="${mentorID}"` : ''}>
      ${full ? photo(instrument.mentorImage, `Music practice or instruction for ${instrument.name.toLowerCase()}`) : ''}
      <div class="teacher-copy"><span class="mentor-specialty">${instrument.name}</span>
      <h3>${name}</h3>
      ${
        full
          ? `<p>${instrument.approach}</p><ul class="teaching-topics">${instrument.topics
              .slice(0, 2)
              .map((topic) => `<li>${topic}</li>`)
              .join('')}</ul>`
          : ''
      }
      <div class="actions">${textLink('Related courses', courses)}
        ${full ? textLink('View batches', page('fees-batches', { instrument: instrument.id })) : ''}
      </div></div></article>`;
    })
    .join('');
});

const tempo = document.querySelector('[data-tempo]');
if (tempo) {
  const output = tempo.querySelector('output');
  const beats = [...tempo.querySelectorAll('.tempo-meter i')];
  let beat = 0;
  let taps = [];
  tempo.querySelector('[data-tap]').addEventListener('click', () => {
    const now = performance.now();
    if (taps.length && now - taps.at(-1) > 3000) taps = [];
    beats.forEach((bar, index) => bar.classList.toggle('playing', index === beat));
    beat = (beat + 1) % beats.length;
    taps.push(now);
    taps = taps.slice(-7);
    if (taps.length === 1) output.textContent = 'Tap again';
    else {
      const mean = (taps.at(-1) - taps[0]) / (taps.length - 1);
      output.textContent = mean >= 100 ? `${Math.round(60000 / mean)} BPM` : 'Tap slower';
    }
  });
  tempo.querySelector('[data-reset]').addEventListener('click', () => {
    taps = [];
    beat = 0;
    beats.forEach((bar) => bar.classList.remove('playing'));
    output.textContent = '— BPM';
  });
}
