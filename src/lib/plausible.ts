// Plausible loads only when VITE_PLAUSIBLE_DOMAIN is set, so dev never pings
// the analytics endpoint. Set this env var on Vercel for production.
export function initPlausible() {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
  if (!domain) return;
  if (typeof document === 'undefined') return;
  if (document.querySelector('script[data-plausible-loaded]')) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://plausible.io/js/script.js';
  script.dataset.domain = domain;
  script.dataset.plausibleLoaded = 'true';
  document.head.appendChild(script);
}
