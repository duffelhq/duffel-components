import { Offer } from "../types/Offer";

export const isFixtureOfferId = (offerId: Offer["id"]): boolean =>
  offerId.startsWith("fixture_off_");
