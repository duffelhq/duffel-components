import { AnimatedLoaderEllipsis } from "@components/shared/AnimatedLoaderEllipsis";
import { Stamp } from "@components/shared/Stamp";
import { getCurrencyForServices } from "@lib/getCurrencyForServices";
import { getTotalAmountForServices } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { hasService } from "@lib/hasService";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { withPlural } from "@lib/withPlural";
import React from "react";
import { Card } from "../Card";
import { BaggageSelectionModal } from "./BaggageSelectionModal";
import { CreateOrder, CreateOrderService, Offer } from "@duffel/api/types";
import { WithServiceInformation } from "src/types";

export interface BaggageSelectionCardProps {
  isLoading: boolean;
  offer?: Offer;
  passengers: CreateOrder["passengers"];
  selectedServices: WithServiceInformation<CreateOrderService>[];
  setSelectedServices: (
    selectedServices: WithServiceInformation<CreateOrderService>[]
  ) => void;
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

      <BaggageSelectionModal
        isOpen={Boolean(isOpen && offer)}
        offer={offer}
        passengers={passengers}
        onClose={(newSelectedServices) => {
          // We need to do a deep copy here because otherwise the modal changing the quantity
          // will affect the selected services regardless of whether it's saved or not
          const newSelectedServicesDeepCopy = JSON.parse(
            JSON.stringify(newSelectedServices)
          );
          setSelectedServices(newSelectedServicesDeepCopy);
          setIsOpen(false);
        }}
        selectedServices={selectedServices}
      />
    </>
  );
};
