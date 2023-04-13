import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { SeatMap } from "src/types/SeatMap";
import { Modal } from "./Modal";
import { SeatSelection } from "./SeatSelect";

export interface SeatSelectionModalProps {
  offer: Offer;
  passengers: CreateOrderPayload["passengers"];
  seatMaps: SeatMap[];
  selectedServices: CreateOrderPayloadServices;
  onClose: (selectedServices: CreateOrderPayloadServices) => void;
}

export const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  offer,
  passengers,
  onClose,
  selectedServices,
  seatMaps,
}) => {
  // const [currentSegmentIndex] = useState(0);

  // const [selectedServicesState] = React.useState(selectedServices);

  // const segments = getSegmentList(offer);
  // const currentSegment = segments[currentSegmentIndex];

  // const passengerMapById = getPassengerMapById(passengers);
  // const servicePricesMap = getServicePriceMapById(offer.available_services);

  return (
    // TODO: should we return the partial selection in this case on close?
    <Modal
      onClose={() => onClose([])}
      modalOverlayStyle={{
        padding: 0,
        alignItems: "flex-end",
      }}
      modalContentStyle={{
        maxWidth: "100%",
        height: "calc(100vh - 40px)",
      }}
    >
      <SeatSelection
        offer={offer}
        passengers={passengers}
        seatMaps={seatMaps}
        selectedServices={selectedServices}
        onClose={onClose}
      />
    </Modal>
  );
};
