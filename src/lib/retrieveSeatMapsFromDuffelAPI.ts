import { fetchFromDuffelAPI } from "./fetchFromDuffelAPI";

export async function retrieveSeatMapsFromDuffelAPI(
  offer_id: string,
  client_key: string
) {
  const getSeatMapResponse = await fetchFromDuffelAPI(
    client_key,
    `seat_maps/?offer_id=${offer_id}`
  );

  return getSeatMapResponse.data;
}
