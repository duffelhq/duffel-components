import { OfferSliceSegment, OrderSliceSegment } from "@duffel/api/types";

export const getSegmentFlightNumber = (
  segment: OfferSliceSegment | OrderSliceSegment,
) =>
  `${segment.marketing_carrier.iata_code}${segment.marketing_carrier_flight_number}`;
