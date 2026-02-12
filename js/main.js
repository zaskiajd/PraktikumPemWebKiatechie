// ==========================================
//   PORTFOLIO JS — Cute & Interactive ✨
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── PAGE LOADER ────────────────────────────────────
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1200);
  }



 
  // ─── ACTIVE NAV LINK ────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── NAV MOBILE TOGGLE ──────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
    // close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
      });
    });
  }

  // ─── SCROLL REVEAL ──────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── SKILL BARS ANIMATE ─────────────────────────────
  const skillFills = document.querySelectorAll('.skill-fill[data-width]');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  // ─── PORTFOLIO FILTER ───────────────────────────────
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-cat]');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;

        projectCards.forEach((card, i) => {
          const show = cat === 'all' || card.dataset.cat === cat;
          if (show) {
            card.classList.remove('hidden');
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 60);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => card.classList.add('hidden'), 300);
          }
        });
      });
    });
  }

  // ─── COUNTER ANIMATION (home stats) ─────────────────
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let count    = 0;
        const step   = Math.ceil(target / 60);
        const timer  = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          el.textContent = count + suffix;
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ─── TYPED TEXT EFFECT ──────────────────────────────
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const words = typedEl.dataset.words ? typedEl.dataset.words.split(',') : ['Developer'];
    let wordIndex  = 0;
    let charIndex  = 0;
    let isDeleting = false;

    function type() {
      const current = words[wordIndex];
      if (!isDeleting) {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(type, 1600);
          return;
        }
      } else {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(type, isDeleting ? 60 : 100);
    }
    setTimeout(type, 800);
  }

  // ─── CONTACT FORM ───────────────────────────────────
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const btn     = contactForm.querySelector('button[type="submit"]');
      const success = document.querySelector('.form-success');
      const orig    = btn.textContent;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        if (success) {
          contactForm.style.display = 'none';
          success.style.display = 'block';
        }
        showToast('💌 Message sent, Thank You ~');
        btn.textContent = orig;
        btn.disabled = false;
      }, 1800);
    });
  }

  // ─── TOAST NOTIFICATION ─────────────────────────────
  function showToast(message, emoji = '🌸') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${emoji}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }

  // ─── EASTER EGG: Konami Code ────────────────────────
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                      'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIndex = 0;
  document.addEventListener('keydown', e => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        activateRainbow();
        showToast('🎉 Secret mode aktif! Kamu hebat!', '🌈');
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateRainbow() {
    document.documentElement.style.setProperty('--peach-accent', '#ff6b9d');
    document.documentElement.style.setProperty('--peach-main', '#ffb3d1');
    setTimeout(() => {
      document.documentElement.style.removeProperty('--peach-accent');
      document.documentElement.style.removeProperty('--peach-main');
    }, 5000);
    // Spawn burst of hearts
    for (let i = 0; i < 30; i++) spawnParticle();
  }



  // ─── NAV SCROLL SHADOW ──────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        nav.style.boxShadow = '0 8px 40px rgba(244,122,96,0.25)';
      } else {
        nav.style.boxShadow = '';
      }
    });
  }

  // expose showToast globally for inline usage
  window.showToast = showToast;
});
