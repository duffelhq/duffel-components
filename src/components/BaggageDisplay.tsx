import { Icon, IconName } from "@components/Icon";
import * as React from "react";
import { OfferAvailableServiceBaggageMetadata } from "src/types/Offer";

export interface BaggageDisplayProps {
  metadata: OfferAvailableServiceBaggageMetadata;
  price: string;
}

export const BaggageDisplay: React.FC<BaggageDisplayProps> = ({
  metadata,
  price,
}) => {
  const {
    type,
    maximum_weight_kg,
    maximum_depth_cm,
    maximum_height_cm,
    maximum_length_cm,
  } = metadata;
  const iconName: IconName = type === "carry_on" ? "cabin_bag" : "checked_bag";
  const label = type === "carry_on" ? "Carry on bag" : "Checked bag";

  const dimensions =
    maximum_depth_cm && maximum_height_cm && maximum_length_cm
      ? `${maximum_height_cm} x ${maximum_length_cm} x ${maximum_depth_cm} cm`
      : null;

  return (
    <div className="baggage-display">
      <Icon name={iconName} />
      <div className="baggage-display__content">
        <span className="baggage-display__label">{label}</span>
        <span className="baggage-display__price">{price}</span>
        {(maximum_weight_kg || dimensions) && (
          <div className="baggage-display__specs">
            {maximum_weight_kg && `Up to ${maximum_weight_kg}kg`}
            {maximum_weight_kg && dimensions && " / "}
            {dimensions}
          </div>
        )}
      </div>
    </div>
  );
};
