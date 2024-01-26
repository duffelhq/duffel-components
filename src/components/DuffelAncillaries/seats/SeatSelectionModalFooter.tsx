import { Button } from "@components/shared/Button";
import { ServicePriceMapById } from "@lib/getServicePriceMapById";
import { getTotalAmountForServicesWithPriceMap } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { withPlural } from "@lib/withPlural";
import React from "react";
import { CreateOrder, SeatMap } from "@duffel/api/types";

export interface SeatSelectionModalFooterProps {
  currency: string;
  selectedServices: CreateOrder["services"];
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
    seatMaps,
  );
  const totalAmountLabel = moneyStringFormatter(currency)(totalAmount);
  const isOneWay = isFirstSegment && isLastSegment;

  return (
    <div style={{ padding: "16px 24px 24px" }}>
      <div className="flex--space-between">
        <div>Price for {withPlural(totalQuantity, "seat", "seats")}</div>
        <div className="h3--semibold">+ {totalAmountLabel}</div>
      </div>

      <div
        style={
          isOneWay
            ? { marginTop: "16px", display: "grid" }
            : {
                marginTop: "16px",
                display: "grid",
                columnGap: "12px",
                gridTemplateColumns: "repeat(2, 1fr)",
              }
        }
      >
        {!isOneWay && (
          <Button
            size={48}
            disabled={isFirstSegment}
            variant="outlined"
            onClick={() => onPreviousSegmentButtonClicked()}
          >
            Back
          </Button>
        )}

        <Button
          size={48}
          data-testid="confirm-selection-for-seats"
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
