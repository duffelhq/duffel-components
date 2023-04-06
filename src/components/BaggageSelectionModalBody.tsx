import React from "react";
import {
  CreateOrderPayloadPassenger,
  CreateOrderPayloadServices,
} from "../types/CreateOrderPayload";
import {
  Offer,
  OfferAvailableServiceBaggage,
  OfferSliceSegment,
} from "../types/Offer";
import { BaggageSelectionModalBodyPassenger } from "./BaggageSelectionModalBodyPassenger";
import { getPassengerName } from "@lib/getPassengerName";

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
  <div
    style={{
      height: "100%",
      padding: "0px 24px 24px",
      overflow: "scroll",
      borderBlock: `solid 1px var(--GREY-200)`,
    }}
  >
    {segment.passengers.map(({ passenger_id, baggages }, index) => (
      <BaggageSelectionModalBodyPassenger
        key={passenger_id}
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
  </div>
);
