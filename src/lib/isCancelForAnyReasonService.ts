import {
  OfferAvailableService,
  OfferAvailableServiceCFAR,
} from "@duffel/api/types";

export const isCancelForAnyReasonService = (
  service: OfferAvailableService
): service is OfferAvailableServiceCFAR =>
  service.type === "cancel_for_any_reason";
