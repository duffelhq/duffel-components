import { moneyStringFormatter } from "@lib/formatConvertedCurrency";
import React from "react";
import { CreateOrderPayloadServices } from "../../types/CreateOrderPayload";
import { OfferAvailableCancelForAnyReasonService } from "../../types/Offer";
import { Button } from "../Button";
import { Icon } from "@components/Icon";

export interface CfarSelectionModalFooterProps {
  service: OfferAvailableCancelForAnyReasonService;
  selectedServices: CreateOrderPayloadServices;
  onAddCfarService: () => void;
  onRemoveCfarService: () => void;
  onClose: () => void;
}

export const CfarSelectionModalFooter: React.FC<
  CfarSelectionModalFooterProps
> = ({
  service,
  selectedServices,
  onAddCfarService,
  onRemoveCfarService,
  onClose,
}) => {
  const serviceIncluded = selectedServices.some(({ id }) => id == service.id);
  const formattedPrice = moneyStringFormatter(service.total_currency)(
    +service.total_amount
  );

  return (
    <div className="cfar-modal-footer">
      <Button
        variant={serviceIncluded ? "destructive" : "outlined"}
        onClick={serviceIncluded ? onRemoveCfarService : onClose}
      >
        {serviceIncluded ? "Remove protection" : "Don’t protect trip"}
      </Button>

      {!serviceIncluded && (
        <Button data-testid="confirm-selection" onClick={onAddCfarService}>
          Add protection for {formattedPrice}
        </Button>
      )}

      {serviceIncluded && <ProtectedTripBanner />}
    </div>
  );
};

const ProtectedTripBanner: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      columnGap: "8px",
      backgroundColor: "var(--GREY-100)",
      padding: "var(--space-12)",
      borderRadius: "var(--BUTTON-RADIUS)",
    }}
  >
    <Icon
      size={20}
      name="shield_with_moon"
      style={{ fill: "rgb(var(--ACCENT))" }}
    />
    Your trip is protected
  </div>
);