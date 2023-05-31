import { createPriceFormatters } from "@lib/createPriceFormatters";

describe("createPriceFormatters", () => {
  it("should return an empty object if neither markup nor priceFormatters are supplied", () => {
    const formatters = createPriceFormatters(undefined, undefined);
    expect(formatters).toEqual({});
  });

  it("should return an empty object if both markup and priceFormatters are empty", () => {
    const formatters = createPriceFormatters({}, {});
    expect(formatters).toEqual({});
  });

  it("should convert the markup into a price formatter for bags", () => {
    const formatters = createPriceFormatters(
      {
        bags: {
          rate: 0.1,
          amount: 100,
        },
      },
      {}
    );

    // Force unwrap the price formatter and use 'any' to avoid type errors.
    // We know this is safe because we created the function right above this.
    const formattedPrice = formatters.bags!(100, "GBP", {} as any);

    /**
     * Note: This test is also confirming that we apply the rate, followed by
     * the amount, rather than the other way around.
     * For example, if we applied the amount first, the result would be 220.
     */

    expect(formattedPrice).toEqual({ amount: 210, currency: "GBP" });
    expect(formatters.seats).toBeUndefined();
  });

  it("should convert the markup into a price formatter for seats", () => {
    const formatters = createPriceFormatters(
      {
        seats: {
          rate: 0.1,
          amount: 100,
        },
      },
      {}
    );

    // Force unwrap the price formatter and use 'any' to avoid type errors.
    // We know this is safe because we created the function right above this.
    const formattedPrice = formatters.seats!(100, "GBP", {} as any);

    expect(formattedPrice).toEqual({ amount: 210, currency: "GBP" });
    expect(formatters.bags).toBeUndefined();
  });

  it("should convert the markup into a price formatter for both bags and seats", () => {
    const formatters = createPriceFormatters(
      {
        bags: {
          rate: 0.5,
          amount: 1,
        },
        seats: {
          rate: 0.1,
          amount: 100,
        },
      },
      undefined
    );

    // Force unwrap the price formatter and use 'any' to avoid type errors.
    // We know this is safe because we created the function right above this.
    const formattedPriceForBags = formatters.bags!(100, "GBP", {} as any);
    expect(formattedPriceForBags).toEqual({ amount: 151, currency: "GBP" });

    const formattedPriceForSeats = formatters.seats!(100, "GBP", {} as any);
    expect(formattedPriceForSeats).toEqual({ amount: 210, currency: "GBP" });
  });

  it("should pass through pre-defined priceFormatters unchanged", () => {
    const priceFormatters = {
      bags: (amount: number) => ({ amount: amount + 100 }),
      seats: (amount: number) => ({ amount: amount + 200 }),
    };

    const formatters = createPriceFormatters(undefined, priceFormatters);

    // Pass the same arguments to both the priceFormatters and the formatters
    // to ensure they're the same functions.
    expect(formatters.bags!(100, "GBP", {} as any)).toEqual(
      priceFormatters.bags(100)
    );
    expect(formatters.seats!(100, "GBP", {} as any)).toEqual(
      priceFormatters.seats(100)
    );
  });

  it("should allow markup to take precedence when both are supplied", () => {
    const priceFormatters = {
      bags: () => ({ amount: 100 }),
      seats: () => ({ amount: 100 }),
    };

    const formatters = createPriceFormatters(
      {
        bags: {
          rate: 0.1,
          amount: 100,
        },
        seats: {
          rate: 0.2,
          amount: 100,
        },
      },
      priceFormatters
    );

    // Run the formatters. If the markup is taking precedence, the amount
    // should be 210 for bags and 220 for seats, rather than 100.
    expect(formatters.bags!(100, "GBP", {} as any)).toEqual({
      amount: 210,
      currency: "GBP",
    });
    expect(formatters.seats!(100, "GBP", {} as any)).toEqual({
      amount: 220,
      currency: "GBP",
    });
  });
});
