/* ═══════════════════════════════════════════════════════
   SANZAHRA — Script principal
═══════════════════════════════════════════════════════ */

// ── Maintenance Mode ──
(function () {
  const MAINT_PASS = 'Snzhr@2026!';
  const maintenance = document.getElementById('maintenance');
  if (!maintenance) return;

  const maintPass = document.getElementById('maintPass');
  const maintBtn = document.getElementById('maintBtn');
  const maintError = document.getElementById('maintError');
  const maintForm = document.querySelector('.maint-form');

  if (localStorage.getItem('sanzahra_access') === 'granted') {
    maintenance.classList.add('unlocked');
  }

  function tryAccess() {
    if (maintPass.value === MAINT_PASS) {
      localStorage.setItem('sanzahra_access', 'granted');
      maintenance.classList.add('unlocked');
      maintError.classList.remove('show');
    } else {
      maintError.classList.add('show');
      maintForm.classList.add('shake');
      setTimeout(() => maintForm.classList.remove('shake'), 400);
    }
  }

  if (maintBtn) maintBtn.addEventListener('click', tryAccess);
  if (maintPass) maintPass.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryAccess(); });
})();

// ── Loader ──
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('hide'), 900);
});

// ── Nav scroll ──
(function () {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const isTransparent = nav.dataset.transparent === 'true';
  const apply = () => {
    if (isTransparent) {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }
  };
  if (!isTransparent) {
    nav.classList.add('solid');
  }
  window.addEventListener('scroll', apply);
  apply();
})();

// ── Mobile menu ──
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ── Reveal on scroll ──
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
})();

// ── Cookie Banner ──
(function () {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  const choice = localStorage.getItem('sanzahra_cookies');
  if (!choice) {
    setTimeout(() => banner.classList.add('show'), 1800);
  }
  document.querySelectorAll('[data-cookie-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem('sanzahra_cookies', btn.dataset.cookieAction);
      banner.classList.remove('show');
    });
  });
})();

// ── Active nav link ──
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
