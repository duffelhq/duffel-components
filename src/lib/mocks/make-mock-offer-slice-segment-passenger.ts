import { OfferSliceSegmentPassenger } from "../../types/Offer";
import { makeMockOfferSliceSegmentPassengerBaggage } from "./make-mock-offer-slice-segment-passenger-baggage";

const getDefaultObject = (() => {
  let seedId = 1;
  return (): OfferSliceSegmentPassenger =>
    ({
      fare_basis_code: "KLWC10A",
      baggages: [
        makeMockOfferSliceSegmentPassengerBaggage(),
        makeMockOfferSliceSegmentPassengerBaggage({ type: "checked" }),
      ],
      cabin_class: "economy",
      cabin_class_marketing_name: "Economy",
      passenger_id: `pas_${(seedId++).toString().padStart(5, "0")}`,
    } as any);
})();

export const makeMockOfferSliceSegmentPassenger = (
  extendDefault?: Partial<OfferSliceSegmentPassenger>
): OfferSliceSegmentPassenger =>
  Object.assign({}, getDefaultObject(), extendDefault || {});
