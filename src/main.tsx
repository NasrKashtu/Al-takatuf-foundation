import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { Sentry, initSentry } from './lib/sentry'
import ErrorFallback from './components/ErrorFallback'

initSentry();

createRoot(document.getElementById("root")!).render(
  <Sentry.ErrorBoundary fallback={({ resetError }) => <ErrorFallback resetError={resetError} />}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Sentry.ErrorBoundary>
);
