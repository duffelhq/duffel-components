import { Offer, OfferSliceSegment } from "@duffel/api/types";

export const getSegmentList = (offer: Offer) =>
  offer.slices.reduce(
    (accumulator, slice) => [...accumulator, ...slice.segments],
    new Array<OfferSliceSegment>(),
  );
