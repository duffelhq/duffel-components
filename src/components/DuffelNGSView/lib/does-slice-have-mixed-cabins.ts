import { DuffelNGSViewOffer, DuffelNGSViewOfferSlice } from "./types";

export function doesSliceHaveMixedCabins(slice: DuffelNGSViewOfferSlice) {
  const cabinMarketingNames = new Set<string>();
  for (const segment of slice.segments) {
    cabinMarketingNames.add(segment.passengers[0].cabin_class_marketing_name);
  }

  return cabinMarketingNames.size > 1;
}

export function doOffersHaveMixedCabin(
  offer: DuffelNGSViewOffer[] | null,
  sliceIndex: number = 0,
) {
  if (offer === null) {
    return false;
  }

  return offer.some((offer) =>
    doesSliceHaveMixedCabins(offer.slices[sliceIndex]),
  );
}
