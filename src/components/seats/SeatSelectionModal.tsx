import { getCurrencyForSeatMaps } from "@lib/getCurrencyForSeatMaps";
import { getPassengerBySegmentList } from "@lib/getPassengerBySegmentList";
import { getPassengerMapById } from "@lib/getPassengerMapById";
import { getPassengerName } from "@lib/getPassengerName";
import { getSegmentList } from "@lib/getSegmentList";
import { getServicePriceMapById } from "@lib/getServicePriceMapById";
import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadService,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { SeatMap } from "src/types/SeatMap";
import { Modal } from "../Modal";
import { SeatSelectionModalBody } from "./SeatSelectionModalBody";
import { SeatSelectionModalFooter } from "./SeatSelectionModalFooter";
import { SeatSelectionModalHeader } from "./SeatSelectionModalHeader";

export interface SeatSelectionModalProps {
  offer: Offer;
  passengers: CreateOrderPayload["passengers"];
  seatMaps: SeatMap[];
  selectedServices: CreateOrderPayloadServices;
  onClose: (selectedServices: CreateOrderPayloadServices) => void;
}

export const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  offer,
  passengers,
  seatMaps,
  selectedServices,
  onClose,
}) => {
  const [currentPermutationIndex, setCurrentPermutationIndex] =
    React.useState(0);

  const [selectedServicesState, setSelectedServicesState] =
    React.useState<CreateOrderPayloadServices>(selectedServices);
  const selectedServicesStateMap = selectedServicesState.reduce(
    (all, service) => ({ ...all, [service.id]: service }),
    {} as Record<string, CreateOrderPayloadService>
  );

  const segments = getSegmentList(offer);
  const passengerMapById = getPassengerMapById(passengers);
  const servicePricesMap = getServicePriceMapById(offer.available_services);
  const segmentAndPassengerPermutations = getPassengerBySegmentList(segments);
  const {
    passenger: { passenger_id: currentPassengerId },
    passengerIndex: currentPassengerIndex,
    segment: { id: currentSegmentId },
  } = segmentAndPassengerPermutations[currentPermutationIndex];

  const currentSegment = segments.find(({ id }) => id === currentSegmentId)!;
  const currentPassenger = passengerMapById[currentPassengerId];
  const currentSeatMap = seatMaps.find(
    (seatMap) => seatMap.segment_id === currentSegmentId
  )!;

  const currentPassengerName = getPassengerName(
    currentPassenger,
    offer.passengers[currentPassengerIndex],
    currentPassengerIndex + 1
  );

  const onSeatToggle = (seatServiceToToggle: CreateOrderPayloadService) => {
    let newSeatServices = new Array<CreateOrderPayloadService>();

    for (const selectedServiceFromState of selectedServicesState) {
      const hasClickedSeatToToggleOff =
        selectedServiceFromState.id === seatServiceToToggle.id &&
        seatServiceToToggle.quantity === 0;

      const isSelectedServiceFromStateForTheSameSegmentAndPassengerPermutation =
        selectedServiceFromState.serviceInformation?.segmentId ===
          currentSegmentId &&
        selectedServiceFromState.serviceInformation?.passengerId ===
          currentPassengerId;

      if (
        !hasClickedSeatToToggleOff &&
        !isSelectedServiceFromStateForTheSameSegmentAndPassengerPermutation
      ) {
        newSeatServices = [...newSeatServices, selectedServiceFromState];
      }
    }

    if (seatServiceToToggle.quantity > 0) {
      newSeatServices = [...newSeatServices, seatServiceToToggle];
    }

    setSelectedServicesState(newSeatServices);
  };

  const currencyToUse =
    getCurrencyForSeatMaps(seatMaps) ?? offer.total_currency;

  return (
    <Modal onClose={() => onClose(selectedServicesState)}>
      <SeatSelectionModalHeader
        segmentAndPassengerPermutationsCount={
          segmentAndPassengerPermutations.length
        }
        currentSegment={currentSegment}
        currentPassengerName={currentPassengerName}
        currentSegmentAndPassengerPermutationsIndex={currentPermutationIndex}
        setCurrentSegmentAndPassengerPermutationsIndex={
          setCurrentPermutationIndex
        }
      />
      <SeatSelectionModalBody
        selectedServicesMap={selectedServicesStateMap}
        seatMap={currentSeatMap}
        onSeatToggled={onSeatToggle}
        currentPassengerId={currentPassengerId}
        currentPassengerName={currentPassengerName}
        currentSegmentId={currentSegmentId}
      />
      <SeatSelectionModalFooter
        seatMaps={seatMaps}
        currency={currencyToUse}
        selectedServices={selectedServicesState}
        servicePrices={servicePricesMap}
        isFirstSegment={currentPermutationIndex === 0}
        isLastSegment={
          currentPermutationIndex + 1 === segmentAndPassengerPermutations.length
        }
        onNextSegmentButtonClicked={() => {
          setCurrentPermutationIndex(currentPermutationIndex + 1);
        }}
        onPreviousSegmentButtonClicked={() => {
          setCurrentPermutationIndex(currentPermutationIndex - 1);
        }}
        onClose={() => onClose(selectedServicesState)}
      />
    </Modal>
  );
};
