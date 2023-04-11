import { SeatMap } from "src/types/SeatMap";
import { captureErrorInSentry } from "./captureErrorInSentry";
import { fetchFromMockSeatMaps } from "./fetchFromMocks";
import { isMockOfferId } from "./isMockOfferId";
import { retrieveSeatMapsFromDuffelAPI } from "./retrieveSeatMapsFromDuffelAPI";

export async function retrieveSeatMaps(
  offer_id: string,
  client_key: string,
  onSeatMapReady: (seatMaps: SeatMap[]) => void,
  onError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void
) {
  setIsLoading(true);

  if (isMockOfferId(offer_id)) {
    fetchFromMockSeatMaps(offer_id)
      .then((seatMap) => {
        setIsLoading(false);
        onSeatMapReady(seatMap);
      })
      .catch(() => {
        throw new Error(
          `The mock seat map for offer id '${offer_id}' could not be found.`
        );
      });
    return;
  }

  try {
    const data = await retrieveSeatMapsFromDuffelAPI(offer_id, client_key);
    onSeatMapReady(data);
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
