import * as Sentry from "@sentry/browser";

let hasSentryInitiated = false;
function initiateSentry() {
  Sentry.init({
    dsn: "https://903950caba7d4802afe6c1e985ad5ebd@o128085.ingest.sentry.io/4504854496149504",

    /**
     * The release identifier used when uploading respective source maps. Specify
     * this value to allow Sentry to resolve the correct source maps when
     * processing events.
     */
    release: process.env.COMPONENT_VERSION,

    /**
     * List of integrations that should be installed after SDK was initialized.
     * Accepts either a list of integrations or a function that receives
     * default integrations and returns a new, updated list.
     */
    integrations: [new Sentry.BrowserTracing()],

    /**
     * Sample rate to determine trace sampling.
     *
     * 0.0 = 0% chance of a given trace being sent (send no traces) 1.0 = 100% chance of a given trace being sent (send
     * all traces)
     *
     * Tracing is enabled if either this or `tracesSampler` is defined. If both are defined, `tracesSampleRate` is
     * ignored.
     */
    tracesSampleRate: 1,
  });
  hasSentryInitiated = true;
}

export const captureErrorInSentry = (error: Error) => {
  if (!hasSentryInitiated) {
    initiateSentry();
  }

  return Sentry.captureException(error);
};
