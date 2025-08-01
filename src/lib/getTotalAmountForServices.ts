import { CreateOrder, Offer, SeatMap } from "@duffel/api/types";
import { captureErrorInSentry } from "./captureErrorInSentry";
import {
  ServicePriceMapById,
  getServicePriceMapById,
} from "./getServicePriceMapById";

export const getTotalAmountForServices = (
  offer: Offer,
  selectedServices: CreateOrder["services"],
  seatMaps?: SeatMap[],
): number => {
  if (!offer || !selectedServices || selectedServices.length === 0) return 0;
  const servicePriceMap = getServicePriceMapById(offer.available_services);
  return getTotalAmountForServicesWithPriceMap(
    servicePriceMap,
    selectedServices,
    seatMaps,
  );
};

export const getTotalAmountForServicesWithPriceMap = (
  servicePriceMap: ServicePriceMapById,
  selectedServices: CreateOrder["services"],
  seatMaps?: SeatMap[],
) =>
  (selectedServices || []).reduce(
    (total, { quantity, id }) => {
      let newTotal = total;

      // For seat services, prioritize seat maps (which may have markup applied)
      // over the offer's available_services (which contain original prices)
      const seatMapAmount = seatMaps ? getTotalAmountFromSeatMaps(id, seatMaps) : 0;
      
      if (seatMapAmount > 0) {
        // Service found in seat maps, use the amount from there (includes markup)
        newTotal += quantity * seatMapAmount;
      } else if (id in servicePriceMap) {
        // Service not in seat maps, use price from offer's available_services
        newTotal += quantity * +servicePriceMap[id].total_amount;
      } else {
        captureErrorInSentry(
          new Error(
            `The service id (${id}) provided could not be found in neither the offer nor the seat maps.`,
          ),
        );
      }

      return newTotal;
    },

    0,
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
                (service) => service.id === serviceId,
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
