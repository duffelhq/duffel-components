import {
  OfferAvailableService,
  OfferAvailableSeatService,
} from "src/types/Offer";

export const isSeatService = (
  service: OfferAvailableService
): service is OfferAvailableSeatService => service.type === "seats";
