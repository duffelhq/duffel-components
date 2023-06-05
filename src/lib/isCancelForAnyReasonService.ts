import {
  OfferAvailableService,
  OfferAvailableServiceCancelForAnyReason,
} from "../types/Offer";

export const isCancelForAnyReasonService = (
  service: OfferAvailableService
): service is OfferAvailableServiceCancelForAnyReason =>
  service.type === "cancel_for_any_reason";
