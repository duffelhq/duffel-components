import {
  SeatSelectionContextInterface,
  SeatSelectionForSegment,
} from "@lib/useSeatSelectionContext";
import { CreateOrderPayloadServices } from "src/types/CreateOrderPayload";
import { SeatMap } from "src/types/SeatMap";

export const getSeatSelectionContextInterfaceFromServices = (
  services: CreateOrderPayloadServices,
  seatMaps: SeatMap[]
): SeatSelectionContextInterface => {
  const seatContext: SeatSelectionContextInterface = {};
  const servicesSet = new Set(services.map((service) => service.id));

  for (const seatMap of seatMaps) {
    for (const cabin of seatMap.cabins) {
      for (const row of cabin.rows) {
        for (const section of row.sections) {
          for (const element of section.elements) {
            if (
              element.type === "seat" &&
              Array.isArray(element.available_services)
            ) {
              const serviceMatch = element.available_services.find((service) =>
                servicesSet.has(service.id)
              );
              if (serviceMatch) {
                if (!(seatMap.segment_id in seatContext)) {
                  seatContext[seatMap.segment_id] =
                    {} as SeatSelectionForSegment;
                }
                seatContext[seatMap.segment_id][serviceMatch.passenger_id] = {
                  designator: element.designator,
                  service: serviceMatch,
                };
              }
            }
          }
        }
      }
    }
  }

  return seatContext;
};
