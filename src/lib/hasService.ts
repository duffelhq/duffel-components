import { Offer, OfferAvailableServiceType } from "../types/Offer";
import { isBaggageService } from "./isBaggageService";
import { isSeatService } from "./isSeatService";

const checkFunctionsMap: Record<
  OfferAvailableServiceType,
  typeof isBaggageService | typeof isSeatService
> = {
  baggage: isBaggageService,
  seats: isSeatService,
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
