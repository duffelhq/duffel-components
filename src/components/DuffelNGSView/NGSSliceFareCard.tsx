import * as React from "react";
import { NGS_SHELF_INFO } from "./lib";
import { Offer, OfferSliceSegmentPassenger } from "@duffel/api/types";
import { Icon } from "@components/shared/Icon";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { getMaxBaggagesForOfferSlice } from "./lib/get-max-baggages-for-offer-slice";
import { Button } from "@components/shared/Button";
import classNames from "classnames";

export interface NGSSliceFareCardProps {
  offer: Offer;
  sliceIndex: number;

  onSelect?: () => void;

  className?: string;
}

export const NGSSliceFareCard: React.FC<NGSSliceFareCardProps> = ({
  offer,
  sliceIndex,
  onSelect,
  className,
}) => {
  if (sliceIndex >= offer.slices.length) {
    throw new Error(
      "Attempted to create `NGSSliceFareCard` with invalid slice index",
    );
  }

  const slice = offer.slices[sliceIndex];
  const shelfInfo = NGS_SHELF_INFO[slice.ngs_shelf];

  // Cabin class can vary within a slice across passengers and segments. Here we
  // make a list of all cabin classes present in the slice.
  const cabinClasses = slice.segments
    .flatMap((segment) => segment.passengers)
    .reduce<OfferSliceSegmentPassenger["cabin_class"][]>(
      (cabinClasses, passenger) => {
        if (cabinClasses.includes(passenger.cabin_class)) {
          return cabinClasses;
        }
        return [...cabinClasses, passenger.cabin_class];
      },
      [],
    );
  const brandName = slice.fare_brand_name || cabinClasses.join("/");

  // A null property indicates the API can't provide the information for this
  // slice, so we default to using the offer condition.
  const changeBeforeDepartureCondition = slice.conditions
    .change_before_departure
    ? slice.conditions.change_before_departure
    : offer.conditions.change_before_departure;
  const refundBeforeDepartureCondition = slice.conditions
    .refund_before_departure
    ? slice.conditions.refund_before_departure
    : offer.conditions.refund_before_departure;

  const checkedBagItems = getMaxBaggagesForOfferSlice(slice, "checked");
  const carryOnBagItems = getMaxBaggagesForOfferSlice(slice, "carry_on");

  return (
    <button
      className={classNames("ngs-slice-fare-card_container", className)}
      onClick={() => {
        onSelect && onSelect();
      }}
    >
      <div>
        <div className="ngs-slice-fare-card_header">
          <div>
            <span>{shelfInfo.short_title}</span>
            <h4 className="ngs-slice-fare-card_title">{brandName}</h4>
          </div>
          <Icon name={shelfInfo.icon} color="--GREY-900" />
        </div>
        <div>
          {changeBeforeDepartureCondition && (
            <div className="ngs-slice-fare-card_item">
              <Icon
                name={
                  changeBeforeDepartureCondition.allowed
                    ? "currency_exchange"
                    : "close"
                }
                color="--GREY-600"
                size={20}
              />
              Changeable
              {changeBeforeDepartureCondition.allowed &&
              changeBeforeDepartureCondition.penalty_currency &&
              changeBeforeDepartureCondition.penalty_amount
                ? ` (${moneyStringFormatter(
                    changeBeforeDepartureCondition.penalty_currency,
                  )(+changeBeforeDepartureCondition.penalty_amount)})`
                : ""}
            </div>
          )}
          {refundBeforeDepartureCondition && (
            <div className="ngs-slice-fare-card_item">
              <Icon
                name={
                  refundBeforeDepartureCondition.allowed
                    ? "airplane_ticket"
                    : "close"
                }
                color="--GREY-600"
                size={20}
              />
              Refundable
              {refundBeforeDepartureCondition.allowed &&
              refundBeforeDepartureCondition.penalty_currency &&
              refundBeforeDepartureCondition.penalty_amount
                ? ` (${moneyStringFormatter(
                    refundBeforeDepartureCondition.penalty_currency,
                  )(+refundBeforeDepartureCondition.penalty_amount)})`
                : ""}
            </div>
          )}
          <div className="ngs-slice-fare-card_item">
            <Icon
              name={carryOnBagItems.length > 0 ? "shopping_bag" : "close"}
              color="--GREY-600"
              size={20}
            />
            Carry-on bag
          </div>
          <div className="ngs-slice-fare-card_item">
            <Icon
              name={checkedBagItems.length > 0 ? "luggage" : "close"}
              color="--GREY-600"
              size={20}
            />
            Checked bag
          </div>
          <div className="ngs-slice-fare-card_item">
            <Icon
              name={
                slice.conditions.advance_seat_selection
                  ? "check_small"
                  : "close"
              }
              color="--GREY-600"
              size={20}
            />
            Seat selection
          </div>
          <div className="ngs-slice-fare-card_item">
            <Icon
              name={
                slice.conditions.priority_boarding ? "check_small" : "close"
              }
              color="--GREY-600"
              size={20}
            />
            Priority boarding
          </div>
          <div className="ngs-slice-fare-card_item">
            <Icon
              name={
                slice.conditions.priority_check_in ? "check_small" : "close"
              }
              color="--GREY-600"
              size={20}
            />
            Priority check-in
          </div>
        </div>
      </div>
      <div className="ngs-slice-fare-card_footer">
        <span className="ngs-slice-fare-card_price">
          {moneyStringFormatter(offer.total_currency)(+offer.total_amount)}
        </span>
        <div>
          <Button size={32} className="ngs-slice-fare-card_button">
            Select
          </Button>
        </div>
      </div>
    </button>
  );
};
