import { OfferAvailableService } from "../../types/Offer";
import { makeMockOfferAvailableBaggageServiceMetadata } from "./make-mock-offer-available-baggage-service-metadata";

const getDefaultObject = (() => {
  let seedId = 1;
  return (): OfferAvailableService => ({
    id: `ase_${(seedId++).toString().padStart(5, "0")}`,
    maximum_quantity: 1,
    passenger_ids: [`pas_00001`],
    segment_ids: [`seg_00001`],
    total_amount: "50.00",
    total_currency: "GBP",
    type: "baggage",
    metadata: makeMockOfferAvailableBaggageServiceMetadata(),
  });
})();

export const makeMockOfferAvailableBaggageService = (
  extendDefault?: Partial<OfferAvailableService>
): OfferAvailableService =>
  Object.assign({}, getDefaultObject(), extendDefault || {});
