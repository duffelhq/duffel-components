import {
  OfferAvailableServiceMetadataMap,
  OfferAvailableServiceType,
} from "src/types/Offer";

const defaultObject: OfferAvailableServiceMetadataMap["baggage"] = {
  maximum_weight_kg: null,
  maximum_height_cm: null,
  maximum_length_cm: null,
  maximum_depth_cm: null,
  type: "checked",
};

export const makeMockOfferAvailableServiceMetadata = <
  T_ServiceType extends OfferAvailableServiceType = "baggage"
>(
  extendDefault?: Partial<OfferAvailableServiceMetadataMap[T_ServiceType]>
): OfferAvailableServiceMetadataMap[T_ServiceType] =>
  Object.assign({}, defaultObject, extendDefault || {});
