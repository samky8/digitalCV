document.getElementById('year').textContent = new Date().getFullYear();

// Keep the complete career history available when printing the page.
let previouslyOpen = [];
window.addEventListener('beforeprint', () => {
  previouslyOpen = [...document.querySelectorAll('details')].filter(item => item.open);
  document.querySelectorAll('details').forEach(item => { item.open = true; });
});
window.addEventListener('afterprint', () => {
  document.querySelectorAll('details').forEach(item => { item.open = previouslyOpen.includes(item); });
});

// Preserve the useful section links from the previous Carrd website.
const legacySections = { '#cv': '#experience', '#exp': '#experience', '#edu': '#about', '#vol': '#experience', '#cert': '#about', '#skl': '#experience', '#lang': '#about' };
function followLegacyLink() {
  const target = legacySections[window.location.hash];
  if (target) document.querySelector(target)?.scrollIntoView();
}
window.addEventListener('hashchange', followLegacyLink);
window.addEventListener('load', followLegacyLink);

// The impact stories lead to the full, keyboard-accessible role descriptions.
function openLinkedRole() {
  const hash = window.location.hash;
  if (!hash.startsWith('#role-')) return;
  const role = document.getElementById(hash.slice(1));
  if (role?.tagName === 'DETAILS') role.open = true;
}
window.addEventListener('hashchange', openLinkedRole);
window.addEventListener('load', openLinkedRole);
document.querySelectorAll('a.card-footer[href^="#role-"]').forEach(link => {
  link.addEventListener('click', () => {
    const role = document.getElementById(link.hash.slice(1));
    if (role) role.open = true;
  });
});

// Pointer effects are progressive enhancement, disabled for touch and reduced motion.
const pointerEffects = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
const glow = document.createElement('div');
glow.className = 'cursor-glow';
glow.setAttribute('aria-hidden', 'true');
document.body.append(glow);
const cards = [...document.querySelectorAll('.impact-card')];
let glowFrame = 0;
let pointerX = 0;
let pointerY = 0;

function hideGlow() {
  cancelAnimationFrame(glowFrame);
  glowFrame = 0;
  glow.classList.remove('is-visible');
}

window.addEventListener('pointermove', event => {
  if (event.target instanceof Element && event.target.closest('.impact-card')) {
    hideGlow();
    return;
  }
  if (!pointerEffects.matches || event.pointerType === 'touch') return;
  pointerX = event.clientX;
  pointerY = event.clientY;
  if (glowFrame) return;
  glowFrame = requestAnimationFrame(() => {
    glow.style.transform = `translate3d(${pointerX - 160}px, ${pointerY - 160}px, 0)`;
    glow.classList.add('is-visible');
    glowFrame = 0;
  });
}, { passive: true });
document.documentElement.addEventListener('pointerleave', hideGlow);
window.addEventListener('blur', hideGlow);
document.addEventListener('visibilitychange', () => { if (document.hidden) hideGlow(); });

cards.forEach(card => {
  let frame = 0;
  let bounds;
  let x = 0;
  let y = 0;
  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    bounds = null;
    card.classList.remove('is-tilting');
    ['--tilt-x', '--tilt-y', '--shine-x', '--shine-y'].forEach(property => card.style.removeProperty(property));
  }
  card.addEventListener('pointerenter', () => { bounds = card.getBoundingClientRect(); });
  card.addEventListener('pointermove', event => {
    if (!pointerEffects.matches || event.pointerType === 'touch') return;
    bounds ||= card.getBoundingClientRect();
    x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    if (frame) return;
    frame = requestAnimationFrame(() => {
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 7}deg`);
      card.style.setProperty('--shine-x', `${x * 100}%`);
      card.style.setProperty('--shine-y', `${y * 100}%`);
      card.classList.add('is-tilting');
      frame = 0;
    });
  }, { passive: true });
  card.addEventListener('pointerleave', reset);
  card.addEventListener('pointercancel', reset);
  window.addEventListener('blur', reset);
  window.addEventListener('scroll', reset, { passive: true });
  window.addEventListener('resize', reset, { passive: true });
  pointerEffects.addEventListener('change', reset);
});
pointerEffects.addEventListener('change', hideGlow);
