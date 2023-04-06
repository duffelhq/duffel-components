import { OfferAvailableService } from "src/types/Offer";

export type ServicePriceMapById = Record<
  OfferAvailableService["id"],
  Pick<OfferAvailableService, "total_amount" | "total_currency">
>;

export const getServicePriceMapById = (
  availableServices: OfferAvailableService[]
): ServicePriceMapById =>
  availableServices.reduce(
    (all, { id, total_amount, total_currency }) => ({
      [id]: {
        total_amount,
        total_currency,
      },
      ...all,
    }),
    {} as ServicePriceMapById
  );
