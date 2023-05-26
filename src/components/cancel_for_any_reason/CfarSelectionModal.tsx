import React from "react";
import {
  CreateOrderPayloadServiceInformationForCancelForAnyReason,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { OfferAvailableCancelForAnyReasonService } from "src/types/Offer";
import { Modal } from "../Modal";
import { CfarSelectionModalHeader } from "./CfarSelectionModalHeader";
import { CfarSelectionModalBody } from "./CfarSelectionModalBody";
import { CfarSelectionModalFooter } from "./CfarSelectionModalFooter";

export interface CfarSelectionModalProps {
  isOpen: boolean;
  service: OfferAvailableCancelForAnyReasonService;
  selectedServices: CreateOrderPayloadServices;
  onClose: (selectedServices: CreateOrderPayloadServices) => void;
}

export const CfarSelectionModal: React.FC<CfarSelectionModalProps> = ({
  isOpen,
  service,
  onClose,
  selectedServices,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose(selectedServices)}>
      <CfarSelectionModalHeader />
      <CfarSelectionModalBody service={service} />
      <CfarSelectionModalFooter
        service={service}
        selectedServices={selectedServices}
        onAddCfarService={() =>
          onClose([
            {
              id: service.id,
              quantity: 1,
              serviceInformation: {
                type: "cancel_for_any_reason",
                total_amount: service.total_amount,
                total_currency: service.total_currency,
                ...service.metadata,
              } as CreateOrderPayloadServiceInformationForCancelForAnyReason,
            },
          ])
        }
        onRemoveCfarService={() => onClose([])}
        onClose={() => onClose(selectedServices)}
      />
    </Modal>
  );
};
