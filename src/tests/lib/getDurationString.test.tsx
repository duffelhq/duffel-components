import { getDurationString } from "../../lib/getDurationString";
describe("getDurationString", () => {
  test("returns the duration in the correct format", () => {
    expect(getDurationString("2020/10/13 10:40", "2020/10/13 19:50")).toBe(
      "09h 10m",
    );
    expect(getDurationString("2020/10/13 10:40", "2020/10/13 19:40")).toBe(
      "09h",
    );
    expect(getDurationString("2020/10/13 10:40", "2020/10/13 10:50")).toBe(
      "10m",
    );
    expect(getDurationString("2020/10/13 10:40", "2020/10/15 19:50")).toBe(
      "2d 09h 10m",
    );
    expect(getDurationString("2022/12/13 18:35", "2022/12/13 14:10")).toBe(
      "-04h 25m",
    );
  });
});
