import { Button } from "@components/shared/Button";
import { CreateOrder } from "@duffel/api/types";
import { ServicePriceMapById } from "@lib/getServicePriceMapById";
import { getTotalAmountForServicesWithPriceMap } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { withPlural } from "@lib/withPlural";
import React from "react";

export interface BaggageSelectionModalFooterProps {
  currency: string;
  selectedServices: CreateOrder["services"];
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
  const isOneWay = isFirstSegment && isFirstSegment;

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
            variant="outlined"
            disabled={isFirstSegment}
            onClick={() => onPreviousSegmentButtonClicked()}
          >
            Back
          </Button>
        )}
        <Button
          size={48}
          data-testid="confirm-selection-for-baggage"
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
