(function initTheme() {
  const STORAGE_KEY = 'sl_salary_cal_theme';
  const root = document.documentElement;

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function currentTheme() {
    return localStorage.getItem(STORAGE_KEY) || systemTheme();
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    const button = document.getElementById('themeToggle');
    if (!button) return;

    const isLight = theme === 'light';
    button.setAttribute('aria-pressed', String(isLight));
    button.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    button.querySelector('.theme-toggle__text').textContent = isLight ? 'Light' : 'Dark';
    button.querySelector('.theme-toggle__icon').innerHTML = isLight
      ? '<path d="M12 3v2"/><path d="M12 19v2"/><path d="m4.22 4.22 1.42 1.42"/><path d="m18.36 18.36 1.42 1.42"/><path d="M3 12h2"/><path d="M19 12h2"/><path d="m4.22 19.78 1.42-1.42"/><path d="m18.36 5.64 1.42-1.42"/><circle cx="12" cy="12" r="4"/>'
      : '<path d="M12 3a6 6 0 0 0 9 7.4A9 9 0 1 1 12 3Z"/>';
  }

  function createToggle() {
    if (document.getElementById('themeToggle')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'themeToggle';
    button.className = 'theme-toggle';
    button.innerHTML = '<svg class="icon theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true"></svg><span class="theme-toggle__text"></span>';
    button.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
    document.body.appendChild(button);
  }

  applyTheme(currentTheme());

  document.addEventListener('DOMContentLoaded', () => {
    createToggle();
    applyTheme(currentTheme());
  });
})();
