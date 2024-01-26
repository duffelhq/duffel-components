import { getDateString } from "@lib/getDateString";

describe("getShortDateString", () => {
  test("returns correctly formatted date from string", () => {
    expect(getDateString("2020-12-31", "short", "en-GB")).toEqual("31/12/2020");
    expect(getDateString("2020/09/30", "short", "en-GB")).toEqual("30/09/2020");
    expect(getDateString("2020/09/30", "medium", "en-GB")).toEqual(
      "30 Sept 2020",
    );
    expect(getDateString("2020/09/03 15:32", "long", "en-GB")).toEqual(
      "Thu, 3 Sept 2020",
    );
    expect(getDateString("2020/09/03 15:32", "longWithTime", "en-GB")).toEqual(
      "Thu, 3 Sept 2020, 15:32",
    );
  });
  test("returns correctly formatted date from date", () => {
    expect(getDateString(new Date("2020/09/30"), "short", "en-GB")).toEqual(
      "30/09/2020",
    );
    expect(
      getDateString(new Date("2020/09/03 15:32"), "medium", "en-GB"),
    ).toEqual("3 Sept 2020");
    expect(
      getDateString(new Date("2020/09/03 15:32"), "long", "en-GB"),
    ).toEqual("Thu, 3 Sept 2020");
    expect(
      getDateString(new Date("2020/09/03 15:32"), "longWithTime", "en-GB"),
    ).toEqual("Thu, 3 Sept 2020, 15:32");
  });
});
