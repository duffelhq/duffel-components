import { SeatMap, SeatMapCabinRowSectionElement } from "@duffel/api/types";
import { DuffelAncillariesPriceFormatterForSeats } from "../types/DuffelAncillariesProps";
import { isSeatElement } from "./isSeatElement";

const multipleCurrenciesErrorMessage = (currencies: Set<string>) => {
  return `Seats must all have the same currency, but they have ${
    currencies.size
  } different currencies (${[...currencies].join(
    ", ",
  )}). Check the price formatters passed into the component's render function.`;
};

const formatElement = (
  element: SeatMapCabinRowSectionElement,
  priceFormatter: DuffelAncillariesPriceFormatterForSeats,
  foundCurrencies: Set<string>,
) => {
  const formattedElement = { ...element };
  if (
    isSeatElement(formattedElement) &&
    formattedElement.available_services.length > 0
  ) {
    const formattedServices = formattedElement.available_services.map(
      (service) => {
        const formattedService = { ...service };
        const { amount, currency } = priceFormatter(
          +service.total_amount,
          service.total_currency,
          service,
        );

        formattedService.total_amount = amount.toString();

        // Guard against different currencies being passed in for different seats.
        if (currency) {
          formattedService.total_currency = currency;
          foundCurrencies.add(currency);
          if (foundCurrencies.size > 1) {
            throw new Error(multipleCurrenciesErrorMessage(foundCurrencies));
          }
        }

        return formattedService;
      },
    );
    formattedElement.available_services = formattedServices;
  }
  return formattedElement;
};

const formatSeatMaps = (
  seatMaps: SeatMap[],
  priceFormatter?: DuffelAncillariesPriceFormatterForSeats,
): SeatMap[] => {
  // If a custom formatter wasn't passed in, don't do anything.
  if (!priceFormatter) {
    return seatMaps;
  }

  const foundCurrencies = new Set<string>();

  const formattedSeatMaps: SeatMap[] = seatMaps.map((seatMap) => {
    const formattedCabins = seatMap.cabins.map((cabin) => {
      const formattedRows = cabin.rows.map((row) => {
        const formattedSections = row.sections.map((section) => {
          const formattedElements = section.elements.map((element) => {
            return formatElement(element, priceFormatter, foundCurrencies);
          });
          return { ...section, elements: formattedElements };
        });
        return { ...row, sections: formattedSections };
      });
      return { ...cabin, rows: formattedRows };
    });
    return { ...seatMap, cabins: formattedCabins };
  });

  return formattedSeatMaps;
};

export { formatSeatMaps };
