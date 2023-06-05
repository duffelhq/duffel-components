import React from "react";
import {
  CreateOrderPayloadServiceInformationForCancelForAnyReason,
  CreateOrderPayloadServices,
} from "../../types/CreateOrderPayload";
import { OfferAvailableServiceCancelForAnyReason } from "../../types/Offer";
import { Modal } from "../Modal";
import { CfarSelectionModalBody } from "./CfarSelectionModalBody";
import { CfarSelectionModalFooter } from "./CfarSelectionModalFooter";
import { CfarSelectionModalHeader } from "./CfarSelectionModalHeader";

export interface CfarSelectionModalProps {
  isOpen: boolean;
  service?: OfferAvailableServiceCancelForAnyReason;
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
      {service && (
        <>
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
        </>
      )}
    </Modal>
  );
};
