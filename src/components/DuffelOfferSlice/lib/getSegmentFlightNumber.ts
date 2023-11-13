import { OfferSliceSegment } from "src/types";

export const getSegmentFlightNumber = (segment: OfferSliceSegment) =>
  `${segment.marketing_carrier.iata_code}${segment.marketing_carrier_flight_number}`;
