import {
  OfferAvailableService,
  OfferAvailableBaggageService,
} from "src/types/Offer";

export const isBaggageService = (
  service: OfferAvailableService
): service is OfferAvailableBaggageService => service.type === "baggage";
