/* ==========================================================================
   SAAFI BOUTIQUE HOTEL - FRONTEND APPLICATION JAVASCRIPT
   Interactive booking calculations, WhatsApp reservation slip generator,
   FAQ accordions, mobile drawer, and gallery lightbox.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initBookingCalculators();
  initFaqAccordions();
  initGalleryThumbs();
  initChauffeurForm();
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
  const heroForm = document.getElementById('hero-booking-form');
  if (heroForm) {
    const checkinInput = heroForm.querySelector('#checkin-date');
    const checkoutInput = heroForm.querySelector('#checkout-date');
    const suiteSelect = heroForm.querySelector('#suite-select');
    const guestsSelect = heroForm.querySelector('#guests-select');
    const summaryEl = heroForm.querySelector('#hero-summary-text');
    const bookBtn = heroForm.querySelector('#hero-reserve-btn');

    // Default dates: today and tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (checkinInput && !checkinInput.value) {
      checkinInput.value = today.toISOString().split('T')[0];
      checkinInput.min = today.toISOString().split('T')[0];
    }
    if (checkoutInput && !checkoutInput.value) {
      checkoutInput.value = tomorrow.toISOString().split('T')[0];
      checkoutInput.min = tomorrow.toISOString().split('T')[0];
    }

    function updateHeroQuote() {
      const cin = new Date(checkinInput.value);
      const cout = new Date(checkoutInput.value);
      let nights = Math.ceil((cout - cin) / (1000 * 60 * 60 * 24));
      if (isNaN(nights) || nights < 1) nights = 1;

      const selectedSuite = suiteSelect ? suiteSelect.value : 'signature-room';
      const suiteInfo = rates[selectedSuite] || rates['signature-room'];
      const guests = guestsSelect ? guestsSelect.value : '2 Guests';
      const total = nights * suiteInfo.price;

      if (summaryEl) {
        summaryEl.innerHTML = `<strong>${nights} night(s)</strong> selected for <strong>${suiteInfo.name}</strong> • Estimated: <strong>₦${total.toLocaleString('en-NG')}</strong>`;
      }

      if (bookBtn) {
        const msg = encodeURIComponent(
          `Hello SAAFI Boutique Hotel Desk,\n\nI would like to reserve a stay:\n• Suite: ${suiteInfo.name} (₦${suiteInfo.price.toLocaleString('en-NG')}/night)\n• Check-in: ${checkinInput.value}\n• Check-out: ${checkoutInput.value}\n• Duration: ${nights} Night(s)\n• Guests: ${guests}\n• Estimated Total: ₦${total.toLocaleString('en-NG')}\n\nPlease confirm room availability and payment instructions. Thank you!`
        );
        bookBtn.href = `https://wa.me/2348027777456?text=${msg}`;
      }
    }

    if (checkinInput) checkinInput.addEventListener('change', () => {
      const cin = new Date(checkinInput.value);
      const nextDay = new Date(cin);
      nextDay.setDate(nextDay.getDate() + 1);
      checkoutInput.min = nextDay.toISOString().split('T')[0];
      if (new Date(checkoutInput.value) <= cin) {
        checkoutInput.value = nextDay.toISOString().split('T')[0];
      }
      updateHeroQuote();
    });
    if (checkoutInput) checkoutInput.addEventListener('change', updateHeroQuote);
    if (suiteSelect) suiteSelect.addEventListener('change', updateHeroQuote);
    if (guestsSelect) guestsSelect.addEventListener('change', updateHeroQuote);

    updateHeroQuote();
  }

  // 2. Setup Sticky Suite Detail Reservation Cards
  const stickyCard = document.querySelector('.sticky-booking-card');
  if (stickyCard) {
    const suiteKey = stickyCard.getAttribute('data-suite-key') || 'signature-room';
    const suiteInfo = rates[suiteKey] || rates['signature-room'];
    const cinInput = stickyCard.querySelector('#suite-checkin');
    const coutInput = stickyCard.querySelector('#suite-checkout');
    const guestsInput = stickyCard.querySelector('#suite-guests');
    const nightsCountEl = stickyCard.querySelector('#nights-count');
    const totalPriceEl = stickyCard.querySelector('#total-calculated-price');
    const whatsappBtn = stickyCard.querySelector('#suite-whatsapp-book');

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (cinInput && !cinInput.value) {
      cinInput.value = today.toISOString().split('T')[0];
      cinInput.min = today.toISOString().split('T')[0];
    }
    if (coutInput && !coutInput.value) {
      coutInput.value = tomorrow.toISOString().split('T')[0];
      coutInput.min = tomorrow.toISOString().split('T')[0];
    }

    function updateStickyQuote() {
      const cin = new Date(cinInput.value);
      const cout = new Date(coutInput.value);
      let nights = Math.ceil((cout - cin) / (1000 * 60 * 60 * 24));
      if (isNaN(nights) || nights < 1) nights = 1;

      const guests = guestsInput ? guestsInput.value : '2 Guests';
      const total = nights * suiteInfo.price;

      if (nightsCountEl) nightsCountEl.textContent = `${nights} night${nights > 1 ? 's' : ''}`;
      if (totalPriceEl) totalPriceEl.textContent = `₦${total.toLocaleString('en-NG')}`;

      if (whatsappBtn) {
        const msg = encodeURIComponent(
          `Hello SAAFI Boutique Hotel Desk,\n\nI would like to reserve the ${suiteInfo.name}:\n• Rate: ₦${suiteInfo.price.toLocaleString('en-NG')} per night\n• Check-in: ${cinInput.value}\n• Check-out: ${coutInput.value}\n• Length of Stay: ${nights} Night(s)\n• Guests: ${guests}\n• Total Amount: ₦${total.toLocaleString('en-NG')}\n\nPlease confirm availability and provide reservation details. Thank you!`
        );
        whatsappBtn.href = `https://wa.me/2348027777456?text=${msg}`;
      }
    }

    if (cinInput) cinInput.addEventListener('change', () => {
      const cin = new Date(cinInput.value);
      const nextDay = new Date(cin);
      nextDay.setDate(nextDay.getDate() + 1);
      coutInput.min = nextDay.toISOString().split('T')[0];
      if (new Date(coutInput.value) <= cin) {
        coutInput.value = nextDay.toISOString().split('T')[0];
      }
      updateStickyQuote();
    });
    if (coutInput) coutInput.addEventListener('change', updateStickyQuote);
    if (guestsInput) guestsInput.addEventListener('change', updateStickyQuote);

    updateStickyQuote();
  }
}

/* --------------------------------------------------------------------------
   Interactive FAQ Accordions
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
