import { getCabinsForSegmentAndDeck } from "@lib/getCabinsForSegmentAndDeck";
import { getSymbols } from "@lib/getSymbols";
import { hasWings } from "@lib/hasWings";
import classNames from "classnames";
import * as React from "react";
import { CreateOrderService, SeatMap as SeatMapType } from "@duffel/api/types";
import { DeckSelect } from "./DeckSelect";
import { Legend } from "./Legend";
import { Row } from "./Row";
import { SeatMapUnavailable } from "./SeatMapUnavailable";
import { WithServiceInformation } from "src/types";

export interface SeatMapProps {
  seatMap: SeatMapType;
  selectedServicesMap: Record<
    string,
    WithServiceInformation<CreateOrderService>
  >;
  onSeatToggled: (
    seatService: WithServiceInformation<CreateOrderService>
  ) => void;
  currentPassengerId: string;
  currentPassengerName: string;
  currentSegmentId: string;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  seatMap,
  onSeatToggled,
  selectedServicesMap,
  currentPassengerId,
  currentPassengerName,
  currentSegmentId,
}) => {
  const [selectedDeck, setSelectedDeck] = React.useState(0);

  if (!seatMap || !seatMap.cabins || !seatMap.cabins.length) {
    return <SeatMapUnavailable />;
  }

  const cabins = getCabinsForSegmentAndDeck(selectedDeck, seatMap);
  const hasMultipleDecks = cabins.length !== seatMap.cabins.length;
  const anyHasWings = seatMap.cabins.some((cabin) => cabin.wings);

  if (!cabins || !cabins.length) {
    return <SeatMapUnavailable />;
  }

  const symbols = getSymbols(cabins);

  return (
    <div
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
      {cabins.map((cabin, cabinIndex) => (
        <div
          key={`cabin-${cabinIndex}`}
          className="seat-map__map-container"
          style={{ "--CABIN-AISLES": cabin.aisles } as React.CSSProperties}
        >
          {cabin.rows.map((row, rowIndex) => (
            <Row
              key={rowIndex}
              row={row}
              hasWings={hasWings(cabin, rowIndex)}
              onSeatToggled={onSeatToggled}
              selectedServicesMap={selectedServicesMap}
              currentPassengerId={currentPassengerId}
              currentPassengerName={currentPassengerName}
              currentSegmentId={currentSegmentId}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
