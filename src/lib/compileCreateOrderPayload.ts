import { BaggageSelectionProps } from "@components/BaggageSelection";
import { DuffelCheckoutProps } from "@components/DuffelCheckout";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { getTotalAmountForServices } from "./getTotalAmountForServices";

interface CompileCreateOrderPayloadInput {
  offer?: Offer;
  passengers: DuffelCheckoutProps["passengers"];
  baggageSelectedServices: BaggageSelectionProps["selectedServices"];
}

export const compileCreateOrderPayload = ({
  baggageSelectedServices,
  offer,
  passengers,
}: CompileCreateOrderPayloadInput): Partial<CreateOrderPayload> => ({
  ...(offer && { selected_offers: [offer.id] }),
  passengers,
  services: [
    ...addBaggageServicesToCreateOrderPayload(baggageSelectedServices),
  ],
  ...(offer && {
    payments: [
      {
        type: "balance",
        amount: `${
          +offer.total_amount +
          getTotalAmountForServices(offer, baggageSelectedServices)
        }`,
        currency: offer.total_currency,
      },
    ],
  }),
  type: "instant",
  metadata: { source: "duffel-checkout@v1.0" },
});

const addBaggageServicesToCreateOrderPayload = (
  baggageSelectedServices: CreateOrderPayloadServices
): CreateOrderPayloadServices => {
  if (!Array.isArray(baggageSelectedServices)) return [];
  return baggageSelectedServices.filter(({ quantity }) => quantity > 0);
};
