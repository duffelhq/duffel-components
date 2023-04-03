import * as React from "react";
import { Button } from "./Button";
import { NonIdealState } from "./NonIdealState";

export const FetchOfferErrorState: React.FC<{ height: string }> = ({
  height,
}) => (
  <NonIdealState style={{ minHeight: height }}>
    <p style={{ marginBlock: "0" }} className="p1--semibold">
      Failed to load extras
    </p>
    <p
      className="p1--regular"
      style={{
        color: "var(--GREY-600)",
        marginBlock: "12px",
        textAlign: "center",
      }}
    >
      Please try reloading. If the problem persists you can try again later or
      add seats and bags after you’ve made the booking.
    </p>
    <div>
      <Button
        text="Try again"
        intent="INVISIBLE"
        onClick={() => location.reload()}
        iconBefore="autorenew"
      />
    </div>
  </NonIdealState>
);
