import React, { useState } from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer, OfferSliceSegment } from "src/types/Offer";
import { BaggageSelectionModalBody } from "./BaggageSelectionModalBody";
import { BaggageSelectionModalFooter } from "./BaggageSelectionModalFooter";
import { BaggageSelectionModalHeader } from "./BaggageSelectionModalHeader";
import { Modal } from "./Modal";
import { getPassengerMapById } from "@lib/getPassengerMapById";

export interface BaggageSelectionModalProps {
  offer: Offer;
  passengers: CreateOrderPayload["passengers"];
  selectedServices: CreateOrderPayloadServices;
  onClose: (selectedServices: CreateOrderPayloadServices) => void;
}

export const BaggageSelectionModal: React.FC<BaggageSelectionModalProps> = ({
  offer,
  passengers,
  onClose,
  selectedServices,
}) => {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

  const segments = offer.slices.reduce(
    (accumulator, slice) => [...accumulator, ...slice.segments],
    new Array<OfferSliceSegment>()
  );

  const [selectedServicesState, setSelectedServicesState] =
    React.useState(selectedServices);

  return (
    <Modal onClose={() => onClose(selectedServicesState)}>
      <BaggageSelectionModalHeader
        segmentCount={segments.length}
        currentSegment={segments[currentSegmentIndex]}
        currentSegmentIndex={currentSegmentIndex}
        setCurrentSegmentIndex={(index) => setCurrentSegmentIndex(index)}
      />
      <BaggageSelectionModalBody
        selectedServices={selectedServicesState}
        offer={offer}
        passengersById={getPassengerMapById(passengers)}
        segment={segments[currentSegmentIndex]}
        setSelectedServices={setSelectedServicesState}
      />
      <BaggageSelectionModalFooter offer={offer} />
    </Modal>
  );
};
