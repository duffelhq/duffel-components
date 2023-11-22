import { getDayDiff } from "@lib/getDayDiff";
describe("getDayDiff", () => {
  test("returns the correct difference in days between two dates", () => {
    expect(getDayDiff("2020/10/12", "2020/10/10")).toBe(2);
    expect(getDayDiff("2020/10/10", "2020/10/10")).toBe(0);
    expect(getDayDiff("2020/10/08", "2020/10/10")).toBe(-2);
    expect(
      getDayDiff("2020-04-11T15:48:11.642Z", "2020-04-11T14:48:11.642Z")
    ).toBe(0);
    expect(
      getDayDiff("2020-04-11T15:48:11.642Z", "2020-04-11T15:48:11.642Z")
    ).toBe(0);
    expect(
      getDayDiff("2020-04-12T01:48:11.642Z", "2020-04-11T23:48:11.642Z")
    ).toBe(1);
  });
});
