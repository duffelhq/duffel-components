import { Modal } from "@components/shared/Modal";
import {
  CreateOrder,
  CreateOrderService,
  Offer,
  SeatMap,
} from "@duffel/api/types";
import { getCurrencyForSeatMaps } from "@lib/getCurrencyForSeatMaps";
import { getPassengerBySegmentList } from "@lib/getPassengerBySegmentList";
import { getPassengerMapById } from "@lib/getPassengerMapById";
import { getPassengerName } from "@lib/getPassengerName";
import { getSegmentList } from "@lib/getSegmentList";
import { getServicePriceMapById } from "@lib/getServicePriceMapById";
import React from "react";
import { WithSeatServiceInformation } from "src/types";
import { SeatSelectionModalBody } from "./SeatSelectionModalBody";
import { SeatSelectionModalFooter } from "./SeatSelectionModalFooter";
import { SeatSelectionModalHeader } from "./SeatSelectionModalHeader";

type CreateOrderServiceWithInformation =
  WithSeatServiceInformation<CreateOrderService>;

export interface SeatSelectionModalProps {
  isOpen: boolean;
  offer?: Offer;
  seatMaps?: SeatMap[];
  selectedServices: CreateOrderServiceWithInformation[];
  passengers: CreateOrder["passengers"];
  onClose: (selectedServices: CreateOrderServiceWithInformation[]) => void;
}

export const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  isOpen,
  offer,
  passengers,
  seatMaps,
  selectedServices,
  onClose,
}) => {
  const [currentPermutationIndex, setCurrentPermutationIndex] =
    React.useState(0);

  const [selectedServicesState, setSelectedServicesState] =
    React.useState<CreateOrderServiceWithInformation[]>(selectedServices);
  const selectedServicesStateMap = selectedServicesState.reduce(
    (all, service) => ({ ...all, [service.id]: service }),
    {} as Record<string, CreateOrderServiceWithInformation>,
  );

  if (!offer || !seatMaps) return null;

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
    (seatMap) => seatMap.segment_id === currentSegmentId,
  )!;

  const currentPassengerName = getPassengerName(
    currentPassenger,
    offer.passengers[currentPassengerIndex],
    currentPassengerIndex + 1,
  );

  const onSeatToggle = (
    seatServiceToToggle: CreateOrderServiceWithInformation,
  ) => {
    let newSeatServices = new Array<CreateOrderServiceWithInformation>();

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
    <Modal isOpen={isOpen} onClose={() => onClose(selectedServices)}>
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
