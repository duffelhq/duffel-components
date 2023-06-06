import {
  OfferAvailableBaggageService,
  OfferAvailableService,
} from "../types/Offer";

export const isBaggageService = (
  service: OfferAvailableService
): service is OfferAvailableBaggageService => service.type === "baggage";
