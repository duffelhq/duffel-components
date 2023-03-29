import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { AdditionalBaggageSelection } from "./AdditionalBaggageSelection";
import { Card } from "./Card";
import { Modal } from "./Modal";
import { moneyStringFormatter } from "../lib/formatConvertedCurrency";
import { withPlural } from "@lib/withPlural";

export type SetBaggageSelectionStateFunction = (
  selectedServices: CreateOrderPayloadServices
) => void;

export interface BaggageSelectionProps {
  offer: Offer;
  passengers: CreateOrderPayload["passengers"];
  selectedServices: CreateOrderPayloadServices;
  setSelectedServices: SetBaggageSelectionStateFunction;
}

export const BaggageSelection: React.FC<BaggageSelectionProps> = ({
  offer,
  passengers,
  selectedServices,
  setSelectedServices,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const totalQuantity = selectedServices.reduce(
    (total, { quantity }) => total + quantity,
    0
  );
  const includesServices = totalQuantity > 0;

  console.log(offer.available_services);

  const totalAmount = selectedServices.reduce(
    (total, { quantity, id }) =>
      total +
      quantity *
        +(
          offer.available_services.find((offer) => offer.id === id)!
            .total_amount || 0
        ),
    0
  );

  const totalAmountFormatted = moneyStringFormatter(offer.total_currency)(
    totalAmount
  );

  return (
    <>
      <Card
        title="Extra baggage"
        icon="checked_bag"
        statusTag={includesServices ? "added" : "not-added"}
        onClick={() => setIsOpen(true)}
      >
        {!includesServices && "No extra bags added"}
        {includesServices &&
          `${withPlural(
            totalQuantity,
            "bag",
            "bags"
          )} added for ${totalAmountFormatted}`}
      </Card>
      {isOpen && (
        <Modal>
          <AdditionalBaggageSelection
            offer={offer}
            passengers={passengers}
            onSubmit={(data) => {
              setIsOpen(false);
              setSelectedServices(data);
            }}
            initialBaggageSelection={selectedServices as any}
          />
        </Modal>
      )}
    </>
  );
};
