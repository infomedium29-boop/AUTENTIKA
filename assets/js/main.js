const body = document.body;
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobilePanel = document.querySelector('[data-mobile-panel]');

if (menuToggle && mobilePanel) {
  menuToggle.addEventListener('click', () => {
    const isOpen = body.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobilePanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-nav-link]').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

document.querySelectorAll('[data-faq-item]').forEach((item) => {
  const button = item.querySelector('[data-faq-question]');
  const answer = item.querySelector('[data-faq-answer]');
  if (!button || !answer) return;

  button.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
    answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
  });
});

document.querySelectorAll('[data-form]').forEach((form) => {
  const message = form.querySelector('[data-success-message]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (message) {
      message.classList.add('show');
      message.textContent = 'Hvala! Vaš upit je zabilježen. Javite se putem e-maila ili WhatsAppa za brži odgovor.';
    }
    form.reset();
  });
});


const cookieBanner = document.querySelector('[data-cookie-banner]');
const cookieAccept = document.querySelector('[data-cookie-accept]');
const cookieReject = document.querySelector('[data-cookie-reject]');
const cookieSave = document.querySelector('[data-cookie-save]');
const cookieSettings = document.querySelector('[data-cookie-settings]');
const cookieSettingsPanel = document.querySelector('[data-cookie-settings-panel]');
const cookieAnalytics = document.querySelector('[data-cookie-analytics]');
const cookieMarketing = document.querySelector('[data-cookie-marketing]');

const consentKey = 'autentika_cookie_consent';

function saveCookieConsent(consent) {
  localStorage.setItem(consentKey, JSON.stringify({
    necessary: true,
    analytics: Boolean(consent.analytics),
    marketing: Boolean(consent.marketing),
    savedAt: new Date().toISOString()
  }));
  if (cookieBanner) cookieBanner.classList.remove('show');
}

function loadCookieConsent() {
  try {
    return JSON.parse(localStorage.getItem(consentKey));
  } catch (error) {
    return null;
  }
}

if (cookieBanner && !loadCookieConsent()) {
  window.setTimeout(() => cookieBanner.classList.add('show'), 700);
}

if (cookieAccept) {
  cookieAccept.addEventListener('click', () => saveCookieConsent({ analytics: true, marketing: true }));
}

if (cookieReject) {
  cookieReject.addEventListener('click', () => saveCookieConsent({ analytics: false, marketing: false }));
}

if (cookieSettings && cookieSettingsPanel) {
  cookieSettings.addEventListener('click', () => {
    cookieSettingsPanel.classList.toggle('show');
  });
}

if (cookieSave) {
  cookieSave.addEventListener('click', () => {
    saveCookieConsent({
      analytics: cookieAnalytics ? cookieAnalytics.checked : false,
      marketing: cookieMarketing ? cookieMarketing.checked : false
    });
  });
}
