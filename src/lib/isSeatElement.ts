import {
  SeatMapCabinRowSectionElement,
  SeatMapCabinRowSectionElementSeat,
} from "@duffel/api/types";

export function isSeatElement(
  element: SeatMapCabinRowSectionElement,
): element is SeatMapCabinRowSectionElementSeat {
  return element.type === "seat" || element.type === "restricted_seat_general";
}
