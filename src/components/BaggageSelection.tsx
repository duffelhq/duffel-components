import React from "react";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src/types/Offer";
import { AdditionalBaggageSelection } from "./AdditionalBaggageSelection";
import { Card, CardProps } from "./Card";
import { Modal } from "./Modal";
import { moneyStringFormatter } from "../lib/formatConvertedCurrency";
import { withPlural } from "@lib/withPlural";
import { getTotalAmountForServices } from "@lib/getTotalAmountForServices";
import { getTotalQuantity } from "@lib/getTotalQuantity";
import { AnimatedLoaderEllipsis } from "./AnimatedLoaderEllipsis";
import { Stamp } from "./Stamp";

const commonCardProps: Pick<CardProps, "title" | "icon" | "ctaLabel"> = {
  title: "Extra baggage",
  icon: "checked_bag",
  ctaLabel: "Add extra baggage",
};

export type SetBaggageSelectionStateFunction = (
  selectedServices: CreateOrderPayloadServices
) => void;

export interface BaggageSelectionProps {
  isLoading: boolean;
  offer?: Offer;
  passengers: CreateOrderPayload["passengers"];
  selectedServices: CreateOrderPayloadServices;
  setSelectedServices: SetBaggageSelectionStateFunction;
}

type BaggageSelectionPropsWithOffer = Exclude<
  BaggageSelectionProps,
  "offer"
> & {
  offer: Offer;
};

export const BaggageSelection: React.FC<BaggageSelectionProps> = (props) => {
  if (props.isLoading) {
    return <BaggageSelectionLoading />;
  } else {
    return (
      <BaggageSelectionInternal
        {...(props as BaggageSelectionPropsWithOffer)}
      />
    );
  }
};

const BaggageSelectionInternal: React.FC<BaggageSelectionPropsWithOffer> = ({
  offer,
  passengers,
  selectedServices,
  setSelectedServices,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const containsBaggageService = offer.available_services.some(
    (service) => service.type === "baggage" && service.maximum_quantity > 0
  );

  const totalQuantity = getTotalQuantity(selectedServices);
  const isBaggageAdded = totalQuantity > 0;

  const totalAmount = getTotalAmountForServices(offer, selectedServices);
  const toMoney = moneyStringFormatter(offer.total_currency);
  const totalAmountFormatted = toMoney(totalAmount);

  return (
    <>
      <Card
        {...commonCardProps}
        onClick={containsBaggageService ? () => setIsOpen(true) : null}
      >
        {!containsBaggageService && (
          <Stamp color="var(--GREY-700)" backgroundColor="var(--GREY-100)">
            Not available
          </Stamp>
        )}
        {containsBaggageService && !isBaggageAdded && (
          <Stamp color="" backgroundColor="">
            No extra bags added
          </Stamp>
        )}
        {containsBaggageService && isBaggageAdded && (
          <Stamp color="" backgroundColor="">
            `${withPlural(totalQuantity, "bag", "bags")} added for $
            {totalAmountFormatted}`
          </Stamp>
        )}
      </Card>

      {isOpen && (
        <Modal>
          <AdditionalBaggageSelection
            offer={offer}
            passengers={passengers}
            onSubmit={(data) => {
              setIsOpen(false);
              setSelectedServices(data);
            }}
            initialBaggageSelection={selectedServices as any}
          />
        </Modal>
      )}
    </>
  );
};

const BaggageSelectionLoading: React.FC = () => (
  <Card {...commonCardProps}>
    <div style={{ paddingBlock: "16px" }}>
      Loading
      <AnimatedLoaderEllipsis />
    </div>
  </Card>
);
