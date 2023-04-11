import { SeatMapCabinRowSectionElementSeat } from "src/types/SeatMap";
import { SeatSelectionForSegment } from "./useSeatSelectionContext";

export const getServiceInformation = (
  forSeat: SeatMapCabinRowSectionElementSeat,
  forPassengerId: string,
  selectedServices: SeatSelectionForSegment
) => {
  const service = forSeat.available_services?.find(
    (service) => service.passenger_id === forPassengerId
  );

  const alreadySelectedService = forSeat.available_services?.find(
    (availableService) =>
      selectedServices
        ? selectedServices[availableService.passenger_id]?.service?.id ===
          availableService.id
        : false
  );
  const isAvailable = (service && !alreadySelectedService) || false;
  return {
    service,
    isAvailable,
    selectedBy: alreadySelectedService?.passenger_id,
  };
};
