const root = new URL('../../', import.meta.url);
export const page = (name = 'home', filters) => {
  const url = new URL(name === 'home' ? 'index.html' : `pages/${name}.html`, root);
  if (filters) url.search = new URLSearchParams(filters);
  return url.href;
};
export const imagePath = (name) => new URL(`assets/images/${name}.jpg`, root).href;
export const credits = new URL('documentation/asset-credits.html', root).href;

export const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character],
  );
export const mark = '<span class="mark" aria-hidden="true"></span>';
export const brand = () =>
  `<a class="brand" href="${page()}" aria-label="UPBEAT Music Academy home">${mark}<span>UPBEAT<small>MUSIC ACADEMY</small></span></a>`;
export const icon = (name) => {
  const paths = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    moon: '<path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    up: '<path d="M12 19V5m-6 6 6-6 6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
  };
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
};
export const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
export const textLink = (label, url) => `<a class="text-link" href="${url}">${label} ${arrow}</a>`;
export const buttonLink = (label, url, variant = '') =>
  `<a class="button ${variant}" href="${url}">${label} ${arrow}</a>`;
const photoSizes = {
  'drum-lesson': [1200, 800],
  drums: [1000, 563],
  guitar: [1050, 700],
  journey: [1250, 833],
  keyboard: [1000, 667],
  'smiling-keys': [1150, 1725],
  vocals: [1000, 667],
  'voice-lesson': [1200, 801],
};
export function photo(name, alt, className = '') {
  const [width, height] = photoSizes[name];
  return `<img class="${className}" src="${imagePath(name)}" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async" data-photo>`;
}
