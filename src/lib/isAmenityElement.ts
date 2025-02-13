import { SeatMapCabinRowSectionElement } from "@duffel/api/types";

export function isAmenityElement(element: SeatMapCabinRowSectionElement) {
  return (
    element.type === "bassinet" ||
    element.type === "lavatory" ||
    element.type === "closet" ||
    element.type === "galley" ||
    element.type === "stairs"
  );
}
