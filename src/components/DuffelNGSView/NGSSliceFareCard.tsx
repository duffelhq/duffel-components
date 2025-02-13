import { Button } from "@components/shared/Button";
import { Icon } from "@components/shared/Icon";
import { Offer } from "@duffel/api/types";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import classNames from "classnames";
import * as React from "react";
import { NGS_SHELF_INFO } from "./lib";
import { getFareBrandNameForOffer } from "./lib/deduplicate-mapped-offers-by-fare-brand";
import { doesSliceHaveMixedCabins } from "./lib/does-slice-have-mixed-cabins";
import { getMaxBaggagesForOfferSlice } from "./lib/get-max-baggages-for-offer-slice";

export interface NGSSliceFareCardProps {
  offer: Omit<Offer, "available_services">;
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
  const shelfInfo = NGS_SHELF_INFO[slice.ngs_shelf!];

  const brandName = getFareBrandNameForOffer(offer, sliceIndex);

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
            {doesSliceHaveMixedCabins(slice) && (
              <div className="ngs-slice-fare-card_mixed-cabins margin-t-8">
                <Icon name="info_outline" size={12} />
                Multiple cabins
                <div className="ngs-slice-fare-card_mixed-cabins-popover">
                  {slice.segments.map((segment, index) => (
                    <p key={`slice_${index}`}>
                      {segment.origin.iata_code} →{" "}
                      {segment.destination.iata_code}
                      <span className="margin-x-12">|</span>
                      {segment.passengers[0].cabin_class_marketing_name}
                    </p>
                  ))}
                </div>
              </div>
            )}
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
          {slice.conditions.advance_seat_selection !== null && (
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
          )}
          {slice.conditions.priority_boarding !== null && (
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
          )}
          {slice.conditions.priority_check_in !== null && (
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
          )}
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
