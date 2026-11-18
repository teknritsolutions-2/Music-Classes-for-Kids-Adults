import './enrollment.js';
import { batches, days } from './batch-data.js';
import { batchCard, empty, mountFinder, selectField } from './batch-finder.js';
import { mountExplorer } from './course-explorer.js';
import { instruments } from './course-data.js';
import { page, photo, textLink } from './site-config.js';

document.querySelectorAll('[data-finder]').forEach((host) => mountFinder(host, host.dataset.finder));
document.querySelectorAll('[data-explorer]').forEach(mountExplorer);

const catalogue = document.querySelector('[data-finder="courses"] select[name="instrument"]');
if (catalogue) {
  const tracks = document.querySelectorAll('.catalogue-tracks a');
  const reflectInstrument = () => {
    tracks.forEach((track) => {
      if (new URL(track.href).searchParams.get('instrument') === catalogue.value) {
        track.setAttribute('aria-current', 'true');
      } else {
        track.removeAttribute('aria-current');
      }
    });
  };
  catalogue.addEventListener('change', reflectInstrument);
  document
    .querySelector('[data-finder="courses"] [data-clear]')
    .addEventListener('click', reflectInstrument);
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
  const mentor = (instrument) => `
    <span class="mentor-specialty">${instrument.name}</span><h3>${instrument.mentor}</h3><p>${instrument.approach}</p>
    ${full ? '<p>Kids · Teens · Adults</p>' : ''}
    <div class="actions">${textLink('Related courses', page('courses', { instrument: instrument.id }))}
      ${full ? textLink('View batches', page('fees-batches', { instrument: instrument.id })) : ''}</div>`;
  const mentorPhoto = (instrument, cls) =>
    photo(
      instrument.mentorImage,
      `Illustrative photograph of ${instrument.name.toLowerCase()} practice`,
      cls,
    );
  const featured = instruments[0];
  host.innerHTML = `${
    full
      ? `<article class="feature instructor-feature">${mentorPhoto(featured, '')}
    <div class="feature-copy">${mentor(featured)}</div></article>`
      : ''
  }
    <div class="grid ${full ? 'three results' : 'four'} mentor-list">${instruments
      .slice(full ? 1 : 0)
      .map(
        (instrument) =>
          `<article class="card">${mentorPhoto(instrument, 'card-photo')}${mentor(instrument)}</article>`,
      )
      .join('')}</div>`;
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
