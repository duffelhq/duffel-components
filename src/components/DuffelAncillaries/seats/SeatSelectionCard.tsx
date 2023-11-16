import { AnimatedLoaderEllipsis } from "@components/shared/AnimatedLoaderEllipsis";
import { Stamp } from "@components/shared/Stamp";
import { getCurrencyForSeatMaps } from "@lib/getCurrencyForSeatMaps";
import { getTotalAmountForServices } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { withPlural } from "@lib/withPlural";
import React from "react";
import { Card } from "../Card";
import { SeatSelectionModal } from "./SeatSelectionModal";
import {
  CreateOrder,
  CreateOrderService,
  Offer,
  SeatMap,
} from "@duffel/api/types";
import { WithServiceInformation } from "src/types";

export interface SeatSelectionCardProps {
  isLoading: boolean;
  offer?: Offer;
  seatMaps?: SeatMap[];
  passengers: CreateOrder["passengers"];
  selectedServices: WithServiceInformation<CreateOrderService>[];
  setSelectedServices: (
    selectedServices: WithServiceInformation<CreateOrderService>[]
  ) => void;
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

      <SeatSelectionModal
        isOpen={Boolean(offer && seatMaps && isOpen)}
        seatMaps={seatMaps}
        offer={offer}
        passengers={passengers}
        selectedServices={selectedServices}
        onClose={(services) => {
          setSelectedServices(services);
          setIsOpen(false);
        }}
      />
    </>
  );
};
