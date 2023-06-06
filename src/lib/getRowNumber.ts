import {
  SeatMapCabinRow,
  SeatMapCabinRowSectionElementSeat,
} from "../types/SeatMap";

export const getRowNumber = (row: SeatMapCabinRow): string | null => {
  const seats = Object.values(row.sections)
    .map((section) => section.elements)
    .reduce((acc, val) => acc.concat(val), [])
    .filter(
      (element) => element.type === "seat"
    ) as SeatMapCabinRowSectionElementSeat[];
  return seats.length > 0
    ? seats[0].designator.substring(0, seats[0].designator.length - 1)
    : null;
};
