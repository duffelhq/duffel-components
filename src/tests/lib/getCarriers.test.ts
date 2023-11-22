import { OfferSliceSegment } from "@duffel/api/types";
import { getCarriers } from "@lib/getCarriers";

describe("getOperatingAirlineForSliceSegments", () => {
  test("handles missing operating carrier", () => {
    const segments: OfferSliceSegment[] = [
      {
        marketing_carrier: {
          id: "",
          iata_code: "BA",
          name: "British Airways",
        },
      },
    ] as any[];

    const { marketingCarrier, operatingCarriers } = getCarriers(segments);
    expect(operatingCarriers.length).toBe(0);
    expect(marketingCarrier?.iata_code).toBe("BA");
  });

  test("handles different marketing carrier", () => {
    const segments: OfferSliceSegment[] = [
      {
        marketing_carrier: {
          id: "",
          iata_code: "BA",
          name: "British Airways",
        },
        operating_carrier: {
          id: "",
          iata_code: "BA",
          name: "British Airways",
        },
      },
      {
        marketing_carrier: {
          id: "",
          iata_code: "AA",
          name: "American Airlines",
        },
        operating_carrier: {
          id: "",
          iata_code: "BA",
          name: "British Airways",
        },
      },
    ] as any;

    const { marketingCarrier, operatingCarriers } = getCarriers(segments);
    expect(marketingCarrier?.iata_code).toBe("BA");
    expect(operatingCarriers.length).toBe(1);
    expect(operatingCarriers[0].iata_code).toBe("BA");
  });

  test("Returns expected airline and operated by", () => {
    const segments: OfferSliceSegment[] = [
      {
        marketing_carrier: {
          id: "",
          iata_code: "BA",
          name: "British Airways",
        },
        operating_carrier: {
          id: "",
          iata_code: "AA",
          name: "American Airlines",
        },
      },
      {
        marketing_carrier: {
          id: "",
          iata_code: "BA",
          name: "British Airways",
        },
      },
    ] as any[];

    const { operatingCarriers } = getCarriers(segments);
    expect(operatingCarriers.length).toBe(1);
    expect(operatingCarriers[0].iata_code).toBe("AA");
  });

  test("Returns expected airline and partially operated by 2 airlines", () => {
    const segments: OfferSliceSegment[] = [
      {
        marketing_carrier: {
          id: "",
          iata_code: "BA",
          name: "British Airways",
        },
        operating_carrier: {
          id: "",
          iata_code: "AA",
          name: "American Airlines",
        },
      },
      {
        marketing_carrier: {
          id: "",
          iata_code: "BA",
          name: "British Airways",
        },
        operating_carrier: {
          id: "",
          iata_code: "BA",
          name: "British Airways",
        },
      },
      {
        marketing_carrier: {
          id: "",
          iata_code: "JL",
          name: "Japan Airlines",
        },
        operating_carrier: {
          id: "",
          iata_code: "JL",
          name: "Japan Airlines",
        },
      },
    ] as any;

    const { operatingCarriers } = getCarriers(segments);
    expect(operatingCarriers.length).toBe(3);
    expect(operatingCarriers[0].iata_code).toBe("AA");
    expect(operatingCarriers[1].iata_code).toBe("BA");
    expect(operatingCarriers[2].iata_code).toBe("JL");
  });
});
