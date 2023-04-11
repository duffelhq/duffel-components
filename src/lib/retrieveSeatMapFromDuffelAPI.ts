import { fetchFromDuffelAPI } from "./fetchFromDuffelAPI";

export async function retrieveSeatMapFromDuffelAPI(
  offer_id: string,
  client_key: string
) {
  const getSeatMapResponse = await fetchFromDuffelAPI(
    client_key,
    `seat-maps/${offer_id}`
  );

  return getSeatMapResponse.data;
}
