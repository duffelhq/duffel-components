import { Offer } from "../types/Offer";
import { captureErrorInSentry } from "./captureErrorInSentry";
import { importFromOfferFixtures } from "./fetchFromFixtures";
import { isFixtureOfferId } from "./isFixtureOfferId";
import { retrieveOfferFromDuffelAPI } from "./retrieveOfferFromDuffelAPI";

export async function retrieveOffer(
  offer_id: string,
  client_key: string | null,
  onError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void,
  onOfferReady: (offer: Offer) => void
) {
  setIsLoading(true);
  const useFixture = isFixtureOfferId(offer_id);
  offer_id = useFixture ? offer_id.replace("fixture_", "") : offer_id;

  if (useFixture) {
    return importFromOfferFixtures(offer_id).then((offer) => {
      setIsLoading(false);
      onOfferReady(offer);
    });
  }

  if (!client_key) {
    throw new Error(
      "Attemptted to retrieve seat maps but the client key is missing"
    );
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
