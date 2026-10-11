/**
 * SAAFI Boutique Hotel - Interactive Architecture
 * Real multi-page system with spring reveals, mobile navigation, and reservation handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initSpringObserver();
  initFaqAccordions();
  initBookingBar();
});

function initMobileDrawer() {
  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

function initSpringObserver() {
  const elements = document.querySelectorAll('[data-spring]');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el) => observer.observe(el));
}

function initFaqAccordions() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const wasActive = item.classList.contains('active');
      
      const parent = item.closest('.faq-accordion');
      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      }
      
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });
}

function initBookingBar() {
  const submitBtn = document.getElementById('bookingSubmitBtn');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const checkIn = document.getElementById('checkInInput')?.value || 'Upcoming';
    const checkOut = document.getElementById('checkOutInput')?.value || 'Upcoming';
    const suiteSelect = document.getElementById('suiteSelect');
    const suiteName = suiteSelect ? suiteSelect.options[suiteSelect.selectedIndex].text : 'Suite';
    const guests = document.getElementById('guestsCount')?.value || '2';

    const text = `Hello SAAFI Boutique Hotel, I would like to reserve the ${suiteName} for ${guests} guests from ${checkIn} to ${checkOut}. Please confirm availability and reservation details.`;
    const url = `https://wa.me/2348027777456?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
