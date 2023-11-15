import { SeatMap } from "@duffel/api/types";
import { captureErrorInSentry } from "./captureErrorInSentry";
import { isErrorResponse } from "./fetchFromDuffelAPI";
import { importFromSeatMapsFixtures } from "./fetchFromFixtures";
import { isFixtureOfferId } from "./isFixtureOfferId";
import { retrieveSeatMapsFromDuffelAPI } from "./retrieveSeatMapsFromDuffelAPI";

export async function retrieveSeatMaps(
  offer_id: string,
  client_key: string | null,
  onError: () => void,
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

  if (!client_key) {
    throw new Error(
      "Attemptted to retrieve seat maps but the client key is missing."
    );
  }

  try {
    const data = await retrieveSeatMapsFromDuffelAPI(offer_id, client_key);
    onSeatMapReady(data);
  } catch (error) {
    let message = "An unknown error occurred while retrieving the seat maps.";

    if (error instanceof Error) {
      message = error.message;
      if (error.message.includes("Load failed")) {
        message = "The Duffel API is not available. Please try again later.";
      }
    } else if (isErrorResponse(error)) {
      message =
        error.data.errors[0]?.message ||
        "Received an unknown error from the Duffel API.";
    }

    captureErrorInSentry(new Error(message));
    onError();
  } finally {
    setIsLoading(false);
  }
}
