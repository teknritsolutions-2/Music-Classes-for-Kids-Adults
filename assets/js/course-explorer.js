import { getInstrument, groups, instrumentLabel, instruments, levels } from './course-data.js';
import { arrow, buttonLink, page, photo } from './site-config.js';

const labPhotos = {
  guitar: ['journey', 'A learner and teacher work through a guitar part'],
  keyboard: ['smiling-keys', 'A teacher and learner sit at an electric keyboard'],
  vocals: ['voice-lesson', 'A vocal coach and learner practice near a microphone'],
  drums: ['drum-lesson', 'A drum teacher demonstrates a technique at a drum kit'],
};

export function mountExplorer(host, onChange) {
  const lab = host.dataset.explorer === 'lab';
  host.innerHTML = `
    <div class="instrument-rail" role="tablist" aria-orientation="horizontal" aria-label="Instruments">
      ${instruments
        .map(
          (
            instrument,
          ) => `<button class="instrument-tab" id="tab-${instrument.id}" role="tab" type="button"
        aria-controls="instrument-panel" data-instrument="${instrument.id}">${instrumentLabel(instrument)}</button>`,
        )
        .join('')}
    </div>
    <article class="instrument-display" id="instrument-panel" role="tabpanel" tabindex="0"></article>`;
  const rail = host.querySelector('[role="tablist"]');
  const tabs = [...rail.querySelectorAll('[role="tab"]')];
  if (!lab) {
    const wide = matchMedia('(min-width: 950px)');
    const setOrientation = () =>
      rail.setAttribute('aria-orientation', wide.matches ? 'vertical' : 'horizontal');
    wide.addEventListener('change', setOrientation);
    setOrientation();
  }
  const panel = host.querySelector('[role="tabpanel"]');
  let current = -1;
  const select = (index, focus = false) => {
    const active = tabs[index];
    if (focus) active.focus();
    if (index === current) return;
    current = index;
    const instrument = getInstrument(active.dataset.instrument);
    const name = instrumentLabel(instrument);
    tabs.forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab === active));
      tab.tabIndex = tab === active ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', active.id);
    const details = lab
      ? `<p>${instrument.description}</p><a class="button accent" data-lab-choice="${instrument.id}"
           href="?instrument=${instrument.id}#path-finder">See matching classes ${arrow}</a>`
      : `<p>${instrument.description}</p><ul>${instrument.topics.map((topic) => `<li>${topic}</li>`).join('')}</ul>
         <div class="instrument-facts"><span class="pill">${groups.join(' · ')}</span><span class="pill">${levels.join(' · ')}</span></div>
         ${buttonLink('Explore ' + name, page('courses', { instrument: instrument.id }), 'accent')}`;
    const [asset, alt] = lab ? labPhotos[instrument.id] : [instrument.image, instrument.alt];
    panel.innerHTML = `${photo(asset, alt, 'instrument-shot-' + instrument.id)}
      <div class="instrument-notes"><h3>${lab ? name : instrument.headline}</h3>${details}</div>`;
  };
  const activate = (index, focus) => {
    select(index, focus);
    onChange?.(tabs[index].dataset.instrument);
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index, false));
    tab.addEventListener('keydown', (event) => {
      const rtl = document.documentElement.dir === 'rtl';
      const moves = {
        ArrowRight: (index + (rtl ? -1 : 1) + tabs.length) % tabs.length,
        ArrowLeft: (index + (rtl ? 1 : -1) + tabs.length) % tabs.length,
        ArrowDown: (index + 1) % tabs.length,
        ArrowUp: (index + tabs.length - 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      if (event.key in moves) {
        event.preventDefault();
        activate(moves[event.key], true);
      }
    });
  });
  select(0);
  return (id) =>
    select(
      Math.max(
        0,
        tabs.findIndex((tab) => tab.dataset.instrument === id),
      ),
    );
}
