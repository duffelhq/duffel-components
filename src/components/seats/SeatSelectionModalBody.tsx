import React from "react";
import { SeatMap, SeatMapProps } from "./SeatMap";
import { ModalBody } from "@components/Modal";

export type SeatSelectionModalBodyProps = SeatMapProps;

export const SeatSelectionModalBody: React.FC<SeatSelectionModalBodyProps> = (
  props
) => (
  <ModalBody>
    <SeatMap {...props} />
  </ModalBody>
);
