import { OfferSlice } from "@duffel/api/types";
import { getAirlinesText } from "@lib/getAirlinesText";

const ba = {
  iata_code: "BA",
  name: "British Airways",
};

const aa = {
  iata_code: "AA",
  name: "American Airlines",
};

const vy = {
  iata_code: "VY",
  name: "Vueling",
};

describe("getAirlinesText", () => {
  test("correctly displays fare brand name and marketing carrier", () => {
    const slice: OfferSlice = {
      fare_brand_name: "Economy",
      segments: [{ marketing_carrier: ba }],
    } as any;
    expect(getAirlinesText(slice, false, true)).toBe(
      "Economy · British Airways"
    );
  });
  test("handles missing fare brand name", () => {
    const slice: OfferSlice = {
      segments: [{ marketing_carrier: ba }],
    } as any;
    expect(getAirlinesText(slice)).toBe("British Airways");
  });
  test("correctly handles same marketing and operating carrier", () => {
    const slice: OfferSlice = {
      fare_brand_name: "Economy",
      segments: [{ marketing_carrier: ba, operating_carrier: ba }],
    } as any;
    expect(getAirlinesText(slice, false, true)).toBe(
      "Economy · British Airways"
    );
  });
  test("correctly displays differing marketing and operating carrier", () => {
    const slice: OfferSlice = {
      fare_brand_name: "Economy",
      segments: [{ marketing_carrier: ba, operating_carrier: aa }],
    } as any;
    expect(getAirlinesText(slice, false, true)).toBe(
      "Economy · Sold by British Airways, operated by American Airlines"
    );
  });
  test("correctly displays offers partially operated by different carrier", () => {
    const slice: OfferSlice = {
      fare_brand_name: "Economy",
      segments: [
        { marketing_carrier: ba, operating_carrier: ba },
        { marketing_carrier: ba, operating_carrier: aa },
        { marketing_carrier: ba, operating_carrier: ba },
      ],
    } as any;
    expect(getAirlinesText(slice, false, true)).toBe(
      "Economy · Sold by British Airways, partially operated by American Airlines"
    );
  });
  test("correctly displays offers partially operated by multiple different carriers", () => {
    const slice: OfferSlice = {
      fare_brand_name: "Economy",
      segments: [
        { marketing_carrier: ba, operating_carrier: ba },
        { marketing_carrier: ba, operating_carrier: aa },
        { marketing_carrier: ba, operating_carrier: vy },
      ],
    } as any;
    expect(getAirlinesText(slice, false, true)).toBe(
      "Economy · Sold by British Airways, partially operated by American Airlines, Vueling"
    );
  });
});
