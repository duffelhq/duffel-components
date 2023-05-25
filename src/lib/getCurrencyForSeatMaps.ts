import { SeatMap } from "src/types/SeatMap";

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

/**
 *
 * Returns the currency of the first service of the given seat maps.
 *
 * @param seatMaps[] Array of seat maps
 * @returns A string representing the currency of the seat maps in the offer.
 */
const getCurrencyForSeatMaps = (seatMaps: SeatMap[]): string | undefined => {
  const firstService = getFirstAvailableService(seatMaps);
  return firstService?.total_currency;
};

export { getCurrencyForSeatMaps };
