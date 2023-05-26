import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { ServicePriceMapById } from "@lib/getServicePriceMapById";
import { getTotalAmountForServicesWithPriceMap } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { withPlural } from "@lib/withPlural";
import React from "react";
import { CreateOrderPayloadServices } from "../../types/CreateOrderPayload";
import { Button } from "../Button";

export interface BaggageSelectionModalFooterProps {
  currency: string;
  selectedServices: CreateOrderPayloadServices;
  servicePrices: ServicePriceMapById;

  isFirstSegment: boolean;
  isLastSegment: boolean;

  onNextSegmentButtonClicked: () => void;
  onPreviousSegmentButtonClicked: () => void;
  onClose: () => void;
}

export const BaggageSelectionModalFooter: React.FC<
  BaggageSelectionModalFooterProps
> = ({
  selectedServices,
  servicePrices,
  currency,
  isFirstSegment,
  isLastSegment,
  onNextSegmentButtonClicked,
  onPreviousSegmentButtonClicked,
  onClose,
}) => {
  const totalQuantity = getTotalQuantity(selectedServices);
  const totalAmount = getTotalAmountForServicesWithPriceMap(
    servicePrices,
    selectedServices
  );
  const totalAmountLabel = moneyStringFormatter(currency)(totalAmount);

  return (
    <div style={{ padding: "16px 24px 24px" }}>
      <div className="flex--space-between">
        <div>
          Price for {withPlural(totalQuantity, "extra bag", "extra bags")}
        </div>
        <div className="h3--semibold" data-testid="baggage-total-amount-label">
          + {totalAmountLabel}
        </div>
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "grid",
          columnGap: "12px",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <Button
          text="Back"
          disabled={isFirstSegment}
          intent="MUTED"
          onClick={() => onPreviousSegmentButtonClicked()}
        />
        <Button
          data-testid="confirm-selection"
          text={isLastSegment ? "Confirm" : "Next"}
          intent="PRIMARY"
          onClick={() =>
            isLastSegment ? onClose() : onNextSegmentButtonClicked()
          }
        />
      </div>
    </div>
  );
};
