import { SeatMap, SeatMapCabinRowSectionElement } from "../types/SeatMap";

const getFirstSeatElementMatchingCriteria = (
  seatMaps: SeatMap[],
  matcher: (element: SeatMapCabinRowSectionElement) => boolean
) => {
  for (const seatMap of seatMaps) {
    for (const cabin of seatMap.cabins) {
      for (const row of cabin.rows) {
        for (const section of row.sections) {
          for (const element of section.elements) {
            if (matcher(element)) {
              return element;
            }
          }
        }
      }
    }
  }
};

export { getFirstSeatElementMatchingCriteria };
