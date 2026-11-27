import { OfferSliceSegment } from "@duffel/api/types";

export const getPassengerBySegmentList = (segments: OfferSliceSegment[]) =>
  segments.flatMap((segment) =>
    segment.passengers.map((passenger) => ({
      passenger,
      segment,
    })),
  );
