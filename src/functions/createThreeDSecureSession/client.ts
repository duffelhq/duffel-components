type ThreeDSSessionStatus =
  | "challenge_required"
  | "ready_for_payment"
  | "expired"
  | "failed";

export interface ThreeDSecureSession {
  id: string;
  live_mode: boolean;
  resource_id: string;
  cardholder_present: boolean;
  status: ThreeDSSessionStatus;
  external_id: string | null;
}

const getAPIHeaders = (clientKey: string) => ({
  "Duffel-Version": "v1",
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
  cardholder_present: boolean;
}

export async function create3DSSessionInDuffelAPI(
  clientKey: string,
  data: create3DSSessionPayload
): Promise<ThreeDSecureSession> {
  const response = await fetch(
    `${process.env.DUFFEL_API_URL}/three_d_secure_sessions`,
    {
      method: "POST",
      headers: getAPIHeaders(clientKey),
      body: JSON.stringify({ data }),
    }
  );

  const responseData = await response.json();
  if (response.status !== 201) {
    throw responseData;
  }

  return responseData["data"];
}

export async function refresh3DSSessionInDuffelAPI(
  clientKey: string,
  sessionID: string,
  isFirstAttempt = true
): Promise<ThreeDSecureSession> {
  const response = await fetch(
    `${process.env.DUFFEL_API_URL}/three_d_secure_sessions/${sessionID}/actions/refresh`,
    {
      method: "POST",
      headers: getAPIHeaders(clientKey),
    }
  );

  const responseData = await response.json();
  if (response.status !== 200) {
    if (!isFirstAttempt) {
      throw responseData;
    } else {
      return refresh3DSSessionInDuffelAPI(clientKey, sessionID, false);
    }
  }

  return responseData["data"];
}