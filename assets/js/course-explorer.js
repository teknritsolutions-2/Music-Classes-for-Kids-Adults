import { getInstrument, groups, instrumentLabel, instruments, levels } from './course-data.js';
import { buttonLink, page, photo } from './site-config.js';

export function mountExplorer(host) {
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
  const tabs = Array.from(host.querySelectorAll('[role="tab"]'));
  const panel = host.querySelector('[role="tabpanel"]');
  const select = (index, focus) => {
    const active = tabs[index];
    const instrument = getInstrument(active.dataset.instrument);
    tabs.forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab === active));
      tab.tabIndex = tab === active ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', active.id);
    panel.innerHTML = `${photo(instrument.image, instrument.alt)}
      <div class="instrument-notes"><span class="kicker">${instrument.name}</span><h3>${instrument.headline}</h3>
      <p>${instrument.description}</p><ul>${instrument.topics.map((topic) => `<li>${topic}</li>`).join('')}</ul>
      <div class="instrument-facts"><span class="pill">${groups.join(' · ')}</span><span class="pill">${levels.join(' · ')}</span></div><div>${buttonLink('Explore ' + instrumentLabel(instrument), page('courses', { instrument: instrument.id }), 'accent')}</div></div>`;
    if (focus) active.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index, false));
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
        select(moves[event.key], true);
      }
    });
  });
  select(0, false);
}
