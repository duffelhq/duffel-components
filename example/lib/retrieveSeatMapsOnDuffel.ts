import { fetchDuffelJSON } from "./fetchDuffelJSON.ts";
import type { DuffelHeaders, ExampleEnvironment, SeatMaps } from "./types.ts";

export async function retrieveSeatMapsOnDuffel(
  offerId: string,
  environment: ExampleEnvironment,
  duffelHeaders: DuffelHeaders,
): Promise<SeatMaps> {
  const { data: seatMaps } = await fetchDuffelJSON<{ data: SeatMaps }>(
    `${environment.duffelApiUrl}/air/seat_maps?offer_id=${offerId}`,
    {
      method: "GET",
      headers: duffelHeaders,
    },
  );

  return seatMaps;
}
