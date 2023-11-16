import { Offer } from "@duffel/api/types";

export const offerIsExpired = (offer: Offer) => {
  return offer.expires_at && new Date(offer.expires_at) < new Date();
};
