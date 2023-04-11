import { SeatMapCabinRowSectionAvailableService } from "src/types/SeatMap";
import { SeatSelectionContextInterface } from "./useSeatSelectionContext";

export const getSeatServices = (
  forSeatSelection: SeatSelectionContextInterface
) => {
  const services = Object.values(forSeatSelection)
    .map((segment) => Object.values(segment))
    .map((seats) => seats.map((seat) => seat?.service || null))
    .flat();
  return services.filter(
    (service) => service !== null
  ) as SeatMapCabinRowSectionAvailableService[];
};
