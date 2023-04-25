import { SeatMap } from "src/types/SeatMap";
import { captureErrorInSentry } from "./captureErrorInSentry";
import { importFromSeatMapsFixtures } from "./fetchFromFixtures";
import { isFixtureOfferId } from "./isFixtureOfferId";
import { retrieveSeatMapsFromDuffelAPI } from "./retrieveSeatMapsFromDuffelAPI";

export async function retrieveSeatMaps(
  offer_id: string,
  client_key: string,
  onError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void,
  onSeatMapReady: (seatMaps: SeatMap[]) => void
) {
  setIsLoading(true);

  const useFixture = isFixtureOfferId(offer_id);
  offer_id = useFixture ? offer_id.replace("fixture_", "") : offer_id;

  if (useFixture) {
    return importFromSeatMapsFixtures(offer_id).then((seatMaps) => {
      setIsLoading(false);
      onSeatMapReady(seatMaps);
    });
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
