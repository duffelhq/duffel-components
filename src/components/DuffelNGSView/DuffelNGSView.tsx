import * as React from "react";
import { OfferWithNGS } from "./lib";

export interface DuffelNGSViewProps {
  offers: OfferWithNGS[];
}

export const DuffelNGSView: React.FC<DuffelNGSViewProps> = ({ offers }) => {
  if (offers.length == 0) {
    return null;
  }

  return <div>TODO</div>;
};
