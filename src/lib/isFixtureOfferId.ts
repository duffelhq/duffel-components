import { Offer } from "src/types/Offer";

export const isFixtureOfferId = (offerId: Offer["id"]): boolean =>
  offerId.startsWith("fixture_off_");
