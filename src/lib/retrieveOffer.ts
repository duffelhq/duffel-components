import { Offer } from "src/types/Offer";
import { captureErrorInSentry } from "./captureErrorInSentry";
import { makeMockOffer } from "./mocks/make-mock-offer";

const DUFFEL_API_URL = "https://localhost:4000";

async function retrieveOfferFromDuffelApi(
  offer_id: string,
  client_key: string
) {
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
  return data;
}

/*
TODO: Eventually we should have several test offers that can be used
to test different states.
*/
const MOCK_OFFER_ID = "test_offer_1";
async function retrieveOfferFromMock() {
  return makeMockOffer();
}

export async function retrieveOffer(
  offer_id: string,
  client_key: string,
  onOfferReady: (offer: Offer) => void,
  onError: (error: string) => void
) {
  /*
  If the offer ID is a mock offer, bypass the API and retrieve it from
  locally-stored mock offers.
  */
  if (offer_id === MOCK_OFFER_ID) {
    const mockOffer = await retrieveOfferFromMock();
    onOfferReady(mockOffer);
    return;
  }

  try {
    const data = await retrieveOfferFromDuffelApi(offer_id, client_key);
    onOfferReady(data);
  } catch (error) {
    captureErrorInSentry(error as Error, { offer_id });
    onError((error as Error).message || "Failed to get offer");
  }
}
