import { dev } from '$app/environment';
import { PUBLIC_SENTRY_ENVIRONMENT, PUBLIC_SENTRY_DNS } from '$env/static/public';
import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

if (!dev) {
  Sentry.init({
    environment: PUBLIC_SENTRY_ENVIRONMENT || 'unknown-environment',
    dsn: PUBLIC_SENTRY_DNS,
    tracesSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0
  });
}

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
