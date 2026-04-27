// ===== HERO SLIDER =====
(function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  if (!slides.length) return;

  let current = 0;
  let autoTimer = null;
  const DURATION = 5000;

  function goTo(index) {
    slides[current].classList.remove('active');
    slides[current].classList.add('exit');
    dots[current].classList.remove('active');
    const prev = current;
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    slides[current].classList.remove('exit');
    dots[current].classList.add('active');
    setTimeout(() => slides[prev].classList.remove('exit'), 750);
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), DURATION);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(Number(dot.dataset.index)); startAuto(); });
  });

  // Swipe support
  let touchStartX = 0;
  const slider = document.getElementById('heroSlider');
  if (slider) {
    slider.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
    }, { passive: true });
  }

  startAuto();
})();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = navToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });
}

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.4s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      if (formSuccess) {
        formSuccess.style.display = 'flex';
        setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
      }
    }, 1200);
  });
}

// ===== SCROLL REVEAL (lightweight) =====
const revealEls = document.querySelectorAll(
  '.highlight-card, .service-card, .review-card, .service-detail-card, .review-full-card, .why-item, .expertise-card'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ===== FADE IN KEYFRAME =====
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }';
document.head.appendChild(style);
