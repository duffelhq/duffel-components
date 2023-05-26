import {
  OfferAvailableService,
  OfferAvailableCancelForAnyReasonService,
} from "src/types/Offer";

export const isCancelForAnyReasonService = (
  service: OfferAvailableService
): service is OfferAvailableCancelForAnyReasonService =>
  service.type === "cancel_for_any_reason";
