import { getPassengerMapById } from "@lib/getPassengerMapById";
import { getSegmentList } from "@lib/getSegmentList";
import { getServicePriceMapById } from "@lib/getServicePriceMapById";
import React, { useState } from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { Modal } from "./Modal";

export interface SeatSelectionModalProps {
  offer: Offer;
  passengers: CreateOrderPayload["passengers"];
  selectedServices: CreateOrderPayloadServices;
  onClose: (selectedServices: CreateOrderPayloadServices) => void;
}

export const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  offer,
  passengers,
  onClose,
  selectedServices,
}) => {
  const [currentSegmentIndex] = useState(0);

  const [selectedServicesState] = React.useState(selectedServices);

  const segments = getSegmentList(offer);
  const currentSegment = segments[currentSegmentIndex];

  const passengerMapById = getPassengerMapById(passengers);
  const servicePricesMap = getServicePriceMapById(offer.available_services);

  return (
    <Modal onClose={() => onClose(selectedServicesState)}>
      <h2>modal content coming soon</h2>
      <pre>
        {JSON.stringify(
          { currentSegment, passengerMapById, servicePricesMap },
          null,
          2
        )}
      </pre>
    </Modal>
  );
};
