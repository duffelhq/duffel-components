import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";
import PACKAGE_DOT_JSON from "../../package.json";

let hasSentryInitiated = false;
function initiateSentry() {
  Sentry.init({
    dsn: "https://903950caba7d4802afe6c1e985ad5ebd@o128085.ingest.sentry.io/4504854496149504",

    /**
     * The release identifier used when uploading respective source maps. Specify
     * this value to allow Sentry to resolve the correct source maps when
     * processing events.
     */
    release: `${PACKAGE_DOT_JSON.name}@${PACKAGE_DOT_JSON.version}`,

    /**
     * List of integrations that should be installed after SDK was initialized.
     * Accepts either a list of integrations or a function that receives
     * default integrations and returns a new, updated list.
     */
    integrations: [new BrowserTracing()],

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

export const captureErrorInSentry = (
  error: Error,
  context?: Record<string, any>
) => {
  if (!hasSentryInitiated) {
    initiateSentry();
  }

  Sentry.configureScope((scope) => {
    if (error.message) {
      scope.setFingerprint([error.message]);
    }

    if (context) {
      Object.entries(context).forEach(([key, value]) =>
        scope.setExtra(key, value)
      );
    }
  });

  return Sentry.captureException(error);
};
