import {
  OfferAvailableService,
  OfferAvailableServiceBaggage,
} from "@duffel/api/types";

export const isBaggageService = (
  service: OfferAvailableService,
): service is OfferAvailableServiceBaggage => service.type === "baggage";
