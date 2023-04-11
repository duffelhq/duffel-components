import { Offer } from "src/types/Offer";

export const isMockOfferId = (offerId: Offer["id"]): boolean =>
  offerId.startsWith("off_mock_");
