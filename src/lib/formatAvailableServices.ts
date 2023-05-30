import { DuffelAncillariesPriceFormatters } from "src/types/DuffelAncillariesProps";
import { Offer } from "src/types/Offer";
import { isBaggageService } from "./isBaggageService";

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
) => {
  // If no custom formatters were passed in, don't do anything.
  if (!priceFormatters) {
    return offer;
  }

  const availableServices = offer.available_services;

  const formatters = {
    baggage: priceFormatters?.bags,

    // TODO: coming soon with https://duffel.atlassian.net/browse/LAND-355
    cancel_for_any_reason: undefined,
  };

  const foundCurrencies = new Set<string>();

  availableServices.forEach((service) => {
    if (service.type in formatters && formatters[service.type]) {
      let total_amount = service.total_amount;
      let total_currency = service.total_currency;

      if (isBaggageService(service)) {
        const { amount, currency } = formatters[service.type]!(
          +service.total_amount,
          service.total_currency,
          service
        );

        total_amount = amount.toString();
        total_currency = currency;
      }

      // TODO: coming soon with https://duffel.atlassian.net/browse/LAND-355
      // if (isCancelForAnyReasonService(service)) {
      //   const { amount, currency } = formatters[service.type]!(
      //     +service.total_amount,
      //     service.total_currency,
      //     service
      //   );

      //   total_amount = amount.toString();
      //   total_currency = currency;
      // }

      // Guard against different currencies being passed in for different seats.
      foundCurrencies.add(total_currency);
      if (foundCurrencies.size > 1) {
        throw new Error(
          multipleCurrenciesErrorMessage(service.type, foundCurrencies)
        );
      }

      service.total_amount = total_amount;
      service.total_currency = total_currency;
    }
  });
  return { ...offer, available_services: availableServices };
};

export { formatAvailableServices };
