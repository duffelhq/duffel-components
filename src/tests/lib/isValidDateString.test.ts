import { isValidDateString } from "@lib/isValidDateString";

describe("isValidDateString", () => {
  test("should return true for complete and partial ISO strings", () => {
    expect(isValidDateString("2020-10-01")).toBe(true);
    expect(isValidDateString("--10-01")).toBe(true);

    expect(isValidDateString("2011-10-05T14:48:00")).toBe(true);
    expect(isValidDateString("2011-10-05T14:48:00.000Z")).toBe(true);
  });
});
