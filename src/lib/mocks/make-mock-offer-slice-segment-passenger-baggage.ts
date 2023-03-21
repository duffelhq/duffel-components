import { OfferSliceSegmentPassengerBaggage } from "../../types/Offer";

const defaultObject: OfferSliceSegmentPassengerBaggage = {
  type: "carry_on",
  quantity: 1,
};

export const makeMockOfferSliceSegmentPassengerBaggage = (
  extendDefault?: Partial<OfferSliceSegmentPassengerBaggage>
): OfferSliceSegmentPassengerBaggage =>
  Object.assign({}, defaultObject, extendDefault || {});
