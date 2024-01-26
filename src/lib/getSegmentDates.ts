import { OfferSliceSegment, OrderSliceSegment } from "@duffel/api/types";

export const getSegmentDates = (
  segment: OfferSliceSegment | OrderSliceSegment,
) => {
  // TODO: remove the fallback once AIC returns arrivingAt and departingAt for AICs as well
  const arrivingAt =
    segment.arriving_at ?? (segment as any)["arrival_datetime"];
  const departingAt =
    segment.departing_at ?? (segment as any)["departure_datetime"];
  return { arrivingAt, departingAt };
};
