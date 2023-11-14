import { CabinClassMap, OfferSliceSegment } from "src/types";

export const getFareBrandName = (
  fareBrandName: string | null,
  forSegment: OfferSliceSegment
) =>
  fareBrandName ||
  (forSegment.passengers &&
    forSegment.passengers.length > 0 &&
    (forSegment.passengers[0]?.cabin_class_marketing_name ||
      CabinClassMap[forSegment.passengers[0].cabin_class])) ||
  "";
