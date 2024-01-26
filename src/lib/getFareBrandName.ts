import { OfferSliceSegment, OrderSliceSegment } from "@duffel/api/types";

const CabinClassMap = {
  economy: "Economy",
  premium_economy: "Premium Economy",
  business: "Business",
  first: "First",
  any: "Any",
};

export const getFareBrandName = (
  fareBrandName: string | null,
  forSegment: OfferSliceSegment | OrderSliceSegment,
) =>
  fareBrandName ||
  (forSegment.passengers &&
    forSegment.passengers.length > 0 &&
    (forSegment.passengers[0].cabin_class_marketing_name ||
      CabinClassMap[forSegment.passengers[0].cabin_class])) ||
  "";
