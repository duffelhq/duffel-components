import {
  OfferAvailableServiceBaggageMetadata,
  OfferAvailableServiceMetadata,
} from "src/types/Offer";

// TODO: fix type
const defaultObject: OfferAvailableServiceBaggageMetadata = {
  maximum_weight_kg: null,
  maximum_height_cm: null,
  maximum_length_cm: null,
  maximum_depth_cm: null,
  type: "checked",
};

export const makeMockOfferAvailableServiceMetadata = (
  extendDefault?: Partial<OfferAvailableServiceMetadata>
): OfferAvailableServiceMetadata =>
  Object.assign({}, defaultObject, extendDefault || {});
