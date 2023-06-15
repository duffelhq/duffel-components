import { ModalBody } from "@components/shared/Modal";
import { getPassengerName } from "@lib/getPassengerName";
import React from "react";
import {
  CreateOrderPayloadPassenger,
  CreateOrderPayloadServices,
} from "../../../types/CreateOrderPayload";
import {
  Offer,
  OfferAvailableServiceBaggage,
  OfferSliceSegment,
} from "../../../types/Offer";
import { BaggageSelectionModalBodyPassenger } from "./BaggageSelectionModalBodyPassenger";

export interface BaggageSelectionModalBodyProps {
  offer: Offer;
  segment: OfferSliceSegment;
  passengersById: Record<
    CreateOrderPayloadPassenger["id"],
    CreateOrderPayloadPassenger
  >;
  selectedServices: CreateOrderPayloadServices;
  setSelectedServices: (selectedServices: CreateOrderPayloadServices) => void;
}

export const BaggageSelectionModalBody: React.FC<
  BaggageSelectionModalBodyProps
> = ({
  offer,
  segment,
  passengersById,
  selectedServices,
  setSelectedServices,
}) => (
  <ModalBody>
    {segment.passengers.map(({ passenger_id, baggages }, index) => (
      <BaggageSelectionModalBodyPassenger
        key={passenger_id}
        segmentId={segment.id}
        passengerId={passenger_id}
        passengerName={getPassengerName(
          passengersById[passenger_id],
          offer.passengers.find(({ id }) => id === passenger_id),
          index + 1
        )}
        includedBaggage={baggages}
        passengerServicesForSegment={
          offer.available_services.filter(
            ({ type, passenger_ids, segment_ids }) =>
              type === "baggage" &&
              passenger_ids.includes(passenger_id) &&
              segment_ids.includes(segment.id)
          ) as OfferAvailableServiceBaggage[]
        }
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
      />
    ))}
  </ModalBody>
);
