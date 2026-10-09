const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');
const menuToggle = document.querySelector('#menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') root.dataset.theme = 'dark';

function updateThemeLabel() {
  const isDark = root.dataset.theme === 'dark';
  themeToggle.textContent = isDark ? '☼' : '◐';
  themeToggle.setAttribute('aria-label', isDark ? '切换浅色模式' : '切换深色模式');
  themeToggle.title = isDark ? '切换浅色模式' : '切换深色模式';
}

updateThemeLabel();

themeToggle.addEventListener('click', () => {
  const isDark = root.dataset.theme === 'dark';
  if (isDark) delete root.dataset.theme;
  else root.dataset.theme = 'dark';
  localStorage.setItem('portfolio-theme', isDark ? 'light' : 'dark');
  updateThemeLabel();
});

menuToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('#mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.project-card, .article-row, .about-copy, .resume-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add('reveal-item');
  revealObserver.observe(item);
});
