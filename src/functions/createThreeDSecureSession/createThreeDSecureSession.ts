import {
  ThreeDSecureSession,
  create3DSSessionInDuffelAPI,
  refresh3DSSessionInDuffelAPI,
} from "./client";
import { initEvervault } from "./initEvervault";
import { loadEvervaultScript } from "./loadEvervaultScript";

type CreateThreeDSecureSessionFn = (
  clientKey: string,
  tokenisedCardId: string,
  resourceId: string,
  services: Array<{ id: string; quantity: number }>,
  cardholderPresent: boolean,
  overrideEvervaultCredentials?: {
    teamID: string;
    appID: string;
  },
) => Promise<ThreeDSecureSession>;

declare global {
  interface Window {
    createThreeDSecureSession: CreateThreeDSecureSessionFn;
  }
}

const GENERIC_ERROR_MESSAGE = "Failed to create 3DS session";

export const createThreeDSecureSession: CreateThreeDSecureSessionFn = (
  clientKey,
  tokenisedCardId,
  resourceId,
  services,
  cardholderPresent,
  overrideEvervaultCredentials,
) => {
  return new Promise((resolve, reject) => {
    create3DSSessionInDuffelAPI(clientKey, {
      card_id: tokenisedCardId,
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
          overrideEvervaultCredentials,
        );

        threeDSecure.on("failure", () => {
          refresh3DSSessionInDuffelAPI(clientKey, threeDSSession.id)
            .then(reject)
            .catch(reject);
        });

        threeDSecure.on("error", () => {
          refresh3DSSessionInDuffelAPI(clientKey, threeDSSession.id)
            .then(() => {
              reject(new Error(GENERIC_ERROR_MESSAGE));
            })
            .catch(() => {
              reject(new Error(GENERIC_ERROR_MESSAGE));
            });
        });

        threeDSecure.on("success", () => {
          refresh3DSSessionInDuffelAPI(clientKey, threeDSSession.id)
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
