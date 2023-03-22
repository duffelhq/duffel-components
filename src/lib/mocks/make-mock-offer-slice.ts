import { OfferSlice } from "../../types/Offer";
import { makeMockOfferSlicePlace } from "./make-mock-offer-slice-place";
import { makeMockOfferSliceSegmentFromOriginDestination } from "./make-mock-offer-slice-segment";

const getDefaultObject = (() => {
  let seedId = 1;
  return (): OfferSlice =>
    ({
      conditions: {
        // to create a mock in the future
        change_before_departure: null,
      },
      id: `pre_${(seedId++).toString().padStart(5, "0")}`,
      destination_type: "airport",
      destination: makeMockOfferSlicePlace({
        iata_code: "JFK",
        name: "John F. Kennedy Airport",
      }),
      origin_type: "airport",
      origin: makeMockOfferSlicePlace({
        iata_code: "LHR",
        name: "Heathrow Airport",
      }),
      duration: null,
      fare_brand_name: null,
      segments: [makeMockOfferSliceSegmentFromOriginDestination("LHR", "JFK")],
      // TODO come back and fix this type
    } as any);
})();

export const makeMockOfferSlice = (
  extendDefault?: Partial<OfferSlice>
): OfferSlice => Object.assign({}, getDefaultObject(), extendDefault || {});

export const makeMockOfferSliceFromOriginDestination = (
  originIataCode: string,
  destinationIataCode: string,
  passengerId?: string,
  secondPassengerId?: string
) => {
  const segments = secondPassengerId
    ? [
        makeMockOfferSliceSegmentFromOriginDestination(
          originIataCode,
          destinationIataCode,
          passengerId,
          secondPassengerId
        ),
      ]
    : [
        makeMockOfferSliceSegmentFromOriginDestination(
          originIataCode,
          destinationIataCode,
          passengerId
        ),
      ];
  return makeMockOfferSlice({
    origin: makeMockOfferSlicePlace({ iata_code: originIataCode }),
    destination: makeMockOfferSlicePlace({ iata_code: destinationIataCode }),
    segments,
    // TODO come back and fix this type
  } as any);
};
