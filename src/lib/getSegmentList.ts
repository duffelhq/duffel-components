import { Offer, OfferSliceSegment } from "../types/Offer";

export const getSegmentList = (offer: Offer) =>
  offer.slices.reduce(
    (accumulator, slice) => [...accumulator, ...slice.segments],
    new Array<OfferSliceSegment>()
  );
