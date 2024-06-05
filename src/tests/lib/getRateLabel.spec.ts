import { getRateLabel } from "@components/Stays/lib/getRateLabel";

describe("getRateLabel", () => {
  test("returns the right label for a pay now card rate", () => {
    const paymentMethod = "card";
    const paymentType = "pay_now";

    const label = getRateLabel(paymentMethod, paymentType);

    expect(label).toEqual("Pay now with card");
  });

  test("returns the right label for a guarantee card rate", () => {
    const paymentMethod = "card";
    const paymentType = "guarantee";

    const label = getRateLabel(paymentMethod, paymentType);

    expect(label).toEqual("Card payment at accommodation");
  });

  test("returns the right label for a balance rate", () => {
    const paymentMethod = "balance";
    const paymentType = "pay_now";

    const label = getRateLabel(paymentMethod, paymentType);

    expect(label).toEqual("Pay now with Duffel Balance");
  });
});
