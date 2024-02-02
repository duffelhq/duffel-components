import { Modal } from "@components/shared/Modal";
import { CreateOrder, CreateOrderService, Offer } from "@duffel/api/types";
import { getCurrencyForServices } from "@lib/getCurrencyForServices";
import { getPassengerMapById } from "@lib/getPassengerMapById";
import { getSegmentList } from "@lib/getSegmentList";
import { getServicePriceMapById } from "@lib/getServicePriceMapById";
import { hasService } from "@lib/hasService";
import React, { useState } from "react";
import { WithBaggageServiceInformation } from "src/types";
import { BaggageSelectionModalBody } from "./BaggageSelectionModalBody";
import { BaggageSelectionModalFooter } from "./BaggageSelectionModalFooter";
import { BaggageSelectionModalHeader } from "./BaggageSelectionModalHeader";

export interface BaggageSelectionModalProps {
  isOpen: boolean;
  offer?: Offer;
  passengers: CreateOrder["passengers"];
  selectedServices: WithBaggageServiceInformation<CreateOrderService>[];
  onClose: (
    selectedServices: WithBaggageServiceInformation<CreateOrderService>[],
  ) => void;
}

export const BaggageSelectionModal: React.FC<BaggageSelectionModalProps> = ({
  isOpen,
  offer,
  passengers,
  onClose,
  selectedServices,
}) => {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

  const [selectedServicesState, setSelectedServicesState] =
    React.useState(selectedServices);

  if (!offer) return null;

  const segments = getSegmentList(offer);
  const currentSegment = segments[currentSegmentIndex];

  const passengerMapById = getPassengerMapById(passengers);
  const servicePricesMap = getServicePriceMapById(offer.available_services);

  let currencyToUse = offer.base_currency;
  if (hasService(offer, "baggage")) {
    currencyToUse = getCurrencyForServices(offer, "baggage");
  }

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(selectedServices)}>
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
        currency={currencyToUse}
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
