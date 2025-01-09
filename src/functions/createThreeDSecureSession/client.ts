type ThreeDSSessionStatus =
  | "client_action_required"
  | "ready_for_payment"
  | "expired"
  | "failed";

export interface ThreeDSecureSession {
  /**
   * The card ID used for the 3DS session.
   */
  id: string;

  /**
   * Whether the 3DS session was created in live mode. This field will be set to `true` if the card was created in live mode, or `false` if it was created in test mode.
   */
  live_mode: boolean;

  /**
   * The resource (offer, order, order change..) ID that the 3DS session is for.
   */
  resource_id: string;

  /**
   * The status of the 3DS session.
   *  - `client_action_required` - The 3DS session requires the UI Component to be initailised. This is the initial state when the payment is eligible for SCA and requires a 3DS challenge.
   *  - `ready_for_payment` - The 3DS session is ready to be used on a payment object as part of a order creation/payment request. This is the initial state if the card or the supplier does not support 3DS.
   *  - `failed` - The 3DS session was not authenticated to proceed with the payment. Payment should not be attempted. Cardholder should try again, possibly with a different card. Additionally, this is the initial state if the cardholder details are invalid.
   *  - `expired` - The 3DS session has expired. A new session should be created if needed.
   */
  status: ThreeDSSessionStatus;

  /**
   * Used to initiate the UI component when `status` is `challenge_required`.
   */
  client_id: string | null;
}

const getAPIHeaders = (clientKey: string) => ({
  "Duffel-Version": "v2",
  "Content-Type": "application/json",
  Authorization: `Bearer ${clientKey}`,
  "User-Agent": `Duffel/ancillaries-component@${process.env.COMPONENT_VERSION}`,
});

interface Service {
  id: string;
  quantity: number;
}

interface create3DSSessionPayload {
  card_id: string;
  resource_id: string;
  services?: Array<Service>;
  cardholder_present: boolean | null;
  exception: string;
}

export const createClient = (duffelUrl: string, clientKey: string) => {
  const create3DSSessionInDuffelAPI = async (
    data: create3DSSessionPayload,
  ): Promise<ThreeDSecureSession> => {
    const response = await fetch(`${duffelUrl}/three_d_secure_sessions`, {
      method: "POST",
      headers: getAPIHeaders(clientKey),
      body: JSON.stringify({ data }),
    });

    const responseData = await response.json();
    if (response.status !== 201) {
      throw responseData;
    }

    return responseData["data"];
  };

  const refresh3DSSessionInDuffelAPI = async (
    sessionID: string,
    isFirstAttempt = true,
  ): Promise<ThreeDSecureSession> => {
    const response = await fetch(
      `${duffelUrl}/three_d_secure_sessions/${sessionID}/actions/refresh`,
      {
        method: "POST",
        headers: getAPIHeaders(clientKey),
      },
    );

    const responseData = await response.json();
    if (response.status >= 500) {
      if (!isFirstAttempt) {
        throw responseData;
      } else {
        return refresh3DSSessionInDuffelAPI(sessionID, false);
      }
    }

    return responseData["data"];
  };

  return { create3DSSessionInDuffelAPI, refresh3DSSessionInDuffelAPI };
};
