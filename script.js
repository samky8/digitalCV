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
const legacySections = { '#cv': '#experience', '#exp': '#experience', '#edu': '#about', '#vol': '.additional', '#cert': '.additional', '#skl': '.expertise', '#lang': '#about' };
function followLegacyLink() {
  const target = legacySections[window.location.hash];
  if (target) document.querySelector(target)?.scrollIntoView();
}
window.addEventListener('hashchange', followLegacyLink);
window.addEventListener('load', followLegacyLink);
