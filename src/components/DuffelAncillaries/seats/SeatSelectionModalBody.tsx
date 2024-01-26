import { ModalBody } from "@components/shared/Modal";
import React from "react";
import { SeatMap, SeatMapProps } from "./SeatMap";

export type SeatSelectionModalBodyProps = SeatMapProps;

export const SeatSelectionModalBody: React.FC<SeatSelectionModalBodyProps> = (
  props,
) => (
  <ModalBody>
    <SeatMap {...props} />
  </ModalBody>
);
