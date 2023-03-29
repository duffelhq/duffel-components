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
import { getTotalAmountForServices } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";

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

  const totalQuantity = getTotalQuantity(selectedServices);
  const isBaggageAdded = totalQuantity > 0;

  const totalAmount = getTotalAmountForServices(offer, selectedServices);
  const toMoney = moneyStringFormatter(offer.total_currency);
  const totalAmountFormatted = toMoney(totalAmount);

  return (
    <>
      <Card
        title="Extra baggage"
        icon="checked_bag"
        statusTag={isBaggageAdded ? "added" : "not-added"}
        onClick={() => setIsOpen(true)}
      >
        {!isBaggageAdded && "No extra bags added"}
        {isBaggageAdded &&
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
