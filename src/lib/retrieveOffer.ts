import { Offer } from "src/types/Offer";
import { captureErrorInSentry } from "./captureErrorInSentry";
import { fetchFromMockOffers } from "./fetchFromMocks";
import { isMockOfferId } from "./is-mock-offer-id";
import { retrieveOfferFromDuffelAPI } from "./retrieveOfferFromDuffelAPI";

export async function retrieveOffer(
  offer_id: string,
  client_key: string,
  onOfferReady: (offer: Offer) => void,
  onError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void
) {
  setIsLoading(true);

  if (isMockOfferId(offer_id)) {
    fetchFromMockOffers(offer_id)
      .then((offer) => {
        setIsLoading(false);
        onOfferReady(offer);
      })
      .catch(() => {
        throw new Error(
          `The mock offer with id '${offer_id}' could not be found.`
        );
      });
    return;
  }

  try {
    const data = await retrieveOfferFromDuffelAPI(offer_id, client_key);
    return onOfferReady(data);
  } catch (error) {
    let message = "An unknown error occurred while retrieving the offer.";
    if (error instanceof Error) {
      message = error.message;
      if (error.message.includes("ECONNREFUSED")) {
        message = "The Duffel API is not available. Please try again later.";
      }
      captureErrorInSentry(error, { offer_id });
    } else {
      captureErrorInSentry(new Error(message), { offer_id });
    }
    onError(message);
  } finally {
    setIsLoading(false);
  }
}
