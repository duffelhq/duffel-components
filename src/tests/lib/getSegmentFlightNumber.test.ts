import { getSegmentFlightNumber } from "@lib/getSegmentFlightNumber";
import { OfferSliceSegment, OrderSliceSegment } from "@duffel/api/types";

const segment: OfferSliceSegment | OrderSliceSegment = {
  marketing_carrier: { iata_code: "AA" },
  marketing_carrier_flight_number: "101",
} as any;

describe("getSegmentFlightNumber", () => {
  it("should return the correct flight number for an OfferSliceSegment", () => {
    const result = getSegmentFlightNumber(segment);

    expect(result).toEqual("AA101");
  });
});
