import React from "react";
import { CreateOrderPayloadServices } from "../../../types/CreateOrderPayload";
import {
  OfferAvailableServiceBaggage,
  OfferSliceSegmentPassengerBaggage,
} from "../../../types/Offer";
import { BaggageSelectionController } from "./BaggageSelectionController";
import { IncludedBaggageBanner } from "./IncludedBaggageBanner";

export interface BaggageSelectionModalBodyPassengerProps {
  segmentId: string;
  passengerId: string;
  passengerName: string;
  includedBaggage: OfferSliceSegmentPassengerBaggage[];
  passengerServicesForSegment: OfferAvailableServiceBaggage[];
  selectedServices: CreateOrderPayloadServices;
  setSelectedServices: (selectedServices: CreateOrderPayloadServices) => void;
}

export const BaggageSelectionModalBodyPassenger: React.FC<
  BaggageSelectionModalBodyPassengerProps
> = ({
  segmentId,
  passengerId,
  passengerName,
  includedBaggage,
  passengerServicesForSegment,
  selectedServices,
  setSelectedServices,
}) => {
  const hasIncludedBaggage = includedBaggage.reduce(
    (sum, bag) => sum + bag.quantity,
    0
  );

  return (
    <div style={{ marginTop: "24px" }}>
      <h3 style={{ margin: 0 }} className="p1--semibold">
        {passengerName}
      </h3>
      {hasIncludedBaggage && (
        <IncludedBaggageBanner includedBaggage={includedBaggage} />
      )}

      <div style={{ display: "flex", rowGap: "8px", flexDirection: "column" }}>
        {passengerServicesForSegment.map((availableService) => (
          <BaggageSelectionController
            key={availableService.id}
            passengerId={passengerId}
            segmentId={segmentId}
            availableService={availableService}
            selectedServices={selectedServices}
            quantity={
              selectedServices.find(({ id }) => id == availableService.id)
                ?.quantity || 0
            }
            onQuantityChanged={(newQuantity) =>
              onBaggageQuantityChanged(
                newQuantity,
                segmentId,
                passengerId,
                passengerName,
                availableService,
                selectedServices,
                setSelectedServices
              )
            }
          />
        ))}
      </div>

      {passengerServicesForSegment.length === 0 && (
        <p style={{ color: `var(--GREY-700)`, margin: 0 }}>
          Extra baggage is not available for this passenger on this flight
        </p>
      )}
    </div>
  );
};

const onBaggageQuantityChanged = (
  newQuantity: number,
  segmentId: string,
  passengerId: string,
  passengerName: string,
  availableService: OfferAvailableServiceBaggage,
  selectedServices: CreateOrderPayloadServices,
  setSelectedServices: (selectedServices: CreateOrderPayloadServices) => void
) => {
  // check if the service which had its quantity changed is already in the list
  const changedServiceIndex = selectedServices.findIndex(
    ({ id }) => availableService.id === id
  );

  // create a copy of the existing list of selected services
  const newSelectedServices = Array.from(selectedServices);

  // if the service is not in the list, add it
  if (changedServiceIndex < 0) {
    newSelectedServices.push({
      id: availableService.id,
      quantity: newQuantity,
      serviceInformation: {
        segmentId,
        passengerId,
        passengerName,
        total_amount: availableService.total_amount,
        total_currency: availableService.total_currency,
        ...availableService.metadata,
      },
    });
  } else {
    // if the service is in the list, update its quantity
    newSelectedServices[changedServiceIndex].quantity = newQuantity;
  }

  // remove any services with a quantity of 0
  // and update the list of selected services
  setSelectedServices(
    newSelectedServices.filter(({ quantity }) => quantity !== 0)
  );
};
