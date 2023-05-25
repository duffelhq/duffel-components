import { moneyStringFormatter } from "@lib/formatConvertedCurrency";
import { getTotalAmountForServices } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { withPlural } from "@lib/withPlural";
import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { SeatMap } from "src/types/SeatMap";
import { AnimatedLoaderEllipsis } from "../AnimatedLoaderEllipsis";
import { Card } from "../Card";
import { Stamp } from "../Stamp";
import { SeatSelectionModal } from "./SeatSelectionModal";
import { getCurrencyForSeatMaps } from "@lib/getCurrencyForSeatMaps";

export interface SeatSelectionCardProps {
  isLoading: boolean;
  offer?: Offer;
  seatMaps?: SeatMap[];
  passengers: CreateOrderPayload["passengers"];
  selectedServices: CreateOrderPayloadServices;
  setSelectedServices: (selectedServices: CreateOrderPayloadServices) => void;
}

export const SeatSelectionCard: React.FC<SeatSelectionCardProps> = ({
  isLoading,
  offer,
  seatMaps,
  passengers,
  selectedServices,
  setSelectedServices,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const containsSeatService = Array.isArray(seatMaps) && seatMaps.length > 0;
  const totalQuantity = getTotalQuantity(selectedServices);
  const areSeatsAdded = totalQuantity > 0;

  const totalAmount = getTotalAmountForServices(
    offer!,
    selectedServices,
    seatMaps
  );
  let currencyToUse = offer?.base_currency ?? "";
  if (seatMaps) {
    currencyToUse = getCurrencyForSeatMaps(seatMaps) ?? currencyToUse;
  }

  const totalAmountFormatted = offer
    ? moneyStringFormatter(currencyToUse)(totalAmount)
    : "0";

  const copy =
    containsSeatService && areSeatsAdded
      ? `${withPlural(
          totalQuantity,
          "seat",
          "seats"
        )} selected for ${totalAmountFormatted}`
      : "Specify where on the plane you’d like to sit";

  return (
    <>
      <Card
        buttonTitle="Select seats"
        title="Seat selection"
        copy={copy}
        icon="flight_class"
        onClick={containsSeatService ? () => setIsOpen(true) : null}
        isLoading={isLoading}
        disabled={isLoading && !containsSeatService}
        isSelected={areSeatsAdded}
      >
        {isLoading && (
          <Stamp color="var(--GREY-900)" backgroundColor="var(--GREY-100)">
            Loading
            <AnimatedLoaderEllipsis />
          </Stamp>
        )}
        {!isLoading && !containsSeatService && (
          <Stamp color="var(--GREY-700)" backgroundColor="var(--GREY-200)">
            Not available
          </Stamp>
        )}
      </Card>

      {isOpen && offer && seatMaps && (
        <SeatSelectionModal
          seatMaps={seatMaps}
          offer={offer}
          passengers={passengers}
          selectedServices={selectedServices}
          onClose={(services) => {
            setSelectedServices(services);
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
};
