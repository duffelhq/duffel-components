import { SeatMap } from "src/types/SeatMap";
import { captureErrorInSentry } from "./captureErrorInSentry";
import { hasEntryOnMockSeatMaps } from "./mocks/entries/has-entry-on-mock-maps";
import { retrieveSeatMapFromDuffelAPI } from "./retrieveSeatMapFromDuffelAPI";
import { fetchFromMockSeatMaps } from "./fetchFromMocks";

export async function retrieveSeatMap(
  offer_id: string,
  client_key: string,
  onSeatMapReady: (seatMap: SeatMap) => void,
  onError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void
) {
  setIsLoading(true);

  if (hasEntryOnMockSeatMaps(offer_id)) {
    fetchFromMockSeatMaps(offer_id).then((seatMap) => {
      setIsLoading(false);
      onSeatMapReady(seatMap);
    });
    return;
  }

  try {
    const data = await retrieveSeatMapFromDuffelAPI(offer_id, client_key);
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
