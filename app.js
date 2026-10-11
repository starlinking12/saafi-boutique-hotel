const SUITES = {
  'signature-room': {
    title: 'Signature Room',
    category: 'Essential Luxury',
    price: 85950,
    priceFormatted: '85,950',
    guests: '2 Adults',
    bed: '1 Queen Bed',
    size: '28 m²',
    view: 'Madiana Street & Courtyard View',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
    description: 'An elegantly appointed retreat designed for executive travelers and discerning solo guests in Wuse 2.',
    specs: [
      { label: 'Max Guests', val: '2 Adults' },
      { label: 'Bed Type', val: 'Queen Plush' },
      { label: 'Room Size', val: '28 m² / 301 sq ft' },
      { label: 'Breakfast', val: 'Complimentary Included' }
    ],
    amenities: [
      'High-Speed Wi-Fi (Fiber Optic)',
      'Complimentary Daily Breakfast',
      'Smart LED TV with Streaming',
      'Tea & Coffee Station',
      'Ensuite Walk-in Rain Shower',
      'Executive Working Desk',
      '24/7 Silent Generator Power',
      'Daily Housekeeping & Turndown'
    ]
  },
  'deluxe-plus': {
    title: 'Deluxe Plus',
    category: 'Spacious Comfort',
    price: 93500,
    priceFormatted: '93,500',
    guests: '2 Adults',
    bed: '1 King Bed',
    size: '34 m²',
    view: 'Garden Courtyard View',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    description: 'Generous square footage paired with a dedicated lounge corner, quiet courtyard outlook, and king bedding.',
    specs: [
      { label: 'Max Guests', val: '2 Adults' },
      { label: 'Bed Type', val: 'King Plush' },
      { label: 'Room Size', val: '34 m² / 366 sq ft' },
      { label: 'Breakfast', val: 'Complimentary Included' }
    ],
    amenities: [
      'Fiber Optic High-Speed Wi-Fi',
      'Complimentary Daily Breakfast',
      'King-Size Upholstered Bed',
      'Sitting Area with Lounge Armchair',
      'Silent In-Room Refrigerator',
      'Marble Vanity & Premium Toiletries',
      '24/7 Silent Generator Power',
      '24-Hour Room Service Access'
    ]
  },
  'deluxe-royal': {
    title: 'Deluxe Royal',
    category: 'Balcony Sanctuary',
    price: 115250,
    priceFormatted: '115,250',
    guests: '2 Adults',
    bed: '1 King Bed',
    size: '42 m²',
    view: 'Private Balcony View',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85',
    description: 'Bespoke elegance featuring a private outdoor balcony overlooking Wuse 2, walk-in rainfall shower, and custom minibar.',
    specs: [
      { label: 'Max Guests', val: '2 Adults' },
      { label: 'Bed Type', val: 'Emperor King Bed' },
      { label: 'Room Size', val: '42 m² / 452 sq ft' },
      { label: 'Balcony', val: 'Private Outdoor Terrace' }
    ],
    amenities: [
      'Private Outdoor Balcony',
      'Complimentary Daily Breakfast',
      'Glass-Enclosed Rain Shower',
      'Plush Bathrobes & Spa Slippers',
      'Custom Curated Minibar',
      '50-inch 4K Smart TV',
      'Express VIP Check-in Desk',
      'Massage Chair Lounge Access'
    ]
  },
  'executive-suite': {
    title: 'Executive Suite',
    category: 'Master Residence',
    price: 145790,
    priceFormatted: '145,790',
    guests: '2 Adults, 1 Child',
    bed: '1 King Bed + Living Room',
    size: '56 m²',
    view: 'Dual Aspect City & Courtyard View',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=85',
    description: 'The pinnacle of SAAFI luxury. A separate living and dining salon, executive desk, and master bedroom suite.',
    specs: [
      { label: 'Max Guests', val: '2-3 Guests' },
      { label: 'Bed Type', val: 'Master King Bed' },
      { label: 'Room Size', val: '56 m² / 602 sq ft' },
      { label: 'Salon', val: 'Separate Living & Dining' }
    ],
    amenities: [
      'Separate Living & Dining Salon',
      'Complimentary Premium Breakfast',
      'Dual Vanity Luxury Bathroom',
      'Dedicated Workstation with Ergonomics',
      'Complimentary Laundry (2 pieces/day)',
      'VIP Priority Concierge & Parking',
      'Massage Chair Priority Access',
      '24/7 Butler & Room Service'
    ]
  }
};

