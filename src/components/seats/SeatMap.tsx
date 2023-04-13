import classNames from "classnames";
import * as React from "react";
import { DeckSelect } from "./DeckSelect";
import { Legend } from "./Legend";
import { Row } from "./Row";
import { getCabins } from "@lib/getCabins";
import { getSymbols } from "@lib/getSymbols";
import { NonIdealState } from "@components/NonIdealState";
import { usePassengersContext } from "@lib/usePassengersContext";
import { useSeatSelectionContext } from "@lib/useSeatSelectionContext";

/**
 * The seat map component.
 */
export const SeatMap: React.FC = () => {
  const { seatMaps } = useSeatSelectionContext();
  const passengerContext = usePassengersContext();
  const [selectedDeck, setSelectedDeck] = React.useState(0);

  if (!passengerContext) {
    throw new Error("SeatMap must be used under PassengersProvider");
  }

  const { cabins, hasMultipleDecks, anyHasWings } = getCabins(
    selectedDeck,
    passengerContext.selectedSegment.id,
    seatMaps
  );
  if (!cabins || !cabins.length) {
    return (
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
          Unfortunately seat selection is not available for this flight. A seat
          will be allocated by the airline.
        </p>
      </NonIdealState>
    );
  }

  const symbols = getSymbols(cabins);

  return (
    <div
      data-testid="seat-map"
      className={classNames("seat-map", {
        "seat-map--wings": anyHasWings,
      })}
    >
      {hasMultipleDecks && (
        <DeckSelect
          value={selectedDeck}
          setValue={(value) => {
            setSelectedDeck(value);
          }}
        />
      )}
      <div className="seat-map__legend-container">
        <Legend symbols={symbols} />
      </div>
      {cabins.map((cabin, idx) => (
        <div
          key={`cabin-${idx}`}
          className="seat-map__map-container"
          style={{ "--CABIN-AISLES": cabin.aisles } as React.CSSProperties}
        >
          {cabin.rows.map((row, rowIndex) => (
            <Row
              key={rowIndex}
              row={row}
              hasWings={
                cabin.wings
                  ? cabin.wings.first_row_index <= rowIndex &&
                    cabin.wings.last_row_index >= rowIndex
                  : false
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
