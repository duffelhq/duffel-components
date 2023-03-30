import { Offer } from "src/types/Offer";
import { captureErrorInSentry } from "./captureErrorInSentry";

const DUFFEL_API_URL = "https://localhost:4000";

export async function retrieveOffer(
  offer_id: string,
  client_key: string,
  onOfferReady: (offer: Offer) => void,
  onError: (error: string) => void
) {
  try {
    const getOfferResponse = await fetch(
      `${DUFFEL_API_URL}/ancillaries-component/offers/${offer_id}?return_available_services=true`,
      {
        headers: {
          "Duffel-Version": "v1",
          Authorization: `Bearer ${client_key}`,
        },
      }
    );
    const { data } = await getOfferResponse.json();
    onOfferReady(data);
  } catch (error) {
    captureErrorInSentry(error as Error, { offer_id });
    onError((error as Error).message || "Failed to get offer");
  }
}
