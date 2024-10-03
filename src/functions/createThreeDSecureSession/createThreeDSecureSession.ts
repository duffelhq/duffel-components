import { ThreeDSecureSession, createClient } from "./client";
import { initEvervault } from "./initEvervault";
import { loadEvervaultScript } from "./loadEvervaultScript";

type CreateThreeDSecureSessionFn = (
  clientKey: string,
  cardId: string,
  resourceId: string,
  services: Array<{ id: string; quantity: number }>,
  cardholderPresent: boolean,
  environmentConfiguration?: {
    duffelUrl: string;
    evervaultCredentials: {
      teamID: string;
      appID: string;
    };
  }
) => Promise<ThreeDSecureSession>;

declare global {
  interface Window {
    createThreeDSecureSession: CreateThreeDSecureSessionFn;
  }
}

const GENERIC_ERROR_MESSAGE = "Failed to create 3DS session";

const DEFAULT_ENVIRONMENT_CONFIGURATION = {
  duffelUrl: "https://api.duffel.com",
  evervaultCredentials: {
    teamID: "team_a22f3ea22207",
    appID: "app_976f15bbdddd",
  },
};

export const createThreeDSecureSession: CreateThreeDSecureSessionFn = (
  clientKey,
  cardId,
  resourceId,
  services,
  cardholderPresent,
  environmentConfiguration = DEFAULT_ENVIRONMENT_CONFIGURATION
) => {
  return new Promise((resolve, reject) => {
    const client = createClient(environmentConfiguration.duffelUrl, clientKey);

    client
      .create3DSSessionInDuffelAPI({
        card_id: cardId,
        resource_id: resourceId,
        services: services,
        cardholder_present: cardholderPresent,
      })
      .then((threeDSSession) => {
        if (!threeDSSession) {
          reject(new Error(GENERIC_ERROR_MESSAGE));
          return;
        }

        if (threeDSSession.status === "ready_for_payment") {
          resolve(threeDSSession);
          return;
        }

        if (threeDSSession.external_id === null) {
          reject(new Error(GENERIC_ERROR_MESSAGE));
          return;
        }

        const threeDSecure = initEvervault(
          threeDSSession.external_id,
          environmentConfiguration.evervaultCredentials.teamID,
          environmentConfiguration.evervaultCredentials.appID
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

// We want to load the Evervault script
// onto the page as soon as this file is loaded.
loadEvervaultScript();

window.createThreeDSecureSession = createThreeDSecureSession;
export default { createThreeDSecureSession };
