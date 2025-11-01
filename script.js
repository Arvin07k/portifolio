/* filepath: c:\Users\ARVIN\pro\chefs-eye-app\script.js */
/* Navbar behavior, typing effect, GSAP hero intro, AOS init, small UX helpers */

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  });

  // Smooth scroll for nav links
  navLinks.forEach(a => a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({behavior:'smooth',block:'start'});
  }));

  // Typing animation (loop)
  const typedEl = document.getElementById('typed');
  const titles = ["Software Engineer", "4th Year Undergraduate", "MTech Integrated Software Engineering"];
  const TYPING_SPEED = 80;
  const PAUSE = 1400;
  let ti = 0, ci = 0, deleting = false;

  function tick() {
    const full = titles[ti];
    if (!deleting) {
      typedEl.textContent = full.slice(0, ci + 1);
      ci++;
      if (ci === full.length) {
        deleting = true;
        setTimeout(tick, PAUSE);
        return;
      }
    } else {
      typedEl.textContent = full.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % titles.length;
      }
    }
    setTimeout(tick, deleting ? TYPING_SPEED / 2 : TYPING_SPEED);
  }
  tick();

  // GSAP intro animation for hero elements
  try {
    const tl = gsap.timeline({defaults:{duration:0.9, ease:"power3.out"}});
    tl.from(".hero-title", {y:24, opacity:0})
      .from(".hero-sub", {y:20, opacity:0}, "-=0.6")
      .from(".hero-tagline", {y:18, opacity:0}, "-=0.55")
      .from(".hero-ctas a", {y:14, opacity:0, stagger:0.12}, "-=0.5")
      .from(".contact-row a", {y:10, opacity:0, stagger:0.06}, "-=0.5")
      .from(".visual-card", {scale:0.98, opacity:0}, "-=0.7");
  } catch (e) { /* ignore if GSAP missing */ }

  // AOS init
  if (window.AOS) AOS.init({duration:700, once:true, easing:'ease-out-cubic'});

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  menuToggle && menuToggle.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
    menuToggle.classList.toggle('open');
  });

  // Accessibility: close mobile menu on nav item click (if open)
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      const nav = document.querySelector('.nav-links');
      if (nav.classList.contains('open')) nav.classList.remove('open');
    });
  });

  // Tiny polishes: reveal focus visible
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
  });
});