import { OfferSliceSegment } from "../../types/Offer";
import { makeMockAircraft } from "./make-mock-aircraft";
import { makeMockOfferSliceSegmentPassenger } from "./make-mock-offer-slice-segment-passenger";
import { makeMockAirline } from "./make-mock-airline";
import { makeMockAirport } from "./make-mock-airport";

const getDefaultObject = (() => {
  let seedId = 1;
  return (): OfferSliceSegment =>
    ({
      aircraft: makeMockAircraft(),
      arriving_at: "DATE",
      destination_terminal: null,
      departing_at: "DATE",
      origin_terminal: null,
      destination: makeMockAirport({ iata_code: "JFK" }),
      distance: null,
      duration: null,
      id: `seg_${(seedId++).toString().padStart(5, "0")}`,
      marketing_carrier: makeMockAirline(),
      marketing_carrier_flight_number: "AA 101",
      origin: makeMockAirport({ iata_code: "LHR" }),
      operating_carrier: makeMockAirline(),
      operating_carrier_flight_number: "AA 101",
      passengers: [makeMockOfferSliceSegmentPassenger()],
    } as any);
})();

export const makeMockOfferSliceSegment = (
  extendDefault?: Partial<OfferSliceSegment>
): OfferSliceSegment =>
  Object.assign({}, getDefaultObject(), extendDefault || {});

export const makeMockOfferSliceSegmentFromOriginDestination = (
  originIataCode: string,
  destinationIataCode: string,
  passenger_id?: string,
  secondPassengerId?: string
) => {
  const passengers = secondPassengerId
    ? [
        makeMockOfferSliceSegmentPassenger({ passenger_id }),
        makeMockOfferSliceSegmentPassenger({ passenger_id: secondPassengerId }),
      ]
    : [makeMockOfferSliceSegmentPassenger({ passenger_id })];
  return makeMockOfferSliceSegment({
    origin: makeMockAirport({ iata_code: originIataCode }),
    destination: makeMockAirport({ iata_code: destinationIataCode }),
    passengers,
  });
};
