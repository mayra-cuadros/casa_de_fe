// js/header.js
document.addEventListener('DOMContentLoaded', () => {
  // Toggle móvil
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const show = !nav.classList.contains('show');
      nav.classList.toggle('show', show);
      btn.setAttribute('aria-expanded', String(show));
    });
  }

  // Activo actual por URL
  const here = location.pathname.replace(/\/+$/, ''); // sin trailing slash
  document.querySelectorAll('#site-nav a').forEach(a => {
    const href = new URL(a.getAttribute('href'), location.origin).pathname.replace(/\/+$/, '');
    if (href === here) a.classList.add('active');
  });
});
