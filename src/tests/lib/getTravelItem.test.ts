import { getTravelItem } from "../../lib/getTravelItem";
import { OfferSliceSegment } from "@duffel/api/types";

const segment: OfferSliceSegment = {
  id: "segment_1",
  origin: { iata_code: "LHR" },
  destination: { iata_code: "JFK" },
  departure_date: "2022-01-01T10:00:00Z",
  arrival_date: "2022-01-01T18:00:00Z",
  duration: "PT8H",
  number_of_stops: 0,
  airline: "airline_1",
  operating_airline: "airline_1",
  flight_number: "123",
  fare_brand_name: "basic",
  aircraft: {
    model: "737",
    type: "AIRCRAFT_TYPE_A",
  },
  marketing_carrier: {
    iata_code: "LHR",
  },
} as any;

describe("getTravelItem", () => {
  it("should return the correct travel item for a slice segment", () => {
    const travelItem = getTravelItem(segment, "basic");
    expect(travelItem).toEqual({
      aircraft: "",
      airline: {
        iata_code: "LHR",
      },
      arrivingAt: undefined,
      baggagesIncluded: {
        carryOn: undefined,
        checked: undefined,
      },
      cabinClass: "",
      departingAt: undefined,
      destination: {
        iata_code: "JFK",
      },
      destinationTerminal: undefined,
      fareBrandName: "basic",
      flight: "LHRundefined",
      flightDuration: "08h",
      operatedBy: undefined,
      origin: {
        iata_code: "LHR",
      },
      originDestination: "LHR-JFK",
      originTerminal: undefined,
    });
  });
});
