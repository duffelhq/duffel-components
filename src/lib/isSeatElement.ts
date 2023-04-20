import {
  SeatMapCabinRowSectionElement,
  SeatMapCabinRowSectionElementSeat,
} from "src/types/SeatMap";

export function isSeatElement(
  element: SeatMapCabinRowSectionElement
): element is SeatMapCabinRowSectionElementSeat {
  return element.type === "seat";
}
