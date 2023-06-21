import { getBaggageServiceDescription } from "@lib/getBaggageServiceDescription";
import { hasServiceOfSameMetadataTypeAlreadyBeenSelected } from "@lib/hasServiceOfSameMetadataTypeAlreadyBeenSelected";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import React from "react";
import { CreateOrderPayloadServices } from "../../../types/CreateOrderPayload";
import { OfferAvailableServiceBaggage } from "../../../types/Offer";
import { Counter } from "../Counter";

interface BaggageSelectionControllerProps {
  segmentId: string;
  passengerId: string;
  availableService: OfferAvailableServiceBaggage;
  selectedServices: CreateOrderPayloadServices;
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

export const BaggageSelectionController: React.FC<
  BaggageSelectionControllerProps
> = ({
  segmentId,
  passengerId,
  availableService,
  quantity,
  onQuantityChanged,
  selectedServices,
}) => {
  const serviceName =
    availableService.metadata.type === "carry_on" ? "Cabin bag" : "Checked bag";

  const servicePrice = moneyStringFormatter(availableService.total_currency)(
    +availableService.total_amount
  );
  const serviceDescription = getBaggageServiceDescription(
    availableService.metadata
  );

  const shouldDisableController =
    hasServiceOfSameMetadataTypeAlreadyBeenSelected(
      selectedServices,
      segmentId,
      passengerId,
      availableService
    );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <p style={{ margin: 0 }} className="p2--regular">
          {serviceName}
          <span
            style={{
              marginInline: "4px",
              color: "var(--GREY-400)",
            }}
          >
            •
          </span>
          <span
            className="p2--semibold"
            data-testid={`price-label--${availableService.id}--${passengerId}`}
          >
            {servicePrice}
          </span>
        </p>
        <p
          style={{ margin: 0, color: "var(--GREY-600)" }}
          className="p3--regular"
        >
          {serviceDescription}
        </p>
      </div>
      <Counter
        id={`counter--${availableService.id}--${passengerId}`}
        min={0}
        value={quantity}
        onChange={onQuantityChanged}
        max={shouldDisableController ? 0 : availableService.maximum_quantity}
      />
    </div>
  );
};
