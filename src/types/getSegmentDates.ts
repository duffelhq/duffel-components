import { OfferSliceSegment, OrderSliceSegment } from "@duffel/api/types";
import { getSegmentDates } from "@lib/getSegmentDates";

const departing = "2019-12-05T22:25:20.525883Z";
const arriving = "2019-12-06T06:25:20.525883Z";

const offerSegment: OfferSliceSegment = {
  departingAt: departing,
  arrivingAt: arriving,
} as any;

const orderSegment: OrderSliceSegment = {
  departingAt: departing,
  arrivingAt: arriving,
} as any;

describe("getSegmentDates", () => {
  test("correctly returns dates for offer segment", () => {
    const { arrivingAt, departingAt } = getSegmentDates(offerSegment);
    expect(departingAt).toBe(departing);
    expect(arrivingAt).toBe(arriving);
  });
  test("correctly returns dates for order segment", () => {
    const { arrivingAt, departingAt } = getSegmentDates(orderSegment);
    expect(departingAt).toBe(departing);
    expect(arrivingAt).toBe(arriving);
  });
});
