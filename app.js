/* ==========================================================================
SAAFI BOUTIQUE HOTEL - FRONTEND APPLICATION JAVASCRIPT
Interactive booking calculations, WhatsApp reservation slip generator,
FAQ accordions, mobile drawer, gallery lightbox, and fluid scroll reveals.
========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initBookingCalculators();
  initFaqAccordions();
  initGalleryThumbs();
  initChauffeurForm();
  initScrollReveals();
});

/* --------------------------------------------------------------------------
Mobile Navigation Drawer
-------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  const drawerLinks = drawer.querySelectorAll('.drawer-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
Interactive Booking Calculators & WhatsApp Slip Generation
-------------------------------------------------------------------------- */
function initBookingCalculators() {
  const rates = {
    'signature-room': { name: 'Signature Room', price: 85950 },
    'deluxe-plus': { name: 'Deluxe Plus', price: 93500 },
    'deluxe-royal': { name: 'Deluxe Royal', price: 115250 },
    'executive-suite': { name: 'Executive Suite', price: 145790 },
    'boardroom': { name: 'Executive Boardroom', price: 250000 }
  };

  // 1. Setup Hero Booking Bar
  const heroCheckin = document.getElementById('checkInInput') || document.getElementById('checkin-date');
  const heroCheckout = document.getElementById('checkOutInput') || document.getElementById('checkout-date');
  const suiteSelect = document.getElementById('suiteSelect') || document.getElementById('suite-select');
  const guestsSelect = document.getElementById('guestsCount') || document.getElementById('guests-select');
  const bookBtn = document.getElementById('bookingSubmitBtn') || document.getElementById('hero-reserve-btn');

  // Default dates: today and 2 days out
  const today = new Date();
  const dayTwo = new Date(today);
  dayTwo.setDate(dayTwo.getDate() + 2);

  const todayStr = today.toISOString().split('T')[0];
  const dayTwoStr = dayTwo.toISOString().split('T')[0];

  if (heroCheckin && !heroCheckin.value) {
    heroCheckin.value = todayStr;
    heroCheckin.min = todayStr;
  }
  if (heroCheckout && !heroCheckout.value) {
    heroCheckout.value = dayTwoStr;
    heroCheckout.min = todayStr;
  }

  function getHeroQuote() {
    if (!heroCheckin || !heroCheckout || !suiteSelect) return;
    const cin = new Date(heroCheckin.value);
    const cout = new Date(heroCheckout.value);
    let nights = Math.ceil((cout - cin) / (1000 * 60 * 60 * 24));
    if (isNaN(nights) || nights < 1) nights = 1;

    const selectedKey = suiteSelect.value || 'signature-room';
    const suiteInfo = rates[selectedKey] || rates['signature-room'];
    const total = suiteInfo.price * nights;
    const guests = guestsSelect ? guestsSelect.value : '2 Adults';

    const msg = encodeURIComponent(
      `Hello SAAFI Boutique Hotel Desk,\n\nI would like to reserve a stay:\n• Suite: ${suiteInfo.name} (₦${suiteInfo.price.toLocaleString('en-NG')}/night)\n• Check-in: ${heroCheckin.value}\n• Check-out: ${heroCheckout.value}\n• Duration: ${nights} Night(s)\n• Occupancy: ${guests}\n• Estimated Total: ₦${total.toLocaleString('en-NG')}\n\nPlease confirm availability and payment instructions. Thank you!`
    );

    if (bookBtn) {
      bookBtn.onclick = (e) => {
        e.preventDefault();
        window.open(`https://wa.me/2348027777456?text=${msg}`, '_blank');
      };
    }
  }

  if (heroCheckin) heroCheckin.addEventListener('change', () => {
    const cin = new Date(heroCheckin.value);
    const nextDay = new Date(cin);
    nextDay.setDate(nextDay.getDate() + 1);
    if (heroCheckout) {
      heroCheckout.min = nextDay.toISOString().split('T')[0];
      if (new Date(heroCheckout.value) <= cin) {
        heroCheckout.value = nextDay.toISOString().split('T')[0];
      }
    }
    getHeroQuote();
  });

  if (heroCheckout) heroCheckout.addEventListener('change', getHeroQuote);
  if (suiteSelect) suiteSelect.addEventListener('change', getHeroQuote);
  if (guestsSelect) guestsSelect.addEventListener('change', getHeroQuote);
  getHeroQuote();

  // 2. Setup Sticky Booking Widget on Suite Detail Pages
  const stickyCard = document.querySelector('.sticky-booking-card');
  if (stickyCard) {
    const cinInput = stickyCard.querySelector('#suite-cin');
    const coutInput = stickyCard.querySelector('#suite-cout');
    const guestsInput = stickyCard.querySelector('#suite-guests');
    const nightsCountEl = stickyCard.querySelector('#sticky-nights-count');
    const totalPriceEl = stickyCard.querySelector('#sticky-total-price');
    const whatsappBtn = stickyCard.querySelector('#sticky-whatsapp-btn');
    const currentSuiteKey = stickyCard.getAttribute('data-suite-id') || 'signature-room';
    const suiteInfo = rates[currentSuiteKey] || rates['signature-room'];

    if (cinInput && !cinInput.value) {
      cinInput.value = todayStr;
      cinInput.min = todayStr;
    }
    if (coutInput && !coutInput.value) {
      coutInput.value = dayTwoStr;
      coutInput.min = todayStr;
    }

    function updateStickyQuote() {
      if (!cinInput || !coutInput) return;
      const cin = new Date(cinInput.value);
      const cout = new Date(coutInput.value);
      let nights = Math.ceil((cout - cin) / (1000 * 60 * 60 * 24));
      if (isNaN(nights) || nights < 1) nights = 1;

      const guests = guestsInput ? guestsInput.value : '2 Adults';
      const total = suiteInfo.price * nights;

      if (nightsCountEl) {
        nightsCountEl.textContent = `${nights} night${nights > 1 ? 's' : ''}`;
      }
      if (totalPriceEl) {
        totalPriceEl.textContent = `₦${total.toLocaleString('en-NG')}`;
      }
      if (whatsappBtn) {
        const msg = encodeURIComponent(
          `Hello SAAFI Boutique Hotel Desk,\n\nI would like to reserve the ${suiteInfo.name}:\n• Rate: ₦${suiteInfo.price.toLocaleString('en-NG')} per night\n• Check-in: ${cinInput.value}\n• Check-out: ${coutInput.value}\n• Duration: ${nights} Night(s)\n• Occupancy: ${guests}\n• Total Amount: ₦${total.toLocaleString('en-NG')}\n\nPlease confirm availability and provide reservation details. Thank you!`
        );
        whatsappBtn.href = `https://wa.me/2348027777456?text=${msg}`;
      }
    }

    if (cinInput) cinInput.addEventListener('change', () => {
      const cin = new Date(cinInput.value);
      const nextDay = new Date(cin);
      nextDay.setDate(nextDay.getDate() + 1);
      if (coutInput) {
        coutInput.min = nextDay.toISOString().split('T')[0];
        if (new Date(coutInput.value) <= cin) {
          coutInput.value = nextDay.toISOString().split('T')[0];
        }
      }
      updateStickyQuote();
    });

    if (coutInput) coutInput.addEventListener('change', updateStickyQuote);
    if (guestsInput) guestsInput.addEventListener('change', updateStickyQuote);
    updateStickyQuote();
  }
}

