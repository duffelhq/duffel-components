import { fetchDuffelJSON } from "./fetchDuffelJSON.ts";
import { makeMockDateInTheFuture } from "./makeMockDateInTheFuture.ts";
import type {
  DuffelHeaders,
  ExampleEnvironment,
  OfferRequest,
} from "./types.ts";

export async function searchRoundTripOnDuffel(
  origin: string,
  destination: string,
  environment: ExampleEnvironment,
  duffelHeaders: DuffelHeaders,
): Promise<OfferRequest> {
  const payload = {
    data: {
      slices: [
        {
          origin,
          destination,
          departure_date: makeMockDateInTheFuture(7)
            .toISOString()
            .split("T")[0],
        },
        {
          origin: destination,
          destination: origin,
          departure_date: makeMockDateInTheFuture(14)
            .toISOString()
            .split("T")[0],
        },
      ],
      passengers: [{ type: "adult" }],
      requested_sources: ["duffel_airways"],
    },
  };

  const { data: offerRequest } = await fetchDuffelJSON<{
    data: OfferRequest;
  }>(`${environment.duffelApiUrl}/air/offer_requests?return_offers=true`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: duffelHeaders,
  });

  return offerRequest;
}
