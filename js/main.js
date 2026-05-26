/* =============================================
   GORILAZ — main.js
   ============================================= */

/* --- Navbar scroll --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* --- Hamburger menu --- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
}

/* --- Reveal on scroll --- */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

/* Fallback: si después de 800ms aún hay elementos ocultos, los mostramos */
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    el.classList.add('visible');
  });
}, 800);

/* --- Hero particles --- */
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(201,168,76,${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 30}%;
      animation: particleDrift ${Math.random() * 12 + 10}s ${Math.random() * 8}s ease-in infinite;
    `;
    particleContainer.appendChild(p);
  }
}

/* --- Stagger reveal para cards --- */
document.querySelectorAll('.card').forEach((card, i) => {
  card.classList.add('reveal', `reveal-delay-${(i % 6) + 1}`);
});

/* --- Band items reveal --- */
document.querySelectorAll('.band-item').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1}`);
});

/* --- Section headers reveal --- */
document.querySelectorAll('.section-header, .quote-content').forEach(el => {
  el.classList.add('reveal');
});

/* Re-observar los elementos recién agregados */
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
