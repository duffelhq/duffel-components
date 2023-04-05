import { Offer } from "../types/Offer";
import React from "react";

export interface BaggageSelectionModalFooterProps {
  // TODO
  offer: Offer;
}

export const BaggageSelectionModalFooter: React.FC<
  BaggageSelectionModalFooterProps
> = () => <div style={{ padding: "24px" }}>BaggageSelectionModalFooter</div>;
