import { SeatMap, SeatMapCabinRowSectionElementSeat } from "src/types/SeatMap";
import { getFirstSeatElementMatchingCriteria } from "./getFirstSeatElementMatchingCriteria";

/**
 *
 * Returns the currency of the first service of the given seat maps.
 *
 * @param seatMaps[] Array of seat maps
 * @returns A string representing the currency of the seat maps in the offer.
 */
const getCurrencyForSeatMaps = (seatMaps: SeatMap[]): string | undefined => {
  const firstElementWithServices:
    | SeatMapCabinRowSectionElementSeat
    | undefined = getFirstSeatElementMatchingCriteria(
    seatMaps,
    (element) =>
      element.type === "seat" && element.available_services.length > 0
  ) as SeatMapCabinRowSectionElementSeat;
  return firstElementWithServices?.available_services[0]?.total_currency;
};

export { getCurrencyForSeatMaps };
