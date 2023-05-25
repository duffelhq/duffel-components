import { Offer } from "src/types/Offer";

/**
 *
 * Returns the currency of the first service of the given type in the offer.
 *
 * @param offer An offer
 * @returns A string representing the currency of the services in the offer.
 * @throws If there are no services, or none of the services are of the given type.
 */
const getCurrencyForServices = (offer: Offer, serviceType: string): string => {
  if (offer.available_services.length === 0) {
    throw new Error("No services available");
  }
  const firstService = offer.available_services.find(
    (service) => service.type === serviceType
  );
  if (!firstService) {
    throw new Error(`No ${serviceType} services available`);
  }
  return firstService.total_currency;
};

export { getCurrencyForServices };