function initSpringObserver() {
  const elements = document.querySelectorAll('[data-spring]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el) => observer.observe(el));
}

function renderOverview() {
  const container = document.getElementById('dynamicView');
  if (!container) return;
  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section" id="overview">
      <div class="hero-bg" style="background-image: linear-gradient(180deg, rgba(13, 14, 17, 0.4) 0%, rgba(13, 14, 17, 0.95) 100%), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85');"></div>
      <div class="container hero-content">
        <div class="hero-tagline" data-spring>
          <span class="tag-line-dot"></span>
          <span>AN INTIMATE 22-ROOM RETREAT IN WUSE 2, ABUJA</span>
        </div>
        <h1 class="hero-title" data-spring>Quiet Luxury,<br>Crafted For The Discerning.</h1>
        <p class="hero-sub" data-spring>Tucked into peaceful Madiana Close, off Dar es Salaam Crescent. Experience serene hospitality, bespoke suites, and 24/7 uncompromised comfort.</p>
        
        <!-- Booking Bar -->
        <div class="booking-card" id="booking" data-spring>
          <div class="booking-form-grid">
            <div class="booking-field">
              <label for="checkInInput">CHECK-IN</label>
              <input type="date" id="checkInInput" value="2026-10-12">
            </div>
            <div class="booking-field">
              <label for="checkOutInput">CHECK-OUT</label>
              <input type="date" id="checkOutInput" value="2026-10-14">
            </div>
            <div class="booking-field">
              <label for="suiteSelect">ROOM TYPE</label>
              <select id="suiteSelect">
                <option value="signature-room">Signature Room (₦85,950)</option>
                <option value="deluxe-plus">Deluxe Plus (₦93,500)</option>
                <option value="deluxe-royal">Deluxe Royal (₦115,250)</option>
                <option value="executive-suite">Executive Suite (₦145,790)</option>
                <option value="meeting">Boardroom (₦250,000/day)</option>
              </select>
            </div>
            <div class="booking-field">
              <label for="guestsCount">GUESTS</label>
              <select id="guestsCount">
                <option value="1">1 Guest</option>
                <option value="2" selected>2 Guests</option>
                <option value="3">3 Guests</option>
              </select>
            </div>
            <div class="booking-submit">
              <button class="btn btn-gold btn-full" id="bookingSubmitBtn">Reserve Direct</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Suites Showcase Section -->
    <section class="suites-section" id="suites">
      <div class="container">
        <div class="section-header" data-spring>
          <span class="section-subtitle">THE RESIDENCES</span>
          <h2 class="section-title">22 Refined Boutique Suites</h2>
          <p class="section-desc">Each space is tailored with plush orthopedic bedding, warm ambient lighting, marble bathrooms, and dedicated fiber-optic connectivity.</p>
        </div>

        <div class="suites-grid">
          ${Object.entries(SUITES).map(([slug, suite], index) => `
            <div class="suite-card" data-spring style="transition-delay: ${index * 0.1}s;">
              <div class="suite-card-image" style="background-image: url('${suite.image}');">
                <span class="suite-category-badge">${suite.category}</span>
                <span class="suite-rate-badge">&#8358;${suite.priceFormatted} <small>/ night</small></span>
              </div>
              <div class="suite-card-body">
                <h3 class="suite-card-title">${suite.title}</h3>
                <p class="suite-card-desc">${suite.description}</p>
                <div class="suite-spec-strip">
                  <span>${suite.guests}</span>
                  <span class="bullet">&bull;</span>
                  <span>${suite.bed}</span>
                  <span class="bullet">&bull;</span>
                  <span>${suite.size}</span>
                </div>
                <div class="suite-card-actions">
                  <a href="#suite/${slug}" class="btn btn-outline btn-full">View Suite Specs</a>
                  <a href="https://wa.me/2348027777456?text=Hello%20SAAFI%20Boutique%20Hotel%2C%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(suite.title)}%20at%20%E2%82%A6${suite.priceFormatted}%20per%20night." target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-full">Reserve on WhatsApp</a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Everything You Need Amenities -->
    <section class="amenities-section" id="amenities">
      <div class="container">
        <div class="section-header text-center" data-spring>
          <span class="section-subtitle">THE SAAFI STANDARD</span>
          <h2 class="section-title">Everything You Need In Wuse 2</h2>
        </div>
        <div class="amenities-grid">
          <div class="amenity-card" data-spring>
            <span class="amenity-num">01</span>
            <h3 class="amenity-name">African &amp; Continental Dining</h3>
            <p class="amenity-text">Our private restaurant and room service menu serves fresh chef-prepared dishes daily, from traditional local soups to grilled cuts.</p>
          </div>
          <div class="amenity-card" data-spring style="transition-delay: 0.1s;">
            <span class="amenity-num">02</span>
            <h3 class="amenity-name">24/7 Silent Backup Power</h3>
            <p class="amenity-text">Uninterrupted dual generator power backed with sound insulation ensures uninterrupted air conditioning, lighting, and productivity.</p>
          </div>
          <div class="amenity-card" data-spring style="transition-delay: 0.2s;">
            <span class="amenity-num">03</span>
            <h3 class="amenity-name">Massage Chair Relaxation Lounge</h3>
            <p class="amenity-text">Decompress after business meetings or travel in our dedicated full-body luxury massage chairs in the hotel relaxation foyer.</p>
          </div>
          <div class="amenity-card" data-spring style="transition-delay: 0.3s;">
            <span class="amenity-num">04</span>
            <h3 class="amenity-name">Secure Madiana Close Location</h3>
            <p class="amenity-text">A private gated close off Dar es Salaam Crescent with on-site private security, CCTV surveillance, and dedicated guest parking.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Meeting Boardroom Spotlight -->
    <section class="meeting-section" id="meeting">
      <div class="container meeting-wrapper" data-spring>
        <div class="meeting-text-col">
          <span class="section-subtitle">EXECUTIVE FACILITIES</span>
          <h2 class="section-title">The SAAFI Boardroom</h2>
          <p class="meeting-desc">Host high-level board meetings, private investor presentations, and discreet conferences in our dedicated executive suite. Fully equipped with high-lumen digital projection, conference Wi-Fi, and personalized coffee service.</p>
          <div class="meeting-features">
            <div class="feat-item"><span>Capacity:</span> Up to 18 delegates</div>
            <div class="feat-item"><span>Rate:</span> &#8358;250,000 / full day</div>
            <div class="feat-item"><span>Includes:</span> AV Projection, High-Speed Wi-Fi, Tea &amp; Pastry Break</div>
          </div>
          <a href="https://wa.me/2348027777456?text=Hello%20SAAFI%20Boutique%20Hotel%2C%20I%20would%20like%20to%20book%20the%20Meeting%20Boardroom%20at%20%E2%82%A6250%2C000%2Fday." target="_blank" rel="noopener noreferrer" class="btn btn-gold">Book Boardroom</a>
        </div>
        <div class="meeting-image-col" style="background-image: url('https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=85');"></div>
      </div>
    </section>

    <!-- Dining Preview Section -->
    <section class="dining-section" id="dining">
      <div class="container">
        <div class="section-header" data-spring>
          <span class="section-subtitle">CULINARY EXCELLENCE</span>
          <h2 class="section-title">SAAFI Restaurant &amp; In-Room Dining</h2>
          <p class="section-desc">Complimentary breakfast is served for every hotel guest from 7:00 AM to 11:00 AM. In addition, our all-day dining menu features freshly prepared Nigerian and continental specialties.</p>
        </div>
        <div class="dining-cards-grid">
          <div class="dining-card" data-spring>
            <div class="dining-card-img" style="background-image: url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80');"></div>
            <div class="dining-card-info">
              <h4>Chef's Breakfast Table</h4>
              <p>Fluffy omelettes, fresh seasonal fruits, golden toast, hot tea, brewed coffee, and Nigerian breakfast staples included with every stay.</p>
            </div>
          </div>
          <div class="dining-card" data-spring style="transition-delay: 0.15s;">
            <div class="dining-card-img" style="background-image: url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80');"></div>
            <div class="dining-card-info">
              <h4>All-Day Dining &amp; Room Service</h4>
              <p>Grilled catfish, goat meat pepper soup, tender beef suya, creamy pastas, club sandwiches, and chilled refreshing beverages delivered straight to your door.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Location & Contact Section -->
    <section class="contact-section" id="contact">
      <div class="container contact-grid">
        <div class="contact-card" data-spring>
          <span class="section-subtitle">VISIT SAAFI</span>
          <h2 class="section-title">Quiet Street in Wuse 2</h2>
          <p class="contact-desc">No. 6 Madiana Close, Off Dar es Salaam Crescent, Off Aminu Kano Crescent, Wuse 2, Abuja 904101, Nigeria.</p>
          <div class="contact-lines">
            <div class="contact-row">
              <span class="label">Reservations &amp; WhatsApp:</span>
              <a href="tel:+2348027777456" class="val">+234 802 777 7456</a>
            </div>
            <div class="contact-row">
              <span class="label">Front Desk Secondary:</span>
              <a href="tel:+2349031595162" class="val">+234 903 159 5162</a>
            </div>
            <div class="contact-row">
              <span class="label">Official Email:</span>
              <a href="mailto:reservationsaafihotel@gmail.com" class="val">reservationsaafihotel@gmail.com</a>
            </div>
            <div class="contact-row">
              <span class="label">Check-in / Check-out:</span>
              <span class="val">Check-in 2:00 PM &bull; Check-out 12:00 PM</span>
            </div>
          </div>
          <div class="contact-btn-row">
            <a href="https://wa.me/2348027777456" target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-full">Chat with Front Desk</a>
            <a href="tel:+2348027777456" class="btn btn-outline btn-full">Call 0802 777 7456</a>
          </div>
        </div>
        <div class="map-card" data-spring style="transition-delay: 0.15s;">
          <iframe title="SAAFI Boutique Hotel Location Map" src="https://maps.google.com/maps?q=Dar%20es%20Salaam%20Crescent%2C%20Wuse%202%2C%20Abuja&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
    </section>
  `;

  document.getElementById('bookingSubmitBtn')?.addEventListener('click', () => {
    const checkIn = document.getElementById('checkInInput').value;
    const checkOut = document.getElementById('checkOutInput').value;
    const suiteKey = document.getElementById('suiteSelect').value;
    const guests = document.getElementById('guestsCount').value;
    const suite = SUITES[suiteKey] || { title: 'Room' };
    const msg = `Hello SAAFI Boutique Hotel, I would like to reserve the ${suite.title} for ${guests} guests from ${checkIn} to ${checkOut}. Please confirm availability.`;
    window.open(`https://wa.me/2348027777456?text=${encodeURIComponent(msg)}`, '_blank');
  });

  initSpringObserver();
}

function renderSuiteDetail(slug) {
  const container = document.getElementById('dynamicView');
  if (!container) return;
  const suite = SUITES[slug];
  if (!suite) {
    window.location.hash = '';
    return;
  }

  container.innerHTML = `
    <article class="suite-detail-view">
      <div class="container suite-breadcrumb">
        <a href="#suites" class="back-link">&larr; All Suites &amp; Residences</a>
      </div>
      <div class="container suite-detail-grid">
        <div class="suite-main-col">
          <div class="suite-hero-media" style="background-image: url('${suite.image}');" data-spring>
            <span class="suite-category-badge">${suite.category}</span>
          </div>
          <div class="suite-header" data-spring>
            <span class="section-subtitle">${suite.category}</span>
            <h1 class="suite-view-title">${suite.title}</h1>
            <p class="suite-view-sub">${suite.description}</p>
          </div>

          <div class="suite-specs-grid" data-spring>
            ${suite.specs.map(spec => `
              <div class="spec-box">
                <span class="spec-label">${spec.label}</span>
                <span class="spec-value">${spec.val}</span>
              </div>
            `).join('')}
          </div>

          <div class="suite-amenities-section" data-spring>
            <h2 class="sub-heading">Suite Amenities &amp; Inclusions</h2>
            <div class="amenities-checklist">
              ${suite.amenities.map(item => `
                <div class="check-item">
                  <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <aside class="suite-sidebar">
          <div class="sticky-reservation-card" data-spring>
            <span class="card-tag">DIRECT RESERVATION</span>
            <div class="rate-display">
              <span class="rate-num">&#8358;${suite.priceFormatted}</span>
              <span class="rate-per">/ night (Breakfast Included)</span>
            </div>
            <p class="card-policy">Best rate guaranteed when booking directly with the hotel desk.</p>
            <div class="sidebar-actions">
              <a href="https://wa.me/2348027777456?text=Hello%20SAAFI%20Boutique%20Hotel%2C%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(suite.title)}%20at%20%E2%82%A6${suite.priceFormatted}%20per%20night." target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-full">
                Reserve on WhatsApp
              </a>
              <a href="tel:+2348027777456" class="btn btn-outline btn-full">
                Call Front Desk Directly
              </a>
            </div>
            <div class="guarantee-points">
              <div class="guarantee-item">
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Zero OTA commissions</span>
              </div>
              <div class="guarantee-item">
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Instant booking confirmation</span>
              </div>
              <div class="guarantee-item">
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Early check-in upon availability</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
  initSpringObserver();
}

function handleRouting() {
  const hash = window.location.hash;
  if (hash.startsWith('#suite/')) {
    const slug = hash.replace('#suite/', '');
    renderSuiteDetail(slug);
  } else {
    renderOverview();
    if (hash && hash !== '#' && document.querySelector(hash)) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('[data-drawer-nav]').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  window.addEventListener('hashchange', handleRouting);
  handleRouting();
});
