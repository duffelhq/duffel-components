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

export interface BaggageSelectionModalProps {
  offer: Offer;
  passengers: CreateOrderPayload["passengers"];
  selectedServices: CreateOrderPayloadServices;
  onClose: () => void;
  onSubmit: (selectedServices: CreateOrderPayloadServices) => void;
}

export const BaggageSelectionModal: React.FC<BaggageSelectionModalProps> = ({
  offer,
  onClose,
}) => {
  const segments = offer.slices.reduce(
    (accumulator, slice) => [...slice.segments, ...accumulator],
    new Array<OfferSliceSegment>()
  );

  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

  return (
    <Modal onClose={onClose}>
      <BaggageSelectionModalHeader
        segmentCount={segments.length}
        currentSegment={segments[currentSegmentIndex]}
        currentSegmentIndex={currentSegmentIndex}
        setCurrentSegmentIndex={(index) => setCurrentSegmentIndex(index)}
      />
      <BaggageSelectionModalBody offer={offer} />
      <BaggageSelectionModalFooter offer={offer} />
    </Modal>
  );
};
