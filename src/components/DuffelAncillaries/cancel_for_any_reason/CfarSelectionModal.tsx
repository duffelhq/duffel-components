import { Modal } from "@components/shared/Modal";
import {
  CreateOrderService,
  Offer,
  OfferAvailableServiceCFAR,
} from "@duffel/api/types";
import React from "react";
import { WithServiceInformation } from "src/types";
import { CfarSelectionModalBody } from "./CfarSelectionModalBody";
import { CfarSelectionModalFooter } from "./CfarSelectionModalFooter";
import { CfarSelectionModalHeader } from "./CfarSelectionModalHeader";

export interface CfarSelectionModalProps {
  isOpen: boolean;
  offerCurrency?: Offer["base_currency"];
  service?: OfferAvailableServiceCFAR;
  selectedServices: WithServiceInformation<CreateOrderService>[];
  onClose: (
    selectedServices: WithServiceInformation<CreateOrderService>[]
  ) => void;
}

export const CfarSelectionModal: React.FC<CfarSelectionModalProps> = ({
  isOpen,
  offerCurrency,
  service,
  onClose,
  selectedServices,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose(selectedServices)}>
      <CfarSelectionModalHeader />
      {service && offerCurrency && (
        <>
          <CfarSelectionModalBody
            service={service}
            offerCurrency={offerCurrency}
          />
          <CfarSelectionModalFooter
            service={service}
            selectedServices={selectedServices}
            onAddCfarService={() =>
              onClose([
                {
                  id: service.id,
                  quantity: 1,
                  serviceInformation: {
                    total_amount: service.total_amount,
                    total_currency: service.total_currency,
                    ...service.metadata,
                  },
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
