import { NonIdealState } from "@components/shared/NonIdealState";
import * as React from "react";

export const SeatMapUnavailable: React.FC = () => (
  <NonIdealState>
    <p style={{ marginBlock: "0" }} className="p1--semibold">
      Seat selection unavailable
    </p>
    <p
      className="p1--regular"
      style={{
        color: "var(--GREY-600)",
        marginBlock: "12px",
        textAlign: "center",
      }}
    >
      Unfortunately seat selection is not available for this flight. A seat will
      be allocated by the airline.
    </p>
  </NonIdealState>
);
