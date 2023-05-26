import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { ServicePriceMapById } from "@lib/getServicePriceMapById";
import { getTotalAmountForServicesWithPriceMap } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { withPlural } from "@lib/withPlural";
import React from "react";
import { CreateOrderPayloadServices } from "../../types/CreateOrderPayload";
import { Button } from "../Button";
import { SeatMap } from "src/types/SeatMap";

export interface SeatSelectionModalFooterProps {
  currency: string;
  selectedServices: CreateOrderPayloadServices;
  servicePrices: ServicePriceMapById;

  isFirstSegment: boolean;
  isLastSegment: boolean;

  onNextSegmentButtonClicked: () => void;
  onPreviousSegmentButtonClicked: () => void;
  onClose: () => void;
  seatMaps: SeatMap[];
}

export const SeatSelectionModalFooter: React.FC<
  SeatSelectionModalFooterProps
> = ({
  selectedServices,
  servicePrices,
  currency,
  isFirstSegment,
  isLastSegment,
  onNextSegmentButtonClicked,
  onPreviousSegmentButtonClicked,
  onClose,
  seatMaps,
}) => {
  const totalQuantity = getTotalQuantity(selectedServices);
  const totalAmount = getTotalAmountForServicesWithPriceMap(
    servicePrices,
    selectedServices,
    seatMaps
  );
  const totalAmountLabel = moneyStringFormatter(currency)(totalAmount);

  return (
    <div style={{ padding: "16px 24px 24px" }}>
      <div className="flex--space-between">
        <div>Price for {withPlural(totalQuantity, "seat", "seats")}</div>
        <div className="h3--semibold">+ {totalAmountLabel}</div>
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
          disabled={isFirstSegment}
          variant="outlined"
          onClick={() => onPreviousSegmentButtonClicked()}
        >
          Back
        </Button>

        <Button
          data-testid="confirm-selection"
          onClick={() =>
            isLastSegment ? onClose() : onNextSegmentButtonClicked()
          }
        >
          {isLastSegment ? "Confirm" : "Next"}
        </Button>
      </div>
    </div>
  );
};
