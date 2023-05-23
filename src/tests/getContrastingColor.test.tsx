import { getContrastingColor } from "../lib/getContrastingColor";

describe("getContrastingColor", () => {
  it("should return 'white' when the color passed in is dark", () => {
    const textColor = getContrastingColor("0,0,0");
    expect(textColor).toBe("white");
  });
  it("should return 'black' when the color passed in is light", () => {
    const textColor = getContrastingColor("255,255,255");
    expect(textColor).toBe("black");
  });
});
