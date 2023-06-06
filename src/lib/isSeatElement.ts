import {
  SeatMapCabinRowSectionElement,
  SeatMapCabinRowSectionElementSeat,
} from "../types/SeatMap";

export function isSeatElement(
  element: SeatMapCabinRowSectionElement
): element is SeatMapCabinRowSectionElementSeat {
  return element.type === "seat";
}
