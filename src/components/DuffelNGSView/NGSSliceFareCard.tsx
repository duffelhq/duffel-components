import * as React from "react";
import { NGS_SHELF_INFO, OfferSliceSegmentWithNGS, OfferWithNGS } from "./lib";
import { OfferSliceSegmentPassenger } from "@duffel/api/types";
import { Icon } from "@components/shared/Icon";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { getMaxBaggagesForOfferSlice } from "./lib/get-max-baggages-for-offer-slice";
import { RadioButton } from "@components/shared/RadioButton";
import { Button } from "@components/shared/Button";
import classNames from "classnames";

export interface NGSSliceFareCardProps {
  offer: OfferWithNGS;
  sliceIndex: number;

  selected?: boolean;
  onSelect?: () => void;
  compareToAmount?: number;
}

export const NGSSliceFareCard: React.FC<NGSSliceFareCardProps> = ({
  offer,
  sliceIndex,
  selected,
  onSelect,
  compareToAmount,
}) => {
  if (sliceIndex >= offer.slices.length) {
    throw new Error(
      "Attempted to create `NGSSliceFareCard` with invalid slice index"
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

  const showComparedAmount = !selected && compareToAmount;
  const amountDifference = showComparedAmount
    ? +offer.total_amount - compareToAmount
    : +offer.total_amount;
  const amountDifferencePrefix = showComparedAmount
    ? `${amountDifference > 0 ? "+" : ""}`
    : "";

  const isAdvancedSeatSelectionAvailable = slice.segments
    .flatMap((segment: OfferSliceSegmentWithNGS) => segment.passengers)
    .some(
      (passenger) => passenger.ticket_attributes?.advanced_selection_available,
    );

  return (
    <button
      className="ngs-slice-fare-card_container"
      onClick={() => {
        onSelect && onSelect();
      }}
    >
      <div>
        <div className="ngs-slice-fare-card_header">
          <div>
            <span>{shelfInfo.short_title}</span>
            <h4
              className={classNames("ngs-slice-fare-card_title", {
                "ngs-slice-fare-card_title--selected": selected,
              })}
            >
              {brandName}
            </h4>
          </div>
          <Icon name={shelfInfo.icon} color="--GREY-900" />
        </div>
        <div>
          <div className="ngs-slice-fare-card_item">
            <Icon name={shelfInfo.seat.icon} color="--GREY-600" size={20} />
            {shelfInfo.seat.description}
          </div>
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
              name={isAdvancedSeatSelectionAvailable ? "check_small" : "close"}
              color="--GREY-600"
              size={20}
            />
            Seat selection
          </div>
        </div>
      </div>
      <div className="ngs-slice-fare-card_footer">
        <span
          className={classNames(
            "ngs-slice-fare-card_price",
            "ngs-slice-fare-card_price--compared",
            {
              "ngs-slice-fare-card_price--selected": selected,
            },
          )}
        >
          {amountDifferencePrefix}
          {moneyStringFormatter(offer.total_currency)(amountDifference)}
        </span>
        <span
          className={classNames(
            "ngs-slice-fare-card_price",
            "ngs-slice-fare-card_price--total",
            {
              "ngs-slice-fare-card_price--selected": selected,
            },
          )}
        >
          {moneyStringFormatter(offer.total_currency)(+offer.total_amount)}
        </span>
        <div>
          <RadioButton
            value={slice.id}
            checked={selected}
            className="ngs-slice-fare-card_radio"
          />
          {selected && (
            <Button size={32} className="ngs-slice-fare-card_button">
              Select
            </Button>
          )}
        </div>
      </div>
    </button>
  );
};
