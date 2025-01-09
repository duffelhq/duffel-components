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

const TEST_ENVIRONMENT_CONFIGURATION = {
  duffelUrl: "https://api.duffel.com",
  evervaultCredentials: {
    teamID: "team_a22f3ea22207",
    appID: "app_152d304a3d98",
  },
};

/**
 * @param clientKey - The client key used to authenticate with the Duffel API.
 * @param cardId - The card ID used for the 3DS session.
 * @param resourceId - The resource (offer, order, order change) ID that the 3DS session is for.
 * @param services - Include all services that are being added, empty if no services are being added. This is required when services are also being purchased to ensure an accurate total amount to be authorised. If no services, it should be an empty array.
 * @param cardholderPresent - Whether the cardholder was present when the 3DS session was created. If you are collecting card details offline, for example an agent interface for entering card details received from the traveller over the phone, then you must specify the cardholder as not present. This can be null if there is an exception.
 * @param exception - The name of the exception used to opt out of authenticating the payment with the card issuer
 */
type CreateThreeDSecureSessionFn = (
  clientKey: string,
  cardId: string,
  resourceId: string,
  services: Array<{ id: string; quantity: number }>,
  cardholderPresent: boolean | null,
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
  let env: typeof DEFAULT_ENVIRONMENT_CONFIGURATION = {
    ...DEFAULT_ENVIRONMENT_CONFIGURATION,
    ...environmentConfiguration,
  };

  // We want to load the Evervault script
  // onto the page as soon as this file is loaded.
  await loadEvervaultScript();

  return new Promise((resolve, reject) => {
    const client = createClient(env.duffelUrl, clientKey);

    client
      .create3DSSessionInDuffelAPI({
        card_id: cardId,
        resource_id: resourceId,
        services: services,
        cardholder_present: cardholderPresent,
        exception: exception,
      })
      .then((threeDSSession) => {
        if (!threeDSSession) {
          reject(new Error(GENERIC_ERROR_MESSAGE));
          return;
        }

        if (threeDSSession.live_mode === false) {
          env = {
            ...TEST_ENVIRONMENT_CONFIGURATION,
            ...environmentConfiguration,
          };
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
