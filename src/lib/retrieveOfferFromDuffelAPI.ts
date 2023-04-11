import { fetchFromDuffelAPI } from "./fetchFromDuffelAPI";

export async function retrieveOfferFromDuffelAPI(
  offer_id: string,
  client_key: string
) {
  const getOfferResponse = await fetchFromDuffelAPI(
    client_key,
    `offers/${offer_id}?return_available_services=true`
  );

  return getOfferResponse.data;
}
