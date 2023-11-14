import { OfferSliceSegment, OrderSliceSegment } from "src/types";

// TODO(idp): for this to work for both dashboard and links we need to include the duffel order types

export const getSegmentDates = (
  segment: OfferSliceSegment | OrderSliceSegment
) => {
  // TODO: remove the fallback once AIC returns arrivingAt and departingAt for AICs as well
  const arrivingAt = segment.arriving_at ?? segment["arrivalDatetime"];
  const departingAt = segment.departing_at ?? segment["departureDatetime"];
  return { arrivingAt, departingAt };
};
