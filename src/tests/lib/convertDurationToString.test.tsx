import { convertDurationToString } from "../../lib/convertDurationToString";
describe("convertDurationToString", () => {
  test("returns the duration in the correct display format", () => {
    expect(convertDurationToString("PT16H30M")).toBe("16h 30m");
    expect(convertDurationToString("PT09H")).toBe("09h");
    expect(convertDurationToString("PT10M")).toBe("10m");
    expect(convertDurationToString("P2DT16H30M")).toBe("2d 16h 30m");
    expect(convertDurationToString("p2Dt16H30m")).toBe("2d 16h 30m");
    expect(convertDurationToString("P0DT16H30M")).toBe("16h 30m");
  });
});
