import { getTotalQuantity } from "@lib/getTotalQuantity";
import { withPlural } from "@lib/withPlural";
import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { AdditionalBaggageSelection } from "./AdditionalBaggageSelection";
import { Card } from "./Card";
import { Modal } from "./Modal";
import { Stamp } from "./Stamp";
import { AnimatedLoaderEllipsis } from "./AnimatedLoaderEllipsis";
import { getTotalAmountForServices } from "@lib/getTotalAmountForServices";
import { moneyStringFormatter } from "@lib/formatConvertedCurrency";

const defaultCopy = "Add any extra baggage you need for your trip";

export type SetBaggageSelectionStateFunction = (
  selectedServices: CreateOrderPayloadServices
) => void;

export interface BaggageSelectionProps {
  isLoading: boolean;
  offer?: Offer;
  passengers: CreateOrderPayload["passengers"];
  selectedServices: CreateOrderPayloadServices;
  setSelectedServices: SetBaggageSelectionStateFunction;
}

export const BaggageSelection: React.FC<BaggageSelectionProps> = ({
  isLoading,
  offer,
  passengers,
  selectedServices,
  setSelectedServices,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const containsBaggageService = offer?.available_services.some(
    (service) => service.type === "baggage" && service.maximum_quantity > 0
  );

  const totalQuantity = getTotalQuantity(selectedServices);
  const isBaggageAdded = totalQuantity > 0;

  const totalAmount = getTotalAmountForServices(offer!, selectedServices);
  const totalAmountFormatted = offer
    ? moneyStringFormatter(offer?.base_currency)(totalAmount)
    : "0";

  const copy =
    containsBaggageService && isBaggageAdded
      ? `${withPlural(
          totalQuantity,
          "bag",
          "bags"
        )} added for ${totalAmountFormatted}`
      : defaultCopy;

  return (
    <>
      <Card
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
        <Modal onClose={() => setIsOpen(false)}>
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
