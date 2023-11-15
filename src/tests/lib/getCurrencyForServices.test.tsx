import { Offer } from "@duffel/api/types";
import { getCurrencyForServices } from "../../lib/getCurrencyForServices";

describe("getCurrencyForServices", () => {
  it("should return GBP when the first service has that currency", () => {
    const offer = {
      available_services: [
        {
          type: "baggage",
          total_currency: "GBP",
        },
        {
          type: "baggage",
          total_currency: "USD",
        },
      ],
    };
    expect(getCurrencyForServices(offer as Offer, "baggage")).toEqual("GBP");
  });

  it("should throw when there are no available services", () => {
    const offer = {
      available_services: [],
    };
    // Using 'any' here because we want to test the error message, not the type.
    expect(() => getCurrencyForServices(offer as any, "baggage")).toThrow();
  });

  it("should throw when there are no available services matching the type requested", () => {
    const offer = {
      available_services: [
        {
          type: "seat",
          total_currency: "GBP",
        },
        {
          type: "seat",
          total_currency: "GBP",
        },
      ],
    };
    expect(() => getCurrencyForServices(offer as Offer, "baggage")).toThrow();
  });
});
