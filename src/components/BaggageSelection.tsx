import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { AdditionalBaggageSelection } from "./AdditionalBaggageSelection";
import { Card, CardProps } from "./Card";
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

  const containsBaggageService = offer.available_services.some(
    (service) => service.type === "baggage" && service.maximum_quantity > 0
  );

  const totalQuantity = getTotalQuantity(selectedServices);
  const isBaggageAdded = totalQuantity > 0;

  const totalAmount = getTotalAmountForServices(offer, selectedServices);
  const toMoney = moneyStringFormatter(offer.total_currency);
  const totalAmountFormatted = toMoney(totalAmount);

  let statusTag: CardProps["statusTag"] = "not-added";
  if (!containsBaggageService) {
    statusTag = "not-available";
  } else if (isBaggageAdded) {
    statusTag = "added";
  }

  return (
    <>
      <Card
        title="Extra baggage"
        icon="checked_bag"
        statusTag={statusTag}
        onClick={() => setIsOpen(true)}
      >
        {!containsBaggageService &&
          "Extra baggage is not available for this journey"}
        {containsBaggageService && !isBaggageAdded && "No extra bags added"}
        {containsBaggageService &&
          isBaggageAdded &&
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
