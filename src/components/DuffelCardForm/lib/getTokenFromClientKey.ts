export function getTokenFromClientKey(clientKey: string): string {
  if (clientKey.split(".").length !== 3) {
    throw new Error(
      "Invalid clientKey attribute in DuffelCardForm. It must be a valid JWT."
    );
  }

  const payloadString = clientKey.split(".")[1];

  try {
    const payload = JSON.parse(atob(payloadString));
    return payload.token;
  } catch (error) {
    throw new Error(
      "Invalid clientKey attribute in DuffelCardForm. It was not possible to read the payload."
    );
  }
}
