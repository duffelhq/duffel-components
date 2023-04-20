import { fetchFromDuffelAPI } from "./fetchFromDuffelAPI";

export async function retrieveSeatMapsFromDuffelAPI(
  offer_id: string,
  client_key: string
) {
  const getSeatMapResponse = await fetchFromDuffelAPI(
    client_key,
    `offers/${offer_id}/seat_maps`
  );

  return getSeatMapResponse.data;
}
