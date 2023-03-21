import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { AdditionalBaggageSelection } from "./AdditionalBaggageSelection";
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
  // const passengersSliceIndex = offer.slices.map(
  //   ({segments}) =>  segments.map(({passengers})=>
  //   passengers.map((passenger) => passenger.)
  //   )
  //   []
  // );

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div>
        <pre>{JSON.stringify(passengers, null, 2)}</pre>
        <button onClick={() => setIsOpen(!isOpen)}>Change</button>
      </div>
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
