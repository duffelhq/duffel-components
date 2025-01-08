import { ThreeDSecureSession, createClient } from "./client";
import { initEvervault } from "./initEvervault";
import { loadEvervaultScript } from "./loadEvervaultScript";

const DEFAULT_ENVIRONMENT_CONFIGURATION = {
  duffelUrl: "https://api.duffel.com",
  evervaultCredentials: {
    teamID: "team_a22f3ea22207",
    appID: "app_d1d607aedf2d",
  },
};

/**
 * @param clientKey - The client key used to authenticate with the Duffel API.
 * @param cardId - The card ID used for the 3DS session.
 * @param resourceId - The resource (offer, order, order change) ID that the 3DS session is for.
 * @param services - Include all services that are being added, empty if no services are being added. This is required when services are also being purchased to ensure an accurate total amount to be authorised. If no services, it should be an empty array.
 * @param cardholderPresent - Whether the cardholder was present when the 3DS session was created. If you are collecting card details offline, for example an agent interface for entering card details received from the traveller over the phone, then you must specify the cardholder as not present
 * @param exception - The name of the exception used to opt out of authenticating the payment with the card issuer
 */
type CreateThreeDSecureSessionFn = (
  clientKey: string,
  cardId: string,
  resourceId: string,
  services: Array<{ id: string; quantity: number }>,
  cardholderPresent: boolean,
  exception?: string,
  environmentConfiguration?: Partial<typeof DEFAULT_ENVIRONMENT_CONFIGURATION>,
) => Promise<ThreeDSecureSession>;

declare global {
  interface Window {
    createThreeDSecureSession: CreateThreeDSecureSessionFn;
  }
}

const GENERIC_ERROR_MESSAGE = "Failed to create 3DS session";

export const createThreeDSecureSession: CreateThreeDSecureSessionFn = async (
  clientKey,
  cardId,
  resourceId,
  services,
  cardholderPresent,
  exception = "",
  environmentConfiguration = {},
) => {
  const env: typeof DEFAULT_ENVIRONMENT_CONFIGURATION = {
    ...DEFAULT_ENVIRONMENT_CONFIGURATION,
    ...environmentConfiguration,
  };

  // We want to load the Evervault script
  // onto the page as soon as this file is loaded.
  await loadEvervaultScript();

  return new Promise((resolve, reject) => {
    const client = createClient(env.duffelUrl, clientKey);
    let payload;

    if (exception) {
      // Ignore cardholder present param if exception is set
      payload = {
        card_id: cardId,
        resource_id: resourceId,
        services: services,
        exception: exception,
      }
    } else {
      payload = {
        card_id: cardId,
        resource_id: resourceId,
        services: services,
        cardholder_present: cardholderPresent,
        exception: exception,
      }
    }

    client
      .create3DSSessionInDuffelAPI(payload)
      .then((threeDSSession) => {
        if (!threeDSSession) {
          reject(new Error(GENERIC_ERROR_MESSAGE));
          return;
        }

        if (threeDSSession.status === "ready_for_payment") {
          resolve(threeDSSession);
          return;
        }

        if (threeDSSession.client_id === null) {
          reject(new Error(GENERIC_ERROR_MESSAGE));
          return;
        }

        const threeDSecure = initEvervault(
          threeDSSession.client_id,
          env.evervaultCredentials.teamID,
          env.evervaultCredentials.appID,
        );

        threeDSecure.on("failure", () => {
          client
            .refresh3DSSessionInDuffelAPI(threeDSSession.id)
            .then(reject)
            .catch(reject);
        });

        threeDSecure.on("error", () => {
          client
            .refresh3DSSessionInDuffelAPI(threeDSSession.id)
            .then(() => {
              reject(new Error(GENERIC_ERROR_MESSAGE));
            })
            .catch(() => {
              reject(new Error(GENERIC_ERROR_MESSAGE));
            });
        });

        threeDSecure.on("success", () => {
          client
            .refresh3DSSessionInDuffelAPI(threeDSSession.id)
            .then(resolve)
            .catch((error) => {
              reject(error);
            });
        });
      })
      .catch(reject);
  });
};

export default { createThreeDSecureSession };
