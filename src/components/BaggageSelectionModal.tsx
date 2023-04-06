import { getPassengerMapById } from "@lib/getPassengerMapById";
import { getSegmentList } from "@lib/getSegmentList";
import { getServicePriceMapById } from "@lib/getServicePriceMapById";
import React, { useState } from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { BaggageSelectionModalBody } from "./BaggageSelectionModalBody";
import { BaggageSelectionModalFooter } from "./BaggageSelectionModalFooter";
import { BaggageSelectionModalHeader } from "./BaggageSelectionModalHeader";
import { Modal } from "./Modal";

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

  const [selectedServicesState, setSelectedServicesState] =
    React.useState(selectedServices);

  const segments = getSegmentList(offer);
  const currentSegment = segments[currentSegmentIndex];

  const passengerMapById = getPassengerMapById(passengers);
  const servicePricesMap = getServicePriceMapById(offer.available_services);

  return (
    <Modal onClose={() => onClose(selectedServicesState)}>
      <BaggageSelectionModalHeader
        segmentCount={segments.length}
        currentSegment={currentSegment}
        currentSegmentIndex={currentSegmentIndex}
        setCurrentSegmentIndex={(index) => setCurrentSegmentIndex(index)}
      />
      <BaggageSelectionModalBody
        offer={offer}
        selectedServices={selectedServicesState}
        passengersById={passengerMapById}
        segment={currentSegment}
        setSelectedServices={setSelectedServicesState}
      />
      <BaggageSelectionModalFooter
        currency={offer.total_currency}
        selectedServices={selectedServicesState}
        servicePrices={servicePricesMap}
        isFirstSegment={currentSegmentIndex === 0}
        isLastSegment={currentSegmentIndex + 1 === segments.length}
        onNextSegmentButtonClicked={() =>
          setCurrentSegmentIndex(currentSegmentIndex + 1)
        }
        onPreviousSegmentButtonClicked={() =>
          setCurrentSegmentIndex(currentSegmentIndex - 1)
        }
        onClose={() => onClose(selectedServicesState)}
      />
    </Modal>
  );
};
