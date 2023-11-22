import { toUTCDate } from "@lib/toUTCDate";

describe("toUTCDate", () => {
  test("should gracefully return null if input is not a Date object", () => {
    expect(toUTCDate(undefined as any)).toBeNull();
    expect(toUTCDate("invalid" as any)).toBeNull();
    expect(toUTCDate(25 as any)).toBeNull();
    expect(toUTCDate(null)).toBeNull();
  });
  test("should return the same date in spite of the time and timezone", () => {
    const originalDay = 21;
    const referenceDate = new Date(`2020-06-${originalDay}T00:00:00.000+00:00`);
    const testDate1 = new Date(`2020-06-${originalDay}T00:00:00.000-04:00`);
    expect(toUTCDate(referenceDate)).toEqual(toUTCDate(testDate1));
  });
});
