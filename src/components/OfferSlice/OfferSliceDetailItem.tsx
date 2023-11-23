import * as React from "react";
import { OfferSliceDetailLayoverItem } from "./OfferSliceDetailLayoverItem";
import { OfferSliceDetailTravelItem } from "./OfferSliceDetailTravelItem";
import { SliceItem } from "src/types/TravelDetails";

interface OfferSliceDetailItemProps {
  item: SliceItem;
}

export const OfferSliceDetailItem: React.FC<OfferSliceDetailItemProps> = ({
  item,
}) => {
  if (item.type === "travel" && item.travelDetails) {
    return <OfferSliceDetailTravelItem travelDetails={item.travelDetails} />;
  }
  if (item.type === "layover" && item.layoverDetails) {
    return <OfferSliceDetailLayoverItem layoverDetails={item.layoverDetails} />;
  }
  return null;
};
