import { DuffelAncillariesPriceFormatters } from "../types/DuffelAncillariesProps";
import { Offer } from "../types/Offer";
import { isBaggageService } from "./isBaggageService";
import { isCancelForAnyReasonService } from "./isCancelForAnyReasonService";

const multipleCurrenciesErrorMessage = (
  label: string,
  currencies: Set<string>
) => {
  return `${label} must all have the same currency, but they have ${
    currencies.size
  } different currencies (${[...currencies].join(
    ", "
  )}). Check the price formatters passed into the component's render function.`;
};

/**
 * Formats the prices of the available services of an offer according to the
 * priceFormatters passed in.
 *
 * @param offer An offer from the Duffel API
 * @param priceFormatters Optional price formatting functions. If not passed in, the offer will be returned unchanged.
 * @returns An offer with the prices of its available services formatted according to the priceFormatters passed in.
 */
const formatAvailableServices = (
  offer: Offer,
  priceFormatters?: DuffelAncillariesPriceFormatters
): Offer => {
  // If no custom formatters were passed in, don't do anything.
  if (!priceFormatters) {
    return offer;
  }

  const availableServices = offer.available_services;

  const foundCurrencies = new Set<string>();

  const formatters = {
    baggage: priceFormatters?.bags,
    cancel_for_any_reason: priceFormatters?.cancel_for_any_reason,
  };

  const servicesWithFormattedPrices = availableServices.map((service) => {
    const serviceWithFormattedPrices = { ...service };

    if (service.type in formatters && formatters[service.type]) {
      let { total_amount, total_currency } = service;

      if (isBaggageService(service)) {
        const { amount, currency } = formatters[service.type]!(
          +service.total_amount,
          service.total_currency,
          service
        );

        total_amount = amount.toString();
        if (currency) {
          total_currency = currency;
        }
      }

      if (isCancelForAnyReasonService(service)) {
        const { amount, currency } = formatters[service.type]!(
          +service.total_amount,
          service.total_currency,
          service
        );

        total_amount = amount.toString();
        if (currency) {
          total_currency = currency;
        }
      }

      // Guard against different currencies being passed in for different services.
      foundCurrencies.add(total_currency);
      if (foundCurrencies.size > 1) {
        throw new Error(
          multipleCurrenciesErrorMessage(service.type, foundCurrencies)
        );
      }

      serviceWithFormattedPrices.total_amount = total_amount;
      serviceWithFormattedPrices.total_currency = total_currency;
    }
    return serviceWithFormattedPrices;
  });
  return { ...offer, available_services: servicesWithFormattedPrices };
};

export { formatAvailableServices };
