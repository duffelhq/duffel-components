import { OfferSliceSegment } from "@duffel/api/types";
import { getFareBrandName } from "@lib/getFareBrandName";

const segment: OfferSliceSegment = {
  passengers: [
    {
      cabin_class_marketing_name: "Economy class",
      cabin_class: "economy",
    },
  ],
} as any;

describe("getFareBrandName", () => {
  test("correctly returns slice fare brand name if present", () => {
    expect(getFareBrandName("Economy class restrictive", segment)).toBe(
      "Economy class restrictive"
    );
  });
  test("correctly returns first passenger cabin class marketing name if slice fare brand name not present", () => {
    expect(getFareBrandName(null, segment)).toBe("Economy class");
  });
  test("correctly returns mapped cabin class if neither slice fare brand name nor cabin class marketing name are present", () => {
    const testSegment: OfferSliceSegment = {
      passengers: [{ cabin_class: "economy" }],
    } as any;
    expect(getFareBrandName(null, testSegment)).toBe("Economy");
  });
  test("correctly returns empty string if no relevant information exists", () => {
    expect(getFareBrandName(null, {} as OfferSliceSegment)).toBe("");
  });
});
