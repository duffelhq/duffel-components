import { Offer } from "@duffel/api/types";

export const isFixtureOfferId = (offerId: Offer["id"]): boolean =>
  offerId.startsWith("fixture_off_");
