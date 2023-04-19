import { CreateOrderPayloadServices } from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import {
  ServicePriceMapById,
  getServicePriceMapById,
} from "./getServicePriceMapById";
import { SeatMap } from "src/types/SeatMap";
import { captureErrorInSentry } from "./captureErrorInSentry";

export const getTotalAmountForServices = (
  offer: Offer,
  selectedServices: CreateOrderPayloadServices,
  seatMaps?: SeatMap[]
): number => {
  if (!offer || selectedServices.length === 0) return 0;
  const servicePriceMap = getServicePriceMapById(offer.available_services);
  return getTotalAmountForServicesWithPriceMap(
    servicePriceMap,
    selectedServices,
    seatMaps
  );
};

export const getTotalAmountForServicesWithPriceMap = (
  servicePriceMap: ServicePriceMapById,
  selectedServices: CreateOrderPayloadServices,
  seatMaps?: SeatMap[]
) =>
  selectedServices.reduce(
    (total, { quantity, id }) => {
      let newTotal = total;

      if (id in servicePriceMap) {
        newTotal += quantity * +servicePriceMap[id].total_amount;
      } else if (seatMaps) {
        newTotal += quantity * getTotalAmountFromSeatMaps(id, seatMaps);
      } else {
        captureErrorInSentry(
          new Error(
            `The service id provided could not be found in neither the offer nor the seat maps. Service id: ${id}`
          )
        );
      }

      return newTotal;
    },

    0
  );

const getTotalAmountFromSeatMaps = (serviceId: string, seatMaps: SeatMap[]) => {
  for (const seatMap of seatMaps) {
    for (const cabin of seatMap.cabins) {
      for (const row of cabin.rows) {
        for (const section of row.sections) {
          for (const element of section.elements) {
            if (
              element.type === "seat" &&
              Array.isArray(element.available_services)
            ) {
              const serviceMatch = element.available_services.find(
                (service) => service.id === serviceId
              );
              if (serviceMatch) return +serviceMatch.total_amount;
            }
          }
        }
      }
    }
  }
  return 0;
};
