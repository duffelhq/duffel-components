import {
  CreateOrderPayload,
  CreateOrderPayloadService,
  CreateOrderPayloadServices,
} from "../types/CreateOrderPayload";
import { DuffelAncillariesProps } from "../types/DuffelAncillariesProps";
import { Offer } from "../types/Offer";
import { SeatMap } from "../types/SeatMap";
import { getTotalAmountForServices } from "./getTotalAmountForServices";

interface CompileCreateOrderPayloadInput {
  offer: Offer;
  passengers: DuffelAncillariesProps["passengers"];
  baggageSelectedServices: CreateOrderPayloadServices;
  seatSelectedServices: CreateOrderPayloadServices;
  cfarSelectedServices: CreateOrderPayloadServices;
  seatMaps?: SeatMap[];
}

export const compileCreateOrderPayload = ({
  baggageSelectedServices,
  seatSelectedServices,
  cfarSelectedServices,
  offer,
  seatMaps,
  passengers,
}: CompileCreateOrderPayloadInput): Partial<CreateOrderPayload> => {
  const selectedServicesWithInformation = [
    ...baggageSelectedServices,
    ...seatSelectedServices,
    ...cfarSelectedServices,
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
  selectedServices: CreateOrderPayloadServices
): Pick<CreateOrderPayloadService, "id" | "quantity">[] => {
  if (!Array.isArray(selectedServices)) return [];
  return selectedServices
    .filter(({ quantity }) => quantity > 0)
    .map(({ id, quantity }) => ({ id, quantity }));
};
