// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== MOBILE MENU ==========
const navToggle = document.getElementById('navToggle');
const navRight = document.querySelector('.nav-right');
navToggle.addEventListener('click', () => {
  navRight.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navRight.classList.remove('open'));
});

// ========== ACTIVE NAV LINK ==========
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 150;
  sections.forEach(sec => {
    const top = sec.offsetTop, h = sec.offsetHeight, id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + h);
  });
});

// ========== COUNTER ANIMATION ==========
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const duration = 1800;
    let startTime = null;
    function update(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  });
}

// ========== STAGGERED SCROLL REVEAL ==========
function setupReveal() {
  const grids = document.querySelectorAll('.problem-grid, .features-grid, .tech-grid, .team-grid');
  grids.forEach(grid => {
    Array.from(grid.children).forEach((card, i) => {
      card.classList.add('reveal');
      card.style.transitionDelay = `${i * 100}ms`;
    });
  });

  document.querySelectorAll('.flow-step').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 120}ms`;
  });

  document.querySelectorAll('.stat-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 100}ms`;
  });

  document.querySelectorAll('.highlight').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 80}ms`;
  });

  document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal-scale'));
  document.querySelectorAll('.main-solution').forEach(el => el.classList.add('reveal-scale'));
  document.querySelectorAll('.cta-box').forEach(el => el.classList.add('reveal-scale'));
}
setupReveal();

// Observer
let countersAnimated = false;
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger counters when stats come into view
      if (!countersAnimated && entry.target.classList.contains('stat-card')) {
        countersAnimated = true;
        animateCounters();
      }
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});

// ========== PARALLAX ON HERO ==========
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    hero.style.opacity = 1 - (window.scrollY / (window.innerHeight * 1.1));
  }
});

// ========== TILT EFFECT ON CARDS ==========
function addTiltEffect(cards) {
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y - rect.height / 2) / rect.height * -12;
      const rotateY = (x - rect.width / 2) / rect.width * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
      card.style.zIndex = '10';
      card.style.boxShadow = '0 25px 50px rgba(255,107,53,0.15)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.zIndex = '1';
      card.style.boxShadow = '';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}
addTiltEffect(document.querySelectorAll('.feature-card, .problem-card, .tech-card, .flow-step, .team-card'));

// ========== MAGNETIC BUTTON ==========
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
