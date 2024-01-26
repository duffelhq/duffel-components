import { moneyStringFormatter } from "../../lib/moneyStringFormatter";

describe("moneyStringFormatter", () => {
  it("should format known currencies correctly", () => {
    expect(moneyStringFormatter("GBP")(10.23)).toEqual("£10.23");
  });
  it("should fall back to value + currency for unknown currencies", () => {
    expect(moneyStringFormatter("Duffel house points")(10.23)).toEqual(
      "10.23 Duffel house points",
    );
  });
});
