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
import {
  DuffelAncillariesCommonProps,
  WithBaggageServiceInformation,
} from "src/types";
import { BaggageSelectionModalBodyPassenger } from "./BaggageSelectionModalBodyPassenger";

export interface BaggageSelectionModalBodyProps
  extends Pick<DuffelAncillariesCommonProps, "localisationStrings"> {
  offer: Offer;
  segment: OfferSliceSegment;
  passengersById: Record<CreateOrderPassenger["id"], CreateOrderPassenger>;
  selectedServices: WithBaggageServiceInformation<CreateOrderService>[];
  setSelectedServices: (
    selectedServices: WithBaggageServiceInformation<CreateOrderService>[],
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
  localisationStrings,
}) => (
  <ModalBody>
    {segment.passengers.map(({ passenger_id, baggages }, index) => (
      <BaggageSelectionModalBodyPassenger
        localisationStrings={localisationStrings}
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
