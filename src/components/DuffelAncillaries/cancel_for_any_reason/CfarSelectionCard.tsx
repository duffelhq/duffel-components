import { AnimatedLoaderEllipsis } from "@components/shared/AnimatedLoaderEllipsis";
import { Stamp } from "@components/shared/Stamp";
import { CreateOrderService, Offer } from "@duffel/api/types";
import { getCurrencyForServices } from "@lib/getCurrencyForServices";
import { getTotalAmountForServices } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { hasService } from "@lib/hasService";
import { isCancelForAnyReasonService } from "@lib/isCancelForAnyReasonService";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import React from "react";
import { WithServiceInformation } from "src/types";
import { Card } from "../../shared/Card";
import { CfarSelectionModal } from "./CfarSelectionModal";

export interface CfarSelectionCardProps {
  isLoading: boolean;
  offer?: Offer;
  selectedServices: WithServiceInformation<CreateOrderService>[];
  setSelectedServices: (
    selectedServices: WithServiceInformation<CreateOrderService>[],
  ) => void;
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

  let currencyToUse = offer?.base_currency || "";
  if (containsCfarService) {
    currencyToUse = getCurrencyForServices(offer!, "cancel_for_any_reason");
  }

  const totalAmount = getTotalAmountForServices(offer!, selectedServices);
  const totalAmountFormatted = offer
    ? moneyStringFormatter(currencyToUse)(totalAmount)
    : "0";

  const cfarService = offer?.available_services.find(
    isCancelForAnyReasonService,
  );

  const copy =
    containsCfarService && isCfarAdded
      ? `Your trip is protected for ${totalAmountFormatted}`
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
        offerCurrency={offer?.base_currency}
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
