import { moneyStringFormatter } from "@lib/formatConvertedCurrency";
import { getBaggageServiceDescription } from "@lib/getBaggageServiceDescription";
import React from "react";
import { OfferAvailableServiceBaggage } from "../../types/Offer";
import { DuffelAncillariesBagsLabels } from "../../types/DuffelAncillariesProps";
import { Counter } from "../Counter";

interface BaggageSelectionControllerProps {
  passengerId: string;
  availableService: OfferAvailableServiceBaggage;
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
  labels?: DuffelAncillariesBagsLabels;
}

const getServicePrice = (
  availableService: OfferAvailableServiceBaggage,
  labelFunc?: DuffelAncillariesBagsLabels["price"]
) => {
  if (labelFunc) {
    return labelFunc(availableService);
  }
  return moneyStringFormatter(availableService.total_currency)(
    +availableService.total_amount
  );
};

export const BaggageSelectionController: React.FC<
  BaggageSelectionControllerProps
> = ({
  passengerId,
  availableService,
  quantity,
  onQuantityChanged,
  labels,
}) => {
  const serviceName =
    availableService.metadata.type === "carry_on" ? "Cabin bag" : "Checked bag";

  const servicePrice = getServicePrice(availableService, labels?.price);
  const serviceDescription = getBaggageServiceDescription(
    availableService.metadata
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
          <span className="p2--semibold">{servicePrice}</span>
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
        max={availableService.maximum_quantity}
        value={quantity}
        onChange={onQuantityChanged}
      />
    </div>
  );
};
