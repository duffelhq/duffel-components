import { CreateOrderPayloadServices } from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import {
  ServicePriceMapById,
  getServicePriceMapById,
} from "./getServicePriceMapById";

export const getTotalAmountForServices = (
  offer: Offer,
  selectedServices: CreateOrderPayloadServices
): number => {
  if (!offer || selectedServices.length === 0) return 0;
  const servicePriceMap = getServicePriceMapById(offer.available_services);

  return getTotalAmountForServicesWithPriceMap(
    servicePriceMap,
    selectedServices
  );
};

export const getTotalAmountForServicesWithPriceMap = (
  servicePriceMap: ServicePriceMapById,
  selectedServices: CreateOrderPayloadServices
) =>
  selectedServices.reduce(
    (total, { quantity, id }) =>
      total + quantity * (+servicePriceMap[id].total_amount || 0),
    0
  );
