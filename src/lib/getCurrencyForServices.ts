import { Offer } from "src/types/Offer";

/**
 *
 * Returns the currency of the baggage services in the offer.
 *
 * @param offer An offer
 * @returns A string representing the currency of the baggage services in the offer.
 * @throws If the baggage services have different currencies or if there are no baggage services.
 */
const getCurrencyForServices = (offer: Offer, serviceType: string): string => {
  const foundCurrencies = new Set<string>();

  const availableServicesForServiceType = offer.available_services.filter(
    (service) => service.type === serviceType
  );

  for (const service of availableServicesForServiceType) {
    foundCurrencies.add(service.total_currency);
  }
  if (foundCurrencies.size === 1) {
    return foundCurrencies.values().next().value;
  } else {
    throw new Error(
      `Baggages need to all have the same currency, but they have ${
        foundCurrencies.size
      } different currencies (${[...foundCurrencies].join(
        ", "
      )}).\nCheck the price formatters passed into the component's render function.`
    );
  }
};

export { getCurrencyForServices };
