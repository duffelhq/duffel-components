import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { AdditionalBaggageSelection } from "./AdditionalBaggageSelection";
import { Card } from "./Card";
import { Modal } from "./Modal";

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

  return (
    <>
      <Card
        title="Extra baggage"
        icon="checked_bag"
        statusTag="not-added"
        onClick={() => setIsOpen(true)}
      >
        {"5 seats selected for £120"}
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
