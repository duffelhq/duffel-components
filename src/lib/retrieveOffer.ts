import { Offer } from "@duffel/api/types";
import { captureErrorInSentry } from "./captureErrorInSentry";
import { isErrorResponse } from "./fetchFromDuffelAPI";
import { importFromOfferFixtures } from "./fetchFromFixtures";
import { isFixtureOfferId } from "./isFixtureOfferId";
import { retrieveOfferFromDuffelAPI } from "./retrieveOfferFromDuffelAPI";

export async function retrieveOffer(
  offer_id: string,
  client_key: string | null,
  onError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void,
  onOfferReady: (offer: Offer) => void,
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
      "Attempted to retrieve seat maps but the client key is missing.",
    );
  }

  try {
    const data = await retrieveOfferFromDuffelAPI(offer_id, client_key);
    onOfferReady(data);
  } catch (error) {
    let message = "An unknown error occurred while retrieving the offer.";
    if (error instanceof Error) {
      message = error.message;
      if (error.message.includes("Load failed")) {
        message = "The Duffel API is not available. Please try again later.";
      }
    } else if (isErrorResponse(error)) {
      if (error.status === 404) {
        message =
          "The offer you are looking for does not exist or has expired.";
      }
    }

    if (isErrorResponse(error) && error.status >= 500 && error.status < 600) {
      captureErrorInSentry(new Error(message));
    }
    onError(message);
  } finally {
    setIsLoading(false);
  }
}
