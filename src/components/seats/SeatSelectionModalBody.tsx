import React from "react";
import { SeatMap, SeatMapProps } from "./SeatMap";

export type SeatSelectionModalBodyProps = SeatMapProps;

export const SeatSelectionModalBody: React.FC<SeatSelectionModalBodyProps> = (
  props
) => (
  <div
    style={{
      height: "100%",
      padding: "0px 24px 24px",
      overflow: "scroll",
      borderBlock: `solid 1px var(--GREY-200)`,
      position: "relative",
    }}
  >
    <SeatMap {...props} />
  </div>
);
