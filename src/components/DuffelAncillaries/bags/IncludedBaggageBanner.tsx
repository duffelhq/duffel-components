import { withPlural } from "@lib/withPlural";
import React from "react";
import { OfferSliceSegmentPassengerBaggage } from "../../../types/Offer";

interface IncludedBaggageBannerProps {
  includedBaggage: OfferSliceSegmentPassengerBaggage[];
}

export const IncludedBaggageBanner: React.FC<IncludedBaggageBannerProps> = ({
  includedBaggage,
}) => {
  const { carryOnBagsQuantity, checkedBagsQuantity } = includedBaggage.reduce(
    (sum, { type, quantity }) => ({
      carryOnBagsQuantity:
        sum.carryOnBagsQuantity + (type === "carry_on" ? quantity : 0),
      checkedBagsQuantity:
        sum.checkedBagsQuantity + (type === "checked" ? quantity : 0),
    }),
    {
      carryOnBagsQuantity: 0,
      checkedBagsQuantity: 0,
    }
  );

  const baggageLabelStringArray = new Array<string>();
  if (carryOnBagsQuantity > 0) {
    baggageLabelStringArray.push(
      withPlural(carryOnBagsQuantity, "cabin bag", "cabin bags")
    );
  }
  if (checkedBagsQuantity > 0) {
    baggageLabelStringArray.push(
      withPlural(checkedBagsQuantity, "checked bag", "checked bags")
    );
  }

  return (
    <div
      style={{
        marginBlock: "8px",
        padding: "8px 12px",
        color: ` var(--GREEN-300)`,
        backgroundColor: ` var(--GREEN-100)`,
        borderRadius: "6px",
      }}
      className="p2--regular"
    >
      {baggageLabelStringArray.join(" and ")} included with ticket
    </div>
  );
};
