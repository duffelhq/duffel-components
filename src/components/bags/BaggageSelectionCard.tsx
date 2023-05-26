import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { getTotalAmountForServices } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { hasService } from "@lib/hasService";
import { withPlural } from "@lib/withPlural";
import { getCurrencyForServices } from "@lib/getCurrencyForServices";
import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { AnimatedLoaderEllipsis } from "../AnimatedLoaderEllipsis";
import { BaggageSelectionModal } from "./BaggageSelectionModal";
import { Card } from "../Card";
import { Stamp } from "../Stamp";

export interface BaggageSelectionCardProps {
  isLoading: boolean;
  offer?: Offer;
  passengers: CreateOrderPayload["passengers"];
  selectedServices: CreateOrderPayloadServices;
  setSelectedServices: (selectedServices: CreateOrderPayloadServices) => void;
}

export const BaggageSelectionCard: React.FC<BaggageSelectionCardProps> = ({
  isLoading,
  offer,
  passengers,
  selectedServices,
  setSelectedServices,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const containsBaggageService = hasService(offer, "baggage");
  const totalQuantity = getTotalQuantity(selectedServices);
  const isBaggageAdded = totalQuantity > 0;

  const totalAmount = getTotalAmountForServices(offer!, selectedServices);

  let currencyToUse = offer?.base_currency || "";
  if (containsBaggageService) {
    currencyToUse = getCurrencyForServices(offer!, "baggage");
  }

  const totalAmountFormatted = offer
    ? moneyStringFormatter(currencyToUse)(totalAmount)
    : "0";

  const copy =
    containsBaggageService && isBaggageAdded
      ? `${withPlural(
          totalQuantity,
          "bag",
          "bags"
        )} added for ${totalAmountFormatted}`
      : "Add any extra baggage you need for your trip";

  return (
    <>
      <Card
        buttonTitle="Select extra baggage"
        title="Extra baggage"
        copy={copy}
        icon="cabin_bag"
        onClick={containsBaggageService ? () => setIsOpen(true) : null}
        isLoading={isLoading}
        disabled={!isLoading && !containsBaggageService}
        isSelected={isBaggageAdded}
      >
        {isLoading && (
          <Stamp color="var(--GREY-900)" backgroundColor="var(--GREY-100)">
            Loading
            <AnimatedLoaderEllipsis />
          </Stamp>
        )}
        {!isLoading && !containsBaggageService && (
          <Stamp color="var(--GREY-700)" backgroundColor="var(--GREY-200)">
            Not available
          </Stamp>
        )}
      </Card>

      {isOpen && offer && (
        <BaggageSelectionModal
          offer={offer}
          passengers={passengers}
          onClose={(newSelectedServices) => {
            setSelectedServices(newSelectedServices);
            setIsOpen(false);
          }}
          selectedServices={selectedServices}
        />
      )}
    </>
  );
};
