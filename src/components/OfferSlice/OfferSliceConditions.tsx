import { Icon, IconName } from "@components/shared/Icon";
import { VSpace } from "@components/shared/VSpace";
import { OfferSlice } from "@duffel/api/types";
import { Color } from "@lib/colors";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { withPlural } from "@lib/withPlural";
import classNames from "classnames";
import { PropsWithChildren } from "react";

interface OfferSliceConditionsProps {
  slice: OfferSlice;
}

export const OfferSliceConditions: React.FC<OfferSliceConditionsProps> = ({
  slice,
}) => {
  const firstSegment = slice.segments[0];
  const firstPassenger = firstSegment.passengers[0];
  const baggages = firstPassenger.baggages;

  const checkedBaggageQuantity = baggages
    .filter(({ type }) => type == "checked")
    .reduce((sum, bag) => bag.quantity + sum, 0);

  const carryOnBaggageQuantity = baggages
    .filter(({ type }) => type == "carry_on")
    .reduce((sum, bag) => bag.quantity + sum, 0);

  const isRefundable = slice.conditions.refund_before_departure?.allowed;
  const isChangeable = slice.conditions.change_before_departure?.allowed;

  return (
    <VSpace space={8}>
      {checkedBaggageQuantity > 0 && (
        <OfferSliceConditionsCallout
          title="Checked bag"
          icon="checked_bag"
          color="blue"
        >
          {withPlural(carryOnBaggageQuantity, "checked bag ", "checked bags ")}
          per passenger included in this offer
        </OfferSliceConditionsCallout>
      )}
      {carryOnBaggageQuantity > 0 && (
        <OfferSliceConditionsCallout
          title="Carry-on bag"
          icon="cabin_bag"
          color="blue"
        >
          {withPlural(
            carryOnBaggageQuantity,
            "carry-on bag ",
            "carry-on bags ",
          )}
          per passenger included in this offer
        </OfferSliceConditionsCallout>
      )}

      {isChangeable && (
        <OfferSliceConditionsCallout
          title="Changeable"
          icon="airplane_ticket"
          color="green"
        >
          Cancel anytime up to the departure of the first flight (
          {slice.conditions.change_before_departure?.penalty_currency &&
          slice.conditions.change_before_departure?.penalty_amount
            ? moneyStringFormatter(
                slice.conditions.change_before_departure?.penalty_currency,
              )(+slice.conditions.change_before_departure?.penalty_amount)
            : "fee"}{" "}
          may apply)
        </OfferSliceConditionsCallout>
      )}

      {isRefundable && (
        <OfferSliceConditionsCallout
          title="Refundable"
          icon="airplane_ticket"
          color="green"
        >
          Cancel anytime up to the departure of the first flight (
          {slice.conditions.refund_before_departure?.penalty_currency &&
          slice.conditions.refund_before_departure?.penalty_amount
            ? moneyStringFormatter(
                slice.conditions.refund_before_departure?.penalty_currency,
              )(+slice.conditions.refund_before_departure?.penalty_amount)
            : "fee"}{" "}
          may apply)
        </OfferSliceConditionsCallout>
      )}
    </VSpace>
  );
};

const OfferSliceConditionsCallout: React.FC<
  PropsWithChildren<{
    title: string;
    icon: IconName;
    color: "blue" | "green";
  }>
> = ({ title, children, icon, color }) => {
  return (
    <div
      className={classNames(
        "offer-slice-conditions-callout",
        `offer-slice-conditions-callout--${color}`,
      )}
    >
      <Icon name={icon} color={`--${color}-300` as Color} />
      <b>{title}</b>
      <p>{children}</p>
    </div>
  );
};
