import { getLayoverOriginDestinationKey } from "../../lib/getLayoverOriginDestinationKey";

describe("getLayoverOriginDestinationKey", () => {
  it("should return the correct key when all arguments are provided", () => {
    const key = getLayoverOriginDestinationKey(
      "LHR",
      "2022-01-01T12:00:00Z",
      "JFK"
    );
    expect(key).toEqual("LHR-2022-01-01T12:00:00Z-JFK");
  });

  it("should return the correct key when some arguments are null", () => {
    const key = getLayoverOriginDestinationKey("LHR", null, "JFK");
    expect(key).toEqual("LHR-null-JFK");
  });

  it("should return the correct key when all arguments are null", () => {
    const key = getLayoverOriginDestinationKey(null, null, null);
    expect(key).toEqual("null-null-null");
  });
});
