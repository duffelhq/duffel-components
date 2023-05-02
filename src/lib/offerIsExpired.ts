import { Offer } from "src/types/Offer";

export const offerIsExpired = (offer: Offer) => {
  return offer.expires_at && new Date(offer.expires_at) < new Date();
};
