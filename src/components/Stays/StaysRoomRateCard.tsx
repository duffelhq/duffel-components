import classNames from "classnames";
import * as React from "react";
import {
  LOYALTY_PROGRAMS_NAME_MAP,
  boardTypeIcon,
  getBoardTypeLabel,
} from "./lib/types";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { getDateString } from "@lib/getDateString";
import { HSpace } from "@components/shared/HSpace";
import { Icon, IconName } from "@components/shared/Icon";
import { VSpace } from "@components/shared/VSpace";
import {
  StaysRateCancellationTimeline,
  StaysRoomRate,
} from "@duffel/api/types";
import { RadioButton } from "@components/shared/RadioButton";
import { withPlural } from "@lib/withPlural";
import { WithComponentStyles } from "@components/shared/WithComponentStyles";

export interface StaysRoomRateCardProps {
  rate: StaysRoomRate;
  searchNumberOfRooms: number;
  numberOfNights: number;
  selected: boolean;
  onSelectRate: (rateId: string) => void;
}

export const StaysRoomRateCard: React.FC<StaysRoomRateCardProps> = ({
  numberOfNights,
  searchNumberOfRooms,
  rate,
  selected,
  onSelectRate,
}) => {
  const earliestCancellation: StaysRateCancellationTimeline | undefined =
    rate.cancellation_timeline[0];

  const quantityOfRoomsAvailable: number =
    rate.quantity_available != null && !isNaN(rate.quantity_available)
      ? rate.quantity_available
      : searchNumberOfRooms;

  return (
    <WithComponentStyles>
      <button
        onClick={() => onSelectRate(rate.id)}
        className={classNames(
          "duffel-components",
          "stays-room-rate-card__container",
          selected && "stays-room-rate-card__container--selected",
        )}
      >
        <VSpace className="stays-room-rate-card__content" space={12}>
          <HSpace space={0} spaceBetween>
            <p className="stays-room-rate-card__text--medium">
              {!earliestCancellation && "Non-refundable"}
              {earliestCancellation &&
                rate.total_amount === earliestCancellation.refund_amount &&
                "Fully refundable"}
              {earliestCancellation &&
                rate.total_amount !== earliestCancellation.refund_amount &&
                "Partially refundable"}
              {rate.board_type === "breakfast" && " with breakfast"}
              {rate.board_type === "all_inclusive" && " all inclusive"}
            </p>
          </HSpace>
          <VSpace space={8}>
            {rate.board_type && (
              <StayResultRoomRateItem
                icon={boardTypeIcon(rate.board_type)}
                label={getBoardTypeLabel(rate.board_type)}
              />
            )}

            {earliestCancellation && (
              <StayResultRoomRateItem
                icon="refund"
                label={
                  rate.total_amount === earliestCancellation.refund_amount ? (
                    `Free cancellation until ${getDateString(
                      earliestCancellation.before,
                      "medium",
                    )}`
                  ) : (
                    <>
                      Cancellation available (from{" "}
                      {moneyStringFormatter(earliestCancellation.currency)(
                        +rate.total_amount -
                          +earliestCancellation.refund_amount,
                      )}{" "}
                      fee)
                    </>
                  )
                }
              />
            )}

            {rate.available_payment_methods.map((paymentMethod) => (
              <StayResultRoomRateItem
                key={paymentMethod}
                icon={paymentMethod === "card" ? "credit_card" : "wallet"}
                label={
                  paymentMethod === "card"
                    ? "Card payment at accommodation"
                    : "Pay now with Duffel Balance"
                }
              />
            ))}

            {rate.supported_loyalty_programme && (
              <StayResultRoomRateItem
                icon="loyalty"
                label={
                  LOYALTY_PROGRAMS_NAME_MAP[rate.supported_loyalty_programme]
                }
              />
            )}
          </VSpace>
        </VSpace>
        <VSpace space={8} className="stays-room-rate-card__footer">
          {quantityOfRoomsAvailable && (
            <p className="stays-room-rate-card__text--small">
              At least {withPlural(quantityOfRoomsAvailable, "room", "rooms")}{" "}
              available
            </p>
          )}
          <VSpace space={4}>
            <p className="stays-room-rate-card__text--small">
              {moneyStringFormatter(rate.total_currency)(+rate.total_amount)}{" "}
              for {withPlural(numberOfNights, "night", "nights")}
            </p>

            {rate.due_at_accommodation_amount &&
              +rate.due_at_accommodation_amount > 0 && (
                <p className="stays-room-rate-card__text--small">
                  <i>
                    +{" "}
                    {moneyStringFormatter(rate.due_at_accommodation_currency)(
                      +rate.due_at_accommodation_amount,
                    )}{" "}
                    at accommodation
                  </i>
                </p>
              )}
          </VSpace>
          <HSpace space={8} spaceBetween>
            <p className="stays-room-rate-card__text--large">
              {moneyStringFormatter(rate.total_currency)(
                +rate.total_amount / numberOfNights,
              )}
              <span className="stays-room-rate-card__text--small">/night</span>
            </p>
            <RadioButton checked={selected} value={rate.id} />
          </HSpace>
        </VSpace>
      </button>
    </WithComponentStyles>
  );
};

const StayResultRoomRateItem: React.FC<{
  icon: IconName;
  label: string | React.ReactNode;
}> = ({ icon, label }) => (
  <HSpace space={8}>
    <Icon name={icon} size={16} color="--GREY-600" className="u-marginTop2" />
    <p className="stays-room-rate-card__item-label">{label}</p>
  </HSpace>
);
