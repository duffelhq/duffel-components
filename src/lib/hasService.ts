import { Offer, OfferAvailableServiceType } from "../types/Offer";
import { isBaggageService } from "./isBaggageService";

const checkFunctionsMap: Record<
  OfferAvailableServiceType,
  typeof isBaggageService
> = {
  baggage: isBaggageService,
};

export const hasService = (
  offer: Offer | undefined,
  type: OfferAvailableServiceType
) => {
  const checkFunction = checkFunctionsMap[type];

  return (
    offer &&
    Array.isArray(offer.available_services) &&
    offer.available_services.some(
      (service) => checkFunction(service) && service.maximum_quantity > 0
    )
  );
};