/* --------------------------------------------------------------------------
FAQ Accordions
-------------------------------------------------------------------------- */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
Suite Gallery Thumbnails
-------------------------------------------------------------------------- */
function initGalleryThumbs() {
  const heroImage = document.querySelector('.suite-gallery-hero img');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  if (!heroImage || thumbs.length === 0) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const newSrc = thumb.getAttribute('data-full-src') || thumb.querySelector('img').src;
      heroImage.src = newSrc;
    });
  });
}

/* --------------------------------------------------------------------------
Airport Chauffeur Transfer Request Form
-------------------------------------------------------------------------- */
function initChauffeurForm() {
  const chauffeurForm = document.getElementById('chauffeur-request-form');
  if (!chauffeurForm) return;

  chauffeurForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const guestName = chauffeurForm.querySelector('#guest-name').value;
    const flightNumber = chauffeurForm.querySelector('#flight-number').value;
    const arrivalDate = chauffeurForm.querySelector('#arrival-date').value;
    const arrivalTime = chauffeurForm.querySelector('#arrival-time').value;
    const passengers = chauffeurForm.querySelector('#passenger-count').value;

    const msg = encodeURIComponent(
      `Hello SAAFI Concierge Desk,\n\nI would like to request an Airport Chauffeur Pickup from Nnamdi Azikiwe International Airport (ABV) to SAAFI Boutique Hotel:\n• Guest Name: ${guestName}\n• Flight Number: ${flightNumber}\n• Date: ${arrivalDate}\n• Estimated Time: ${arrivalTime}\n• Passengers: ${passengers}\n\nPlease confirm chauffeur availability and driver details. Thank you!`
    );
    window.open(`https://wa.me/2348027777456?text=${msg}`, '_blank');
  });
}

/* --------------------------------------------------------------------------
Fluid Scroll Reveals (IntersectionObserver)
-------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}
