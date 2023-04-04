import { CreateOrderPayloadServices } from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";

export const getTotalAmountForServices = (
  offer: Offer,
  selectedServices: CreateOrderPayloadServices
): number => {
  if (!offer || selectedServices.length === 0) return 0;

  const servicePriceMap = offer.available_services.reduce(
    (priceMap, service) => ({
      [service.id]: +service.total_amount,
      ...priceMap,
    }),
    {} as Record<Offer["id"], number>
  );

  return selectedServices.reduce(
    (total, { quantity, id }) => total + quantity * (servicePriceMap[id] || 0),
    0
  );
};
