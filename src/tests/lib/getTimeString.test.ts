import { getTimeString } from "@lib/getTimeString";

describe("getTimeString", () => {
  test("returns correctly formatted date from string", () => {
    expect(getTimeString("2020/09/03 15:32", "en-GB")).toEqual("15:32");
  });
  test("returns correctly formatted date from date", () => {
    expect(getTimeString(new Date("2020/09/03 15:32"), "en-GB")).toEqual(
      "15:32"
    );
  });
});
