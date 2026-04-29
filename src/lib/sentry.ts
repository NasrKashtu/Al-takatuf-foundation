import * as Sentry from '@sentry/react';

// Sentry stays inert unless VITE_SENTRY_DSN is set, so dev runs never ping the
// service. In Vercel, set VITE_SENTRY_DSN as an env var on the project.
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_APP_VERSION as string | undefined,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
  });
}

export { Sentry };
