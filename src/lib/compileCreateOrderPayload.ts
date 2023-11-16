import { CreateOrder, Offer, SeatMap } from "@duffel/api/types";
import { getTotalAmountForServices } from "./getTotalAmountForServices";
import { DuffelAncillariesProps } from "src/types";

interface CompileCreateOrderPayloadInput {
  offer: Offer;
  passengers: DuffelAncillariesProps["passengers"];
  baggageSelectedServices: CreateOrder["services"];
  seatSelectedServices: CreateOrder["services"];
  cfarSelectedServices: CreateOrder["services"];
  seatMaps?: SeatMap[];
}

export const compileCreateOrderPayload = ({
  baggageSelectedServices,
  seatSelectedServices,
  cfarSelectedServices,
  offer,
  seatMaps,
  passengers,
}: CompileCreateOrderPayloadInput): Partial<CreateOrder> => {
  const selectedServicesWithInformation = [
    ...(baggageSelectedServices ? baggageSelectedServices : []),
    ...(seatSelectedServices ? seatSelectedServices : []),
    ...(cfarSelectedServices ? cfarSelectedServices : []),
  ];

  const totalAmountWithServices =
    +offer.total_amount +
    getTotalAmountForServices(offer, selectedServicesWithInformation, seatMaps);

  return {
    ...(offer && { selected_offers: [offer.id] }),
    passengers,
    services: filterServicesForPayload(selectedServicesWithInformation),
    ...(offer && {
      payments: [
        {
          type: "balance",
          amount: `${totalAmountWithServices}`,
          currency: offer.total_currency,
        },
      ],
    }),
    type: "instant",
    metadata: { source: `duffel-ancillaries@${process.env.COMPONENT_VERSION}` },
  };
};

const filterServicesForPayload = (
  selectedServices: CreateOrder["services"]
): CreateOrder["services"] => {
  if (!Array.isArray(selectedServices)) return [];
  return selectedServices
    .filter(({ quantity }) => quantity > 0)
    .map(({ id, quantity }) => ({ id, quantity }));
};
