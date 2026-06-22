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

document.querySelectorAll('[data-demo-form]').forEach((form) => {
  const message = form.querySelector('[data-success-message]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (message) {
      message.classList.add('show');
      message.textContent = 'Hvala! Ovo je demo forma. Nakon dodavanja pravog e-maila, upiti će stizati direktno klijentu.';
    }
    form.reset();
  });
});
