import { formatSeatMaps } from "@lib/formatSeatMaps";
import { SeatMap } from "src/types/SeatMap";

/* eslint-disable @typescript-eslint/no-var-requires */
const seatMaps = require("../../fixtures/seat-maps/off_1.json");
/* eslint-enable @typescript-eslint/no-var-requires */

const getFirstAvailableService = (seatMaps: SeatMap[]) => {
  for (const seatMap of seatMaps) {
    for (const cabin of seatMap.cabins) {
      for (const row of cabin.rows) {
        for (const section of row.sections) {
          for (const element of section.elements) {
            if (
              element.type === "seat" &&
              element.available_services.length > 0
            ) {
              return element.available_services[0];
            }
          }
        }
      }
    }
  }
};

describe("formatSeatMaps", () => {
  it("should return the seat maps unchanged if no formatter is passed in", () => {
    const result = formatSeatMaps(seatMaps);
    expect(result).toBe(seatMaps);
  });

  it("should format seat maps price and currency correctly", () => {
    const result = formatSeatMaps(seatMaps, () => ({
      amount: 100,
      currency: "Duffel points",
    }));
    const firstService = getFirstAvailableService(result);
    expect(firstService?.total_amount).toBe("100");
    expect(firstService?.total_currency).toBe("Duffel points");
  });

  it("should throw if more than one currency is used", () => {
    expect(() => {
      // Keep track of how many times the function has been called.
      // It's a basic hack to simulate different currencies being used,
      // causing the error to be thrown.
      let numberOfCalls = 0;
      formatSeatMaps(seatMaps, () => {
        numberOfCalls++;
        return {
          amount: 100,
          currency: numberOfCalls % 2 === 0 ? "GBP" : "USD",
        };
      });
    }).toThrow();
  });
});
