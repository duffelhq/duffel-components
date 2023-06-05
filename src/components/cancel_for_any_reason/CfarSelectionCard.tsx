import { AnimatedLoaderEllipsis } from "@components/AnimatedLoaderEllipsis";
import { Stamp } from "@components/Stamp";
import { getTotalAmountForServices } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { hasService } from "@lib/hasService";
import { isCancelForAnyReasonService } from "@lib/isCancelForAnyReasonService";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import React from "react";
import { CreateOrderPayloadServices } from "../../types/CreateOrderPayload";
import { Offer } from "../../types/Offer";
import { Card } from "../Card";
import { CfarSelectionModal } from "./CfarSelectionModal";

export interface CfarSelectionCardProps {
  isLoading: boolean;
  offer?: Offer;
  selectedServices: CreateOrderPayloadServices;
  setSelectedServices: (selectedServices: CreateOrderPayloadServices) => void;
}

export const CfarSelectionCard: React.FC<CfarSelectionCardProps> = ({
  isLoading,
  offer,
  selectedServices,
  setSelectedServices,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const containsCfarService = hasService(offer, "cancel_for_any_reason");
  const totalQuantity = getTotalQuantity(selectedServices);
  const isCfarAdded = totalQuantity > 0;

  const totalAmount = getTotalAmountForServices(offer!, selectedServices);
  const totalAmountFormatted = offer
    ? moneyStringFormatter(offer?.base_currency)(totalAmount)
    : "0";

  const cfarService = offer?.available_services.find(
    isCancelForAnyReasonService
  );

  const copy =
    containsCfarService && isCfarAdded
      ? `Added for ${totalAmountFormatted}`
      : `Protect your purchase if you decide to cancel`;

  return (
    <>
      <Card
        buttonTitle="Add cancel for any reason"
        title="Cancel for any reason"
        copy={copy}
        icon="shield_with_moon"
        onClick={containsCfarService ? () => setIsOpen(true) : null}
        isLoading={isLoading}
        disabled={!isLoading && !containsCfarService}
        isSelected={isCfarAdded}
      >
        {isLoading && (
          <Stamp color="var(--GREY-900)" backgroundColor="var(--GREY-100)">
            Loading
            <AnimatedLoaderEllipsis />
          </Stamp>
        )}
        {!isLoading && !containsCfarService && (
          <Stamp color="var(--GREY-700)" backgroundColor="var(--GREY-200)">
            Not available
          </Stamp>
        )}
      </Card>

      <CfarSelectionModal
        isOpen={Boolean(isOpen && offer && cfarService)}
        service={cfarService}
        onClose={(newSelectedServices) => {
          setIsOpen(false);
          setSelectedServices(newSelectedServices);
        }}
        selectedServices={selectedServices}
      />
    </>
  );
};
