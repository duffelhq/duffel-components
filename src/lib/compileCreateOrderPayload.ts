import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { SeatMap } from "src/types/SeatMap";
import { getTotalAmountForServices } from "./getTotalAmountForServices";
import { DuffelAncillariesProps } from "@components/DuffelAncillaries";

interface CompileCreateOrderPayloadInput {
  offer: Offer;
  passengers: DuffelAncillariesProps["passengers"];
  baggageSelectedServices: CreateOrderPayloadServices;
  seatSelectedServices: CreateOrderPayloadServices;
  seatMaps?: SeatMap[];
}

export const compileCreateOrderPayload = ({
  baggageSelectedServices,
  seatSelectedServices,
  offer,
  seatMaps,
  passengers,
}: CompileCreateOrderPayloadInput): Partial<CreateOrderPayload> => {
  const services = [
    ...filterServicesForPayload(baggageSelectedServices),
    ...filterServicesForPayload(seatSelectedServices),
  ];

  const totalAmountWithServices =
    +offer.total_amount + getTotalAmountForServices(offer, services, seatMaps);

  return {
    ...(offer && { selected_offers: [offer.id] }),
    passengers,
    services,
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
): CreateOrderPayloadServices => {
  if (!Array.isArray(selectedServices)) return [];
  return selectedServices
    .filter(({ quantity }) => quantity > 0)
    .map(({ id, quantity }) => ({ id, quantity }));
};
