import { brand, credits, icon, imagePath, page } from './site-config.js';

const current = document.body.dataset.page;
const links = [
  ['Courses', 'courses'],
  ['Instructors', 'instructors'],
  ['Fees & Batches', 'fees-batches'],
  ['Contact', 'contact'],
];
const link = (label, name, style = '') =>
  `<a class="${style}" href="${page(name)}"${name === current ? ' aria-current="page"' : ''}>${label}</a>`;
const mainLinks = links.map(([label, name]) => link(label, name)).join('');
const homeLinks = link('Home 1', 'home') + link('Home 2', 'home2');

export const preferences = () => `<div class="preferences">
  <button type="button" class="icon-button" data-theme aria-label="Switch color theme"></button>
  <button type="button" class="icon-button direction" data-direction aria-label="Switch text direction"></button>
</div>`;

const header = document.querySelector('#site-header');
if (header) {
  header.innerHTML = `<a class="skip" href="#main">Skip to content</a>
    <div class="container nav-bar">${brand()}
      <nav class="nav-desktop" aria-label="Main navigation">
        <details class="home-menu" ${['home', 'home2'].includes(current) ? 'data-current' : ''}>
          <summary>Home ${icon('down')}</summary><div class="home-links">${homeLinks}</div>
        </details>${mainLinks}
      </nav>
      <div class="nav-tools">${preferences()}${link('Dashboard', 'dashboard', 'dashboard-link')}${link('Login', 'login', 'button nav-login')}</div>
      <button type="button" class="icon-button nav-toggle" data-open="site-navigation" aria-label="Open navigation" aria-haspopup="dialog">${icon('menu')}</button>
    </div>
    <dialog class="drawer" id="site-navigation" aria-label="Navigation">
      <div class="drawer-top">${brand()}<button type="button" class="icon-button" data-close aria-label="Close navigation" autofocus>${icon('close')}</button></div>
      <nav aria-label="Mobile navigation"><details class="drawer-home"${['home', 'home2'].includes(current) ? ' open' : ''}><summary>Home ${icon('down')}</summary><div>${homeLinks}</div></details>${mainLinks}${link('Student Dashboard', 'dashboard')}</nav>
      <div class="drawer-bottom">${preferences()}${link('Login', 'login', 'button accent')}</div>
    </dialog>`;
}
const footer = document.querySelector('#site-footer');
if (footer) {
  footer.innerHTML = `<div class="container footer-grid">
    <div>${brand()}<p>Find your sound. Make it yours.</p></div>
    <div><h2>Explore</h2>${homeLinks}${link('Instructors', 'instructors')}</div>
    <div><h2>Learn</h2>${link('Courses', 'courses')}${link('Fees & Batches', 'fees-batches')}${link('Contact / Visit', 'contact')}</div>
    <div><h2>Student resources</h2>${link('Dashboard', 'dashboard')}${link('Login', 'login')}${link('Sign Up', 'signup')}</div>
    <div class="footer-end"><span>UPBEAT Music Academy</span><a href="${credits}">Photography credits</a></div>
  </div><button type="button" class="icon-button back-top" aria-label="Back to top" hidden>${icon('up')}</button>`;
  const back = footer.querySelector('.back-top');
  const reflectScroll = () => {
    back.hidden = scrollY < 500;
  };
  addEventListener('scroll', reflectScroll, { passive: true });
  reflectScroll();
  back.addEventListener('click', () =>
    scrollTo({
      top: 0,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    }),
  );
}

export function updatePreferences() {
  const dark = document.documentElement.dataset.theme === 'dark';
  const rtl = document.documentElement.dir === 'rtl';
  document.querySelectorAll('button[data-theme]').forEach((button) => {
    button.innerHTML = icon(dark ? 'sun' : 'moon');
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  });
  document.querySelectorAll('button[data-direction]').forEach((button) => {
    button.textContent = rtl ? 'RTL' : 'LTR';
    button.setAttribute(
      'aria-label',
      rtl ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout',
    );
  });
}
updatePreferences();

document.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  const root = document.documentElement;
  if (button?.matches('[data-theme], [data-direction]')) {
    const theme = button.matches('[data-theme]');
    const key = theme ? 'theme' : 'direction';
    const value = theme
      ? root.dataset.theme === 'dark'
        ? 'light'
        : 'dark'
      : root.dir === 'rtl'
        ? 'ltr'
        : 'rtl';
    if (theme) root.dataset.theme = value;
    else root.dir = value;
    try {
      localStorage.setItem(`upbeat.${key}`, value);
    } catch {}
    updatePreferences();
  }
  if (button?.dataset.open) document.getElementById(button.dataset.open)?.showModal();
  if (button?.matches('[data-close]')) button.closest('dialog')?.close();
  if (event.target.matches('dialog.drawer')) {
    const { left, right, top, bottom } = event.target.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom)
      event.target.close();
  }
  const menu = document.querySelector('.home-menu[open]');
  if (menu && !menu.contains(event.target)) menu.open = false;
});
document.addEventListener('keydown', (event) => {
  const menu = document.querySelector('.home-menu[open]');
  if (menu && event.key === 'Escape') {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});
document.addEventListener(
  'error',
  (event) => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || !img.matches('[data-photo]')) return;
    if (img.src !== imagePath('group')) {
      img.removeAttribute('srcset');
      img.src = imagePath('group');
      img.alt = 'Musicians practicing together in a rehearsal studio';
    }
  },
  true,
);

const desktop = matchMedia('(min-width: 1160px)');
desktop.addEventListener('change', (event) => {
  if (event.matches) document.querySelector('#site-navigation[open]')?.close();
});
