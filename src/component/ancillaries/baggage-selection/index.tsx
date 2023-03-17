import React from "react";
import { Offer } from "../../../types/Offer";

const getMockbaggageSelectionState = ({
  offer,
  baggageSelectionState,
}: Pick<BaggageSelectionProps, "offer" | "baggageSelectionState">) => ({
  ...baggageSelectionState,
  selected_services: [{ id: "service_id_here", quantity: 20 }],
});

export interface BaggageSelectionState {
  selected_services: Array<{ id: string; quantity: number }>;
}

export type SetBaggageSelectionStateFunction = (
  baggageSelectionState: BaggageSelectionState
) => void;

export interface BaggageSelectionProps {
  offer: Offer;
  baggageSelectionState: BaggageSelectionState | null;
  setBaggageSelectionState: SetBaggageSelectionStateFunction;
}

export const BaggageSelection: React.FC<BaggageSelectionProps> = ({
  offer,
  baggageSelectionState,
  setBaggageSelectionState,
}) => {
  return (
    <div>
      <pre>{JSON.stringify({ baggageSelectionState }, null, 2)}</pre>
      baggage selection here -&gt;
      <button
        onClick={() =>
          setBaggageSelectionState(
            getMockbaggageSelectionState({
              offer,
              baggageSelectionState,
            })
          )
        }
      >
        click to call{" "}
        <b>
          <code>setBaggageSelectionState</code>
        </b>
      </button>
    </div>
  );
};
