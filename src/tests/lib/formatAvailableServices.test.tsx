import { OfferAvailableServiceBaggage } from "@duffel/api/types";
import { formatAvailableServices } from "../../lib/formatAvailableServices";

/* eslint-disable @typescript-eslint/no-var-requires */
const offer = require("../../fixtures/offers/off_1.json");
/* eslint-enable @typescript-eslint/no-var-requires */

describe("formatAvailableServices", () => {
  it("should return the offer unchanged if no formatters are passed in", () => {
    const result = formatAvailableServices(offer);
    expect(result).toBe(offer);
  });

  it("should return the offer unchanged if the formatters are empty", () => {
    const result = formatAvailableServices(offer, {});
    expect(result).toEqual(offer);
  });

  it("should transform the price and currency of available services correctly", () => {
    const result = formatAvailableServices(offer, {
      bags: () => ({ amount: 100, currency: "Duffel points" }),
      cancel_for_any_reason: () => ({ amount: 200, currency: "Duffel points" }),
    });
    expect(result.available_services[0].total_amount).toBe("100");
    expect(result.available_services[0].total_currency).toBe("Duffel points");

    expect(result.available_services[2].total_amount).toBe("200");
    expect(result.available_services[2].total_currency).toBe("Duffel points");
  });

  it("should throw if more than one currency is used", () => {
    const mockAvailableService = {
      type: "baggage",
      total_amount: "100",
      total_currency: "GBP",
      maximum_quantity: 1,
      passenger_ids: [],
      segment_ids: [],
      metadata: {
        type: "checked",
        maximum_depth_cm: 25,
        maximum_height_cm: 55,
        maximum_length_cm: 35,
        maximum_weight_kg: 23,
      },
    };

    const availableServicesWithDifferentCurrencies: OfferAvailableServiceBaggage[] =
      [
        {
          ...mockAvailableService,
          id: "1",
        } as OfferAvailableServiceBaggage,
        {
          ...mockAvailableService,
          id: "2",
        } as OfferAvailableServiceBaggage,
      ];

    expect(() => {
      formatAvailableServices(
        {
          ...offer,
          available_services: availableServicesWithDifferentCurrencies,
        },
        {
          bags: (amount, _currency, service) => {
            return {
              amount,
              // Change the currency for each service,
              // so that the function throws.
              currency: service.id === "1" ? "GBP" : "USD",
            };
          },
        },
      );
    }).toThrow();
  });
});
