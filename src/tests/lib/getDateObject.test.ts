import { getDateObject } from "@lib/getDateObject";

describe("getDateObject", () => {
  test("should return null for invalid strings", () => {
    expect(getDateObject("invalid")).toBeNull();
  });

  test("should correctly add safe time to date only iso", () => {
    const isoString = "2020-06-21";
    const formatToLATime = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
    }).format;

    expect(formatToLATime(new Date(isoString))).not.toBe("6/21/2020");

    const result = getDateObject(isoString);
    expect(result).not.toBeNull();
    expect(formatToLATime(result!)).toBe("6/21/2020");
  });

  test("should work correctly for iso strings with time", () => {
    const isoString = "2020-06-21T00:00:00Z";

    const result = getDateObject(isoString);
    expect(result instanceof Date).toBe(true);
  });
});
