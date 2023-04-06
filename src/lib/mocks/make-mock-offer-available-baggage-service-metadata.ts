import {
  OfferAvailableServiceBaggageMetadata,
  OfferAvailableServiceMetadata,
} from "src/types/Offer";

const defaultObject: OfferAvailableServiceBaggageMetadata = {
  maximum_weight_kg: null,
  maximum_height_cm: null,
  maximum_length_cm: null,
  maximum_depth_cm: null,
  type: "checked",
};

export const makeMockOfferAvailableBaggageServiceMetadata = (
  extendDefault?: Partial<OfferAvailableServiceMetadata>
): OfferAvailableServiceBaggageMetadata =>
  Object.assign({}, defaultObject, extendDefault || {});
