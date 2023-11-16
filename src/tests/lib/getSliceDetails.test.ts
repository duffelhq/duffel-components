import {
  OfferSlice,
  OfferSliceSegment,
  OfferSliceSegmentPassenger,
} from "@duffel/api/types";
import { getSliceDetails } from "@lib/getSliceDetails";

const passenger: OfferSliceSegmentPassenger = {
  cabin_class_marketing_name: "economy",
  baggages: [
    {
      type: "carry_on",
      quantity: 2,
    },
    { type: "checked", quantity: 1 },
  ],
} as any;
const marketingCarrier = { name: "British Airways", iataCode: "BA" } as any;
const segment1: OfferSliceSegment = {
  passengers: [passenger],
  origin: {
    iata_code: "LHR",
  },
  destination: {
    iata_code: "BOS",
  },
  departing_at: "2019-12-05T22:25:20.525883Z",
  arriving_at: "2019-12-06T06:25:20.525883Z",
  marketing_carrier: marketingCarrier,
  duration: "PT08h",
} as any;
const segment2: OfferSliceSegment = {
  passengers: [{ ...passenger, baggages: [{ type: "checked", quantity: 2 }] }],
  origin: {
    iata_code: "BOS",
  },
  destination: {
    iata_code: "SAN",
  },
  departing_at: "2019-12-06T11:25:20.525883Z",
  arriving_at: "2019-12-06T13:25:20.525883Z",
  marketing_carrier: marketingCarrier,
  duration: "PT02h",
} as any;
const segment3: OfferSliceSegment = {
  passengers: [passenger],
  origin: {
    iata_code: "SAN",
  },
  destination: {
    iata_code: "HNL",
  },
  departing_at: "2019-12-06T19:25:20.525883Z",
  arriving_at: "2019-12-07T01:25:20.525883Z",
  marketing_carrier: marketingCarrier,
  duration: "PT06h",
} as any;
const partialSlice: OfferSlice = { fareBrandName: "Economy" } as any;
const segmentWithStops: OfferSliceSegment = {
  passengers: [passenger],
  origin: {
    iata_code: "LHR",
  },
  destination: {
    iata_code: "BOS",
  },
  departing_at: "2019-12-05T22:25:20.525883Z",
  arriving_at: "2019-12-06T06:25:20.525883Z",
  stops: [
    {
      airport: {
        iata_code: "JFK",
      },
      arrivingAt: "2019-12-06T01:25:20.525883Z",
      departingAt: "2019-12-06T02:25:20.525883Z",
      duration: "PT01h",
    },
    {
      airport: {
        iata_code: "EWR",
      },
      // TODO(idp): this type in incorrect. Should it be snake case?
      arrivingAt: "2019-12-06T04:25:20.525883Z",
      departingAt: "2019-12-06T05:25:20.525883Z",
      duration: "PT01h",
    },
  ],
  marketing_carrier: marketingCarrier,
  duration: "PT08h",
} as any;

describe("getSliceDetails", () => {
  test("correctly returns empty list for no slice", () => {
    expect(getSliceDetails(undefined)).toEqual([]);
  });
  test("correctly returns single travel item for a slice with one segment", () => {
    const slice: OfferSlice = {
      ...partialSlice,
      segments: [segment1],
    };
    const sliceDetails = getSliceDetails(slice);
    expect(sliceDetails).toHaveLength(1);
    expect(sliceDetails[0].type).toBe("travel");
    expect(sliceDetails[0].travelDetails?.flightDuration).toBe("08h");
    expect(sliceDetails[0].travelDetails?.baggagesIncluded).toEqual({
      carryOn: 2,
      checked: 1,
    });
  });
  test("correctly returns travel items and layover between them for slice with two segments", () => {
    const slice: OfferSlice = {
      ...partialSlice,
      segments: [segment1, segment2],
    };
    const sliceDetails = getSliceDetails(slice);
    expect(sliceDetails).toHaveLength(3);
    expect(sliceDetails[0].type).toBe("travel");
    expect(sliceDetails[1].type).toBe("layover");
    expect(sliceDetails[2].type).toBe("travel");
    expect(sliceDetails[0].travelDetails?.flightDuration).toBe("08h");
    expect(sliceDetails[1].layoverDetails?.duration).toBe("05h");
    expect(sliceDetails[2].travelDetails?.flightDuration).toBe("02h");

    expect(sliceDetails[0].travelDetails?.baggagesIncluded).toEqual({
      carryOn: 2,
      checked: 1,
    });
    expect(sliceDetails[2].travelDetails?.baggagesIncluded).toEqual({
      checked: 2,
    });
  });
  test("correctly returns travel items and layovers between them for slice with multiple segments", () => {
    const slice: OfferSlice = {
      ...partialSlice,
      segments: [segment1, segment2, segment3],
    };
    const sliceDetails = getSliceDetails(slice);
    expect(sliceDetails).toHaveLength(5);
    expect(sliceDetails[0].type).toBe("travel");
    expect(sliceDetails[1].type).toBe("layover");
    expect(sliceDetails[2].type).toBe("travel");
    expect(sliceDetails[3].type).toBe("layover");
    expect(sliceDetails[4].type).toBe("travel");
    expect(sliceDetails[0].travelDetails?.flightDuration).toBe("08h");
    expect(sliceDetails[1].layoverDetails?.duration).toBe("05h");
    expect(sliceDetails[2].travelDetails?.flightDuration).toBe("02h");
    expect(sliceDetails[3].layoverDetails?.duration).toBe("06h");
    expect(sliceDetails[4].travelDetails?.flightDuration).toBe("06h");
  });

  test("correctly returns travel items for a slice with one segment and multiple stops", () => {
    const slice: OfferSlice = {
      ...partialSlice,
      segments: [segmentWithStops],
    } as any;
    const sliceDetails = getSliceDetails(slice);
    expect(sliceDetails.map((slice) => slice.type)).toEqual([
      "travel",
      "layover",
      "travel",
      "layover",
      "travel",
    ]);
    expect(
      sliceDetails.map(
        (slice) =>
          slice.travelDetails?.originDestination ??
          `layover (${slice.layoverDetails?.originDestinationKey})`
      )
    ).toEqual([
      "LHR-JFK",
      "layover (LHR-JFK-BOS)", // layover details
      "JFK-EWR",
      "layover (JFK-EWR-BOS)", // layover details
      "EWR-BOS",
    ]);

    expect(
      sliceDetails.map((slice) =>
        slice.travelDetails
          ? {
              departingAt: slice.travelDetails?.departingAt,
              arrivingAt: slice.travelDetails.arrivingAt,
            }
          : slice.layoverDetails.duration
      )
    ).toEqual([
      {
        departingAt: "2019-12-05T22:25:20.525883Z",
        arrivingAt: "2019-12-06T01:25:20.525883Z",
      },
      "01h", // layover details
      {
        departingAt: "2019-12-06T02:25:20.525883Z",
        arrivingAt: "2019-12-06T04:25:20.525883Z",
      },
      "01h", // layover details
      {
        departingAt: "2019-12-06T05:25:20.525883Z",
        arrivingAt: "2019-12-06T06:25:20.525883Z",
      },
    ]);
  });
});
