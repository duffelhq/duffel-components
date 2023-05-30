import { Offer, OfferAvailableServiceType } from "../types/Offer";
import { isBaggageService } from "./isBaggageService";
import { isCancelForAnyReasonService } from "./isCancelForAnyReasonService";

const checkFunctionsMap = {
  baggage: isBaggageService,
  cancel_for_any_reason: isCancelForAnyReasonService,
};

export const hasService = (
  offer: Offer | undefined,
  type: OfferAvailableServiceType
) => {
  const checkFunction = checkFunctionsMap[type];
  if (!checkFunction) throw new Error(`Unknown service type: ${type}`);

  return (
    offer &&
    Array.isArray(offer.available_services) &&
    offer.available_services.some(
      (service) => checkFunction(service) && service.maximum_quantity > 0
    )
  );
};
