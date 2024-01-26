import {
  SeatMapCabin,
  SeatMapCabinRowSectionElementAmenity,
} from "@duffel/api/types";

export const getSymbols = (
  cabins: SeatMapCabin[],
): Set<SeatMapCabinRowSectionElementAmenity> => {
  const results: Set<SeatMapCabinRowSectionElementAmenity> = new Set();
  for (const cabin of cabins) {
    for (const row of cabin.rows) {
      for (const section of row.sections) {
        for (const element of section.elements) {
          if (element.type !== "seat" && element.type !== "empty") {
            results.add(element.type);
          }
        }
      }
    }
  }
  return results;
};
