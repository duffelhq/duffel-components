import { OfferSliceSegment } from "src/types/Offer";

export const getPassengerBySegmentList = (segments: OfferSliceSegment[]) =>
  segments.flatMap((segment) =>
    segment.passengers.map((passenger, passengerIndex) => ({
      passenger,
      passengerIndex,
      segment,
    }))
  );
