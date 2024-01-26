import { ModalBody } from "@components/shared/Modal";
import { getPassengerName } from "@lib/getPassengerName";
import React from "react";

import {
  CreateOrderPassenger,
  CreateOrderService,
  Offer,
  OfferAvailableServiceBaggage,
  OfferSliceSegment,
} from "@duffel/api/types";
import { WithServiceInformation } from "src/types";
import { BaggageSelectionModalBodyPassenger } from "./BaggageSelectionModalBodyPassenger";

export interface BaggageSelectionModalBodyProps {
  offer: Offer;
  segment: OfferSliceSegment;
  passengersById: Record<CreateOrderPassenger["id"], CreateOrderPassenger>;
  selectedServices: WithServiceInformation<CreateOrderService>[];
  setSelectedServices: (
    selectedServices: WithServiceInformation<CreateOrderService>[],
  ) => void;
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
          index + 1,
        )}
        includedBaggage={baggages}
        passengerServicesForSegment={
          offer.available_services.filter(
            ({ type, passenger_ids, segment_ids }) =>
              type === "baggage" &&
              passenger_ids.includes(passenger_id) &&
              segment_ids.includes(segment.id),
          ) as OfferAvailableServiceBaggage[]
        }
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
      />
    ))}
  </ModalBody>
);
