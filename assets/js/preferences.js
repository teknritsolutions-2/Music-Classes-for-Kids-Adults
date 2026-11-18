// Loaded before the stylesheet to resolve both preferences for the first paint.
(() => {
  const root = document.documentElement;
  let theme;
  let direction;
  try {
    theme = localStorage.getItem('upbeat.theme');
    direction = localStorage.getItem('upbeat.direction');
  } catch {}
  root.dataset.theme =
    theme === 'dark' || theme === 'light'
      ? theme
      : matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  root.dir = direction === 'rtl' ? 'rtl' : 'ltr';
})();
